<template>
  <div class="container">
    <div class="sidebar-page">
      <section>
        <b-sidebar
          v-model="open"
          :fullheight="true"
          :fullwidth="false"
          :overlay="false"
          :right="true"
          :expand-on-hover="true"
          type="is-light"
        >
          <div class="has-text-centered margin-top-30">
            <img
              src="~assets/car.png"
              height="150"
              width="150"
              alt="Registro Vehiculo"
            />
            <b-menu class="margin-top-10">
              <vue-excel-xlsx
                :data="data"
                :columns="tableColumns"
                :filename="selectedProvince"
                :sheetname="selectedProvince"
                class="documentStyle"
              >
                <b>Documento excel</b>
                <font-awesome-icon
                  :icon="['fas', 'file-excel']"
                  style="height: 30px; width: 30px; color: green"
                />
              </vue-excel-xlsx>
            </b-menu>
          </div>
        </b-sidebar>
      </section>
    </div>
    <!--ColumnOptions :columns="tableColumns" /-->
    <hr />
    <div class="columns is-centered">
      <div class="column is-7-desktop is-12-mobile has-text-centered">
        <v-select
          v-model="selectedProvince"
          :options="provinces"
          :reduce="name => name.value"
          label="name"
          placeholder="Seleccione la provincia..."
          class="pointerable"
        />
        <div v-if="selectedProvince" class="margin-top-20">
          <v-select
            v-model="selectedAction"
            :options="actions"
            :reduce="name => name.id"
            label="name"
            placeholder="Acciones..."
            @input="clean()"
            @change="selectedAction = null"
          />
        </div>
      </div>
    </div>
    <div class="margin-top-10"></div>
    <div v-show="selectedAction" class="column has-text-centered">
      <div>
        <b-button
          v-if="selectedProvince && selectedAction"
          class="is-primary"
          rounded
          @click="select()"
          >Buscar</b-button
        >
        <b-button
          v-if="!loading && data"
          class="is-primary"
          rounded
          @click="open = true"
          >Exportar</b-button
        >
      </div>
      <b
        v-if="selectedAction && !getActive() && selectedProvince && selected"
        class="has-text-centered font-size-2 flex-wrap-center margin-bottom-10 margin-top-20"
      >
        {{ actions[selectedAction - 1].name + ' de ' + selectedProvince }}</b
      >
    </div>
    <div v-if="getActive()">
      <StatesTable
        v-if="vehiculo"
        :data="vehiculo"
        :columns="tableColumns"
        :loading="false"
      />
    </div>
    <div
      v-if="
        selectedAction &&
          !getActive() &&
          selectedProvince &&
          selectedAction !== 4 &&
          selectedAction !== 2
      "
    >
      <StatesTable
        v-if="data"
        :data="data"
        :columns="tableColumns"
        :loading="loading"
      />
    </div>

    <div
      v-if="
        selectedAction &&
          !getActive() &&
          selectedProvince &&
          selectedAction !== 4 &&
          selectedAction === 2
      "
      class="row is-flex"
    >
      <StatesTable
        v-if="data"
        :data="data"
        :columns="different"
        :loading="loading"
        :checked-rows.sync="True"
        checkable
        class="column"
      />
      <StatesTable
        v-if="data_1"
        :data="data_1"
        :columns="differentInfo"
        :loading="loading"
        class="column"
      />
    </div>
    <div
      v-if="
        selectedAction &&
          !getActive() &&
          selectedProvince &&
          selectedAction === 4
      "
    >
      <StatesTable
        v-if="data"
        :data="data"
        :columns="tableColumnsInfo"
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
import contributorsWithDifferentInformationArtemisaInfogestiQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'
import infogestiArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/fourthOption.graphql'
// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import contributorsWithDifferentInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/secondOption.graphql'
import contributorsWithDifferentInformationCamagueyInfogestiQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/thirdOption.graphql'
import infogestiCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/fourthOption.graphql'
// Ciego de Avila
import contributorsMissingInOnatCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/firstOption.graphql'
import contributorsWithDifferentInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOption.graphql'
import contributorsWithDifferentInformationCiegoInfogestiQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/thirdOption.graphql'
import infogestiCiegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/fourthOption.graphql'
// Cienfuegos
import contributorsMissingInOnatCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/firstOption.graphql'
import contributorsWithDifferentInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOption.graphql'
import contributorsWithDifferentInformationCienfuegosInfogestiQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/thirdOption.graphql'
import infogestiCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/fourthOption.graphql'
// Granma
import contributorsMissingInOnatGranmaQuery from '~/apollo/queries/provinces/granma/actions/firstOption.graphql'
import contributorsWithDifferentInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/secondOption.graphql'
import contributorsWithDifferentInformationGranmaInfogestiQuery from '~/apollo/queries/provinces/granma/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/thirdOption.graphql'
import infogestiGranmaQuery from '~/apollo/queries/provinces/granma/actions/fourthOption.graphql'
// Guantanamo
import contributorsMissingInOnatGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/firstOption.graphql'
import contributorsWithDifferentInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOption.graphql'
import contributorsWithDifferentInformationGuantanamoInfogestiQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/thirdOption.graphql'
import infogestiGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/fourthOption.graphql'
// Holguin
import contributorsMissingInOnatHolguinQuery from '~/apollo/queries/provinces/holguin/actions/firstOption.graphql'
import contributorsWithDifferentInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/secondOption.graphql'
import contributorsWithDifferentInformationHolguinInfogestiQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/thirdOption.graphql'
import infogestiHolguinQuery from '~/apollo/queries/provinces/holguin/actions/fourthOption.graphql'
// Isla de la juventud
import contributorsMissingInOnatIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/firstOption.graphql'
import contributorsWithDifferentInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOption.graphql'
import contributorsWithDifferentInformationIslaDeLaJuventudInfogestiQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/thirdOption.graphql'
import infogestiIslaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/fourthOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/secondOption.graphql'
import contributorsWithDifferentInformationLaHabanaInfogestiQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/thirdOption.graphql'
import infogestiHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/fourthOption.graphql'
// Las Tunas
import contributorsMissingInOnatLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/firstOption.graphql'
import contributorsWithDifferentInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOption.graphql'
import contributorsWithDifferentInformationLasTunasInfogestiQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/thirdOption.graphql'
import infogestiTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/fourthOption.graphql'
// Matanzas
import contributorsMissingInOnatMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/firstOption.graphql'
import contributorsWithDifferentInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/secondOption.graphql'
import contributorsWithDifferentInformationMatanzasInfogestiQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/thirdOption.graphql'
import infogestiMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/fourthOption.graphql'
// Mayabeque
import contributorsMissingInOnatMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/firstOption.graphql'
import contributorsWithDifferentInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOption.graphql'
import contributorsWithDifferentInformationMayabequeInfogestiQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/thirdOption.graphql'
import infogestiMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/fourthOption.graphql'
// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOption.graphql'
import contributorsWithDifferentInformationPinarInfogestiQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
import infogestiPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/fourthOption.graphql'
// Santiago de Cuba
import contributorsMissingInOnatSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/firstOption.graphql'
import contributorsWithDifferentInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOption.graphql'
import contributorsWithDifferentInformationSantiagoDeCubaInfogestiQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/thirdOption.graphql'
import infogestiSantiagoQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/fourthOption.graphql'
// Santic Espiritud
import contributorsMissingInOnatSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/firstOption.graphql'
import contributorsWithDifferentInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOption.graphql'
import contributorsWithDifferentInformationSanticEspiritudInfogestiQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/thirdOption.graphql'
import infogestiEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/fourthOption.graphql'
// Villa Clara
import contributorsMissingInOnatVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/firstOption.graphql'
import contributorsWithDifferentInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/secondOption.graphql'
import contributorsWithDifferentInformationVillaClaraInfogestiQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionInfogesti.graphql'
import contributorsWithEqualsInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/thirdOption.graphql'
import infogestiVillaQuery from '~/apollo/queries/provinces/villaClara/actions/fourthOption.graphql'
// Components
// import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import provinces from '~/static/provinces.json'
import different from '~/static/different.json'
import differentInfo from '~/static/differentInfo.json'
import tableColumns from '~/static/tableColumns.json'
import tableColumnsInfo from '~/static/tableColumnsInfo.json'
export default {
  components: { StatesTable },
  asyncData({ req }) {
    return {
      provinces,
      tableColumns,
      tableColumnsInfo,
      different,
      differentInfo
    }
  },
  data() {
    return {
      selectedProvince: null,
      selectedAction: null,
      loading: true,
      data: null,
      data_1: null,
      actions: [
        {
          id: 1,
          name:
            'Contribuyentes que estan en Registro Vehiculo que no estan en InfoGesti'
        },
        {
          id: 2,
          name:
            'Contibuyentes que estan en ambos registros con informaciones diferentes'
        },
        {
          id: 3,
          name: 'Contibuyentes totalmente coincidentes'
        },
        {
          id: 4,
          name: 'Contibuyentes que estan en INFOgesti que no estan en RV'
        }
      ],
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      selected: false
    }
  },
  head() {
    return {
      title: `Registro Vehculo | Home`
    }
  },
  computed: {
    vehiculo() {
      return this.$store.getters['vehiculo/get']
    }
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
    clean() {
      this.data = null
    },
    select() {
      // Artemisa
      this.selected = true
      this.loading = true
      this.data = []
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
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationArtemisaInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationArtemisaInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({ query: infogestiArtemisaQuery })
            .then(({ data }) => {
              this.data = data.infogestiArtemisa
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
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCamagueyInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationCamagueyInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({ query: infogestiCamagueyQuery })
            .then(({ data }) => {
              this.data = data.infogestiCamaguey
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
              this.data = data.contributorsMissingInOnatCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCiegoDeAvilaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationCiego
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCiegoInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationCiegoInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCiegoDeAvilaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCiegoQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiCiego
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCienfuegosInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationCienfuegosInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCienfuegosQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiCienfuegos
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGranmaInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationGranmaInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGranmaQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiGranma
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGuantanamoInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationGuantanamoInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGuantanamoQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiGuantanamo
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationHolguinInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationHolguinInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHolguinQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiHolguin
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationIslaDeLaJuventudInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationIslaDeLaJuventudInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiIslaQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiIslaQuery
              this.loading = false
            })
        }
      }

      // La habana
      else if (this.selectedProvince === 'habana') {
        console.log(1)
        if (this.selectedAction === 1) {
          this.$apollo
            .query({ query: contributorsMissingInOnatLaHabanaQuery })
            .then(({ data }) => {
              this.data = data.contributorsMissingInOnatLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabanaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithDifferentInformationLaHabana
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabanaInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationLaHabanaInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabanaQuery
            })
            .then(({ data }) => {
              this.data = data.contributorsWithEqualsInformationLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHabanaQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiHabana
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLasTunasInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationLasTunasInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiTunasQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiTunas
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMatanzasInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationMatanzasInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMatanzasQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiMatanzas
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMayabequeInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationMayabequeInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMayabequeQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiMayabeque
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationPinarInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationPinarInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({ query: infogestiPinarQuery })
            .then(({ data }) => {
              this.data = data.infogestiPinar
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSantiagoDeCubaInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationSantiagoDeCubaInfogesti
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
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: infogestiSantiagoQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiSantiago
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSanticEspiritudInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationSanticEspiritudInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiEspiritudQuery
            })
            .then(({ data }) => {
              this.data = data.infogestiEspiritud
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
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationVillaClaraInfogestiQuery
            })
            .then(({ data }) => {
              this.data_1 =
                data.contributorsWithDifferentInformationVillaClaraInfogesti
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
        if (this.selectedAction === 4) {
          this.$apollo
            .query({ query: infogestiVillaQuery })
            .then(({ data }) => {
              this.data = data.infogestiVilla
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
.documentStyle
  background-color white
  border none
  height 4rem
  padding 1rem
.documentStyle:hover
  background-color rgba(0,0,0,0.04)
  cursor pointer
  border-radius 12px
</style>
