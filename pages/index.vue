<template>
  <div>
    <client-only>
      <HomePageTransporte v-show="$auth.loggedIn && !getSystem" />
      <HomePageEmbarcacion v-show="$auth.loggedIn && getSystem" />
      <Homepage v-show="!$auth.loggedIn" />
    </client-only>
  </div>
</template>

<script>
// Components
import HomePageTransporte from '~/components/HomePageTransporte'
import HomePageEmbarcacion from '~/components/HomePageEmbarcacion'
import Homepage from '~/components/Homepage'
export default {
  components: { Homepage, HomePageTransporte, HomePageEmbarcacion },
  auth: false,
  ssr: false,
  computed: {
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  }
}
</script>
<style lang="stylus" scoped></style>
