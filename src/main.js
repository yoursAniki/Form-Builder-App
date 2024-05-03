import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { store } from './store/store.js'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import App from './App.vue'

import Home from './pages/Home.vue'
import Builder from './pages/Builder.vue'
import Preview from './pages/Preview.vue'
import SignUp from './pages/SignUp.vue'
import SignIn from './pages/SignIn.vue'

const firebaseConfig = {
  apiKey: 'AIzaSyDI3hwsb45M1uQvIr6LarTM71hAuRTjb4c',
  authDomain: 'simpleforms-9c334.firebaseapp.com',
  projectId: 'simpleforms-9c334',
  storageBucket: 'simpleforms-9c334.appspot.com',
  messagingSenderId: '677747438406',
  appId: '1:677747438406:web:df3e6a404406d0a3ea6b47'
}

initializeApp(firebaseConfig)

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/builder', name: 'Builder', component: Builder },
  { path: '/preview', name: 'Preview', component: Preview },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/signin', name: 'SignIn', component: SignIn }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)
app.use(store)
app.use(createPinia())
app.use(autoAnimatePlugin)

app.mount('#app')
