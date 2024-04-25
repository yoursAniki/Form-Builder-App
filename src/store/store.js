import { createStore } from 'vuex'

export const store = createStore({
  state: () => ({
    isLightMode: true
  }),
  mutations: {
    toggleDarkMode(state) {
      state.isLightMode = !state.isLightMode
    },
    setIsLightMode(state, newValue) {
      state.isLightMode = newValue
    }
  }
})