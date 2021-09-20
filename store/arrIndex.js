export const state = () => ({
  index: null
})

export const mutations = {
  setIndex(state, number) {
    state.index = number
  }
}
export const getters = {
  getIndex: state => {
    return state.index
  }
}
