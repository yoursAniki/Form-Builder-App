import { createStore } from 'vuex'
import { defineStore } from 'pinia'

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

export const useAuthStore = defineStore('auth', () => {
  
})