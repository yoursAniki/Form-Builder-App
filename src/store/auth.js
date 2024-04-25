import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = 'AIzaSyDI3hwsb45M1uQvIr6LarTM71hAuRTjb4c'

// `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`

export const useAuthStore = defineStore('auth', () => {
  const signUp = async (payload) => {
    try {
      let response = axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      console.log(response.data)
    } catch (err) {
      console.log(err.response)
    }
  }
  return { signUp }
})
