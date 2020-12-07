<template>
  <b-table
    ref="table"
    :data="data"
    :loading="loading"
    :paginated="true"
    :per-page="10"
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
        <template
          slot="searchable"
          v-if="column.searchable && !column.numeric"
          slot-scope="props"
        >
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Buscar..."
            icon="magnify"
            size="is-small"
          />
        </template>
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
      type: Object,
      default: null
    },
    columns: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
