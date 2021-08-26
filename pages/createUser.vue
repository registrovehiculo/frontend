<template>
  <section>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container" style="margin-top: -15%">
          <div class="columns is-centered is-variable is-8">
            <div class="column has-text-centered is-6 flex-wrap-center">
              <img
                src="~static/database.png"
                alt="car"
                height="150"
                width="150"
              />
              <h2 class="title has-text-centered">
                Crear un usuario
              </h2>
              <form @submit.stop.prevent="register()">
                <!-- user -->
                <b-field>
                  <b-input
                    v-model.trim.lazy="$v.registerForm.user.$model"
                    rounded
                    type="text"
                    placeholder="Usuario"
                    expanded
                  >
                  </b-input>
                </b-field>
                <transition name="fade">
                  <p
                    v-if="$v.registerForm.user.$error"
                    style="animation-duration: 200ms"
                  >
                    <span
                      v-show="
                        $v.registerForm.user.$error &&
                          !$v.registerForm.user.required
                      "
                    >
                      Debes especificar un usuario.
                    </span>
                  </p>
                </transition>
                <!-- end user -->

                <!-- password -->
                <b-field>
                  <b-input
                    v-model.trim.lazy="$v.registerForm.password.$model"
                    rounded
                    type="password"
                    placeholder="Contraseña"
                    password-reveal
                    expanded
                  >
                  </b-input>
                </b-field>
                <p
                  v-if="$v.registerForm.password.$error"
                  style="animation-duration: 200ms"
                >
                  <span
                    v-show="
                      $v.registerForm.password.$error &&
                        !$v.registerForm.password.required
                    "
                  >
                    Debes especificar una contraseña.
                  </span>
                  <span
                    v-show="
                      $v.registerForm.password.$error &&
                        !$v.registerForm.password.minlength
                    "
                  >
                    La contraseña es muy corta.
                  </span>
                </p>
                <!-- end password -->
                <!-- confirm password -->
                <b-field>
                  <b-input
                    v-model="$v.registerForm.confirmPassword.$model"
                    type="password"
                    password-reveal
                    expanded
                    rounded
                    placeholder="Confirmar contraseña"
                  ></b-input>
                </b-field>
                <p
                  v-if="$v.registerForm.confirmPassword.$error"
                  style="animation-duration: 200ms"
                >
                  <span
                    v-show="
                      $v.registerForm.confirmPassword.$error &&
                        !$v.registerForm.confirmPassword.required
                    "
                  >
                    Confirma la contraseña.
                  </span>
                  <span
                    v-show="
                      $v.registerForm.confirmPassword.$error &&
                        !$v.registerForm.confirmPassword.sameAs
                    "
                  >
                    Las contraseñas no coinciden.
                  </span>
                </p>
                <!-- end confirm password -->

                <div v-show="message">
                  {{ message }}
                </div>

                <b-field>
                  <b-button
                    rounded
                    :loading="registerForm.loading"
                    :disabled="$v.registerForm.$invalid"
                    class="shine is-fullwidth"
                    type="is-black"
                    native-type="submit"
                  >
                    Crear cuenta
                  </b-button>
                </b-field>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import signupMutation from '~/apollo/mutations/auth/signup.graphql'
import getUserMutation from '~/apollo/mutations/getUser.graphql'
export default {
  data() {
    return {
      registerForm: {
        user: null,
        password: null,
        confirmPassword: null,
        loading: false
      },
      message: null
    }
  },
  validations: {
    registerForm: {
      password: {
        required,
        minLength: minLength(8)
      },
      user: {
        required
      },
      confirmPassword: {
        required,
        sameAs: sameAs('password')
      }
    }
  },
  methods: {
    register() {
      this.$v.registerForm.$touch()
      if (!this.$v.registerForm.$invalid) {
        this.registerForm.loading = true
        this.$apollo
          .mutate({
            mutation: getUserMutation,
            variables: { username: this.registerForm.user }
          })
          .then(({ data }) => {
            const { status } = data.getUser
            if (status === 'ok') {
              this.$apollo
                .mutate({
                  mutation: signupMutation,
                  variables: {
                    username: this.registerForm.user,
                    password: this.registerForm.password
                  }
                })
                .then(({ data }) => {
                  const { status } = data.signup
                  if (status === 'ok') {
                    this.registerForm.loading = false
                    this.$buefy.dialog.alert({
                      message:
                        'Se ha creado el usurio ' +
                        this.registerForm.user +
                        ', ya se puede logear con su contraseña'
                    })
                  }
                })
            } else if (status === 'error') {
              this.$buefy.dialog.alert({
                message:
                  'Ya existe una cuenta registrada a nombre de ese usuario. Intente con otro'
              })
              this.registerForm.loading = false
            }
          })
      }
    }
  }
}
</script>

<style scoped></style>
