<template>
  <div>
    <HomePageTransporte v-if="$auth.loggedIn && !getSystem" />
    <HomePageEmbarcacion v-if="$auth.loggedIn && getSystem" />
    <LoginForm v-if="!$auth.loggedIn" />
  </div>
</template>

<script>
// Components
import HomePageTransporte from '~/components/HomePageTransporte'
import HomePageEmbarcacion from '~/components/HomePageEmbarcacion'
import LoginForm from '~/components/LoginForm'
export default {
  components: { HomePageTransporte, LoginForm, HomePageEmbarcacion },
  auth: false,
  computed: {
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  },
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    } else {
      // this.$router.replace('/')
    }
  }
}
</script>
<style lang="stylus" scoped></style>
