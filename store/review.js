export const state = () => ({
  reviews: [],
  reviewsId: null
})

export const mutations = {
  set(state, review) {
    state.reviews = review
  },
  publishReview(state, review) {
    state.reviews.unshift(review)
  },
  updateReview(state, review) {
    const index = state.review.findIndex(i => i.review.id === review.id)
    if (index !== -1) {
      state.review[index].text = review.text
      state.review[index].updatedAt = review.updatedAt
    }
  },
  removeReview(state, reviewsId) {
    state.reviews.splice(reviewsId, 1)
  }
}

export const getters = {
  get: state => {
    return state.reviews
  }
}
