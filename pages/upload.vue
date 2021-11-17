<template>
  <div>
    <b-loading
      v-model="loading"
      :is-full-page="isFullPage"
      :can-cancel="false"
    ></b-loading>
    <p
      v-show="loading"
      class="has-text-centered font-size-5"
      style="margin-top: 10%"
    >
      Actualizando, por favor espere...
    </p>
    <div v-show="!loading" class="container">
      <p
        class="has-text-centered margin-top-30"
        style="font-size: 32px; font-weight: 700"
      >
        En esta página podrá actualizar las bases de datos de los sistemas
      </p>
      <p class="has-text-centered margin-top-20">
        Es primordial que lea antes de realizar esta operación pues el
        funcionamiento del sistema depende de la correcta gestión de las bases
        datos.
      </p>
      <ul>
        <li>
          <p class="has-text-centered margin-top-20" style="font-size: 24px">
            Elija el sistema en el sistema a actualizar y lea detenidamente:
          </p>
        </li>
      </ul>
      <p
        class="has-text-centered font-size-5 margin-top-20"
        style="margin-left: 10%; color: #d60000"
      ></p>
      <section>
        <b-tabs
          size="is-large"
          centered
          position="is-centered"
          class="block"
          @input="sistema"
        >
          <b-tab-item label="Transporte" class="is-centered margin-bottom-50">
            <ul>
              <li>
                <p>
                  1. Ubicar los archivos excel de las provincias dentro de el
                  disco local
                  <span style="font-weight: bold; color: #d60000">C</span>
                  dentro de una carpeta que diga
                  <span style="font-weight: bold; color: #d60000">
                    Transporte</span
                  >
                  ('C:\Transporte')
                </p>
              </li>
              <li>
                <p>
                  2. Verificar que los archivos excel sean de extensiones
                  <span style="font-weight: bold; color: #d60000">xls</span>, de
                  no ser así cambiar a dicha extensión.
                </p>
              </li>
              <li>
                <p>
                  3. Los archivos deben tener exactamente los nombres siguientes
                  de las provincias como se muestra en la imagen.
                </p>
              </li>
              <li class="margin-top-20 has-text-centered">
                <img src="~/static/province.png" />
              </li>
              <li class="margin-top-20">
                <p>
                  4. Verificar que el campo municipio no esté combinado, véase
                  imagen para mayor entendimiento
                </p>
                <div class="level">
                  <div class="level-left margin-top-20 font-size-4">
                    <p style="color: red; padding-right: 50px">
                      Manera Incorrecta
                    </p>
                    <img src="~/static/example1.png" alt="" />
                  </div>
                  <div class="level-right margin-top-20 font-size-4">
                    <p style="color: green; padding-right: 50px">
                      Manera correcta
                    </p>
                    <img src="~/static/example2.png" alt="" />
                  </div>
                </div>
              </li>
              <li style="margin-top: 30px">
                <p>
                  5. Una vez comprobado cuidadosamente, dar click en el botón
                  actualizar, al ser una base de datos tan grande el sistema
                  puede tardar hasta 1hr en actualizarse. Le recomendamos
                  realizar otros trabajos en lo que se ejecuta esta operación.
                  Al finalizar se le notificará con un cartel cuando la
                  actualización haya sido exitosa.
                </p>
              </li>
            </ul>
            <div
              class="has-text-centered margin-top-20 column is-4 is is-offset-4"
            >
              <b-button
                class="is-black changeColorR"
                rounded
                style="width: 100%"
                :loading="loading"
                @click="updateTransporteDatabase"
              >
                Actualizar
              </b-button>
            </div>
          </b-tab-item>

          <b-tab-item label="Embarcaciones" class="margin-left-30">
            <ul class="margin-top-10 margin-bottom-10">
              <li>
                <p>
                  1. Ubicar los archivos excel de las provincias dentro de el
                  disco local
                  <span style="font-weight: bold; color: #0855f5">C</span>
                  dentro de una carpeta que diga
                  <span style="font-weight: bold; color: #0855f5"
                    >Embarcaciones</span
                  >
                  ('C:\Embarcaciones')
                </p>
              </li>
              <li>
                <p>
                  2. Verificar que el archivo excel sean de extensión
                  <span style="font-weight: bold; color: #0855f5">xls</span>, de
                  no ser así cambiarla.
                </p>
              </li>
              <li>
                <p>
                  3. Renombrar el archivo excel a
                  <span style="font-weight: bold; color: #0855f5"
                    >Embarcacion</span
                  >
                  (Obvie la tílde y nótese la mayúscula)
                </p>
                <p>
                  4. Una vez comprobado cuidadosamente, dar click en el botón
                  actualizar. Esta operación puede durar hasta un minuto en
                  dependencia de la longitud del archivo excel.
                </p>
              </li>
            </ul>

            <div
              class="has-text-centered margin-top-20 column is-4 is is-offset-4"
            >
              <b-button
                class="is-black changeColorB"
                rounded
                style="width: 100%"
                :loading="loading"
                @click="updateEmbarcacionDatabase"
              >
                Actualizar
              </b-button>
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateTransporteMutation from '~/apollo/mutations/updateTransporte.graphql'
import updateEmbarcacionMutation from '~/apollo/mutations/updateEmbarcacion.graphql'
export default {
  data() {
    return {
      updateData: null,
      system: 'Transporte',
      status: null,
      loading: false
    }
  },
  head() {
    return {
      title: `Actualizar base de datos`
    }
  },
  methods: {
    sistema() {
      if (this.system === 'Transporte') {
        this.system = 'Embarcaciones'
      } else {
        this.system = 'Transporte'
      }
    },
    updateTransporteDatabase() {
      this.loading = true
      this.$apollo
        .mutate({
          mutation: updateTransporteMutation
        })
        .then(({ data }) => {
          this.status = data.updateTransporte.status
          console.log(this.status)
          if (this.status === 'ok') {
            this.$buefy.dialog.alert({
              message: 'Se actualizó la base de datos'
            })
          } else {
            this.$buefy.dialog.alert({
              message:
                'Hubo un problema en la actualización verifique que todo esté correcto e intente nuevamente'
            })
          }
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.log(error.message)
          this.$buefy.dialog.alert({
            message:
              'Hubo un problema en la actualización verifique que todo esté correcto e intente nuevamente'
          })
        })
    },
    updateEmbarcacionDatabase() {
      this.loading = true
      this.$apollo
        .mutate({
          mutation: updateEmbarcacionMutation
        })
        .then(({ data }) => {
          this.status = data.updateEmbarcacion.status
          if (this.status === 'ok') {
            this.$buefy.dialog.alert({
              message: 'Se actualizó la base de datos'
            })
          } else {
            this.$buefy.dialog.alert({
              message:
                'Hubo un problema en la actualización verifique que todo esté correcto e intente nuevamente'
            })
          }
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.log(error.message)
          this.$buefy.dialog.alert({
            message:
              'Hubo un problema en la actualización verifique que todo esté correcto e intente nuevamente'
          })
        })
    },
    ...mapGetters({
      getUser: 'auth/getUser',
      getUsername: 'auth/getUsername'
    })
  }
}
</script>

<style scoped lang="stylus">
.changeColorR:not([disabled]):hover
  background #d60000 !important
  transition background 300ms

.changeColorB:not([disabled]):hover
  background #0855f5 !important
  transition background 300ms
</style>
