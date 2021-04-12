<template>
  <div>
    <HomePage v-if="$auth.loggedIn" />
    <WelcomePage v-else />
  </div>
</template>

<script>
// Components
import HomePage from '~/components/HomePage'
import WelcomePage from '~/components/WelcomePage'
export default {
  components: { HomePage, WelcomePage }
}
</script>
<style lang="stylus" scoped></style>
