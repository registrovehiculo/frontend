export const state = () => ({
  tableNames: {
    active: false
  }
})

export const mutations = {
  setTableNames(state, active) {
    state.tableNames.active = active
  }
}
export const getters = {
  getTableNames: state => {
    if (state.tableNames) {
      return state.tableNames.active
    }
  }
}
