<script setup>
import { ref, getCurrentInstance } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

defineProps({
  sequenceNumber: Number
})

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const { emit } = getCurrentInstance()

const deleteCard = () => {
  emit('delete-request')
}

const ignored = ref()

const closeMenu = [
  () => {
    showMenu.value = false
  },
  { ignore: [ignored] }
]

const isRequired = ref(false)

const requiredText = ref('Enforce answer')

const toggleRequiredRequest = () => {
  toggleMenu()
  isRequired.value = !isRequired.value
  if (isRequired.value === true) {
    requiredText.value = 'Neglect answer'
  } else {
    requiredText.value = 'Enforce answer'
  }
  emit('toggle-required-request')
}

const showRequiredText = ref(false)
</script>
<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span class="absolute top-3 -left-4 text-lg text-slate-400 select-none">{{
        sequenceNumber
      }}</span>
      <textarea
        @keydown.enter.prevent
        class="w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold min-w-64 max-h-16 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300"
        type="text"
        placeholder="Click to edit prompt"
        maxlength="30"
        rows="2"
      ></textarea>
      <img
        v-show="isRequired"
        @mouseover="showRequiredText = true"
        @mouseleave="showRequiredText = false"
        class="absolute right-0 top-0 select-none"
        src="./icons/Enforced.svg"
        alt="is required"
      />
      <div
        v-show="showRequiredText"
        class="text-sm text-slate-400 absolute -top-4 right-6 text-nowrap"
      >
        (This question will be required for users)
      </div>
    </div>
    <div class="relative">
      <img
        src="./icons/Long.svg"
        class="absolute -left-5 text-lg font-black cursor-pointer select-none w-4 h-4"
        alt="long"
      />
      <img
        ref="ignored"
        @click="toggleMenu"
        src="./icons/Group.svg"
        class="absolute top-6 -left-5 text-lg font-black cursor-pointer select-none w-4 h-4 active:bg-slate-200 rounded"
        alt="group"
      />
      <div
        v-on-click-outside="closeMenu"
        v-show="showMenu"
        class="absolute sm:top-7 sm:-left-44 top-7 left-0 text-start select-none rounded bg-white py-1 transition"
      >
        <div class="flex flex-col">
          <button
            @click="toggleRequiredRequest"
            class="text-left py-1 min-w-36 pl-3 text-black transition hover:bg-slate-200 cursor-pointer active:bg-slate-300"
          >
            {{ requiredText }}
          </button>
          <button
            @click="deleteCard"
            class="text-left py-1 min-w-36 pl-3 text-red-600 transition hover:bg-slate-200 cursor-pointer active:bg-slate-300"
          >
            Delete
          </button>
        </div>
      </div>
      <textarea
        @keydown.enter.prevent
        class="w-full py-2 px-2 bg-slate-200 placeholder:text-slate-500 outline-none rounded resize-none transition focus:text-slate-950 text-slate-400"
        type="text"
        placeholder="Click to add placeholder text"
        maxlength="100"
        rows="4"
      ></textarea>
    </div>
  </div>
</template>