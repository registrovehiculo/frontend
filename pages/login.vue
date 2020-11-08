<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-4">
          <h2 class="title has-text-centered">login!</h2>
          {{ form.error }}
          <form @submit.stop.prevent="login()">
            <div class="control margin-top-10">
              <b-input
                v-model="$v.form.username.$model"
                class="input"
                name="username"
              ></b-input>
            </div>
            <div class="control margin-top-10">
              <b-input
                v-model="$v.form.password.$model"
                type="password"
                class="input"
                name="password"
              ></b-input>
            </div>
            <div class="control margin-top-20">
              <button type="submit" class="button is-primary is-fullwidth">
                Entrar
              </button>
            </div>
          </form>
          <div class="has-text-centered">
            <p>
              No tienes una cuenta?
              <nuxt-link to="/register">Registrarse</nuxt-link>
            </p>
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
  auth: 'true',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        error: null,
        message: null,
      },
    }
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    }
  },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.loadAuth()
    }
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: loginMutation,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then(({ data }) => {
          console.log(data)
          const { status, token, user } = data.login
          const jwtToken = 'JWT ' + token
          switch (status) {
            case 'ok': {
              // Save user to cookie using Vuex
              this.$auth.setStrategy('local').then(() => {
                this.$store.commit('setUser', {
                  strategy: this.$auth.strategy.name,
                  user,
                })
                this.$auth.setToken('local', jwtToken)
                this.$auth.setUser(user)

                // Save auth data in cookies
                this.$cookies.set('auth.user', user)
                this.$cookies.set('auth._token.local', jwtToken)
                const cookie = this.$cookies.get('auth.redirect')
                if (cookie) {
                  this.$cookies.set('auth.redirect', null)
                  this.$router.replace(cookie)
                  // window.location.href = cookie
                } else {
                  this.$router.replace('/home')
                  // window.location.href = '/home'
                }
              })
              break
            }
            case 'error': {
              this.form.error = true
              this.form.message = 'Usuario o contraseña incorrectos'
              break
            }
          }
        })
    },
    ...mapMutations({
      setUser: 'setUser',
      loadAuth: 'loadFromCookie',
    }),
  },
}
</script>
