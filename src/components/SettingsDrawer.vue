<script setup>
import { inject } from 'vue'

import ModeSwitcher from './ModeSwitcher.vue'
import SettingsButton from './SettingsButton.vue'

const { closeDrawer, isDrawerOpened } = inject('drawerActions')
</script>

<template>
  <div class="z-40 fixed top-0 left-0 h-full w-full bg-black bg-opacity-70">
    <transition
      name="slide-transition"
      enter-active-class="slide-enter-active"
      leave-active-class="slide-leave-active"
    >
      <div v-show="isDrawerOpened" class="slide bg-white fixed left-0 top-0 h-full w-96 z-50 p-6">
        <div class="relative">
          <SettingsButton class="absolute" @click="closeDrawer" />
          <div class="text-center font-bold text-xl text-black pb-8">Settings</div>
          <div class="flex justify-evenly">
            <div class="text-black">Change color mode</div>
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active {
  animation: slideInRight 0.5s;
}
.slide-leave-active {
  animation: slideOutRight 0.5s;
}
@keyframes slideInRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
