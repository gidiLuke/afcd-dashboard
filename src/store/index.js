import { createStore } from 'vuex'

export default createStore({
  state: {
    responses: [],
  },
  mutations: {
    update(state, payload) {
      state.responses = payload
    },
  },
  actions: {},
  modules: {},
})
