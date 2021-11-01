<template>
  <div v-if="$auth.loggedIn">
    <div v-show="!getSystem">
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
              <div class="has-text-centered">
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
                    :columns="tableColumnsInfo"
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
                    v-if="data_5"
                    :data="data_5"
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
                    v-if="data_6"
                    :data="data_6"
                    :columns="tableColumnsInfo"
                    filename="Con Dpa distintos"
                    sheetname="Con Dpa distintos"
                    class="documentStyle"
                  >
                    <b>Documento excel</b>
                    <font-awesome-icon
                      :icon="['fas', 'file-excel']"
                      style="height: 30px; width: 30px; color: green"
                    />
                  </vue-excel-xlsx>
                  <vue-excel-xlsx
                    v-if="data_7"
                    :data="data_7"
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
        <div class="columns is-centered hero-body">
          <div
            class="column is-6-desktop is-12-tablet has-text-centered margin-left-20"
          >
            <p
              class="has-text-centered margin-top-30"
              style="font-size: 32px; font-weight: 700; color: #d60000"
            >
              Registro de Vehículo
            </p>
            <hr />
            <div class="column margin-left-20">
              <b-field class="margin-bottom-10" style="width: 100%">
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
              </b-field>
              <div v-show="selectedAction === 2" class="margin-top-20">
                <p
                  v-if="!radio"
                  class="margin-bottom-10"
                  style="color: #d60000"
                >
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
                <client-only>
                  <b-radio
                    v-model="radio"
                    name="differentNames"
                    native-value="names"
                    @input="select()"
                  >
                    Nombres distintos
                  </b-radio>
                </client-only>
              </div>
              <div
                class="has-text-centered is-hidden-mobile is-hidden-tablet-only"
                style="margin-bottom: -50px"
              >
                <b-button
                  class="is-black margin-left-20 changeColorR"
                  rounded
                  style="width: 25%; margin-top: 20px"
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
                  style="width: 25%; margin-top: 20px"
                  :disabled="
                    loading ||
                      (!data_1 &&
                        !data_2 &&
                        !data_3 &&
                        !data_4 &&
                        !data_5 &&
                        !data_6 &&
                        !data_7)
                  "
                  @click="open = true"
                  >Exportar</b-button
                >
              </div>
            </div>
            <div style="margin-bottom: -40px">
              <p v-if="data_1" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_1.length }}
              </p>
              <p v-if="data_2" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_2.length }}
              </p>
              <p v-if="data_4" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_4.length }}
              </p>
              <p v-if="data_5" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_5.length }}
              </p>
              <p v-if="data_6" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_6.length }}
              </p>
              <p v-if="data_7" class="margin-top-40 font-size-5">
                {{ 'Total: ' + data_7.length }}
              </p>
            </div>
          </div>
          <div class="is-hidden-table is-hidden-desktop bottom-bar">
            <div class="columns is-mobile">
              <div class="column is-6">
                <b-button
                  class="is-black is-fullwidth is-small"
                  rounded
                  :disabled="
                    !selectedProvince ||
                      !selectedAction ||
                      (!radio && selectedAction === 2)
                  "
                  @click="select()"
                  >Buscar</b-button
                >
              </div>
              <div class="column is-6-mobile">
                <b-button
                  class="is-black is-fullwidth is-small"
                  rounded
                  :disabled="
                    loading ||
                      (!data_1 &&
                        !data_2 &&
                        !data_3 &&
                        !data_4 &&
                        !data_5 &&
                        !data_6 &&
                        !data_7)
                  "
                  @click="open = true"
                  >Exportar</b-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-7">
            <b-skeleton
              size="is-large"
              :active="loading"
              widt="80%"
              :count="10"
            ></b-skeleton>
          </div>
        </div>
        <div v-if="data_2 !== null" class="has-text-centered">
          <p v-if="data_2.length === 0" class="font-size-3">
            {{ 'No se encontraron diferencias' }}
          </p>
        </div>
        <div>
          <div
            v-if="!loading"
            :class="
              radio === 'names'
                ? ''
                : 'columns is-centered flex-wrap-center column is-12'
            "
          >
            <div v-if="getActive()">
              <StatesTable
                v-if="vehiculo"
                :data="vehiculo"
                :columns="tableColumnsV"
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
            <div v-if="selectedAction === 5 && !getActive()">
              <StatesTable
                v-if="data_5"
                :data="data_5"
                :columns="tableColumns"
                :loading="loading"
              />
            </div>
            <div
              v-if="
                selectedAction === 2 &&
                  !getActive() &&
                  data_2 !== null &&
                  data_2a !== null &&
                  radio === 'names'
              "
              class=""
              style="margin-top: -5%"
            >
              <div class="columns is-centered">
                <div class="column is-8 has-text-centered">
                  <StatesTable
                    v-if="data_2.length > 0"
                    :data="data_2"
                    :columns="tableColumns"
                    checkable
                    @update-name="updateName"
                  />
                </div>
                <!--div class="column is-1" style="margin-top: 75px">
              <div
                v-for="(n, i) in data_2a.length"
                :key="i"
                style="margin-bottom: 5px"
              >
                <b-button
                  class="is-black changeColorR"
                  size="is-small"
                  rounded
                  @click="updateName(i)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'arrow-left']"
                    class="font-size-4 is-white"
                /></b-button>
              </div>
            </div-->
                <div class="column is-4">
                  <StatesTable
                    v-if="data_2a.length > 0"
                    :data="data_2a"
                    :columns="tableColumnsInfoName"
                    checkable
                  />
                </div>
              </div>
            </div>
            <div
              v-if="
                selectedAction === 2 &&
                  !getActive() &&
                  data_2 !== null &&
                  radio === 'plates'
              "
            >
              <StatesTable
                v-if="data_2.length > 0"
                :data="data_2"
                :columns="tableColumns"
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
            <div v-if="!getActive() && selectedAction === 6">
              <StatesTable
                v-if="data_6"
                :data="data_6"
                :columns="tableColumnsInfo"
              />
            </div>
            <div v-if="!getActive() && selectedAction === 7">
              <StatesTable
                v-if="data_7"
                :data="data_7"
                :columns="tableColumns"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <HomePageEmbarcacion v-show="getSystem" />
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import { mapGetters, mapMutations } from 'vuex'
import HomePageEmbarcacion from '~/components/HomePageEmbarcacion'
// Apollo
// Artemisa
import contributorsMissingInOnatArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/firstOption.graphql'
import artemisaDifferentNameQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionName.graphql'
import artemisaNameInfogestiQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionNameInfo.graphql'
import artemisaDifferentPlateQuery from '~/apollo/queries/provinces/artemisa/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/thirdOption.graphql'
import infogestiArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/fourthOption.graphql'
import artemisaQuery from '~/apollo/queries/provinces/artemisa/artemisa.graphql'
import wrongIdArtemisaQuery from '~/apollo/queries/provinces/artemisa/actions/fifthOption.graphql'
// Camaguey
import contributorsMissingInOnatCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/firstOption.graphql'
import camagueyDifferentNameQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionName.graphql'
import camagueyNameInfogestiQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionNameInfo.graphql'
import camagueyDifferentPlateQuery from '~/apollo/queries/provinces/camaguey/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/thirdOption.graphql'
import infogestiCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/fourthOption.graphql'
import camagueyQuery from '~/apollo/queries/provinces/camaguey/camaguey.graphql'
import wrongIdCamagueyQuery from '~/apollo/queries/provinces/camaguey/actions/fifthOption.graphql'

