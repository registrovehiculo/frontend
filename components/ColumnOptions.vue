<template>
  <div class="columns is-centered">
    <div class="column is-10-desktop is-12-mobile is-12-tablet">
      <b-field grouped group-multiline class="margin-top-30 has-text-centered">
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="control has-text-left-desktop"
          style="width: 130pt"
        >
          <b-checkbox v-model="column.visible">
            {{ column.label }}
          </b-checkbox>
        </div>
      </b-field>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: null
    }
  }
}
</script>
