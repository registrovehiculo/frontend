<template>
  <b-table
    ref="table"
    :data="data"
    :loading="loading"
    :paginated="true"
    :per-page="16"
    :narrowed="true"
    :hoverable="true"
    :draggable="true"
  >
    <template v-for="(column, index) in columns">
      <b-table-column
        :key="index"
        v-bind="column"
        :label="column.label"
        :visible="column.visible"
      >
        <template #default="props">
          {{ props.row[column.field] }}
        </template>
      </b-table-column>
    </template>
  </b-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
