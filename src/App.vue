<script setup>
import { ref, onMounted, watch } from 'vue'

import ModeSwitcher from './components/ModeSwitcher.vue'

const isLight = ref(true)

const lightMode = ref('light')

const switchLightMode = () => {
  isLight.value = !isLight.value

  lightMode.value = isLight.value === true ? 'light' : 'dark'
}

onMounted(() => {
  lightMode.value = JSON.parse(localStorage.getItem('lightMode')) || 'light'
})

watch(
  lightMode,
  (newVal) => {
    localStorage.setItem('lightMode', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="bg-slate-100 min-h-screen relative dark:bg-neutral-900" :className="lightMode">
    <router-view></router-view>
  </div>
  <div class="absolute top-5 translate-x-[-50%] left-1/2">
    <ModeSwitcher @lightmode-switch="switchLightMode" />
  </div>
</template>

<style>
/* 
* Styles for scrollbar 
 */
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background: #e8e8e8;
}
::-webkit-scrollbar-thumb {
  background: #bababa;
  border-radius: 20px;
  border: 3px solid #dbdbdb;
}
</style>
