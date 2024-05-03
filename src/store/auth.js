import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE

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

  const auth = async (payload, type) => {
    const url = type === 'signup' ? 'signUp' : 'signInWithPassword'

    loading.value = true
    error.value = ''
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${url}?key=${API_KEY}`,
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
      console.log(err.response)
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'This email is already exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        case 'Too_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too many attempts, try later'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'This email is not found'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password'
          break
        case 'USER_DISABLED':
          error.value = 'This user was disabled by admin'
          break
        default:
          error.value = 'Error'
          break
      }
      throw error.value
    } finally {
      loading.value = false
    }
  }
  return { auth, userInfo, error, loading }
})
