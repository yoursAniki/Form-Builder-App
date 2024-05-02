import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = 'AIzaSyDI3hwsb45M1uQvIr6LarTM71hAuRTjb4c'

// `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const error = ref('')
  const loading = ref(false)

  const signUp = async (payload) => {
    loading.value = true
    error.value = ''
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      console.log(response.data)
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'This email is already exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        default:
          error.value = 'Error'
          break
      }
      console.log(err.response)
    } finally {
      loading.value = false
    }
  }
  return { signUp, userInfo, error, loading }
})
