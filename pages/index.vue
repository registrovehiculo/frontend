<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div
          class="column is-5 has-text-centered margin-top-20"
          style="transform: translateY(27%)"
        >
          <img src="~assets/car.png" alt="car" height="150" width="150" />
          <h2 class="title has-text-centered">Registro vehiculo</h2>
          <form @submit.stop.prevent="login()">
            <div class="margin-top-10">
              <b-field>
                <b-input
                  v-model="$v.form.username.$model"
                  name="username"
                  placeholder="Usuario"
                  rounded
                ></b-input>
              </b-field>
            </div>
            <div class="margin-top-10">
              <b-field>
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
              <b-button class="is-black is-fullwidth" rounded @click="login">
                Entrar
              </b-button>
            </div>
            <div class="margin-top-10 has-text-centered">
              <p v-show="form.error" class="font-size-2">{{ form.message }}</p>
            </div>
          </form>
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
        error: false,
        message: '',
        loadingForm: false,
        loading: false
      }
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
  // beforeCreate() {
  //   const url = this.$cookies.get('auth.redirect')
  //   if (url && this.$auth.loggedIn) {
  //     this.$router.replace(url)
  //   }
  // },
  // beforeMount() {
  //   if (this.$auth.loggedIn) {
  //     this.loadAuth()
  //     this.$router.replace('/home')
  //   }
  //   this.loading = false
  // },
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
                    this.$router.replace(cookie)
                  } else {
                    this.$router.replace('/home')
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
