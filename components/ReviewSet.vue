<template>
  <div class="columns is-centered">
    <div class="column is-12-mobile is-8-tablet is-6-desktop">
      <!-- reviews -->
      <div class="reviews">
        <!--h2
          class="subtitle is-hidden-mobile has-text-centered"
          style="font-weight: bold; margin-top: 30pt"
        >
          <span v-if="reviews.length === 0 && $auth.loggedIn">
            Sea el primero en opinar
          </span>
          <span v-if="reviews.length > 0">Opiniones</span>
        </h2>
        <p
          class="has-text-centered is-hidden-desktop is-hidden-tablet"
          style="font-weight: bold; font-size: 16pt"
        >
          <span
            v-if="reviews.length === 0 && $auth.loggedIn"
            class="margin-bottom-20"
          >
            Sea el primero en opinar
          </span>
          <span v-if="reviews.length > 0" class="margin-bottom-20"
            >Opiniones</span
          >
        </p-->

        <form v-if="$auth.loggedIn">
          <ReviewBox
            v-show="publishReviewFormVisible"
            :type="type"
            :sync="reviews"
            edit-mode
            @review:published="$payload => $emit('review:published', $payload)"
          />
        </form>

        <ReviewBox
          v-for="item in reviews"
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
    reviews: {
      type: Array,
      default: null
    }
  },
  computed: {
    publishReviewFormVisible() {
      if (this.reviews !== null) {
        const record = this.reviews.find(
          i => i.review.reviewer.username === this.getUsername()
        )
        return !record
      }
      return true
    }
  },
  methods: {
    ...mapGetters({
      getUsername: 'auth/getUsername'
    })
  }
}
</script>

<style lang="stylus" scoped>
.reviews .review
  margin auto
</style>
