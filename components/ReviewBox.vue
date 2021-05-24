<template>
  <article v-if="!removed" class="review media">
    <div class="column is-size-7-mobile">
      <div class="content">
        <div class="columns is-mobile">
          <div class="column is-7-mobile is-flex-mobile">
            {{ reviewer.username }}
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

          <!-- display mode -->
          <div v-else class="review-text" style="margin-top: -5%">
            <span
              v-if="review.title"
              class="review-title"
              v-html="linkify(review.title)"
            ></span>
            <br />
            <div
              v-show="review.text !== ''"
              v-html="linkify(review.text)"
            ></div>
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
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import createReviewMutation from '~/apollo/mutations/reviews/createReview'
import updateReviewMutation from '~/apollo/mutations/reviews/updateReview'
import removeReviewMutation from '~/apollo/mutations/reviews/removeReview'

export default {
  data() {
    return {
      form: {
        text: null,
        loading: false
      },
      editing: false,
      removed: false,
      review: {
        id: null,
        text: null,
        createdAt: null,
        updatedAt: null,
        reviewer: {
          username: null
        }
      },
      editMode: {
        type: Boolean,
        default: false
      }
    }
  },
  computed: {
    reviewer() {
      return this.editMode ? this.getUser() : this.review.reviewer
    },
    reviewerName() {
      return '@' + this.reviewer.username
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
                  this.review = review
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
              }
              if (status === 'forbidden') {
                this.$toast.show('No es posible publicar esa sugerencia')
              } else {
                this.cleanForm()
                this.review = review
                this.$toast.show('Se publicó tu sugerencia')
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
                this.$emit('review:deleted', {
                  review: this.review
                })
                this.$toast.show('Se eliminó la opinión')
              }
            })
        }
      })
    },
    linkify: require('~/services/linkify').linkify,
    ...mapGetters({
      getUser: 'getUser',
      getUsername: 'getUsername'
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
</style>