// Ciego de Avila
import contributorsMissingInOnatCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/firstOption.graphql'
import ciegoDifferentNameQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionName.graphql'
import ciegoNameInfogestiQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionNameInfo.graphql'
import ciegoDifferentPlateQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCiegoDeAvilaQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/thirdOption.graphql'
import infogestiCiegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/fourthOption.graphql'
import ciegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/ciegoDeAvila.graphql'
import wrongIdCiegoQuery from '~/apollo/queries/provinces/ciegoDeAvila/actions/fifthOption.graphql'

// Cienfuegos
import contributorsMissingInOnatCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/firstOption.graphql'
import cienfuegosDifferentNameQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionName.graphql'
import cienfuegosNameInfogestiQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionNameInfo.graphql'
import cienfuegosDifferentPlateQuery from '~/apollo/queries/provinces/cienfuegos/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/thirdOption.graphql'
import infogestiCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/fourthOption.graphql'
import cienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/cienfuegos.graphql'
import wrongIdCienfuegosQuery from '~/apollo/queries/provinces/cienfuegos/actions/fifthOption.graphql'

// Granma
import contributorsMissingInOnatGranmaQuery from '~/apollo/queries/provinces/granma/actions/firstOption.graphql'
import granmaDifferentNameQuery from '~/apollo/queries/provinces/granma/actions/secondOptionName.graphql'
import granmaNameInfogestiQuery from '~/apollo/queries/provinces/granma/actions/secondOptionNameInfo.graphql'
import granmaDifferentPlateQuery from '~/apollo/queries/provinces/granma/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationGranmaQuery from '~/apollo/queries/provinces/granma/actions/thirdOption.graphql'
import infogestiGranmaQuery from '~/apollo/queries/provinces/granma/actions/fourthOption.graphql'
import granmaQuery from '~/apollo/queries/provinces/granma/granma.graphql'
import wrongIdGranmaQuery from '~/apollo/queries/provinces/granma/actions/fifthOption.graphql'

