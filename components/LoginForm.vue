<template>
  <section>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-variable is-8">
            <div class="column has-text-centered is-6 flex-wrap-center">
              <img
                src="~static/database.png"
                alt="car"
                height="150"
                width="150"
                style="margin-top: -100px"
              />
              <h2 class="title has-text-centered">
                Registro
              </h2>
              <form @submit.stop.prevent="login()">
                <div class="margin-top-10">
                  <b-field :type="getSystem ? 'is-warning' : ''">
                    <b-input
                      v-model="$v.form.username.$model"
                      name="username"
                      placeholder="Usuario"
                      rounded
                    ></b-input>
                  </b-field>
                </div>
                <div class="margin-top-10">
                  <b-field
                    :type="getSystem ? 'is-warning password' : 'password'"
                  >
                    <b-input
                      v-model="$v.form.password.$model"
                      type="password"
                      name="password"
                      password-reveal
                      placeholder="Contraseña"
                      rounded
                    ></b-input>
                  </b-field>
                </div>
                <div class="margin-top-20">
                  <b-button
                    :class="
                      getSystem
                        ? 'is-black is-fullwidth changeColorB'
                        : 'is-black is-fullwidth changeColorR'
                    "
                    rounded
                    @click="login"
                  >
                    Entrar
                  </b-button>
                </div>
                <div class="margin-top-10 has-text-centered">
                  <p v-show="form.error" class="font-size-2">
                    {{ form.message }}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
// Apollo
import loginMutation from '~/apollo/mutations/auth/login.graphql'
// Components
export default {
  layout: 'empty',
  auth: true,
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        error: false,
        message: '',
        loadingForm: false,
        loading: false
      }
    }
  },
  computed: {
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  },
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    }
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    login() {
      this.$v.form.$touch()
      if (!this.form.$invalid) {
        this.form.loading = true
        this.$apollo
          .mutate({
            mutation: loginMutation,
            variables: {
              username: this.form.username,
              password: this.form.password
            }
          })
          .then(({ data }) => {
            const { status, token, user } = data.login
            const jwtToken = 'JWT ' + token
            switch (status) {
              case 'ok': {
                // Save user to cookie using Vuex
                this.$auth.setStrategy('local').then(() => {
                  this.$store.commit('setUser', {
                    strategy: this.$auth.strategy.name,
                    user
                  })
                  this.$auth.setToken('local', jwtToken)
                  this.$auth.setUser(user)

                  // Save auth data in cookies
                  this.$cookies.set('auth.user', user)
                  this.$cookies.set('auth._token.local', jwtToken)
                  const cookie = this.$cookies.get('auth.redirect')
                  if (cookie) {
                    this.$cookies.set('auth.redirect', null)
                    // window.location.href = cookie
                    this.$router.replace(cookie).catch(() => {})
                  } else {
                    // window.location.href = '/'
                    this.$router.replace('/').catch(() => {})
                  }
                })
                break
              }
              case 'error': {
                this.form.error = true
                this.form.message = 'Usuario o contraseña incorrecto'
                break
              }
            }
            this.form.loading = false
          })
      }
    },
    ...mapMutations({
      setUser: 'setUser',
      loadAuth: 'loadFromCookie'
    })
  }
}
</script>
<style lang="stylus" scoped>
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 300ms

.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms
</style>
