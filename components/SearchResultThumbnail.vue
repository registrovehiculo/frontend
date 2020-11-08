<template>
  <div>
    <p style="font-size: 9pt">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    title() {
      if (this.result.artemisa) {
        return `${this.result.artemisa.datospersona}`
      }
      return ''
    },
  },
}
</script>

<style lang="stylus" scoped></style>