// Guantanamo
import contributorsMissingInOnatGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/firstOption.graphql'
import guantanamoDifferentNameQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionName.graphql'
import guantanamoNameInfogestiQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionNameInfo.graphql'
import guantanamoDifferentPlateQuery from '~/apollo/queries/provinces/guantanamo/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/thirdOption.graphql'
import infogestiGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/fourthOption.graphql'
import guantanamoQuery from '~/apollo/queries/provinces/guantanamo/guantanamo.graphql'
import wrongIdGuantanamoQuery from '~/apollo/queries/provinces/guantanamo/actions/fifthOption.graphql'

// Holguin
import contributorsMissingInOnatHolguinQuery from '~/apollo/queries/provinces/holguin/actions/firstOption.graphql'
import holguinDifferentNameQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionName.graphql'
import holguinNameInfogestiQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionNameInfo.graphql'
import holguinDifferentPlateQuery from '~/apollo/queries/provinces/holguin/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationHolguinQuery from '~/apollo/queries/provinces/holguin/actions/thirdOption.graphql'
import infogestiHolguinQuery from '~/apollo/queries/provinces/holguin/actions/fourthOption.graphql'
import holguinQuery from '~/apollo/queries/provinces/holguin/holguin.graphql'
import wrongIdHolguinQuery from '~/apollo/queries/provinces/holguin/actions/fifthOption.graphql'

// Isla de la juventud
import contributorsMissingInOnatIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/firstOption.graphql'
import islaDifferentNameQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionName.graphql'
import islaNameInfogestiQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionNameInfo.graphql'
import islaDifferentPlateQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationIslaDeLaJuventudQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/thirdOption.graphql'
import infogestiIslaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/fourthOption.graphql'
import islaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/islaDeLaJuventud.graphql'
import wrongIdIslaQuery from '~/apollo/queries/provinces/islaDeLaJuventud/actions/fifthOption.graphql'

// La Habana
import contributorsMissingInOnatLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/firstOption.graphql'
import contributorsWithDifferentInformationHabanaNameQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionName.graphql'
import habanaNameInfogestiQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionNameInfo.graphql'
import contributorsWithDifferentInformationHabanaPlateQuery from '~/apollo/queries/provinces/laHabana/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationLaHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/thirdOption.graphql'
import infogestiHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/fourthOption.graphql'
import habanaQuery from '~/apollo/queries/provinces/laHabana/laHabana.graphql'
import wrongIdHabanaQuery from '~/apollo/queries/provinces/laHabana/actions/fifthOption.graphql'

// Las Tunas
import contributorsMissingInOnatLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/firstOption.graphql'
import lasTunasDifferentNameQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionName.graphql'
import tunasNameInfogestiQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionNameInfo.graphql'
import lasTunasDifferentPlateQuery from '~/apollo/queries/provinces/lasTunas/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/thirdOption.graphql'
import infogestiTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/fourthOption.graphql'
import lastunasQuery from '~/apollo/queries/provinces/lasTunas/lasTunas.graphql'
import wrongIdLasTunasQuery from '~/apollo/queries/provinces/lasTunas/actions/fifthOption.graphql'

