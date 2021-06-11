<template>
  <div class="padding-right-30 padding-left-30">
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
                v-if="data_1"
                :data="data_1"
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
              <vue-excel-xlsx
                v-if="data_2"
                :data="data_2"
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
              <vue-excel-xlsx
                v-if="data_3"
                :data="data_3"
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
              <vue-excel-xlsx
                v-if="data_4"
                :data="data_4"
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
    <p
      class="has-text-centered margin-top-20"
      style="font-size: 32px; font-weight: 700; color: #d60000"
    >
      Transporte terrestre
    </p>
    <hr />
    <div class="columns is-centered">
      <div
        class="column is-6-desktop is-12-tablet has-text-centered margin-left-20"
      >
        <div
          class="column is-hidden-tablet-only is-hidden-mobile margin-left-20"
          style="margin-top:2.5rem"
        >
          <b-field class="margin-bottom-10" style="width: 72%">
            <b-select
              v-model="selectedProvince"
              placeholder="Provincias"
              expanded
            >
              <option
                v-for="province in provinces"
                :key="province.id"
                :value="province.value"
              >
                {{ province.name }}
              </option>
            </b-select>
          </b-field>
          <b-field>
            <b-select
              v-model="selectedAction"
              dropdown-position="bottom"
              placeholder="Acciones..."
              expanded
            >
              <option
                v-for="option in actions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
            <b-button
              class="is-black margin-left-20 changeColorR"
              rounded
              :loading="loading"
              :disabled="
                !selectedProvince ||
                  !selectedAction ||
                  (!radio && selectedAction === 2)
              "
              @click="select()"
              >Buscar</b-button
            >
            <b-button
              class="is-black margin-left-10 changeColorR"
              rounded
              :disabled="loading || (!data_1 && !data_2 && !data_3 && !data_4)"
              @click="open = true"
              >Exportar</b-button
            >
          </b-field>
          <div v-show="selectedAction === 2" class="margin-top-20">
            <p v-if="!radio" style="color: #d60000" class="margin-bottom-20">
              Seleccione criterio de busqueda
            </p>
            <b-radio
              v-model="radio"
              name="differentPlates"
              native-value="plates"
              @input="select()"
            >
              Chapas distintas
            </b-radio>
            <b-radio
              v-model="radio"
              name="differentNames"
              native-value="names"
              @input="select()"
            >
              Nombres distintos
            </b-radio>
          </div>
        </div>
      </div>
      <div class="is-hidden-table is-hidden-desktop bottom-bar">
        <div class="columns is-mobile">
          <div class="column is-6">
            <b-button
              class="is-black is-fullwidth is-small"
              rounded
              :disabled="!selectedProvince || !selectedAction"
              @click="select()"
              >Buscar</b-button
            >
          </div>
          <div class="column is-6-mobile">
            <b-button
              class="is-black is-fullwidth is-small"
              rounded
              :disabled="loading || (!data_1 && !data_2 && !data_3 && !data_4)"
              @click="open = true"
              >Exportar</b-button
            >
          </div>
        </div>
      </div>

      <div class="column is-hidden-desktop">
        <b-field>
          <b-select
            v-model="selectedAction"
            dropdown-position="bottom"
            placeholder="Acciones..."
            expanded
          >
            <option
              v-for="option in actions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-7 margin-top-30">
        <b-skeleton
          size="is-large"
          :active="loading"
          widt="80%"
          :count="10"
        ></b-skeleton>
      </div>
    </div>
    <div class="columns is-centered">
      <div v-if="!loading" class="flex-wrap-center column is-10">
        <div v-if="getActive()">
          <StatesTable
            v-if="vehiculo"
            :data="vehiculo"
            :columns="tableColumns"
            :loading="false"
          />
        </div>
        <div v-if="selectedAction === 1 && !getActive()">
          <StatesTable
            v-if="data_1"
            :data="data_1"
            :columns="tableColumns"
            :loading="loading"
          />
        </div>
        <div v-if="selectedAction === 3 && !getActive()">
          <StatesTable
            v-if="data_3"
            :data="data_3"
            :columns="tableColumnsInfo"
            :loading="loading"
          />
        </div>

        <div v-if="selectedAction === 2 && !getActive()">
          <StatesTable
            v-if="data_2"
            :data="data_2"
            :columns="tableColumnsInfo"
            checkable
          />
        </div>
        <div v-if="!getActive() && selectedAction === 4">
          <StatesTable
            v-if="data_4"
            :data="data_4"
            :columns="tableColumnsInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
