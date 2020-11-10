<template>
  <div class="container">
    <ColumnOptions :columns="tableColumns" />
    <hr />
    <div class="columns is-centered">
      <div class="column is-7-desktop is-12-mobile has-text-centered">
        <v-select
          v-model="selectedProvince"
          :options="provinces"
          :reduce="name => name.value"
          label="name"
          placeholder="Seleccione la provincia..."
        />
        <div v-if="selectedProvince" class="margin-top-20">
          <v-select
            v-model="selectedAction"
            :options="actions"
            :reduce="name => name.id"
            @input="select()"
            label="name"
            placeholder="Acciones..."
          />
        </div>
      </div>
    </div>
    <div class="margin-top-10"></div>
    <div v-if="getActive()">
      <StatesTable
        v-if="vehiculo"
        :data="vehiculo"
        :columns="tableColumns"
        :loading="false"
      />
    </div>

    <b
      v-if="selectedAction"
      class="has-text-centered font-size-2 flex-wrap-center margin-bottom-10 margin-top-20"
    >
      {{ actions[selectedAction - 1].name }}</b
    >
    <div v-if="selectedAction && !getActive()">
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
import 'vue-select/dist/vue-select.css'
// Apollo
// Artemisa
import { mapGetters, mapMutations } from 'vuex'
import contributorsMissingInOnatArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/firstOption.graphql'
import contributorsWithDifferentInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/secondOption.graphql'
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'
// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import contributorsWithDifferentInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/secondOption.graphql'
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
// Guantanamo
import contributorsMissingInOnatGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/firstOption.graphql'
import contributorsWithDifferentInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOption.graphql'
import contributorsWithEqualsInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/thirdOption.graphql'
// Holguin
import contributorsMissingInOnatHolguinQuery from '~/apollo/queries/provinces/holguin/actions/firstOption.graphql'
import contributorsWithDifferentInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/secondOption.graphql'
import contributorsWithEqualsInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/thirdOption.graphql'
// Isla de la juventud
import contributorsMissingInOnatIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/firstOption.graphql'
import contributorsWithDifferentInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOption.graphql'
import contributorsWithEqualsInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/thirdOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabana1Query from '~/apollo/queries/provinces/laHabana1/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabana1Query from '~/apollo/queries/provinces/laHabana1/actions/secondOption.graphql'
import contributorsWithEqualsInformationLaHabana1Query from '~/apollo/queries/provinces/laHabana1/actions/thirdOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabana2Query from '~/apollo/queries/provinces/laHabana2/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabana2Query from '~/apollo/queries/provinces/laHabana2/actions/secondOption.graphql'
import contributorsWithEqualsInformationLaHabana2Query from '~/apollo/queries/provinces/laHabana2/actions/thirdOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabana3Query from '~/apollo/queries/provinces/laHabana3/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabana3Query from '~/apollo/queries/provinces/laHabana3/actions/secondOption.graphql'
import contributorsWithEqualsInformationLaHabana3Query from '~/apollo/queries/provinces/laHabana3/actions/thirdOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabana4Query from '~/apollo/queries/provinces/laHabana4/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabana4Query from '~/apollo/queries/provinces/laHabana4/actions/secondOption.graphql'
import contributorsWithEqualsInformationLaHabana4Query from '~/apollo/queries/provinces/laHabana4/actions/thirdOption.graphql'
// Las Tunas
import contributorsMissingInOnatLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/firstOption.graphql'
import contributorsWithDifferentInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOption.graphql'
import contributorsWithEqualsInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/thirdOption.graphql'
// Matanzas
import contributorsMissingInOnatMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/firstOption.graphql'
import contributorsWithDifferentInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/secondOption.graphql'
import contributorsWithEqualsInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/thirdOption.graphql'
// Mayabeque
import contributorsMissingInOnatMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/firstOption.graphql'
import contributorsWithDifferentInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOption.graphql'
import contributorsWithEqualsInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/thirdOption.graphql'
// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOption.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
// Santiago de Cuba
import contributorsMissingInOnatSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/firstOption.graphql'
import contributorsWithDifferentInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOption.graphql'
import contributorsWithEqualsInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/thirdOption.graphql'
// Santic Espiritud
import contributorsMissingInOnatSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/firstOption.graphql'
import contributorsWithDifferentInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOption.graphql'
import contributorsWithEqualsInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/thirdOption.graphql'
// Villa Clara
import contributorsMissingInOnatVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/firstOption.graphql'
import contributorsWithDifferentInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/secondOption.graphql'
import contributorsWithEqualsInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/thirdOption.graphql'
// Components
import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import provinces from '~/static/provinces.json'
import tableColumns from '~/static/tableColumns.json'
export default {
  components: { ColumnOptions, StatesTable },
  data() {
    return {
      selectedProvince: null,
      selectedAction: null,
      loading: true,
      data: [],
      auth: true,
      actions: [
        {
          id: 1,
          name:
            'Contribuyentes que estan en Registro Vehiculo que no estan en InfoGesti'
        },
        // {
        //   id: 2,
        //   name: 'Contibuyentes que estan en INFOgesti que no estan en RV',
        // },
        {
          id: 2,
          name:
            'Contibuyentes que estan en ambos registros con informaciones diferente'
        },
        {
          id: 3,
          name: 'Contibuyentes totalmente coincidentes'
        }
      ]
    }
  },
  computed: {
    vehiculo() {
      return this.$store.getters['vehiculo/get']
    }
  },
  asyncData({ req }) {
    return { provinces, tableColumns }
  },
  head() {
    return {
      title: `Registro Vehculo | Home`
    }
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
    select() {
      // Artemisa
      this.loading = true
      this.$store.commit('search/setActive', false)
      if (this.selectedProvince === 'artemisa') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatArtemisaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$store.commit('search/setActive', false)
          this.$apollo
            .query({ query: contributorsWithDifferentInformationArtemisaQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationArtemisa
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
            .query({ query: contributorsWithDifferentInformationCamagueyQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCamaguey
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
              query: contributorsWithDifferentInformationCiegoDeAvilaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCiegoDeAvila
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCiegoDeAvilaQuery
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
              query: contributorsWithDifferentInformationCienfuegosQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCienfuegosQuery
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
              query: contributorsWithDifferentInformationGranmaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGranmaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationGranma
              this.loading = false
            })
        }
      }

      // Guantanamo
      else if (this.selectedProvince === 'guantanamo') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatGuantanamoQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGuantanamoQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGuantanamoQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationGuantanamo
              this.loading = false
            })
        }
      }

      // Holguin
      else if (this.selectedProvince === 'holguin') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatHolguinQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationHolguinQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationHolguinQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationHolguin
              this.loading = false
            })
        }
      }
      // Isla de la juventud
      else if (this.selectedProvince === 'islaDeLaJuventud') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatIslaDeLaJuventudQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatIslaDeLaJuventud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationIslaDeLaJuventudQuery
            })
            .then(({ data }) => {
              this.data =
                data.contributorsWithDifferentInformationIslaDeLaJuventud
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationIslaDeLaJuventudQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationIslaDeLaJuventud
              this.loading = false
            })
        }
      }

      // La habana1
      else if (this.selectedProvince === 'habana1') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLaHabana1Query })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLaHabana1
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabana1Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLaHabana1
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabana1Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLaHabana1
              this.loading = false
            })
        }
      }
      // La habana2
      else if (this.selectedProvince === 'habana2') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLaHabana2Query })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLaHabana2
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabana2Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLaHabana2
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabana2Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLaHabana2
              this.loading = false
            })
        }
      }
      // La habana3
      else if (this.selectedProvince === 'habana3') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLaHabana3Query })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLaHabana3
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabana3Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLaHabana3
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabana3Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLaHabana3
              this.loading = false
            })
        }
      }

      // La habana4
      else if (this.selectedProvince === 'habana4') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLaHabana4Query })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLaHabana4
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabana4Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLaHabana4
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabana4Query
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLaHabana4
              this.loading = false
            })
        }
      }

      // Las Tunas
      else if (this.selectedProvince === 'lasTunas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLasTunasQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLasTunasQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLasTunasQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLasTunas
              this.loading = false
            })
        }
      }

      // Matanzas
      else if (this.selectedProvince === 'matanzas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatMatanzasQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMatanzasQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMatanzasQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationMatanzas
              this.loading = false
            })
        }
      }

      // Mayabeque
      else if (this.selectedProvince === 'mayabeque') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatMayabequeQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMayabequeQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMayabequeQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationMayabeque
              this.loading = false
            })
        }
      }

      // Pinar del Rio
      else if (this.selectedProvince === 'pinarDelRio') {
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

      // Santiago de Cuba
      else if (this.selectedProvince === 'santiagoDeCuba') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatSantiagoDeCubaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSantiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data =
                data.contributorsWithDifferentInformationSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSantiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationSantiagoDeCuba
              this.loading = false
            })
        }
      }

      // Santic Espiritud
      else if (this.selectedProvince === 'santciSpiritus') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatSanticEspiritudQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatSanticEspiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSanticEspiritudQuery
            })
            .then(({ data }) => {
              this.data =
                data.contributorsWithDifferentInformationSanticEspiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSanticEspiritudQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationSanticEspiritud
              this.loading = false
            })
        }
      }

      // Villa Clara
      else if (this.selectedProvince === 'villaClara') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatVillaClaraQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationVillaClaraQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({ query: contributorsWithEqualsInformationVillaClaraQuery })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationVillaClara
              this.loading = false
            })
        }
      }
    },

    ...mapGetters({
      getActive: 'search/getActive'
    }),
    ...mapMutations({
      setActive: 'search/setActive'
    })
  }
}
</script>
<style scoped lang="stylus">
.select.is-empty select
    padding-left 5em !important
</style>