// Matanzas
import contributorsMissingInOnatMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/firstOption.graphql'
import matanzasDifferentNameQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionName.graphql'
import matanzasNameInfogestiQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionNameInfo.graphql'
import matanzasDifferentPlateQuery from '~/apollo/queries/provinces/matanzas/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/thirdOption.graphql'
import infogestiMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/fourthOption.graphql'
import matanzasQuery from '~/apollo/queries/provinces/matanzas/matanzas.graphql'
import wrongIdMatanzasQuery from '~/apollo/queries/provinces/matanzas/actions/fifthOption.graphql'

// Mayabeque
import contributorsMissingInOnatMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/firstOption.graphql'
import mayabequeDifferentNameQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionName.graphql'
import mayabequeNameInfogestiQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionNameInfo.graphql'
import mayabequeDifferentPlateQuery from '~/apollo/queries/provinces/mayabeque/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/thirdOption.graphql'
import infogestiMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/fourthOption.graphql'
import mayabequeQuery from '~/apollo/queries/provinces/mayabeque/mayabeque.graphql'
import wrongIdMayabequeQuery from '~/apollo/queries/provinces/mayabeque/actions/fifthOption.graphql'

// Pinar del Rio
import contributorsMissingInOnatPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/firstOption.graphql'
import pinarDifferentNameQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionName.graphql'
import pinarNameInfogestiQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionNameInfo.graphql'
import pinarDifferentPlateQuery from '~/apollo/queries/provinces/pinarDelRio/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/thirdOption.graphql'
import infogestiPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/fourthOption.graphql'
import pinarQuery from '~/apollo/queries/provinces/pinarDelRio/pinarDelRio.graphql'
import wrongIdPinarQuery from '~/apollo/queries/provinces/pinarDelRio/actions/fifthOption.graphql'

// Santiago de Cuba
import contributorsMissingInOnatSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/firstOption.graphql'
import santiagoDifferentNameQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionName.graphql'
import santiagoNameInfogestiQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionNameInfo.graphql'
import santiagoDifferentPlateQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/thirdOption.graphql'
import infogestiSantiagoQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/fourthOption.graphql'
import santiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/santiagoDeCuba.graphql'
import wrongIdSantiagoDeCubaQuery from '~/apollo/queries/provinces/santiagoDeCuba/actions/fifthOption.graphql'

// Santic Espiritud
import contributorsMissingInOnatSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/firstOption.graphql'
import santicEspiritudDifferentNameQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionName.graphql'
import espiritudNameInfogestiQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionNameInfo.graphql'
import santicEspiritudDifferentPlateQuery from '~/apollo/queries/provinces/santicEspiritud/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/thirdOption.graphql'
import infogestiEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/fourthOption.graphql'
import espiritudQuery from '~/apollo/queries/provinces/santicEspiritud/santicEspiritud.graphql'
import wrongIdSanticEspiritudQuery from '~/apollo/queries/provinces/santicEspiritud/actions/fifthOption.graphql'

// Villa Clara
import contributorsMissingInOnatVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/firstOption.graphql'
import VillaClaraDifferentNameQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionName.graphql'
import villaNameInfogestiQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionNameInfo.graphql'
import VillaClaraDifferentPlateQuery from '~/apollo/queries/provinces/villaClara/actions/secondOptionPlate.graphql'
import contributorsWithEqualsInformationVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/thirdOption.graphql'
import infogestiVillaQuery from '~/apollo/queries/provinces/villaClara/actions/fourthOption.graphql'
import villaClaraQuery from '~/apollo/queries/provinces/villaClara/villaClara.graphql'
import wrongIdVillaClaraQuery from '~/apollo/queries/provinces/villaClara/actions/fifthOption.graphql'

import updateNameMutation from '~/apollo/mutations/updateName.graphql'

