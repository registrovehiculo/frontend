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
        <div
          v-if="selectedProvince === 'habana' && selectedAction === 4"
          class="margin-top-20"
        >
          <v-select
            v-model="selectedActionHabana"
            :options="cities"
            :reduce="name => name.id"
            label="name"
            placeholder="Municipios..."
            @change="selectedActionHabana = null"
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
    <div v-show="selectedAction" class="column has-text-centered">
      <div>
        <b-button
          v-if="selectedProvince && selectedAction"
          class="is-primary"
          rounded
          :disabled="
            selectedProvince === 'habana' &&
              selectedAction === 4 &&
              selectedActionHabana === null
          "
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
        v-if="selectedAction && !getActive() && selectedProvince"
        class="has-text-centered font-size-2 flex-wrap-center margin-bottom-10 margin-top-20"
      >
        {{ actions[selectedAction - 1].name + ' de ' + selectedProvince }}</b
      >
    </div>
    <div
      v-if="
        selectedAction &&
          !getActive() &&
          selectedProvince &&
          selectedAction !== 4
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
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'
import infogestiArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/fourthOption.graphql'
// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import contributorsWithDifferentInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/secondOption.graphql'
import contributorsWithEqualsInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/thirdOption.graphql'
import infogestiCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/fourthOption.graphql'
// Ciego de Avila
import contributorsMissingInOnatCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/firstOption.graphql'
import contributorsWithDifferentInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOption.graphql'
import contributorsWithEqualsInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/thirdOption.graphql'
import infogestiCiegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/fourthOption.graphql'
// Cienfuegos
import contributorsMissingInOnatCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/firstOption.graphql'
import contributorsWithDifferentInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOption.graphql'
import contributorsWithEqualsInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/thirdOption.graphql'
import infogestiCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/fourthOption.graphql'
// Granma
import contributorsMissingInOnatGranmaQuery from '~/apollo/queries/provinces/granma/actions/firstOption.graphql'
import contributorsWithDifferentInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/secondOption.graphql'
import contributorsWithEqualsInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/thirdOption.graphql'
import infogestiGranmaQuery from '~/apollo/queries/provinces/granma/actions/fourthOption.graphql'
// Guantanamo
import contributorsMissingInOnatGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/firstOption.graphql'
import contributorsWithDifferentInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOption.graphql'
import contributorsWithEqualsInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/thirdOption.graphql'
import infogestiGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/fourthOption.graphql'
// Holguin
import contributorsMissingInOnatHolguinQuery from '~/apollo/queries/provinces/holguin/actions/firstOption.graphql'
import contributorsWithDifferentInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/secondOption.graphql'
import contributorsWithEqualsInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/thirdOption.graphql'
import infogestiHolguinQuery from '~/apollo/queries/provinces/holguin/actions/fourthOption.graphql'
// Isla de la juventud
import contributorsMissingInOnatIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/firstOption.graphql'
import contributorsWithDifferentInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOption.graphql'
import contributorsWithEqualsInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/thirdOption.graphql'
import infogestiIslaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/fourthOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/secondOption.graphql'
import contributorsWithEqualsInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/thirdOption.graphql'
// import infogestiHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/fourthOption.graphql'
import infogestiHabanaArroyoNaranjoQuery from '~/apollo/queries/provinces/laHabana/actions/cities/arroyoNaranjo.graphql'
import infogestiHabanaBoyerosQuery from '~/apollo/queries/provinces/laHabana/actions/cities/boyeros.graphql'
import infogestiHabanaCentroHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/centroHabana.graphql'
import infogestiHabanaCerroQuery from '~/apollo/queries/provinces/laHabana/actions/cities/cerro.graphql'
import infogestiHabanaCotorroQuery from '~/apollo/queries/provinces/laHabana/actions/cities/cotorro.graphql'
import infogestiHabanaDiezDeOctubreQuery from '~/apollo/queries/provinces/laHabana/actions/cities/diezDeOctubre.graphql'
import infogestiHabanaGuanabacoaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/guanabacoa.graphql'
import infogestiHabanaHabanaDelEsteQuery from '~/apollo/queries/provinces/laHabana/actions/cities/habanaDelEste.graphql'
import infogestiHabanaHabanaViejaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/habanaVieja.graphql'
import infogestiHabanaLaLisaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/laLisa.graphql'
import infogestiHabanaMarianaoQuery from '~/apollo/queries/provinces/laHabana/actions/cities/marianao.graphql'
import infogestiHabanaPlayaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/playa.graphql'
import infogestiHabanaPlazaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/plaza.graphql'
import infogestiHabanaReglaQuery from '~/apollo/queries/provinces/laHabana/actions/cities/regla.graphql'
import infogestiHabanaSanMiguelQuery from '~/apollo/queries/provinces/laHabana/actions/cities/sanMiguel.graphql'
// Las Tunas
import contributorsMissingInOnatLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/firstOption.graphql'
import contributorsWithDifferentInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOption.graphql'
import contributorsWithEqualsInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/thirdOption.graphql'
import infogestiTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/fourthOption.graphql'
// Matanzas
import contributorsMissingInOnatMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/firstOption.graphql'
import contributorsWithDifferentInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/secondOption.graphql'
import contributorsWithEqualsInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/thirdOption.graphql'
import infogestiMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/fourthOption.graphql'
// Mayabeque
import contributorsMissingInOnatMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/firstOption.graphql'
import contributorsWithDifferentInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOption.graphql'
import contributorsWithEqualsInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/thirdOption.graphql'
import infogestiMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/fourthOption.graphql'
// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import contributorsWithDifferentInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOption.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
import infogestiPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/fourthOption.graphql'
// Santiago de Cuba
import contributorsMissingInOnatSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/firstOption.graphql'
import contributorsWithDifferentInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOption.graphql'
import contributorsWithEqualsInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/thirdOption.graphql'
import infogestiSantiagoQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/fourthOption.graphql'
// Santic Espiritud
import contributorsMissingInOnatSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/firstOption.graphql'
import contributorsWithDifferentInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOption.graphql'
import contributorsWithEqualsInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/thirdOption.graphql'
import infogestiEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/fourthOption.graphql'
// Villa Clara
import contributorsMissingInOnatVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/firstOption.graphql'
import contributorsWithDifferentInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/secondOption.graphql'
import contributorsWithEqualsInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/thirdOption.graphql'
import infogestiVillaQuery from '~/apollo/queries/provinces/villaClara/actions/fourthOption.graphql'
// Components
import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import provinces from '~/static/provinces.json'
import cities from '~/static/cities.json'
import tableColumns from '~/static/tableColumns.json'
import tableColumnsInfo from '~/static/tableColumnsInfo.json'
export default {
  components: { ColumnOptions, StatesTable },
  asyncData({ req }) {
    return { provinces, tableColumns, tableColumnsInfo, cities }
  },
  data() {
    return {
      selectedProvince: null,
      selectedAction: null,
      selectedActionHabana: null,
      loading: true,
      data: [],
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
        if (this.selectedAction === 3) {
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
          if (this.selectedActionHabana === '1') {
            this.$apollo
              .query({
                query: infogestiHabanaArroyoNaranjoQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaArroyoNaranjo
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '2') {
            this.$apollo
              .query({
                query: infogestiHabanaBoyerosQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaBoyeros
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '3') {
            this.$apollo
              .query({
                query: infogestiHabanaCentroHabanaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaCentroHabana
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '4') {
            this.$apollo
              .query({
                query: infogestiHabanaCerroQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaCerroQuery
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '5') {
            this.$apollo
              .query({
                query: infogestiHabanaCotorroQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaCotorro
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '6') {
            this.$apollo
              .query({
                query: infogestiHabanaDiezDeOctubreQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaDiezDeOctubre
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '7') {
            this.$apollo
              .query({
                query: infogestiHabanaGuanabacoaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaGuanabacoa
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '8') {
            this.$apollo
              .query({
                query: infogestiHabanaHabanaDelEsteQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaHabanaDelEste
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '9') {
            this.$apollo
              .query({
                query: infogestiHabanaHabanaViejaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaHabanaVieja
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '10') {
            this.$apollo
              .query({
                query: infogestiHabanaLaLisaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaLaLisa
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '11') {
            this.$apollo
              .query({
                query: infogestiHabanaMarianaoQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaMarianao
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '12') {
            this.$apollo
              .query({
                query: infogestiHabanaPlayaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaPlaya
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '13') {
            this.$apollo
              .query({
                query: infogestiHabanaPlazaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaPlaza
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '14') {
            this.$apollo
              .query({
                query: infogestiHabanaReglaQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaRegla
                this.loading = false
              })
          }
          if (this.selectedActionHabana === '15') {
            this.$apollo
              .query({
                query: infogestiHabanaSanMiguelQuery
              })
              .then(({ data }) => {
                this.data = data.infogestiHabanaSanMiguel
                this.loading = false
              })
          }
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
