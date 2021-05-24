<template>
  <div class="container">
    {{ 'pagina en desarrollo' }}
    <p
      class="has-text-centered margin-top-30"
      style="font-size: 32px; font-weight: 700"
    >
      Quejas y sugerencias
    </p>
    <hr />
    <ReviewBox />
  </div>
</template>

<script>
import ReviewBox from '~/components/ReviewBox'
export default {
  components: { ReviewBox }
}
</script>
<style scoped></style>
