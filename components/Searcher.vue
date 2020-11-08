<template>
  <div>
    <b-autocomplete
      ref="input"
      v-model="input"
      :data="suggestions"
      :loading="loading"
      :class="focus ? 'focused' : ''"
      placeholder="Buscar contribuyente en Registro Vehiculo"
      field="description"
      size="is-small"
      expanded
      rounded
      max-height="375px"
      scrollable
      style="width: 100%; margin-bottom: 6pt"
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
import artemisaQuery from '~/apollo/queries/artemisa.graphql'
// Components
import SearchResultThumbnail from '~/components/SearchResultThumbnail'
export default {
  components: { SearchResultThumbnail },
  data() {
    return {
      input: null,
      loading: false,
      suggestions: [],
      searchResult: [],
    }
  },
  methods: {
    focus() {
      this.focused = true
      this.$refs.input.focus()
    },
    blur() {
      this.focused = false
    },
    search() {
      if (!this.loading && this.input !== undefined) {
        this.loading = true
        this.suggestions = []
        this.$apollo
          .mutate({
            mutation: searchMutation,
            variables: { criteria: this.input },
          })
          .then(({ data }) => {
            const { status, artemisa } = data.search
            if (status === 'ok') {
              artemisa.forEach((i) => {
                this.suggestions.push({ artemisa: i })
              })
              this.loading = false
            }
          })
      }
    },
    select(option) {
      if (option.artemisa) {
        this.$apollo
          .query({
            query: artemisaQuery,
            variables: { datospersona: `${option.artemisa.datospersona}` },
          })
          .then(({ data }) => {
            this.searchResult = data.artemisa
            this.$store.commit('artemisa/set', this.searchResult)
          })
      }
    },
  },
}
</script>

<style scoped></style>
