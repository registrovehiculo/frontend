<template>
  <div class="container">
    <ColumnOptions :columns="tableColumns" />
    <hr />
    <div class="columns is-centered">
      <div class="column is-10 has-text-centered">
        <!--b-select v-model="selectedState" placeholder="Provincias">
          <option
            v-for="option in states"
            :key="option.id"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </b-select-->
        <b-select
          v-model="selectedAction"
          placeholder="Acciones"
          @input="select"
        >
          <option v-for="option in actions" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="margin-top-10"></div>
    <StatesTable
      v-if="(vehiculo && !selectedAction) || (vehiculo && loading)"
      :data="vehiculo"
      :columns="tableColumns"
      :loading="false"
    />

    <b
      v-if="selectedAction"
      class="has-text-centered font-size-2 flex-wrap-center margin-bottom-10"
    >
      {{ actions[selectedAction - 1].name }}</b
    >
    <div v-if="selectedAction">
      <StatesTable
        v-if="data"
        :data="data"
        :columns="tableColumns"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
// Apollo
import contributorsMissingInOnatQuery from '~/apollo/queries/contributorsMissingInOnat.graphql'
import contributorsWithDifferentInformationQuery from '~/apollo/queries/contributorsWithDifferentInformation.graphql'
import contributorsWithEqualsInformationQuery from '~/apollo/queries/contributorsWithEqualsInformation.graphql'
// Components
import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import states from '~/static/states.json'
import tableColumns from '~/static/tableColumns.json'
export default {
  components: { ColumnOptions, StatesTable },
  asyncData({ req }) {
    return { states, tableColumns }
  },
  data() {
    return {
      selectedState: null,
      selectedAction: null,
      loading: true,
      data: [],
      actions: [
        {
          id: 1,
          name: 'Contribuyentes que estan en RV que no estan en INFOgesti',
        },
        // {
        //   id: 2,
        //   name: 'Contibuyentes que estan en INFOgesti que no estan en RV',
        // },
        {
          id: 2,
          name:
            'Contibuyentes que estan en ambos registros con informaciones diferente',
        },
        {
          id: 3,
          name: 'Contibuyentes totalmente coincidentes',
        },
      ],
    }
  },
  computed: {
    vehiculo() {
      return this.$store.getters['vehiculo/get']
    },
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
    select(option) {
      console.log('qwewq')
      switch (this.selectedAction) {
        case 1:
          this.$apollo
            .query({ query: contributorsMissingInOnatQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnat
              this.loading = false
              this.selectedAction = null
              this.$store.commit('vehiculo/set', null)
            })
          break
        case 2:
          this.$apollo
            .query({ query: contributorsWithDifferentInformationQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformation
              this.loading = false
              this.selectedAction = null
              this.$store.commit('vehiculo/set', null)
            })
          break
        case 3:
          this.$apollo
            .query({ query: contributorsWithEqualsInformationQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnat
              this.loading = false
              this.selectedAction = null
              this.$store.commit('vehiculo/set', null)
            })
          break
      }
    },
  },
}
</script>
<style scoped lang="stylus">
.select.is-empty select
  padding-left 5em !important
</style>
