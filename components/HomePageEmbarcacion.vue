<template>
  <div>
    <div class="container">
      <div class="columns is-centered">
        <div class="level margin-top-40">
          <div class="level-left">
            <b-field type="is-warning">
              <b-select
                v-model="selectedAction"
                dropdown-position="bottom"
                placeholder="Acciones..."
                @input="resetSelect()"
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
          <div class="level-right margin-left-20">
            <b-button
              type="is-black"
              rounded
              :disabled="selectedAction === null"
              :loading="loading"
              class="changeColorB"
              @click="search()"
              >Buscar</b-button
            >
          </div>
          <div class="level-right margin-left-20"></div>
        </div>
      </div>
      <div
        v-show="selectedAction === 1 && visible1"
        class="columns is-centered"
      >
        <div class="column has-text-centered margin-top-20">
          <b-checkbox
            v-model="checkbox"
            type="is-warning"
            @input="registeredOnatMoreThanOneShipment"
          >
            {{ 'Comparar con la base de datos de la onat' }}
          </b-checkbox>
        </div>
      </div>
      <div
        v-show="selectedAction === 2 && visible2"
        class="columns is-centered"
      >
        <div class="column has-text-centered margin-top-20">
          <b-checkbox
            v-model="checkbox2"
            type="is-warning"
            @input="registeredOnatOneShipment"
          >
            {{ 'Comparar con la base de datos de la onat' }}
          </b-checkbox>
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
      <div class="margin-top-20">
        <div v-show="selectedAction === 0 && visible">
          <InformationTable
            v-if="shipment"
            :data="shipment"
            :columns="tableColumnsEmbarcacion"
          />
        </div>
        <div v-show="selectedAction === 1 && visible1 && !checkbox">
          <InformationTable
            v-if="ownerWithMoreThanOneShipment"
            :data="ownerWithMoreThanOneShipment"
            :columns="tableColumnsEmbarcacion"
          />
        </div>

        <div v-show="selectedAction === 2 && visible2 && !checkbox2">
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
      </div>
    </div>
    <div
      v-if="checkbox && selectedAction === 1"
      class="row is-flex padding-left-30 padding-right-30"
    >
      <div class="column has-text-centered">
        <b class="font-size-4" style="color: #0855f5"> {{ 'Registrados' }}</b>
        <InformationTable
          v-if="registered"
          :data="registered"
          :columns="tableColumnsEmbarcacion"
          class="margin-top-20"
        />
      </div>
      <div class="column has-text-centered">
        <b class="font-size-4" style="color: #0855f5">
          {{ 'No registrados' }}</b
        >
        <vue-excel-xlsx
          v-if="notRegistered"
          :data="notRegistered"
          :columns="tableColumnsEmbarcacion"
          filename="no registrados de mas de una embarcacion"
          sheetname="no registrados"
          class="documentStyle"
        >
          <b>Exportar</b>
        </vue-excel-xlsx>
        <InformationTable
          v-if="notRegistered"
          :data="notRegistered"
          :columns="tableColumnsEmbarcacion"
          class="margin-top-20"
        />
      </div>
    </div>
    <div
      v-if="checkbox2 && selectedAction === 2"
      class="row is-flex padding-left-30 padding-right-30"
    >
      <div class="column has-text-centered">
        <b class="font-size-4" style="color: #0855f5"> {{ 'Registrados' }}</b>
        <InformationTable
          v-if="registeredOne"
          :data="registeredOne"
          :columns="tableColumnsEmbarcacion"
          class="margin-top-20"
        />
      </div>
      <div class="column has-text-centered">
        <b class="font-size-4" style="color: #0855f5">
          {{ 'No registrados' }}</b
        >
        <vue-excel-xlsx
          v-if="notRegisteredOne"
          :data="notRegisteredOne"
          :columns="tableColumnsEmbarcacion"
          filename="no registrados de una embarcacion"
          sheetname="no registrados"
          class="documentStyle"
        >
          <b>Exportar</b>
        </vue-excel-xlsx>
        <InformationTable
          v-if="notRegisteredOne"
          :data="notRegisteredOne"
          :columns="tableColumnsEmbarcacion"
          class="margin-top-20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ownerWithMoreThanOneShipmentQuery from '~/apollo/queries/ownerWithMoreThanOneShipment.graphql'
import registeredOwnersMoreThanOneQuery from '~/apollo/queries/registeredOwnersMoreThanOne.graphql'
import ownerWithOneShipmentQuery from '~/apollo/queries/ownerWithOneShipment.graphql'
import registeredOwnersOneQuery from '~/apollo/queries/registeredOwnersOne.graphql'
import ownerWithDifferentNameEqualIdQuery from '~/apollo/queries/ownerWithDifferentNameEqualId.graphql'
import shipmentQuery from '~/apollo/queries/shipment.graphql'
import InformationTable from '~/components/InformationTable'
import tableColumnsEmbarcacion from '~/static/tableColumnsEmbarcacion.json'
import tableColumnsOnatEmbarcacion from '~/static/tableColumnsOnatEmbarcacion.json'
import registeredOne from '~/static/registeredOne.json'
import notRegisteredOne from '~/static/notRegisteredOne.json'

