<template>
  <div>
    <TopBar />
    <div
      v-show="getUser().isSuperuser && $auth.loggedIn"
      class="has-text-centered font-size-4"
    >
      <font-awesome-icon :icon="['fas', 'user']" class="font-size-5 is-white" />
      <b>Cuenta de administrador</b>
    </div>
    <nuxt />
  </div>
</template>

<script>
// Components
import { mapGetters } from 'vuex'
import TopBar from '~/components/TopBar'

export default {
  components: { TopBar },
  methods: {
    ...mapGetters({
      getUser: 'getUser'
    })
  }
}
</script>
