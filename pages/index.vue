<template>
  <div>
    <client-only>
      <HomePageTransporte v-show="$auth.loggedIn" />
      <Homepage v-show="$auth.loggedIn" />
    </client-only>
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
