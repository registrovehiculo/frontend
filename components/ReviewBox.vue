<template>
  <article class="review media">
    <div class="column is-size-7-mobile">
      <div class="content">
        <div class="columns is-mobile">
          <div class="column is-7-mobile is-flex-mobile"></div>
        </div>

        <!-- edit mode -->
        <div
          v-if="editMode || editing"
          class="review-input is-rounded"
          style="margin-top: -5%"
        >
          <form @submit.stop.prevent="publish()">
            <b-input
              v-model="form.text"
              maxlength="200"
              placeholder="Escribe tu opinión"
              type="textarea"
            ></b-input>
            <b-field>
              <b-button
                :disabled="!form.text"
                :loading="form.loading"
                type="is-black"
                class="is-fullwidth is-size-7-mobile"
                style="border: 5pt"
                @click="publish()"
              >
                Publicar
              </b-button>
            </b-field>
          </form>
        </div>
        <!-- end edit mode -->
        {{ review.text }}
        <!-- display mode -->
        <div class="review-text" style="margin-top: -5%">
          <br />
          <div v-show="review.text !== ''" v-html="linkify(review.text)"></div>
        </div>
        <!-- end display mode -->
        <div class="row is-flex" style="margin-top: -2%">
          <div class="column is-6-desktop is-6-mobile">
            <p v-if="reviewer.username === getUsername() && !editMode">
              <i class="icon icon-pencil" @click="edit()"></i>
              <i class="icon icon-trash" @click="remove()"></i>
            </p>
          </div>
          <div class="column is-6-desktop is-6-mobile">
            <p v-if="!editMode && review.createdAt" class="review-date">
              {{ $moment(review.createdAt).fromNow() }}
              <span v-if="review.updatedAt" class="edited">
                Editado
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex'
// Apollo
import createReviewMutation from '~/apollo/mutations/reviews/createReview.graphql'
import updateReviewMutation from '~/apollo/mutations/reviews/updateReview.graphql'
import removeReviewMutation from '~/apollo/mutations/reviews/removeReview.graphql'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    target: {
      type: Object,
      default: () => {
        return {
          reviews: []
        }
      }
    },
    review: {
      type: Object,
      default: () => {
        return {
          id: null,
          text: null,
          createdAt: null,
          updatedAt: null,
          reviewer: {
            username: null
          }
        }
      }
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        text: null,
        loading: false
      },
      editing: false,
      removed: false
    }
  },
  computed: {
    reviewer() {
      return this.editMode ? this.getUser() : this.review.reviewer
    },
    reviewerName() {
      if (this.reviewer.firstName === '' && this.reviewer.lastName === '') {
        return '@' + this.reviewer.username
      }
      return `${this.reviewer.firstName} ${this.reviewer.lastName}`
    }
  },
  methods: {
    publish() {
      this.form.loading = true
      if (this.review.id) {
        /**
         * Update review
         */
        this.$apollo
          .mutate({
            mutation: updateReviewMutation,
            variables: {
              id: this.review.id,
              text: this.form.text
            }
          })
          .then(
            ({ data }) => {
              const status = data.updateReview.status
              switch (status) {
                case 'ok': {
                  const review = data.updateReview.review
                  this.$emit('review:updated', review)
                  this.cleanForm()

                  // Finish
                  this.form.loading = false
                  this.editing = false
                  break
                }
                case 'forbidden': {
                  this.$toast.show('No es posible publicar esa opinión')
                  break
                }
              }
            },
            error => {
              if (error.message === 'Network error: Failed to fetch') {
                this.form.loading = false
                this.$toast.show('Revisa tu conexión a internet')
              }
            }
          )
      } else {
        /**
         * Create review
         */

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
                this.$store.commit('review/publishReview', review)
              }
              if (status === 'forbidden') {
                this.$toast.show('No es posible publicar esa opinión')
              } else {
                this.cleanForm()
                this.$emit('review:published', {
                  review
                })
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
      }
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
    remove() {
      this.$buefy.dialog.confirm({
        message: '¿Confirma que desea eliminar esta opinión?',
        confirmText: 'Sí',
        cancelText: 'No',
        type: 'is-black',
        onConfirm: () => {
          this.$apollo
            .mutate({
              mutation: removeReviewMutation,
              variables: { id: this.review.id }
            })
            .then(({ data }) => {
              const { status } = data.removeReview
              if (status === 'ok') {
                this.removed = true
                this.$toast.show('Se eliminó la opinión')
              }
            })
        }
      })
    },
    linkify: require('~/services/linkify').linkify,
    ...mapGetters({
      // Auth
      getUser: 'auth/getUser',
      getUsername: 'auth/getUsername'
    })
  }
}
</script>

<style lang="stylus" scoped>
.review
  margin-bottom 20pt !important

.reviewer-name
  font-size 15pt

.review:last-child
  margin-bottom 10pt

.review .review-input
  background: #E4E0DD

.review .review-input .input
  background: none !important

.review .review-text
  background-color #e8e3e0
  border-radius 15pt
  margin-bottom 5pt
  padding 10pt 20pt 10pt 20pt

.review .review-text .review-title
  font-weight bold
  margin-bottom 20pt

.review .review-date
  float right

.review .review-date .edited
  color #707070

.input, .textarea
  background-color none !important

.icon
  color #707070
  transition color 400ms

.icon:hover
  color #FF8530
  cursor pointer
  transition color 400ms
</style>
