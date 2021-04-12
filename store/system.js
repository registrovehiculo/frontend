export const state = () => ({
  system: {
    active: false
  }
})

export const mutations = {
  setActive(state, active) {
    state.system.active = active
  }
}
export const getters = {
  get: state => {
    return state.system
  },
  getActive: state => {
    if (state.system) {
      return state.system.active
    }
  }
}
