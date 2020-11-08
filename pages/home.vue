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
        {{ selectedAction }}
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
      v-if="artemisa"
      :data="artemisa"
      :columns="tableColumns"
      :loading="false"
    />
    <div v-if="!artemisa">
      <p v-for="option in actions" :key="option.id" :value="option.id">
        {{ option.name }}
      </p>
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
        {
          id: 2,
          name: 'Contibuyentes que estan en INFOgesti que no estan en RV',
        },
        {
          id: 3,
          name:
            'Contibuyentes que estan en ambos registros con informaciones diferente',
        },
        {
          id: 4,
          name: 'Contibuyentes totalmente coincidentes',
        },
      ],
    }
  },
  computed: {
    artemisa() {
      return this.$store.getters['artemisa/get']
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
              this.$store.commit('artemisa/set', null)
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