// Apollo
// Artemisa
import { mapGetters, mapMutations } from 'vuex'
import contributorsMissingInOnatArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/firstOption.graphql'
import artemisaDifferentNameQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionName.graphql'
import artemisaDifferentPlateQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'
import infogestiArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/fourthOption.graphql'
// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import camagueyDifferentNameQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionName.graphql'
import camagueyDifferentPlateQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/thirdOption.graphql'
import infogestiCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/fourthOption.graphql'
// Ciego de Avila
import contributorsMissingInOnatCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/firstOption.graphql'
import ciegoDifferentNameQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionName.graphql'
import ciegoDifferentPlateQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/thirdOption.graphql'
import infogestiCiegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/fourthOption.graphql'
// Cienfuegos
import contributorsMissingInOnatCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/firstOption.graphql'
import cienfuegosDifferentNameQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionName.graphql'
import cienfuegosDifferentPlateQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/thirdOption.graphql'
import infogestiCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/fourthOption.graphql'
// Granma
import contributorsMissingInOnatGranmaQuery from '~/apollo/queries/provinces/granma/actions/firstOption.graphql'
import granmaDifferentNameQuery from '~/apollo/queries/provinces/granma/actions/secondOptionName.graphql'
import granmaDifferentPlateQuery from '~/apollo/queries/provinces/granma/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/thirdOption.graphql'
import infogestiGranmaQuery from '~/apollo/queries/provinces/granma/actions/fourthOption.graphql'
// Guantanamo
import contributorsMissingInOnatGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/firstOption.graphql'
import guantanamoDifferentNameQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionName.graphql'
import guantanamoDifferentPlateQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/thirdOption.graphql'
import infogestiGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/fourthOption.graphql'
// Holguin
import contributorsMissingInOnatHolguinQuery from '~/apollo/queries/provinces/holguin/actions/firstOption.graphql'
import holguinDifferentNameQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionName.graphql'
import holguinDifferentPlateQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/thirdOption.graphql'
import infogestiHolguinQuery from '~/apollo/queries/provinces/holguin/actions/fourthOption.graphql'
// Isla de la juventud
import contributorsMissingInOnatIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/firstOption.graphql'
import islaDifferentNameQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionName.graphql'
import islaDifferentPlateQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/thirdOption.graphql'
import infogestiIslaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/fourthOption.graphql'
// La Habana
import contributorsMissingInOnatLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/firstOption.graphql'
import contributorsWithDifferentInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionName.graphql'
import contributorsWithDifferentInformationLaHabanaInfogestiQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/thirdOption.graphql'
import infogestiHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/fourthOption.graphql'
// Las Tunas
import contributorsMissingInOnatLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/firstOption.graphql'
import lasTunasDifferentNameQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionName.graphql'
import lasTunasDifferentPlateQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/thirdOption.graphql'
import infogestiTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/fourthOption.graphql'
// Matanzas
import contributorsMissingInOnatMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/firstOption.graphql'
import matanzasDifferentNameQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionName.graphql'
import matanzasDifferentPlateQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/thirdOption.graphql'
import infogestiMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/fourthOption.graphql'
// Mayabeque
import contributorsMissingInOnatMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/firstOption.graphql'
import mayabequeDifferentNameQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionName.graphql'
import mayabequeDifferentPlateQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/thirdOption.graphql'
import infogestiMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/fourthOption.graphql'
// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import pinarDifferentNameQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionName.graphql'
import pinarDifferentPlateQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
import infogestiPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/fourthOption.graphql'
// Santiago de Cuba
import contributorsMissingInOnatSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/firstOption.graphql'
import santiagoDifferentNameQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionName.graphql'
import santiagoDifferentPlateQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/thirdOption.graphql'
import infogestiSantiagoQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/fourthOption.graphql'
// Santic Espiritud
import contributorsMissingInOnatSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/firstOption.graphql'
import santicEspiritudDifferentNameQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionName.graphql'
import santicEspiritudDifferentPlateQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/thirdOption.graphql'
import infogestiEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/fourthOption.graphql'
// Villa Clara
import contributorsMissingInOnatVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/firstOption.graphql'
import VillaClaraDifferentNameQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionName.graphql'
import VillaClaraDifferentPlateQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionPlate.graphql'
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
      selectedAction: null,
      radio: null,
      countries: [],
      cities: [],
      states: [],
      tableColumns,
      provinces,
      tableColumnsInfo,
      different,
      differentInfo,
      selectedProvince: null,
      loading: false,
      data_1: null,
      data_2: null,
      data_2a: null,
      data_3: null,
      data_4: null,
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
      a: '',
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      selected: false
    }
  },
  head() {
    return {
      title: `Transporte | Home`
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
      this.loading = true
      this.data_1 = null
      this.data_2 = null
      this.data_3 = null
      this.data_4 = null
      this.$store.commit('search/setActive', false)
      if (this.selectedProvince === 'artemisa') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatArtemisaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$store.commit('search/setActive', false)
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: artemisaDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationArtemisaName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: artemisaDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationArtemisaPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationArtemisaQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiArtemisaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiArtemisa
              this.loading = false
            })
        }
      }
      // Camaguey
      else if (this.selectedProvince === 'camaguey') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCamagueyQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: camagueyDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationCamagueyName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: camagueyDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationCamagueyPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCamagueyQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCamagueyQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCamaguey
              this.loading = false
            })
        }
      }
      // Ciego De Avila
      else if (this.selectedProvince === 'ciegoDeAvila') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCiegoDeAvilaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: ciegoDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 = data.contributorsWithDifferentInformationCiegoName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: ciegoDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationCiegoPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCiegoDeAvilaQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCiegoQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCiego
              this.loading = false
            })
        }
      }
      // Cienfuegos
      else if (this.selectedProvince === 'cienfuegos') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCienfuegosQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: cienfuegosDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationCienfuegosName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: cienfuegosDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationCienfuegosPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCienfuegosQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCienfuegosQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCienfuegos
              this.loading = false
            })
        }
      }
      // Granma
      else if (this.selectedProvince === 'granma') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatGranmaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: granmaDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationGranmaName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: granmaDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationGranmaPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGranmaQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGranmaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiGranma
              this.loading = false
            })
        }
      }

      // Guantanamo
      else if (this.selectedProvince === 'guantanamo') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatGuantanamoQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: guantanamoDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationGuantanamoName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: guantanamoDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationGuantanamoPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGuantanamoQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGuantanamoQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiGuantanamo
              this.loading = false
            })
        }
      }

      // Holguin
      else if (this.selectedProvince === 'holguin') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatHolguinQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: holguinDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationHolguinName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: holguinDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationHolguinPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationHolguinQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHolguinQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiHolguin
              this.loading = false
            })
        }
      }
      // Isla de la juventud
      else if (this.selectedProvince === 'islaDeLaJuventud') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatIslaDeLaJuventudQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatIslaDeLaJuventud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: islaDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationIslaDeLaJuventudName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: islaDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationIslaDeLaJuventudPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationIslaDeLaJuventudQuery
            })
            .then(({ data }) => {
              this.data_3 =
                data.contributorsWithEqualsInformationIslaDeLaJuventud
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiIslaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiIslaQuery
              this.loading = false
            })
        }
      }

      // La habana
      else if (this.selectedProvince === 'habana') {
        console.log(1)
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatLaHabanaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: contributorsWithDifferentInformationLaHabanaQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationLaHabanaNames
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: contributorsWithDifferentInformationLaHabanaInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationLaHabanaPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabanaQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHabanaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiHabana
              this.loading = false
            })
        }
      }

      // Las Tunas
      else if (this.selectedProvince === 'lasTunas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatLasTunasQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: lasTunasDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationLasTunasName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: lasTunasDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationLasTunasPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLasTunasQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiTunasQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiTunas
              this.loading = false
            })
        }
      }

      // Matanzas
      else if (this.selectedProvince === 'matanzas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatMatanzasQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'name') {
            this.$apollo
              .query({
                query: matanzasDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationMatanzasName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: matanzasDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationMatanzasPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMatanzasQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMatanzasQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiMatanzas
              this.loading = false
            })
        }
      }

      // Mayabeque
      else if (this.selectedProvince === 'mayabeque') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatMayabequeQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: mayabequeDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationMayabequeName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: mayabequeDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationMayabequePlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMayabequeQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMayabequeQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiMayabeque
              this.loading = false
            })
        }
      }

      // Pinar del Rio
      else if (this.selectedProvince === 'pinarDelRio') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatPinarQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: pinarDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 = data.contributorsWithDifferentInformationPinarName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: pinarDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationPinarPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationPinarQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiPinarQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiPinar
              this.loading = false
            })
        }
      }

      // Santiago de Cuba
      else if (this.selectedProvince === 'santiagoDeCuba') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatSantiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: santiagoDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationSantiagoDeCubaName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: santiagoDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationSantiagoDeCubaPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSantiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiSantiagoQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiSantiago
              this.loading = false
            })
        }
      }

      // Santic Espiritud
      else if (this.selectedProvince === 'santciSpiritus') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatSanticEspiritudQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatSanticEspiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: santicEspiritudDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationSanticEspiritudName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: santicEspiritudDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationSanticEspiritudPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSanticEspiritudQuery
            })
            .then(({ data }) => {
              this.data_3 =
                data.contributorsWithEqualsInformationSanticEspiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiEspiritudQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiEspiritud
              this.loading = false
            })
        }
      }

      // Villa Clara
      else if (this.selectedProvince === 'villaClara') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatVillaClaraQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: VillaClaraDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationVillaClaraName
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: VillaClaraDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationVillaClaraPlate
                this.loading = false
              })
          }
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationVillaClaraQuery
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiVillaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiVilla
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
.bottom-bar
  border-top #f5f5f5 solid 1pt
  position fixed
  bottom 0
  width 87%
  background #ffffff
  z-index 1
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 300ms
</style>
