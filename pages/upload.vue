<template>
  <div class="container">
    <p
      class="has-text-centered margin-top-30"
      style="font-size: 32px; font-weight: 700"
    >
      En esta página podra actualizar las bases de datos de los sistemas
    </p>
    <p class="has-text-centered margin-top-20">
      Es primordial que lea antes de realizar esta operación pues el
      funcionamiento del sistema depende de la correcta gestión de las bases
      datos.
    </p>
    <ul>
      <li>
        <p class="has-text-centered margin-top-20" style="font-size: 24px">
          Elija el sistema en la parte izquierda y lea detenidamente:
        </p>
      </li>
    </ul>
    <p
      class="has-text-centered font-size-5 margin-top-20"
      style="margin-left: 10%; color: #d60000"
    ></p>

    <p
      v-show="loadingDatabase"
      class="has-text-centered font-size-5"
      style="font-weight: bold; margin-left: 10%"
    >
      Actualizando
    </p>
    <section v-show="!loadingDatabase">
      <b-tabs vertical size="is-medium" @input="sistema">
        <b-tab-item label="Transporte" class="">
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet.
        </b-tab-item>

        <b-tab-item label="Embarcaciones" class="margin-left-50">
          <p>
            Para actualizar el sistema embarcaciones asegúrese que el nuevo
            excel tiene los siguientes campos con el nombre exacto <br />
            (Tíldes, mayúsculas):
          </p>
          <ul class="margin-top-10 margin-bottom-10" style="color: #d60000">
            <li>
              1. Prov, Propietarios, Número de registro, Embarcación, Capitanía,
              Basificación
            </li>
          </ul>
          <div>
            <p>
              a. A continuación haga click o arrastre el excel en la caja de
              abajo.
            </p>
            <p>
              b. Seguidamente le aparecerá un botón que dice actualizar base de
              datos.
            </p>
            <p>
              c. Haga click en este, y espere pacientemente. Esta operacion
              durará hasta 5 min.
            </p>
            <p>
              d. Cuando esta operación concluya se le notificara con un cartel.
            </p>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-6 is-offset-1">
              <UploaderEmbarcaciones v-show="system === 'Embarcaciones'" />
              <UploaderTransporte v-show="system === 'Transporte'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploaderEmbarcaciones from '~/components/UploaderEmbarcaciones'
import UploaderTransporte from '~/components/UploaderTransporte'
export default {
  components: { UploaderEmbarcaciones, UploaderTransporte },
  data() {
    return {
      updateData: null,
      system: 'Transporte'
    }
  },
  computed: {
    loadingDatabase() {
      return this.$store.getters['loading/get']
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
    ...mapGetters({
      getUser: 'getUser',
      getUsername: 'getUsername'
    })
  }
}
</script>

<style scoped></style>
