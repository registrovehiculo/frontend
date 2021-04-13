<template>
  <section class="hero is-fullheight">
    <div class="hero-body background">
      <div class="container">
        <div>
          <div v-show="!$auth.loggedIn" class="columns is-centered">
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
export default {
  layout: 'empty',
  auth: false,
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    }
  },
  // beforeMount() {
  //   if (this.$auth.loggedIn) {
  //     this.loadAuth()
  //     this.$router.replace('/home')
  //   }
  // },
  methods: {
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
  transition background 300ms

.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms

.background
  /*background-image: url('')*/
  background-repeat: no-repeat
  background-size: 1000px 880px
  padding-top 10px
</style>
