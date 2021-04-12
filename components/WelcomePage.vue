<template>
  <section class="hero is-fullheight">
    <div class="hero-body background">
      <div class="container">
        <div>
          <div v-if="!$auth.loggedIn" class="columns is-centered">
            <!-- info -->
            <div class="column is-8-desktop">
              <!--img
                src="~/static/database.png"
                width="400"
                height="400"
                alt=""
              /-->
            </div>

            <div
              class="column is-5-desktop is-offset-1-desktop"
              style="padding: 60pt;"
            >
              <p class="has-text-centered">
                <img src="~/static/database.png" width="150pt" />
              </p>
              <p
                class="has-text-centered"
                style="font-weight: bold; font-size: 40px"
              >
                Registro
              </p>
              <b-button
                type="is-black"
                rounded
                class="is-fullwidth margin-top-10 changeColorR"
                @click="loginTransporte()"
              >
                Transporte
              </b-button>
              <b-button
                type="is-black"
                rounded
                class="is-fullwidth margin-top-10 changeColorB"
                style="margin-top: 15px"
                @click="loginEmbarcacion()"
              >
                Embarcacion
              </b-button>
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
  //   } else {
  //     // this.$router.replace('/home')
  //   }
  // },
  // beforeMount() {
  //   if (this.$auth.loggedIn) {
  //     this.loadAuth()
  //     this.$router.replace('/home')
  //   }
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
    loginEmbarcacion() {
      this.$store.commit('system/setActive', true)
      this.$router.replace('login')
    },
    loginTransporte() {
      this.$store.commit('system/setActive', false)
      this.$router.replace('login')
    },
    ...mapMutations({
      setUser: 'setUser',
      loadAuth: 'loadFromCookie'
    })
  }
}
</script>
<style lang="stylus" scoped>
.changeColorR, .changeColorB
  height 3rem
  font-size 20px
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 250ms

.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 250ms

.background
  /*background-image: url('')*/
  background-repeat: no-repeat
  background-size: 1000px 880px
  padding-top 10px
</style>
