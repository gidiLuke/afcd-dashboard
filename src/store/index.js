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
  getters: {
    faulty: (state) =>
      state.responses.filter((response) => response.markedUrl != ''),
    galleryItems: (state) =>
      state.responses.map((i) => {
        return {
          src: i.markedUrl == '' ? i.originalUrl : i.markedUrl,
          thumbnail: i.markedUrl == '' ? i.originalUrl : i.markedUrl,
          w: 640,
          h: 480,
        }
      }),
  },
  actions: {},
  modules: {},
})
