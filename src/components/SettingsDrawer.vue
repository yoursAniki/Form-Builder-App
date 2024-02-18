<script setup>
import { inject, ref, onMounted } from 'vue'

import ModeSwitcher from './ModeSwitcher.vue'
import SettingsButton from './SettingsButton.vue'

const { closeDrawer, isDrawerOpened } = inject('drawerActions')

const drawer = ref(null)

onMounted(() => {
  drawer.value.focus()
  console.log(drawer.value.focus())
  window.addEventListener('keydown', handleEscKey)
})

const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closeDrawer()
  }
}
</script>

<template>
  <div @keydown.esc="closeDrawer()" tabindex="-1" ref="drawer" class="fixed inset-0 z-10">
    <div
      v-show="isDrawerOpened"
      @click="closeDrawer"
      class="fixed inset-0 h-full w-full bg-black bg-opacity-70"
    ></div>
    <transition
      name="slide-transition"
      enter-active-class="slide-enter-active"
      leave-active-class="slide-leave-active"
    >
      <div v-show="isDrawerOpened" class="slide bg-white fixed left-0 top-0 h-full w-96 z-20 p-6">
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
