export const state = () => ({
  users: null
})

export const mutations = {
  set(state, users) {
    state.users = users
  }
}

export const getters = {
  get: state => {
    return state.users
  }
}
