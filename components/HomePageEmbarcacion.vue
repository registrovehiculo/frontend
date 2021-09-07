<template>
  <div>
    <div class="container">
      <p
        class="has-text-centered margin-top-20"
        style="font-size: 32px; font-weight: 700; color: #0855f5"
      >
        Embarcaciones
      </p>
      <hr />
      <div class="columns is-centered has-text-centered">
        <div class="level margin-top-20">
          <div class="level-left">
            <b-field type="is-warning">
              <b-select
                v-model="selectedAction"
                dropdown-position="bottom"
                placeholder="Acciones..."
                @input="search()"
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
          <div v-show="selectedAction === 0 && visible">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipment"
              :columns="tableColumnsEmbarcacion"
              filename="Todos los propietarios Embarcacion"
              sheetname="Propietarios"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 1 && visible1">
            <vue-excel-xlsx
              v-if="!loading"
              :data="ownerWithMoreThanOneShipment"
              :columns="tableColumnsEmbarcacion"
              filename="Propietarios con más de una embarcación"
              sheetname="Más de una embarcación"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 2 && visible2">
            <vue-excel-xlsx
              v-if="!loading"
              :data="ownerWithOneShipment"
              :columns="tableColumnsEmbarcacion"
              filename="Propietarios de una embarcación"
              sheetname="Una embarcación"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 3 && visible3">
            <vue-excel-xlsx
              v-if="!loading"
              :data="ownerWithDifferentNameEqualId"
              :columns="tableColumnsEmbarcacion"
              filename="Id iguales, nombre diferentes"
              sheetname="Nombres diferentes"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 4 && visible4">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserMissingInOnat"
              :columns="tableColumnsEmbarcacion"
              filename="No registrados"
              sheetname="No registrados"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 5 && visible5">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserMissingInSystem"
              :columns="tableColumnsEmbarcacionInfoR"
              filename="Registrados en la onat que no estan en el sistema"
              sheetname="Infogesti"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 6 && visible6">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserDifferentShipment"
              :columns="tableColumnsEmbarcacionInfo"
              filename="Registrados con embarcaciones distintas"
              sheetname="Embarcaciones distintas"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 7 && visible7">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserDifferentCaptaincy"
              :columns="tableColumnsEmbarcacionInfoCaptaincy"
              filename="Registrados con capitanías distintas"
              sheetname="Capitanías distintas"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 8 && visible8">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserDifferentBase"
              :columns="tableColumnsEmbarcacionInfoBase"
              filename="Registrados con basificiónes distintas"
              sheetname="Basificiónes distintas"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
          <div v-show="selectedAction === 9 && visible9">
            <vue-excel-xlsx
              v-if="!loading"
              :data="shipmentUserDifferentRegister"
              :columns="tableColumnsEmbarcacionInfoRegister"
              filename="Registrados con registros distintas"
              sheetname="Registros distintos"
              class="documentStyle"
            >
              <b>Exportar</b>
            </vue-excel-xlsx>
          </div>
        </div>
      </div>
      <div v-if="loading" class="columns is-centered">
        <div class="column is-8 margin-top-50">
          <b-skeleton
            size="is-large"
            :active="loading"
            widt="90%"
            :count="10"
          ></b-skeleton>
        </div>
      </div>
      <p
        v-if="
          selectedAction !== null &&
            (visible ||
              visible2 ||
              visible3 ||
              visible4 ||
              visible5 ||
              visible6 ||
              visible7 ||
              visible8 ||
              visible9 ||
              visible1)
        "
        class="has-text-centered margin-top-30 font-size-6"
        style="font-weight: 700"
      >
        {{
          actions[selectedAction].name.charAt(8).toUpperCase() +
            actions[selectedAction].name.substring(9)
        }}
      </p>

      <div class="margin-top-30">
        <div v-show="selectedAction === 0 && visible">
          <InformationTable
            v-if="shipment"
            :data="shipment"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 1 && visible1">
          <InformationTable
            v-if="ownerWithMoreThanOneShipment"
            :data="ownerWithMoreThanOneShipment"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 2 && visible2">
          <InformationTable
            v-if="ownerWithOneShipment"
            :data="ownerWithOneShipment"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 3 && visible3">
          <InformationTable
            v-if="result"
            :data="result"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 4 && visible4">
          <InformationTable
            v-if="shipmentUserMissingInOnat"
            :data="shipmentUserMissingInOnat"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 5 && visible5">
          <InformationTable
            v-if="shipmentUserMissingInSystem"
            :data="shipmentUserMissingInSystem"
            :columns="tableColumnsEmbarcacionInfoR"
          />
        </div>
        <div v-show="selectedAction === 6 && visible6">
          <InformationTable
            v-if="shipmentUserDifferentShipment"
            :data="shipmentUserDifferentShipment"
            :columns="tableColumnsEmbarcacionInfoShipment"
          />
        </div>
        <div v-show="selectedAction === 7 && visible7">
          <InformationTable
            v-if="shipmentUserDifferentCaptaincy"
            :data="shipmentUserDifferentCaptaincy"
            :columns="tableColumnsEmbarcacionInfoCaptaincy"
          />
        </div>
      </div>
      <div v-show="selectedAction === 8 && visible8">
        <InformationTable
          v-if="shipmentUserDifferentBase"
          :data="shipmentUserDifferentBase"
          :columns="tableColumnsEmbarcacionInfoBase"
        />
      </div>
      <div v-show="selectedAction === 9 && visible9">
        <InformationTable
          v-if="shipmentUserDifferentRegister"
          :data="shipmentUserDifferentRegister"
          :columns="tableColumnsEmbarcacionInfoRegister"
        />
      </div>
    </div>
  </div>
