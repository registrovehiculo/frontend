<template>
  <section>
    <b-field>
      <b-upload v-model="dropFiles" multiple drag-drop expanded>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Haga click aqui o arrastre el archivo</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
    <div class="columns is-centered">
      <div class="column has-text-centered">
        <b-button
          v-show="dropFiles.length > 0"
          class="is-black"
          rounded
          :loading="loading"
          @click="updateTransporteDatabase"
          >Actualizar base de datos
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import XLSX from 'xlsx'
import updatePinarDelRioDatabaseMutation from '~/apollo/mutations/updatePinarDelRioDatabase.graphql'
export default {
  layout: 'empty',
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: {},
      dropFiles: [],
      updateData: null,
      loading: false,
      updating: ''
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    updateTransporteDatabase() {
      console.log(this.active)
      this.loading = true
      this.$store.commit('loading/set', true)
      const f = this.dropFiles[0]
      const reader = new FileReader()
      const apply = this
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const dataArr = XLSX.utils.sheet_to_json(worksheet)
        apply.updateData = JSON.stringify(dataArr)
        console.log(apply.updateData)
        apply.$apollo
          .mutate({
            mutation: updatePinarDelRioDatabaseMutation,
            variables: { data: apply.updateData }
          })
          .then(({ data }) => {
            if (data.updatePinarDelRioDatabase.status === 'ok') {
              apply.$buefy.dialog.alert({
                message: 'Se actualizo la base de datos'
              })
            }
            apply.loading = false
            apply.$store.commit('loading/set', false)
          })
      }
      reader.readAsArrayBuffer(f)
    }
  }
}
</script>
