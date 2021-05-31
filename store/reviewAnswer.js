export const state = () => ({
  reviewsAnswers: [],
  reviewsId: null
})

export const mutations = {
  set(state, reviewsAnswers) {
    state.reviewsAnswers = reviewsAnswers
  },
  publishAnswer(state, reviewsAnswers) {
    state.reviewsAnswers.unshift(reviewsAnswers)
  },
  updateReview(state, reviewsAnswers) {
    const index = state.reviewsAnswers.findIndex(
      i => i.reviewsAnswers.id === reviewsAnswers.id
    )
    if (index !== -1) {
      state.reviewsAnswers[index].text = reviewsAnswers.text
      state.reviewsAnswers[index].updatedAt = reviewsAnswers.updatedAt
    }
  },
  removeReview(state, reviewsId) {
    state.reviewsAnswers.splice(reviewsId, 1)
  }
}

export const getters = {
  get: state => {
    return state.reviewsAnswers
  }
}
