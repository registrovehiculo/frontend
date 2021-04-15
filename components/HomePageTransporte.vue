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
                :filename="selectedProvince + ' (' + cityById.name + ')'"
                :sheetname="selectedProvince + ' (' + cityById.name + ')'"
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
                :filename="selectedProvince + ' (' + cityById.name + ')'"
                :sheetname="selectedProvince + ' (' + cityById.name + ')'"
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
                :filename="selectedProvince + ' (' + cityById.name + ')'"
                :sheetname="selectedProvince + ' (' + cityById.name + ')'"
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
                :filename="selectedProvince + ' (' + cityById.name + ')'"
                :sheetname="selectedProvince + ' (' + cityById.name + ')'"
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
    <div class="row is-flex-desktop has-text-centered">
      <div class="column is-2-desktop is-12-tablet is-offset-1-desktop">
        <form class="has-text-right">
          <b-field>
            <b-select
              v-model="address.form.country.code"
              placeholder="Pais"
              expanded
              @input="selectCountry"
            >
              <option
                v-for="option in countries"
                :key="option.code"
                :value="option.code"
              >
                {{ option.nameEs }}
              </option>
            </b-select>
          </b-field>
          <b-field>
            <b-select
              v-model="address.form.state"
              placeholder="Provincia"
              expanded
              dropdown-position="bottom"
              @input="selectState"
            >
              <option
                v-for="option in states"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
          <b-field>
            <b-select
              v-model="address.form.city"
              placeholder="Ciudad"
              expanded
              dropdown-position="bottom"
              @input="selectCity"
            >
              <option
                v-for="option in cities"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
        </form>
      </div>
      <div
        class="column is-6-desktop is-12-tablet has-text-centered margin-left-20"
      >
        <span v-if="states && address.form.state" style="font-size: 35px">
          <b
            >{{ states[address.form.state - 1].name
            }}<span v-if="cityById">{{ ' (' + cityById.name + ')' }}</span></b
          >
        </span>
        <div
          class="column is-hidden-tablet-only is-hidden-mobile margin-left-20"
          style="margin-top:2.5rem"
        >
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
              class="is-black margin-left-20"
              rounded
              :loading="loading"
              :disabled="
                !address.form.country ||
                  !address.form.state ||
                  !address.form.city ||
                  !selectedAction
              "
              @click="select()"
              >Buscar</b-button
            >
            <b-button
              class="is-black margin-left-10"
              rounded
              :disabled="loading || (!data_1 && !data_2 && !data_3 && !data_4)"
              @click="open = true"
              >Exportar</b-button
            >
          </b-field>
        </div>
      </div>
      <div class="is-hidden-table is-hidden-desktop bottom-bar">
        <div class="columns is-mobile">
          <div class="column is-6">
            <b-button
              class="is-black is-fullwidth is-small"
              rounded
              :disabled="
                !address.form.country ||
                  !address.form.state ||
                  !address.form.city ||
                  !selectedAction
              "
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
            :columns="tableColumns"
            :loading="loading"
          />
        </div>

        <div
          v-if="selectedAction === 2 && data_2 && data_2a && !getActive()"
          class="row is-flex"
        >
          <div class="column has-text-centered">
            <b class="font-size-2" style="color: #d60000">{{
              'Registro Vehiculo'
            }}</b>
            <StatesTable
              v-if="data_2"
              :data="data_2"
              :columns="different"
              checkable
            />
          </div>

          <div class="column has-text-centered">
            <b class="font-size-2" style="color: #d60000">{{ 'InfoGesti' }}</b>
            <StatesTable
              v-if="data_2a"
              :data="data_2a"
              :columns="differentInfo"
            />
          </div>
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
import statesQuery from '~/apollo/queries/addresses/states.graphql'
import countriesQuery from '~/apollo/queries/addresses/countries.graphql'
import citiesQuery from '~/apollo/queries/addresses/cities.graphql'
import citiesByIdQuery from '~/apollo/queries/addresses/cityById.graphql'
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
      address: {
        form: {
          id: null,
          city: null,
          state: null,
          country: {
            code: null,
            nameEs: null
          }
        }
      },
      selectedAction: null,
      countries: [],
      cities: [],
      states: [],
      cityById: null,
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
  apollo: {
    countries: {
      prefetch: true,
      query: countriesQuery
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
    async selectCountry(option, stateId, cityId) {
      await this.$apollo
        .query({
          query: statesQuery,
          variables: {
            countryId: option
          }
        })
        .then(({ data }) => {
          this.states = data.states
          this.cities = []
          if (stateId === undefined) {
            this.address.form.state = null
          } else {
            this.address.form.state = stateId
          }
          if (cityId === undefined) {
            this.address.form.city = null
          } else {
            this.selectState(stateId, cityId)
          }
        })
    },
    selectState(option, cityId) {
      this.$apollo
        .query({
          query: citiesQuery,
          variables: {
            stateId: option
          }
        })
        .then(({ data }) => {
          this.cities = data.cities
          if (cityId === undefined) {
            this.address.form.city = null
          } else {
            this.address.form.city = cityId
          }
        })
    },
    selectCity(option) {
      this.a = option
      this.$apollo
        .query({
          query: citiesByIdQuery,
          variables: {
            cityId: option
          }
        })
        .then(({ data }) => (this.cityById = data.citiesById))
    },
    select() {
      // Artemisa
      this.selectedProvince = this.states[this.address.form.state - 1].name
      this.loading = true
      this.data_1 = null
      this.data_2 = null
      this.data_2a = null
      this.data_3 = null
      this.data_4 = null
      this.$store.commit('search/setActive', false)
      if (this.selectedProvince === 'Artemisa') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatArtemisaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$store.commit('search/setActive', false)
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationArtemisaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationArtemisa
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationArtemisaInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationArtemisaInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationArtemisaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationArtemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiArtemisaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiArtemisa
              this.loading = false
            })
        }
      }
      // Camaguey
      else if (this.selectedProvince === 'Camagüey') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCamagueyQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCamagueyQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationCamaguey
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCamagueyInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationCamagueyInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCamagueyQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCamaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCamagueyQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCamaguey
              this.loading = false
            })
        }
      }
      // Ciego De Avila
      else if (this.selectedProvince === 'Ciego de Avila') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCiegoDeAvilaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCiegoDeAvilaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationCiego
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCiegoInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationCiegoInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCiegoDeAvilaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCiego
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCiegoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCiego
              this.loading = false
            })
        }
      }
      // Cienfuegos
      else if (this.selectedProvince === 'Cienfuegos') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatCienfuegosQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCienfuegosQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationCienfuegos
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationCienfuegosInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationCienfuegosInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationCienfuegosQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationCienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiCienfuegosQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiCienfuegos
              this.loading = false
            })
        }
      }
      // Granma
      else if (this.selectedProvince === 'Granma') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatGranmaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGranmaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationGranma
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGranmaInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationGranmaInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGranmaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationGranma
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGranmaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiGranma
              this.loading = false
            })
        }
      }

      // Guantanamo
      else if (this.selectedProvince === 'Guantanamo') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatGuantanamoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGuantanamoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationGuantanamo
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationGuantanamoInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationGuantanamoInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationGuantanamoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationGuantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiGuantanamoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiGuantanamo
              this.loading = false
            })
        }
      }

      // Holguin
      else if (this.selectedProvince === 'Holguin') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatHolguinQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationHolguinQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationHolguin
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationHolguinInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationHolguinInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationHolguinQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationHolguin
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHolguinQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiHolguin
              this.loading = false
            })
        }
      }
      // Isla de la juventud
      else if (this.selectedProvince === 'Isla de la Juventud') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatIslaDeLaJuventudQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatIslaDeLaJuventud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationIslaDeLaJuventudQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 =
                data.contributorsWithDifferentInformationIslaDeLaJuventud
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationIslaDeLaJuventudInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationIslaDeLaJuventudInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationIslaDeLaJuventudQuery,
              variables: { cityName: this.cityById.name }
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
              query: infogestiIslaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiIslaQuery
              this.loading = false
            })
        }
      }

      // La habana
      else if (this.selectedProvince === 'La Habana') {
        console.log(1)
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatLaHabanaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabanaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationLaHabana
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLaHabanaInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationLaHabanaInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLaHabanaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationLaHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiHabanaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiHabana
              this.loading = false
            })
        }
      }

      // Las Tunas
      else if (this.selectedProvince === 'Las Tunas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatLasTunasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLasTunasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationLasTunas
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationLasTunasInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationLasTunasInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationLasTunasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationLasTunas
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiTunasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiTunas
              this.loading = false
            })
        }
      }

      // Matanzas
      else if (this.selectedProvince === 'Matanzas') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatMatanzasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMatanzasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationMatanzas
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMatanzasInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationMatanzasInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMatanzasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationMatanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMatanzasQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiMatanzas
              this.loading = false
            })
        }
      }

      // Mayabeque
      else if (this.selectedProvince === 'Mayabeque') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatMayabequeQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMayabequeQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationMayabeque
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationMayabequeInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationMayabequeInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationMayabequeQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationMayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiMayabequeQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiMayabeque
              this.loading = false
            })
        }
      }

      // Pinar del Rio
      else if (this.selectedProvince === 'Pinar del Rio') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatPinarQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationPinarQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationPinar
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationPinarInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationPinarInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationPinarQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationPinar
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiPinarQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiPinar
              this.loading = false
            })
        }
      }

      // Santiago de Cuba
      else if (this.selectedProvince === 'Santiago de Cuba') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatSantiagoDeCubaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSantiagoDeCubaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 =
                data.contributorsWithDifferentInformationSantiagoDeCuba
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSantiagoDeCubaInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationSantiagoDeCubaInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSantiagoDeCubaQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationSantiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiSantiagoQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiSantiago
              this.loading = false
            })
        }
      }

      // Santic Espiritud
      else if (this.selectedProvince === 'Sancti Spiritus') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatSanticEspiritudQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatSanticEspiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSanticEspiritudQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 =
                data.contributorsWithDifferentInformationSanticEspiritud
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationSanticEspiritudInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationSanticEspiritudInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationSanticEspiritudQuery,
              variables: { cityName: this.cityById.name }
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
              query: infogestiEspiritudQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiEspiritud
              this.loading = false
            })
        }
      }

      // Villa Clara
      else if (this.selectedProvince === 'Villa Clara') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatVillaClaraQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationVillaClaraQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2 = data.contributorsWithDifferentInformationVillaClara
              this.loading = false
            })
          this.$apollo
            .query({
              query: contributorsWithDifferentInformationVillaClaraInfogestiQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_2a =
                data.contributorsWithDifferentInformationVillaClaraInfogesti
              this.loading = false
            })
        }
        if (this.selectedAction === 3) {
          this.$apollo
            .query({
              query: contributorsWithEqualsInformationVillaClaraQuery,
              variables: { cityName: this.cityById.name }
            })
            .then(({ data }) => {
              this.data_3 = data.contributorsWithEqualsInformationVillaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiVillaQuery,
              variables: { cityName: this.cityById.name }
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
</style>
