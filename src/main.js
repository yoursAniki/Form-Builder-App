import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { store } from './store/store.js'
import App from './App.vue'

import Home from './pages/Home.vue'
import Builder from './pages/Builder.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/builder', name: 'Builder', component: Builder }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)
app.use(store)
app.use(autoAnimatePlugin)

app.mount('#app')