// repeated
import repeatedQuery from '~/apollo/queries/repeatedPlates.graphql'
// Components
// import ColumnOptions from '~/components/ColumnOptions'
import StatesTable from '~/components/StatesTable'
// Json loading
import provinces from '~/static/provinces.json'
import different from '~/static/different.json'
import differentInfo from '~/static/differentInfo.json'
import tableColumns from '~/static/tableColumns.json'
import tableColumnsV from '~/static/tableColumnsV.json'
import tableColumnsInfo from '~/static/tableColumnsInfo.json'
import tableColumnsInfoName from '~/static/tableColumnsInfoName.json'
export default {
  components: { StatesTable, HomePageEmbarcacion },
  ssr: false,
  asyncData({ req }) {
    return {
      provinces,
      tableColumns,
      tableColumnsV,
      tableColumnsInfo,
      different,
      differentInfo,
      tableColumnsInfoName
    }
  },
  data() {
    return {
      selectedAction: null,
      radio: null,
      countries: [],
      cities: [],
      states: [],
      tableColumnsV,
      tableColumns,
      provinces,
      tableColumnsInfo,
      different,
      differentInfo,
      tableColumnsInfoName,
      selectedProvince: null,
      loading: false,
      data_1: null,
      data_2: null,
      data_2a: null,
      data_3: null,
      data_4: null,
      data_5: null,
      data_6: null,
      data_7: null,
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
        },
        {
          id: 5,
          name: 'Mostrar todos de este provincia'
        },
        {
          id: 6,
          name: 'Repetidos con dpa distintos de todas las provincias'
        },
        {
          id: 7,
          name: 'Numero Identidad inválido'
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
    },
    getSystem() {
      return this.$store.getters['system/getActive']
    }
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
    clean() {
      this.data = null
    },
    updateName() {
      const index = this.$store.getters['arrIndex/getIndex']
      this.data_2[index].datospersona = this.data_2a[index].nombreCompleto
      console.log(this.data_2[index].id)
      this.$apollo
        .mutate({
          mutation: updateNameMutation,
          variables: {
            id: this.data_2[index].id,
            province: this.selectedProvince,
            infoGestiName: this.data_2a[index].nombreCompleto
          }
        })
        .then(({ data }) => {
          console.log(data.updateName.status)
        })
    },
    select() {
      this.loading = true
      this.data_1 = null
      this.data_2 = null
      this.data_2a = null
      this.data_3 = null
      this.data_4 = null
      this.data_5 = null
      this.data_6 = null
      this.data_7 = null
      if (this.radio === 'names' && this.selectedAction === 2) {
        this.$store.commit('tableNames/setTableNames', true)
      } else {
        this.$store.commit('tableNames/setTableNames', false)
      }
      this.$store.commit('search/setActive', false)
      if (this.selectedAction === 6) {
        this.$apollo.query({ query: repeatedQuery }).then(({ data }) => {
          this.data_6 = data.repeated
          for (let i = 0; i < this.data_6.length - 1; i++) {
            if (this.data_6[i].nit === this.data_6[i + 1].nit) {
              if (this.data_6[i].dpa === this.data_6[i + 1].dpa) {
                this.data_6.splice(i, 1)
                this.data_6.splice(i, 1)
                i--
              }
            }
          }
          this.loading = false
        })
      }
      // Artemisa
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
            this.$apollo
              .query({
                query: artemisaNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.artemisaNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: artemisaQuery
            })
            .then(({ data }) => {
              this.data_5 = data.artemisa
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdArtemisaQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdArtemisa
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
            this.$apollo
              .query({
                query: camagueyNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.camagueyNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: camagueyQuery
            })
            .then(({ data }) => {
              this.data_5 = data.camaguey
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdCamagueyQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdCamaguey
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
            this.$apollo
              .query({
                query: ciegoNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.ciegoNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: ciegoQuery
            })
            .then(({ data }) => {
              this.data_5 = data.ciego
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdCiegoQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdCiego
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
            this.$apollo
              .query({
                query: cienfuegosNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.cienfuegosNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: cienfuegosQuery
            })
            .then(({ data }) => {
              this.data_5 = data.cienfuegos
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdCienfuegosQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdCienfuegos
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
            this.$apollo
              .query({
                query: granmaNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.granmaNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: granmaQuery
            })
            .then(({ data }) => {
              this.data_5 = data.granma
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdGranmaQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdGranma
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
            this.$apollo
              .query({
                query: guantanamoNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.guantanamoNameInfogesti
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

        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: guantanamoQuery
            })
            .then(({ data }) => {
              this.data_5 = data.guantanamo
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdGuantanamoQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdGuantanamo
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
            this.$apollo
              .query({
                query: holguinNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.holguinNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: holguinQuery
            })
            .then(({ data }) => {
              this.data_5 = data.holguin
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdHolguinQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdHolguin
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
              this.data_1 = data.contributorsMissingInOnatIsla
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
                this.data_2 = data.contributorsWithDifferentInformationIslaName
                this.loading = false
              })
            this.$apollo
              .query({
                query: islaNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.islaNameInfogesti
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: islaDifferentPlateQuery
              })
              .then(({ data }) => {
                this.data_2 = data.contributorsWithDifferentInformationIslaPlate
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
              this.data_3 = data.contributorsWithEqualsInformationIsla
              this.loading = false
            })
        }
        if (this.selectedAction === 4) {
          this.$apollo
            .query({
              query: infogestiIslaQuery
            })
            .then(({ data }) => {
              this.data_4 = data.infogestiIsla
              this.loading = false
            })
        }
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: islaQuery
            })
            .then(({ data }) => {
              this.data_5 = data.isla
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdIslaQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdIsla
              this.loading = false
            })
        }
      }

      // La habana
      else if (this.selectedProvince === 'habana') {
        if (this.selectedAction === 1) {
          this.$apollo
            .query({
              query: contributorsMissingInOnatLaHabanaQuery
            })
            .then(({ data }) => {
              this.data_1 = data.contributorsMissingInOnatHabana
              this.loading = false
            })
        }
        if (this.selectedAction === 2) {
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: contributorsWithDifferentInformationHabanaNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationHabanaName
                this.loading = false
              })
            this.$apollo
              .query({
                query: habanaNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.habanaNameInfogesti
                this.loading = false
              })
          } else {
            this.$apollo
              .query({
                query: contributorsWithDifferentInformationHabanaPlateQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationHabanaPlate
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
              this.data_3 = data.contributorsWithEqualsInformationHabana
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: habanaQuery
            })
            .then(({ data }) => {
              this.data_5 = data.habanaQuery
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdHabanaQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdHabana
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
            this.$apollo
              .query({
                query: tunasNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.tunasNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: lastunasQuery
            })
            .then(({ data }) => {
              this.data_5 = data.lastunas
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdLasTunasQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdLasTunas
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
          if (this.radio === 'names') {
            this.$apollo
              .query({
                query: matanzasDifferentNameQuery
              })
              .then(({ data }) => {
                this.data_2 =
                  data.contributorsWithDifferentInformationMatanzasName
                this.loading = false
              })
            this.$apollo
              .query({
                query: matanzasNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.matanzasNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: matanzasQuery
            })
            .then(({ data }) => {
              this.data_5 = data.matanzas
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdMatanzasQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdMatanzas
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
            this.$apollo
              .query({
                query: mayabequeNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.mayabequeNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: mayabequeQuery
            })
            .then(({ data }) => {
              this.data_5 = data.mayabeque
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdMayabequeQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdMayabeque
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
            this.$apollo
              .query({
                query: pinarNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.pinarNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: pinarQuery
            })
            .then(({ data }) => {
              this.data_5 = data.pinar
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdPinarQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdPinar
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
            this.$apollo
              .query({
                query: santiagoNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.santiagoNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: santiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data_5 = data.santiagoDeCuba
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdSantiagoDeCubaQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdSantiagoDeCuba
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
            this.$apollo
              .query({
                query: espiritudNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.espiritudNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: espiritudQuery
            })
            .then(({ data }) => {
              this.data_5 = data.espiritud
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdSanticEspiritudQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdSanticEspiritud
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
            this.$apollo
              .query({
                query: villaNameInfogestiQuery
              })
              .then(({ data }) => {
                this.data_2a = data.villaNameInfogesti
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
        if (this.selectedAction === 5) {
          this.$apollo
            .query({
              query: villaClaraQuery
            })
            .then(({ data }) => {
              this.data_5 = data.villaClara
              this.loading = false
            })
        }
        if (this.selectedAction === 7) {
          this.$apollo
            .query({
              query: wrongIdVillaClaraQuery
            })
            .then(({ data }) => {
              this.data_7 = data.wrongIdVillaClara
              this.loading = false
            })
        }
      }
    },

    ...mapGetters({
      getActive: 'search/getActive',
      getUser: 'getUser',
      getTableNames: 'tableNames/getTableNames'
    }),
    ...mapMutations({
      setActive: 'search/setActive',
      setTableNames: 'tableNames/setTableNames'
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
