<template>
  <div>
    <client-only>
      <HomePageTransporte v-show="$auth.loggedIn" />
      <Homepage v-show="!$auth.loggedIn" />
    </client-only>
  </div>
</template>

<script>
// Components
import { mapGetters, mapMutations } from 'vuex'
import HomePageTransporte from '~/components/HomePageTransporte'
import Homepage from '~/components/Homepage'
export default {
  components: { Homepage, HomePageTransporte },
  auth: false,
  beforeMount() {
    if (this.$auth.loggedIn) {
      if (!this.getUser().username) {
        this.logout()
      }
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
<style lang="stylus" scoped></style>
