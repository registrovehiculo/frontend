<template>
  <div v-if="$auth.loggedIn">
    <nav
      class="navbar header is-black"
      role="navigation"
      aria-label="main navigation"
      style="position: fixed; width: 100%; height: 3.5em; z-index: 1;"
    >
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img v-if="!getSystem" src="~assets/car.png" alt="car" height="10" />
          <img
            v-else
            src="~assets/boat.png"
            alt="boat"
            height="50"
            width="50"
          />
        </nuxt-link>
        <Searcher
          v-if="
            !getSystem &&
              $route.name !== 'faq' &&
              $route.name !== 'suggestions' &&
              $route.name !== 'upload' &&
              $route.name !== 'createUser'
          "
          style="width: 100%"
          class="margin-top-10 is-hidden-desktop"
        />
        <a class="navbar-item is-hidden-desktop" @click="logout">Salir</a>
      </div>
      <div class="navbar-menu">
        <div style="margin-left: 29%; width: 40%">
          <Searcher
            v-if="
              !getSystem &&
                $route.name !== 'faq' &&
                $route.name !== 'suggestions' &&
                $route.name !== 'upload' &&
                $route.name !== 'createUser'
            "
            style="width: 100%"
            class="margin-top-10"
          />
        </div>
        <div class="navbar-end margin-right-30">
          <div
            v-if="$auth.loggedIn"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link font-size-3">
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="font-size-5 is-white"
              />
              <p class="padding-left-10">{{ getUsername() }}</p>
            </a>
            <div
              :class="
                name === 'Transporte'
                  ? 'navbar-dropdown navbar-blue'
                  : 'navbar-dropdown navbar-red'
              "
            >
              <a
                v-if="$route.name !== 'createUser' && getUser().isSuperuser"
                class="navbar-item"
                @click="createUser()"
                >Crear usuario</a
              >
              <a
                v-if="
                  $route.name !== 'faq' &&
                    $route.name !== 'suggestions' &&
                    $route.name !== 'upload' &&
                    $route.name !== 'createUser'
                "
                class="navbar-item"
                @click="changeSystem()"
              >
                {{ 'Cambiar a ' + name }}</a
              >
              <a
                v-if="
                  $route.name === 'faq' ||
                    $route.name === 'suggestions' ||
                    $route.name === 'upload' ||
                    $route.name === 'createUser'
                "
                class="navbar-item"
                @click="$router.replace('/')"
                >Página de inicio</a
              >
              <a
                v-if="$route.name !== 'faq'"
                class="navbar-item"
                @click="userManual()"
                >Manual de usuario</a
              >
              <a
                v-if="$route.name !== 'suggestions'"
                class="navbar-item"
                @click="suggestions()"
                >Quejas y sugerencias</a
              >

              <a
                v-if="$route.name !== 'upload'"
                class="navbar-item"
                @click="upload()"
                >Actualizar base de datos</a
              >
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
  data() {
    return {
      name: null
    }
  },
  computed: {
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.loadAuth()
    }
    if (this.$store.getters['system/getActive']) {
      this.name = 'Transporte'
    } else {
      this.name = 'Embarcacion'
    }
  },
  methods: {
    async logout() {
      this.$cookies.remove('auth.user')
      await this.$auth.logout().then(() => {
        this.cleanAuth()
      })
      // window.location.href = '/'
      this.$router.replace('/').catch(() => {})
    },
    changeSystem() {
      if (this.name === 'Transporte') {
        this.$store.commit('system/setActive', false)
        this.name = 'Embarcacion'
      } else {
        this.$store.commit('system/setActive', true)
        this.name = 'Transporte'
      }
    },
    userManual() {
      if (this.$route.name !== 'faq') {
        this.$router.push('faq')
      }
    },
    suggestions() {
      if (this.$route.name !== 'suggestions') {
        this.$router.push('suggestions')
      }
    },
    upload() {
      if (this.$route.name !== 'upload') {
        this.$router.push('upload')
      }
    },
    createUser() {
      if (this.$route.name !== 'createUser') {
        this.$router.push('createUser')
      }
    },
    linkify: require('~/services/linkify').linkify,
    ...mapGetters({
      getUser: 'auth/getUser',
      getUsername: 'auth/getUsername'
    }),
    ...mapMutations({
      loadAuth: 'auth/loadFromCookie',
      cleanAuth: 'auth/cleanAuth'
    })
  }
}
</script>
<style lang="stylus" scoped>
.navbar-blue
  a.navbar-item:hover
    color: #0855f5
.navbar-red
  a.navbar-item:hover
    color: #d60000
</style>
