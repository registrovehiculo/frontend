<template>
  <div class="container">
    <!-- edit mode -->
    <b-modal
      :active.sync="activeModal"
      trap-focus
      aria-role="dialog"
      scroll="keep"
      class="has-text-centered"
      @close="activeModal = null"
    >
      <div
        v-if="activeModal !== null"
        class="modal-card-body"
        style="width: auto"
      >
        <small class="help"> Respondiendo a {{ activeModal }} </small>
        <b-input
          v-model="form.text"
          maxlength="200"
          placeholder="Escriba su sugerencia"
          type="textarea"
        ></b-input>
        <b-field>
          <b-button
            :disabled="!form.text"
            :loading="form.loading"
            type="is-black"
            rounded
            class="is-fullwidth is-size-7-mobile changeColorB"
            style="border: 5pt"
            @click="publish()"
          >
            Publicar
          </b-button>
        </b-field>
      </div>
    </b-modal>
    <p
      class="has-text-centered margin-top-30"
      style="font-size: 32px; font-weight: 700"
    >
      Quejas y sugerencias (Pagina en desarollo)
    </p>
    <hr />
    <p class="has-text-centered">
      En esta página puede escribrir los problemas, quejas o sugerencias que
      tenga con la plataforma, serán revisados y respondido de inmediato
    </p>
    <form
      class="margin-top-50 column is-6 is-offset-3"
      @submit.stop.prevent="publish()"
    >
      <b-input
        v-model="form.text"
        maxlength="200"
        placeholder="Escriba su sugerencia"
        type="textarea"
      ></b-input>
      <b-field>
        <b-button
          :disabled="!form.text"
          :loading="form.loading"
          type="is-black"
          rounded
          class="is-fullwidth is-size-7-mobile changeColorB"
          style="border: 5pt"
          @click="publish()"
        >
          Publicar
        </b-button>
      </b-field>
    </form>
    <hr />

    <div class="margin-top-70 margin-bottom-50"></div>
    <div v-if="allReviews.length > 0">
      <p class="has-text-centered font-size-5" style="font-weight: 700">
        Opiniones
      </p>
    </div>
    <div
      v-for="(review, index) in allReviews"
      :key="index"
      class="margin-top-20 column is-6 is-offset-3"
    >
      <p class="font-size-3" style="font-weight: 700; margin-bottom: -2rem">
        {{ review.reviewer.username }}
      </p>
      <p class="has-text-right" style="margin-bottom: 1rem">
        {{
          moment(review.createdAt)
            .locale('es')
            .fromNow()
        }}
      </p>
      <!-- eslint-disable vue/no-v-html -->
      <div class="Card" v-html="linkify(review.text)"></div>
      <div>
        <div class="columns">
          <div class="column">
            <!--font-awesome-icon
              :icon="['fas', 'plus']"
              class="font-size-4 changeColor icon-plus"
              @click="
                createReviewAnswer(review.reviewer.username, index, review)
              "
            /-->
          </div>
          <div
            v-if="review.reviewer.username === getUsername()"
            class="column has-text-right"
          >
            <p>
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="font-size-5 icon"
                alt="Borrar sugerencia"
                @click="allReviews.splice(index, 1) && remove(review.id)"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="margin-bottom-50"></div>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex'
import moment from 'moment'
// Apollo
import userReviewsQuery from '~/apollo/queries/userReviews.graphql'
import allReviewsAnswersQuery from '~/apollo/queries/allReviewsAnswers.graphql'
import allReviewsQuery from '~/apollo/queries/allReviews.graphql'
import createReviewMutation from '~/apollo/mutations/reviews/createReview.graphql'
import createReviewAnswerQuery from '~/apollo/mutations/reviews/createReviewAnswer.graphql'
import userReviewAnswerQuery from '~/apollo/queries/userReviewAnswer.graphql'
// import updateReviewMutation from '~/apollo/mutations/reviews/updateReview.graphql'
import removeReviewMutation from '~/apollo/mutations/reviews/removeReview.graphql'
export default {
  data() {
    return {
      userReview: null,
      allReviews: [],
      allReviewsAnswers: [],
      userAnswers: [],
      reviewIndex: null,
      reviewsarr: [],
      form: {
        text: null,
        loading: false,
        visible: false,
        answer: null
      },
      editing: false,
      removed: false,
      activeModal: null,
      moment
    }
  },
  head() {
    return {
      title: `Quejas y Sugerencias`
    }
  },
  mounted() {
    this.reviewsarr = this.$store.getters['review/get']
    this.$apollo
      .query({
        query: userReviewsQuery,
        variables: {
          username: this.getUsername()
        }
      })
      .then(({ data }) => {
        this.review = data.userReviews
      })
    this.$apollo
      .query({
        query: allReviewsQuery
      })
      .then(({ data }) => {
        this.allReviews = data.allReviews
      })
    this.$apollo.query({ query: allReviewsAnswersQuery }).then(({ data }) => {
      this.allReviewsAnswers = data.allReviewsAnswers
    })
  },
  methods: {
    publish() {
      this.form.loading = true
      this.$apollo
        .mutate({
          mutation: createReviewMutation,
          variables: { text: this.form.text, username: this.getUsername() }
        })
        .then(
          ({ data }) => {
            let status = null
            let review = null
            if (data.createReview) {
              status = data.createReview.status
              review = data.createReview.review
              this.allReviews.unshift(review)
            }
            if (status === 'forbidden') {
              this.$toast.show('No es posible publicar esa opinión')
            } else {
              this.cleanForm()
              this.$toast.show('Se publicó tu opinión')
            }
            this.form.loading = false
          },
          error => {
            if (error.message === 'Network error: Failed to fetch') {
              this.form.loading = false
              this.$toast.show('Revisa tu conexión a internet')
            }
          }
        )
      this.activeModal = null
    },
    createReviewAnswer(username, index, review) {
      this.activeModal = username
      this.reviewIndex = index
      this.allReviews.splice(index, 0, review)
      this.$apollo
        .mutate({
          mutation: createReviewAnswerQuery,
          variables: { reviewId: index, text: review.text }
        })
        .then(({ data }) => {
          this.$store.commit(
            'reviewAnswer/publishAnswer',
            data.createReviewAnswer
          )
        })
    },
    getUserAnswers(index) {
      this.$apollo
        .query({
          query: userReviewAnswerQuery,
          variables: { reviewId: index }
        })
        .then(({ data }) => {
          this.userAnswers = data.userReviewAnswer
        })
    },
    changeVisible() {
      this.form.visible = true
    },
    edit() {
      this.loadForm()
      this.editing = true
    },
    loadForm() {
      this.form.text = this.review.text
    },
    cleanForm() {
      this.form.text = null
    },
    remove(reviewId, index) {
      this.$apollo
        .mutate({
          mutation: removeReviewMutation,
          variables: { id: reviewId }
        })
        .then(({ data }) => {
          const { status } = data.removeReview
          if (status === 'ok') {
            this.removed = true
            this.$toast.show('Se eliminó la opinión')
          }
        })
    },
    linkify: require('~/services/linkify').linkify,
    ...mapGetters({
      // Auth
      getUser: 'getUser',
      getUsername: 'getUsername'
    })
  }
}
</script>

<style lang="stylus" scoped>
.Card
  background #d7dbeb
  height 7rem
  padding 1rem
  border-radius 16px
.icon-plus:hover
  color #d60000
  cursor pointer
.icon:hover
  color #d60000
  cursor pointer
.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms
.changeColor:hover
  color #0855f5 !important
  transition background 300ms
</style>
