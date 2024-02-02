<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

import CloseButton from './CloseButton.vue'

defineProps({
  modalInner: String
})

const { emit } = getCurrentInstance()

const closeModal = () => {
  isOpen.value = false
  setTimeout(() => emit('close'), 100)
}

const modal = ref(null)

// Автофокус на окне для возможности закрытия нажитием клавиш (Esc, Enter)
onMounted(() => {
  modal.value.focus()
})

const isOpen = ref(true)

const confirmation = () => {
  closeModal()
  emit('confirm-request')
}
</script>

<template>
  <div
    @keydown.esc="closeModal"
    @keydown.enter="confirmation"
    tabindex="-1"
    ref="modal"
    class="fixed inset-0 z-10"
  >
    <transition
      appear
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-80"></div>
    </transition>

    <div v-if="isOpen" class="bg-white rounded max-w-sm mx-auto my-8 relative">
      <div class="p-2 absolute right-0">
        <CloseButton @click="closeModal" />
      </div>
      <div class="p-6 pt-10 pb-1 text-center">
        {{ modalInner }}
      </div>
      <div class="p-3 flex justify-center gap-3">
        <button
          @click="closeModal"
          class="text-red-500 w-20 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 active:border-slate-300 select-none shadow text-lg"
        >
          No
        </button>
        <button
          @click="confirmation"
          class="text-green-500 w-20 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 active:border-slate-300 select-none shadow text-lg"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<style>
#Shape,
#Shape_2 {
  transition: stroke 0.2s linear;
}
</style>
