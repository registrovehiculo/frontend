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
  auth: true,
  beforeCreate() {
    const url = this.$cookies.get('auth.redirect')
    if (url && this.$auth.loggedIn) {
      this.$router.replace(url)
    }
  }
}
</script>

<style scoped></style>
