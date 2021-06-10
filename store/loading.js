export const state = () => ({
  loading: false
})

export const mutations = {
  set(state, loadingState) {
    state.loading = loadingState
  }
}
export const getters = {
  get: state => {
    return state.loading
  }
}
