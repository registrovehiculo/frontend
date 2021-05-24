<template>
  <div class="columns is-centered">
    <div class="column is-12-mobile is-8-tablet is-8-desktop">
      <!-- reviews -->
      <div class="reviews">
        <h2
          class="subtitle is-hidden-mobile has-text-centered"
          style="font-weight: bold; margin-top: 30pt"
        >
          <span v-if="target.reviews.length > 0">Opiniones</span>
        </h2>
        {{ target.reviews.length }}
        <!--mobile view-->
        <p
          class="has-text-centered is-hidden-desktop is-hidden-tablet"
          style="font-weight: bold; font-size: 16pt"
        >
          <span v-if="target.reviews.length > 0" class="margin-bottom-20"
            >Opiniones</span
          >
        </p>

        <form v-if="$auth.loggedIn">
          <ReviewBox
            v-show="publishReviewFormVisible"
            :type="type"
            :target.sync="target"
            edit-mode
            @review:published="$payload => $emit('review:published', $payload)"
          />
        </form>

        <ReviewBox
          v-for="item in target.reviews"
          :key="item.review.id"
          :review.sync="item.review"
          @review:updated="$payload => $emit('review:updated', $payload)"
          @review:deleted="$payload => $emit('review:deleted', $payload)"
        />
      </div>
      <!-- end reviews -->
    </div>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex'
// Components
import ReviewBox from '~/components/ReviewBox'
export default {
  components: { ReviewBox },
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
    }
  },
  computed: {
    publishReviewFormVisible() {
      if (this.target.reviews.length > 0) {
        const record = this.target.reviews.find(
          i => i.review.reviewer.username === this.getUsername()
        )
        return !record
      }
      return true
    }
  },
  methods: {
    ...mapGetters({
      getUsername: 'getUsername'
    })
  }
}
</script>

<style lang="stylus" scoped>
.reviews .review
  margin auto
</style>
