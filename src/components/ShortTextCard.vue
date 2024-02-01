<script setup>
import { ref, getCurrentInstance } from 'vue'

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
</script>
<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span class="absolute top-3 -left-4 text-lg text-slate-400 select-none ">{{
        sequenceNumber
      }}</span>
      <textarea
        @keydown.enter.prevent
        class="w-full py-2 px-2 bg-inherit transition focus:border-none focus:bg-slate-200 mb-1 text-2xl font-bold outline-none min-w-64 max-h-16 rounded resize-none"
        type="text"
        placeholder="Click to edit prompt"
        maxlength="30"
        rows="2"
      ></textarea>
    </div>
    <div class="relative">
      <img
        src="./icons/Short.svg"
        class="absolute -left-5 text-lg font-black cursor-pointer select-none w-4 h-4"
        alt="short"
      />
      <img
        @click="toggleMenu"
        src="./icons/Group.svg"
        class="absolute top-6 -left-5 text-lg font-black cursor-pointer select-none w-4 h-4 active:bg-slate-200 rounded"
        alt="group"
      />
      <div
        v-show="showMenu"
        class="absolute top-7 -left-44 text-start select-none rounded bg-white py-1 transition"
      >
        <div class="flex flex-col">
          <button
            class="text-left py-1 min-w-36 pl-3 text-black transition hover:bg-slate-200 cursor-pointer active:bg-slate-300"
          >
            Enforce Answer
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
        class="w-full py-2 px-2 bg-slate-200 text-slate-700 placeholder:text-slate-500 outline-none rounded resize-none"
        type="text"
        placeholder="Click to add placeholder text"
        maxlength="25"
        rows="1"
      ></textarea>
    </div>
  </div>
</template>
