<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="has-text-centered margin-bottom-10">
          <nuxt-link :to="'/'">
            <img src="/static/database.png" width="200pt" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Vuex
import { mapMutations } from 'vuex'
// Apollo
export default {
  layout: 'fullpage',

  methods: {
    ...mapMutations({
      setAuth: 'auth/setAuth'
    })
  }
}
</script>

<style scoped></style>