</template>

<script>
// apollo
import ownerWithMoreThanOneShipmentQuery from '~/apollo/queries/ownerWithMoreThanOneShipment.graphql'
import ownerWithOneShipmentQuery from '~/apollo/queries/ownerWithOneShipment.graphql'
import ownerWithDifferentNameEqualIdQuery from '~/apollo/queries/ownerWithDifferentNameEqualId.graphql'
import shipmentUserMissingInOnatQuery from '~/apollo/queries/shipmentUserMissingInOnat.graphql'
import shipmentUserMissingInSystemQuery from '~/apollo/queries/shipmentUserMissingInSystem.graphql'
import shipmentUserDifferentShipmentQuery from '~/apollo/queries/shipmentUserDifferentShipment.graphql'
import shipmentUserDifferentCaptaincyQuery from '~/apollo/queries/shipmentUserDifferentCaptaincy.graphql'
import shipmentUserDifferentBaseQuery from '~/apollo/queries/shipmentUserDifferentBase.graphql'
import shipmentUserDifferentRegisterQuery from '~/apollo/queries/shipmentUserDifferentRegister.graphql'
import shipmentQuery from '~/apollo/queries/shipment.graphql'
// Components
import InformationTable from '~/components/InformationTable'
// json loading
import tableColumnsEmbarcacion from '~/static/tableColumnsEmbarcacion.json'
import tableColumnsOnatEmbarcacion from '~/static/tableColumnsOnatEmbarcacion.json'
import registeredOne from '~/static/registeredOne.json'
import notRegisteredOne from '~/static/notRegisteredOne.json'
import tableColumnsEmbarcacionInfoShipment from '~/static/tableColumnsEmbarcacionInfoShipment.json'
import tableColumnsEmbarcacionInfoBase from '~/static/tableColumnsEmbarcacionInfoBase.json'
import tableColumnsEmbarcacionInfo from '~/static/tableColumnsEmbarcacionInfo.json'
import tableColumnsEmbarcacionInfoR from '~/static/tableColumnsEmbarcacionInfoR.json'
import tableColumnsEmbarcacionInfoCaptaincy from '~/static/tableColumnsEmbarcacionInfoCaptaincy.json'
import tableColumnsEmbarcacionInfoRegister from '~/static/tableColumnsEmbarcacionInfoRegister.json'

