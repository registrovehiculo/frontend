<template>
  <div>
    <div v-if="error.statusCode === 404" class="has-text-centered">
      <h2 class="subtitle">No encontramos lo que buscabas</h2>
    </div>
    <div v-if="error.statusCode === 500" class="has-text-centered">
      <h2 class="subtitle">Tenemos un problema</h2>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'empty',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
}
</script>

<style scoped></style>
