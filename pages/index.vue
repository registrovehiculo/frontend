<template>
  <div>
    <div v-if="!getSystem">
      <HomePageTransporte v-if="$auth.loggedIn" />
      <WelcomePage v-else />
    </div>
    <div v-else>
      <HomePageEmbarcacion v-if="$auth.loggedIn" />
      <WelcomePage v-else />
    </div>
  </div>
</template>

<script>
// Components
import HomePageTransporte from '~/components/HomePageTransporte'
import HomePageEmbarcacion from '~/components/HomePageEmbarcacion'
import WelcomePage from '~/components/WelcomePage'
export default {
  components: { HomePageTransporte, WelcomePage, HomePageEmbarcacion },
  auth: false,
  computed: {
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  }
}
</script>
<style lang="stylus" scoped></style>
