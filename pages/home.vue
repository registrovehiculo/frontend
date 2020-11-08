<template>
  <div class="container">
    <ColumnOptions :columns="tableColumns" />
    <hr />
    <div class="columns is-centered">
      <div class="column is-10 has-text-centered">
        <b-select v-model="selectedProvince" placeholder="Provincias">
          <option
            v-for="option in provinces"
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

// Artemisa
import contributorsMissingInOnatArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/firstOption.graphql'
import contributorsWithDifferentInformatioArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/secondOption.graphql'
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'

// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import contributorsWithDifferentInformatioCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/secondOption.graphql'
import contributorsWithEqualsInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/thirdOption.graphql'

// Ciego de Avila
import contributorsMissingInOnatCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/firstOption.graphql'
import contributorsWithDifferentInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOption.graphql'
import contributorsWithEqualsInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/thirdOption.graphql'

// Cienfuegos
import contributorsMissingInOnatCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/firstOption.graphql'
import contributorsWithDifferentInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOption.graphql'
import contributorsWithEqualsInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/thirdOption.graphql'

// Granma
import contributorsMissingInOnatGranmaQuery from '~/apollo/queries/provinces/granma/actions/firstOption.graphql'
import contributorsWithDifferentInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/secondOption.graphql'
import contributorsWithEqualsInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/thirdOption.graphql'

// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOption.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
// Components
import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import provinces from '~/static/provinces.json'
import tableColumns from '~/static/tableColumns.json'
export default {
  components: { ColumnOptions, StatesTable },
  asyncData({ req }) {
    return { provinces, tableColumns }
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
    select() {
      // Pinar del Rio
      if (this.selectedProvince === 'pinarDelRio') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({ query: contributorsWithDifferentInformationPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({ query: contributorsWithEqualsInformationPinarQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationPinar
              this.loading = false
            })
        }
      }
      // Artemisa
      else if (this.selectedProvince === 'artemisa') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatArtemisaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({ query: contributorsWithDifferentInformatioArtemisaQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformatioArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({ query: contributorsWithEqualsInformationArtemisaQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationArtemisa
              this.loading = false
            })
        }
      }
      // Camaguey
      else if (this.selectedProvince === 'camaguey') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatCamagueyQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({ query: contributorsWithDifferentInformatioCamagueyQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformatioCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({ query: contributorsWithEqualsInformationCamagueyQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationCamaguey
              this.loading = false
            })
        }
      }
      // Ciego De Avila
      else if (this.selectedProvince === 'ciegoDeAvila') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatCiegoDeAvilaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatCiegoDeAvila
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCiegoDeAvilaQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCiegoDeAvila
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCiegoDeAvilaQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationCiegoDeAvila
              this.loading = false
            })
        }
      }
      // Cienfuegos
      else if (this.selectedProvince === 'cienfuegos') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatCienfuegosQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCienfuegosQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCienfuegosQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationCienfuegos
              this.loading = false
            })
        }
      }
      // Granma
      else if (this.selectedProvince === 'granma') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatGranmaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGranmaQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGranmaQuery,
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationGranma
              this.loading = false
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