// import validators from '~/utils/validators'
export default {
  components: { InformationTable },
  auth: true,
  asyncData({ req }) {
    return {
      tableColumnsEmbarcacion,
      tableColumnsOnatEmbarcacion,
      registeredOne,
      notRegisteredOne
    }
  },
  data() {
    return {
      selectedAction: null,
      ownerWithMoreThanOneShipment: [],
      ownerWithOneShipment: [],
      ownerWithDifferentNameEqualId: [],
      registeredOwnersMoreThanOne: [],
      registeredOwnersOne: [],
      result: [],
      shipment: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      tableColumnsEmbarcacion,
      tableColumnsOnatEmbarcacion,
      registeredOne,
      notRegisteredOne,
      radio: null,
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      registered: null,
      notRegistered: null,
      registeredOwners: [],
      asd: [],
      founded: false,
      checkbox: false,
      checkbox2: false,
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      checkboxLoading: false,
      loadingPage: true,
      loadedRegistered: false,
      actions: [
        { id: 0, name: 'Mostrar todos' },
        { id: 1, name: 'Mostar propietarios de mas de una embarcacion' },
        { id: 2, name: 'Mostar propietarios con una sola embarcacion' },
        {
          id: 3,
          name:
            'Mostar propietarios con igual numero de identidad y nombres diferentes'
        }
      ]
    }
  },
  head() {
    return {
      title: `Embarcacion | Home`
    }
  },
  beforeMount() {
    this.$apollo
      .query({ query: registeredOwnersMoreThanOneQuery })
      .then(data => {
        this.registeredOwnersMoreThanOne = data.data.registeredOwnersMoreThanOne
      })
    this.$apollo.query({ query: registeredOwnersOneQuery }).then(data => {
      this.registeredOwnersOne = data.data.registeredOwnersOne
    })
  },
  methods: {
    search() {
      this.loading = true
      this.visible1 = false
      this.visible = false
      this.visible2 = false
      this.visible3 = false
      if (this.selectedAction === 0) {
        this.loading = true
        this.$apollo.query({ query: shipmentQuery }).then(data => {
          this.shipment = data.data.shipment
          this.loading = false
          this.visible = true
        })
      }
      if (this.selectedAction === 1) {
        this.$apollo
          .query({ query: ownerWithMoreThanOneShipmentQuery })
          .then(data => {
            this.ownerWithMoreThanOneShipment =
              data.data.ownerWithMoreThanOneShipment
            console.log(this.ownerWithMoreThanOneShipment.length)
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
    },
    // 444 215
    registeredOnatMoreThanOneShipment() {
      this.checkboxLoading = true
      if (this.notRegistered === null || this.registered === null) {
        this.notRegistered = []
        this.registered = []
        const arr = new Set()
        const arr1 = new Set()
        const len = this.option2.length
        for (let i = 0; i < len; i++) {
          if (
            this.registeredOwnersMoreThanOne.some(
              e => e.idNumber === this.option2[i].idNumber
            )
          ) {
            arr.add(this.option2[i])
          } else {
            arr1.add(this.option2[i])
          }
        }
        this.notRegistered = Array.from(arr1)
        this.registered = Array.from(arr)
        this.checkboxLoading = false
      }
    },
    registeredOnatOneShipment() {
      this.checkboxLoading = true
      this.registeredOne = registeredOne
      this.notRegisteredOne = notRegisteredOne
      // if (this.registeredOne === null || this.notRegisteredOne === null) {
      //   this.notRegisteredOne = []
      //   this.registeredOne = []
      //   const arr = new Set()
      //   const arr2 = new Set()
      //   const len = this.option1.length
      //   for (let i = 0; i < len; i++) {
      //     if (
      //       this.registeredOwnersOne.some(
      //         e => e.idNumber === this.option1[i].idNumber
      //       )
      //     ) {
      //       arr.add(this.option1[i])
      //     } else {
      //       arr2.add(this.option1[i])
      //     }
      //   }
      //   this.notRegisteredOne = Array.from(arr2)
      //   this.registeredOne = Array.from(arr)
      this.checkboxLoading = false
    },
    resetSelect() {
      this.checkbox2 = false
      this.checkbox = false
    }
  }
}
</script>

<style scoped lang="stylus">

@keyframes spinner {
  to {transform: rotate(360deg);}
}
.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms
.documentStyle
  background black
  border none
  height 40px
  border-radius 20px
  color: #ffffff
  width 15%
  margin-left 50px
.documentStyle:hover
  background #0855f5 !important
  transition background 250ms
  cursor pointer
.spinner:before {
  content: ''
  box-sizing: border-box
  position: absolute
  top: 50%
  left: 50%
  width: 40px
  height: 40px
  margin-top: -10px
  margin-left: -10px
  border-radius: 50%
  border: 2px solid #ccc
  border-top-color: #0855f5
  animation: spinner .6s linear infinite
}
</style>
