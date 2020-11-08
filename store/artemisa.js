export const state = () => ({
  artemisa: null,
})

export const mutations = {
  set(state, artemisa) {
    state.artemisa = artemisa
  },
}
export const getters = {
  get: (state) => {
    return state.artemisa
  },
}
