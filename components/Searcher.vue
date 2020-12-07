<template>
  <div>
    <b-autocomplete
      ref="input"
      v-model="input"
      :data="suggestions"
      :loading="loading"
      placeholder="Buscar contribuyente en Registro Vehiculo..."
      field="description"
      expanded
      rounded
      max-height="375px"
      scrollable
      size="is-small"
      style="width: 100%"
      icon="magnify"
      clearable
      @input="search()"
      @select="select"
    >
      <template v-if="!loading" slot-scope="props">
        <SearchResultThumbnail :result="props.option" />
      </template>
      <template v-if="!loading" slot="empty"> No hay resultados </template>
    </b-autocomplete>
  </div>
</template>
<script>
// Apollo
import searchMutation from '~/apollo/mutations/search.graphql'
import vehiculoQuery from '~/apollo/queries/vehiculo.graphql'
// Components
import SearchResultThumbnail from '~/components/SearchResultThumbnail'
export default {
  components: { SearchResultThumbnail },
  data() {
    return {
      input: null,
      loading: false,
      suggestions: [],
      searchResult: []
    }
  },
  methods: {
    search() {
      if (!this.loading && this.input !== undefined) {
        this.loading = true
        this.suggestions = []
        this.$apollo
          .mutate({
            mutation: searchMutation,
            variables: { criteria: this.input }
          })
          .then(({ data }) => {
            const { status, vehiculo } = data.search
            if (status === 'ok') {
              vehiculo.forEach(i => {
                this.suggestions.push({ vehiculo: i })
              })
              this.loading = false
            }
          })
      }
    },
    select(option) {
      if (option.vehiculo) {
        this.$apollo
          .query({
            query: vehiculoQuery,
            variables: { datospersona: `${option.vehiculo.datospersona}` }
          })
          .then(({ data }) => {
            this.searchResult = data.vehiculo
            this.$store.commit('vehiculo/set', this.searchResult)
            this.$store.commit('search/setActive', true)
          })
      }
    }
  }
}
</script>

<style scoped></style>
