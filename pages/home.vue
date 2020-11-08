<template>
  <div class="container">
    <ColumnOptions :columns="tableColumns" />
    <hr />
    <div class="columns is-centered">
      <div class="column is-10 has-text-centered">
        <b-select v-model="selectedProvince" placeholder="Provincias">
          <option
            v-for="option in province"
            :key="option.id"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </b-select>
        {{ selectedProvince }}
        <div v-show="selectedProvince" class="margin-top-20">
          <b-select
            v-model="selectedAction"
            placeholder="Acciones"
            @input="select"
          >
            <option
              v-for="option in actions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </b-select>
        </div>
      </div>
    </div>
    <div class="margin-top-10"></div>
    {{ selectedAction }}
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
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/province/pinarOption1.graphql'
import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/province/pinarOption2.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/province/pinarOption3.graphql'
// import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/province/contributorsWithDifferentInformationPinar.graphql'
// import contributorsWithDifferentInformationQuery from '~/apollo/queries/contributorsWithDifferentInformation.graphql'
// import contributorsWithEqualsInformationQuery from '~/apollo/queries/contributorsWithEqualsInformation.graphql'
// Components
import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import province from '~/static/province.json'
import tableColumns from '~/static/tableColumns.json'
export default {
  components: { ColumnOptions, StatesTable },
  asyncData({ req }) {
    return { province, tableColumns }
  },
  data() {
    return {
      selectedProvince: null,
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
      if (this.selectedProvince === 'pinarDelRio') {
        console.log(this.selectedAction + 'seleceted action')
        if (this.selectedAction === 1) {
          console.log('aaaaaaaaaaaaaaaa')
          this.$apollo
            .query({ query: contributorsMissingInOnatPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatPinar
              this.loading = false
              this.$store.commit('vehiculo/set', null)
            })
        }
        if (this.selectedAction === 2) {
          console.log('bbbbbbbbb')
          this.$apollo
            .query({ query: contributorsWithDifferentInformationPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationPinar
              this.loading = false
              this.$store.commit('vehiculo/set', null)
            })
        }
        if (this.selectedAction === 3) {
          console.log('bbbbbbbbb')
          this.$apollo
            .query({ query: contributorsWithEqualsInformationPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationPinar
              this.loading = false
              this.$store.commit('vehiculo/set', null)
            })
        }
      }
    },
  },
}
</script>
<style scoped lang="stylus">
.select.is-empty select
  padding-left 5em !important
</style>
