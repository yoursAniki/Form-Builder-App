<script setup>
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useStore } from 'vuex'

import ModeSwitcher from './components/ModeSwitcher.vue'

onBeforeMount(() => {
  const savedState = localStorage.getItem('isLightMode')
  store.commit('setIsLightMode', savedState !== null ? JSON.parse(savedState) : true)
})

const store = useStore()

const lightMode = computed(() => {
  return store.state.isLightMode ? 'light' : 'dark'
})
</script>

<template>
  <div class="bg-slate-100 min-h-screen relative dark:bg-neutral-900" :className="lightMode">
    <router-view></router-view>
  </div>
  <div class="absolute top-5 translate-x-[-50%] left-1/2">
    <ModeSwitcher />
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
