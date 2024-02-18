<script setup>
import { getCurrentInstance, ref, onBeforeMount, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLightMode = store.state.isLightMode

const { emit } = getCurrentInstance()

const switchMode = () => {
  store.commit('toggleDarkMode')
}

onBeforeMount(() => {
  const savedState = localStorage.getItem('isLightMode')
  store.commit('setIsLightMode', savedState !== null ? JSON.parse(savedState) : true)
})

watchEffect(() => {
  localStorage.setItem('isLightMode', JSON.stringify(store.state.isLightMode))
})
</script>

<template>
  <div class="select-none inline-flex">
    <label class="cursor-pointer grid place-items-center">
      <input
        :checked="!isLightMode"
        type="checkbox"
        value="synthwave"
        class="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
      />
      <svg
        @click="switchMode()"
        class="col-start-1 row-start-1 stroke-base-100 fill-base-100"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        />
      </svg>
      <svg
        @click="switchMode()"
        class="col-start-2 row-start-1 stroke-base-100 fill-base-100"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  </div>
</template>
