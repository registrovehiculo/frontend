export const state = () => ({
  search: {
    active: false
  }
})

export const mutations = {
  setActive(state, active) {
    state.search.active = active
  }
}
export const getters = {
  get: state => {
    return state.search
  },
  getActive: state => {
    if (state.search) {
      return state.search.active
    }
  }
}
