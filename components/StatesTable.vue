<template>
  <b-table
    ref="table"
    :data="data"
    :loading="loading"
    :paginated="true"
    :per-page="16"
    :narrowed="true"
    hoverable
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
          v-if="column.searchable && !column.numeric"
          slot="searchable"
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
          <p :class="index === 3 && getTableNames ? 'level-left' : ''"></p>
          {{ props.row[column.field] }}
          <p
            v-if="index === 3 && getTableNames"
            class="level-right"
            style="margin-top: -20px; margin-left: 20px"
          >
            <b-button
              class="is-black changeColorR"
              size="is-small"
              rounded
              @click="update(data.indexOf(props.row))"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-left']"
                class="font-size-4 is-white"
            /></b-button>
          </p>
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
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    getTableNames() {
      return this.$store.getters['tableNames/getTableNames']
    }
  },
  methods: {
    update(i) {
      this.index = i
      this.$store.commit('arrIndex/setIndex', this.index)
      this.$emit('update-name')
    }
  }
}
</script>
<style lang="stylus" scoped>
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 300ms
</style>
