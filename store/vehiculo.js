export const state = () => ({
  vehiculo: null
})

export const mutations = {
  set(state, vehiculo) {
    state.vehiculo = vehiculo
  },
  setDatosPersona(state, datospersona) {
    state.vehiculo.datospersona = datospersona
  },
  setNumeroIdentidad(state, numeroidentidad) {
    state.vehiculo.datospersona = numeroidentidad
  }
}
export const getters = {
  get: state => {
    return state.vehiculo
  },
  getDatosPersona: state => {
    return state.vehiculo.datospersona
  },
  getNumeroIdentidad: state => {
    return state.vehiculo.numeroidentidad
  }
}
