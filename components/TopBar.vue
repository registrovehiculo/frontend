<template>
  <div v-if="$auth.loggedIn">
    <nav
      class="navbar header is-black padding-right-20 padding-left-20"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand margin-top-5">
        <nuxt-link class="navbar-item" to="/home">
          <img src="~assets/car.png" alt="car" height="10" />
        </nuxt-link>
        <Searcher
          style="width: 100%"
          class="margin-top-10 is-hidden-tablet is-hidden-desktop"
        />
        <a
          class="navbar-item is-hidden-tablet is-hidden-desktop"
          @click="logout"
          >Salir</a
        >
      </div>
      <div class="navbar-menu is-hidden-mobile">
        <div style="margin-top: 0.75rem; width: 30%" class="margin-left-10">
          <Searcher />
        </div>
        <div class="navbar-end">
          <div
            v-if="$auth.loggedIn"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link font-size-3"> {{ getUsername() }} </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logout()">Salir</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// Vuex
import { mapGetters, mapMutations } from 'vuex'
// Components
import Searcher from '~/components/Searcher'
export default {
  components: { Searcher },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.loadAuth()
    }
  },
  methods: {
    async logout() {
      this.$cookies.remove('auth.user')
      await this.$auth.logout().then(() => {
        this.cleanAuth()
      })
      this.$router.replace('/')
    },
    linkify: require('~/services/linkify').linkify,
    ...mapGetters({
      getUser: 'getUser',
      getUsername: 'getUsername'
    }),
    ...mapMutations({
      loadAuth: 'loadFromCookie',
      cleanAuth: 'cleanAuth'
    })
  }
}
</script>