// import validators from '~/utils/validators'
export default {
  components: { InformationTable },
  auth: true,
  asyncData({ req }) {
    return {
      tableColumnsEmbarcacion,
      tableColumnsOnatEmbarcacion,
      registeredOne,
      notRegisteredOne,
      tableColumnsEmbarcacionInfoShipment,
      tableColumnsEmbarcacionInfoBase,
      tableColumnsEmbarcacionInfo,
      tableColumnsEmbarcacionInfoCaptaincy,
      tableColumnsEmbarcacionInfoR,
      tableColumnsEmbarcacionInfoRegister
    }
  },
  beforeMount() {
    this.$apollo.query({ query: shipmentQuery }).then(({ data }) => {
      this.shipment = data.shipment
    })
  },
  data() {
    return {
      selectedAction: null,
      ownerWithMoreThanOneShipment: [],
      ownerWithOneShipment: [],
      ownerWithDifferentNameEqualId: [],
      result: [],
      shipment: null,
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      registeredOwnersMoreThanOne: [],
      shipmentUserMissingInOnat: [],
      shipmentUserMissingInSystem: [],
      shipmentUserDifferentShipment: [],
      shipmentUserDifferentCaptaincy: [],
      shipmentUserDifferentBase: [],
      shipmentUserDifferentRegister: [],
      tableColumnsEmbarcacion,
      tableColumnsOnatEmbarcacion,
      registeredOne,
      notRegisteredOne,
      tableColumnsEmbarcacionInfoShipment,
      tableColumnsEmbarcacionInfo,
      tableColumnsEmbarcacionInfoBase,
      tableColumnsEmbarcacionInfoCaptaincy,
      tableColumnsEmbarcacionInfoR,
      tableColumnsEmbarcacionInfoRegister,
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
      loading: false,
      actions: [
        { id: 0, name: 'Mostrar todos' },
        { id: 1, name: 'Mostrar propietarios de más de una embarcación' },
        { id: 2, name: 'Mostrar propietarios con una sola embarcación' },
        {
          id: 3,
          name:
            'Mostrar propietarios con igual número de identidad y nombres diferentes'
        },
        {
          id: 4,
          name: 'Mostrar propietarios que no están registrados en el InfoGesti'
        },
        {
          id: 5,
          name:
            'Mostrar propietarios que están en el InfoGesti y no están en la BD Capitanía'
        },
        {
          id: 6,
          name:
            'Mostrar propietarios que están en ambos sistemas con embarcaciones distintas'
        },
        {
          id: 7,
          name:
            'Mostrar propietarios que están en ambos sistemas con capitania distintas'
        },
        {
          id: 8,
          name:
            'Mostrar propietarios que están en ambos sistemas con basificaciones distintas'
        },
        {
          id: 9,
          name:
            'Mostrar propietarios que están en ambos sistemas con registros distintos'
        }
      ]
    }
  },
  head() {
    return {
      title: `Embarcacion | Home`
    }
  },
  methods: {
    search() {
      this.loading = true
      this.visible1 = false
      this.visible = false
      this.visible2 = false
      this.visible3 = false
      this.visible4 = false
      this.visible5 = false
      this.visible6 = false
      this.visible7 = false
      this.visible8 = false
      this.visible9 = false
      if (this.selectedAction === 0) {
        this.loading = false
        this.visible = true
      }
      if (this.selectedAction === 1) {
        this.$apollo
          .query({ query: ownerWithMoreThanOneShipmentQuery })
          .then(data => {
            this.ownerWithMoreThanOneShipment =
              data.data.ownerWithMoreThanOneShipment
            for (
              let i = 0;
              i < this.ownerWithMoreThanOneShipment.length - 1;
              i++
            ) {
              if (
                this.ownerWithMoreThanOneShipment[i].idNumber ===
                this.ownerWithMoreThanOneShipment[i + 1].idNumber
              ) {
                let a = this.ownerWithMoreThanOneShipment[
                  i
                ].shipmentName.toUpperCase()
                a = a.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                a = a.replace(/[^\w]/g, '')
                let b = this.ownerWithMoreThanOneShipment[
                  i + 1
                ].shipmentName.toUpperCase()
                b = b.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                b = b.replace(/[^\w]/g, '')
                if (a === b) {
                  this.ownerWithMoreThanOneShipment.splice(i, 1)
                  this.ownerWithMoreThanOneShipment.splice(i, 1)
                  i--
                }
              }
            }
            this.option2 = this.ownerWithMoreThanOneShipment.slice()
            this.loading = false
            this.visible1 = true
          })
      }
      if (this.selectedAction === 2) {
        this.$apollo.query({ query: ownerWithOneShipmentQuery }).then(data => {
          this.ownerWithOneShipment = data.data.ownerWithOneShipment
          this.option1 = this.ownerWithOneShipment.slice()
          this.loading = false
          this.visible2 = true
        })
      }
      if (this.selectedAction === 3) {
        this.$apollo
          .query({ query: ownerWithDifferentNameEqualIdQuery })
          .then(data => {
            this.ownerWithDifferentNameEqualId =
              data.data.ownerWithDifferentNameEqualId
            const arr = new Set()
            for (
              let i = 0;
              i < this.ownerWithDifferentNameEqualId.length - 1;
              i++
            ) {
              if (
                this.ownerWithDifferentNameEqualId[i].idNumber ===
                this.ownerWithDifferentNameEqualId[i + 1].idNumber
              ) {
                let a = this.ownerWithDifferentNameEqualId[
                  i
                ].ownerName.toUpperCase()
                a = a.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                a = a.replace(/[^\w]/g, '')
                let b = this.ownerWithDifferentNameEqualId[
                  i + 1
                ].ownerName.toUpperCase()
                b = b.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                b = b.replace(/[^\w]/g, '')
                if (a !== b) {
                  arr.add(this.ownerWithDifferentNameEqualId[i])
                  arr.add(this.ownerWithDifferentNameEqualId[i + 1])
                }
              }
            }
            this.result = Array.from(arr)
            this.loading = false
            this.visible3 = true
          })
      }
      if (this.selectedAction === 4) {
        this.$apollo
          .query({ query: shipmentUserMissingInOnatQuery })
          .then(data => {
            this.shipmentUserMissingInOnat = data.data.shipmentUserMissingInOnat
            this.loading = false
            this.visible4 = true
          })
      }
      if (this.selectedAction === 5) {
        this.$apollo
          .query({ query: shipmentUserMissingInSystemQuery })
          .then(data => {
            this.shipmentUserMissingInSystem =
              data.data.shipmentUserMissingInSystem
            this.loading = false
            this.visible5 = true
          })
      }
      if (this.selectedAction === 6) {
        if (this.shipmentUserDifferentShipment.length === 0) {
          this.$apollo
            .query({ query: shipmentUserDifferentShipmentQuery })
            .then(data => {
              this.shipmentUserDifferentShipment =
                data.data.shipmentUserDifferentShipment
              for (
                let i = 0;
                i < this.shipmentUserDifferentShipment.length;
                i++
              ) {
                for (let j = 0; j < this.shipment.length; j++) {
                  if (
                    this.shipment[j].idNumber ===
                    this.shipmentUserDifferentShipment[i].nit
                  ) {
                    let a = this.shipment[j].shipmentName.toUpperCase()
                    a = a.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                    a = a.replace(/[^\w]/g, '')
                    let b = this.shipmentUserDifferentShipment[
                      i
                    ].embarcacion.toUpperCase()
                    b = b.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
                    b = b.replace(/[^\w]/g, '')
                    if (a === b) {
                      this.shipmentUserDifferentShipment.splice(i, 1)
                    }
                  }
                }
              }

              this.loading = false
              this.visible6 = true
            })
        } else {
          this.loading = false
          this.visible6 = true
        }
      }
      if (this.selectedAction === 7) {
        if (this.shipmentUserDifferentCaptaincy.length === 0) {
          this.$apollo
            .query({ query: shipmentUserDifferentCaptaincyQuery })
            .then(data => {
              this.shipmentUserDifferentCaptaincy =
                data.data.shipmentUserDifferentCaptaincy
              this.loading = false
              this.visible7 = true
            })
        } else {
          this.loading = false
          this.visible7 = true
        }
      }
      if (this.selectedAction === 8) {
        if (this.shipmentUserDifferentBase.length === 0) {
          this.$apollo
            .query({ query: shipmentUserDifferentBaseQuery })
            .then(data => {
              this.shipmentUserDifferentBase =
                data.data.shipmentUserDifferentBase
              this.loading = false
              this.visible8 = true
            })
        } else {
          this.loading = false
          this.visible8 = true
        }
      }
      if (this.selectedAction === 9) {
        if (this.shipmentUserDifferentRegister.length === 0) {
          this.$apollo
            .query({ query: shipmentUserDifferentRegisterQuery })
            .then(data => {
              this.shipmentUserDifferentRegister =
                data.data.shipmentUserDifferentRegister
              this.loading = false
              this.visible9 = true
            })
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">

.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms

.documentStyle
  background black
  border none
  height 40px
  border-radius 20px
  color: #ffffff
  margin-left 15px
  width 120%

.documentStyle:hover
  background #0855f5 !important
  transition background 250ms
  cursor pointer
a.pagination-link.is-current {
   background-color: #0855f5 !important
   border-color: #0855f5 !important
   color: #fff;
}
</style>
