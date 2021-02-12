<template>
  <div>
    <adddres>
      <span v-if="address.city">{{ address.city.name }}</span>
      <span v-if="address.state">{{ address.state.name }}</span>
      <span v-if="address.state">{{ address.state.name }}</span>
    </adddres>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          id: null,
          city: null,
          state: null,
          country: {
            code: null,
            nameEs: null
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
