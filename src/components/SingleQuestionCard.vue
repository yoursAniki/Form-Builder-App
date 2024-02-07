<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import CloseButton from './CloseButton.vue'

defineProps({
  sequenceNumber: Number
})

let countOptions = 0
const options = ref([])

const addOption = () => {
  if (countOptions >= 12) return

  options.value.push({})
  countOptions++
}

const delOption = (opt) => {
  let ind = options.value.indexOf(opt)
  if (ind !== -1) {
    options.value.splice(ind, 1)
    countOptions--
  }
}

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

onMounted(() => {
  document.querySelectorAll('#text-area').forEach((element) => {
    element.style.height = `46px`

    element.addEventListener('keydown', (e) => {
      setInterval(() => {
        e.target.style.height = `46px`
        e.target.style.height = `${e.target.scrollHeight}px`
      }, 0)
    })
  })
})
</script>

<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span class="absolute top-3 -left-4 text-lg text-slate-400 select-none">{{
        sequenceNumber
      }}</span>
      <textarea
        id="text-area"
        class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold outline-none min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300"
        type="text"
        placeholder="Click to edit prompt"
        maxlength="60"
        @keydown.enter.prevent
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
    <div class="relative basis-full grow">
      <img
        src="./icons/Single.svg"
        class="absolute top-3 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4"
      />
      <img
        ref="ignored"
        @click="toggleMenu"
        src="./icons/Group.svg"
        class="absolute top-9 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4 active:bg-slate-200 rounded"
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
      <div class="py-2 px-2 text-slate-700 outline-none resize-none flex max-w-xs flex-wrap">
        <div
          class="rounded pb-2 pt-2 mr-2 border-2 flex px-2 my-1"
          v-for="option in options"
          :key="option"
        >
          <textarea
            wrap="off"
            @keydown.enter.prevent
            class="resize-none bg-inherit outline-none overflow-hidden text-base text-black"
            name="option"
            maxlength="50"
            cols="5"
            rows="1"
          >
          </textarea>
          <CloseButton @click="delOption(option)" class="pl-1" />
        </div>
        <div
          @click="addOption"
          class="border-2 rounded p-2 cursor-pointer select-none transition active:bg-slate-200 my-1 flex justify-center items-center"
        >
          <img class="-ml-1 px-1 pr-2" src="./icons/plus.svg" alt="plus" />
          Add option
        </div>
      </div>
    </div>
  </div>
</template>
