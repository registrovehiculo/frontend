<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'
export default {
  components: { LoginForm },
  layout: 'empty',
  auth: false,
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    } else {
      // this.$router.replace('/login')
    }
  }
}
</script>

<style scoped></style>
