<template>
  <div>
    <p class="change-color" style="font-size: 11pt">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    title() {
      if (this.result.vehiculo) {
        return `${this.result.vehiculo.numeroidentidad}   ${this.result.vehiculo.datospersona}`
      }
      return ''
    }
  }
}
</script>
<style lang="stylus" scoped></style>
