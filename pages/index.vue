<template>
  <div>
    <HomePageTransporte v-if="$auth.loggedIn" />
    <Homepage v-else />
  </div>
</template>

<script>
// Components
import HomePageTransporte from '~/components/HomePageTransporte'
import Homepage from '~/components/Homepage'
export default {
  components: { Homepage, HomePageTransporte },
  auth: false
}
</script>
<style lang="stylus" scoped></style>
