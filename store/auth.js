export const state = () => ({
  user: {
    id: null,
    username: null,
    email: null,
    isSuperuser: null
  },
  strategy: null
})

export const mutations = {
  loadFromCookie(state) {
    const cookie = this.$cookies.get('auth.user')
    if (cookie) {
      const { id, username, email, isSuperuser } = cookie
      state.user.id = id
      state.user.username = username
      state.user.email = email
      state.user.isSuperuser = isSuperuser
      // Inject into nuxt $auth
      this.$auth.setStrategy('local')
      this.$auth.setUser(state.user)
      const token = this.$cookies.get('auth._token.local')
      this.$auth.setToken('local', token)
    }
  },
  initUser(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
      isSuperuser: null
    }
  },
  setUser(state, payload) {
    this.commit('initUser')
    // state.strategy = payload.strategy
    switch (payload.strategy) {
      case 'local': {
        state.user.id = payload.user.id
        state.user.username = payload.user.username
        state.user.email = payload.user.email
        state.user.isSuperuser = payload.user.isSuperuser
        break
      }
    }
    this.$cookies.set('auth.user', state)
  },
  cleanAuth(state) {
    this.$auth.setToken('local', null)
    this.$cookies.set('auth._token.local', null)
  },
  setUsername(state, payload) {
    state.user.username = payload
    this.$cookies.set('auth.user', state.user)
  },
  setEmail(state, payload) {
    state.user.email = payload
    this.$cookies.set('auth.user', state.user)
  }
}

export const getters = {
  getUser: state => state.user,
  getUsername: state => {
    if (state.user) {
      return state.user.username
    }
  },
  getEmail: state => state.user.email
}
