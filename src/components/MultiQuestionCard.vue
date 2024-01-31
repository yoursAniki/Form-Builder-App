<script setup>
import { ref } from 'vue'

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
</script>

<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span class="absolute top-3 -left-3 text-lg text-slate-400 select-none">{{ sequenceNumber }}</span>
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
        src="./icons/Multi.svg"
        class="absolute top-3 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4"
      />
      <img
        src="./icons/Group.svg"
        class="absolute top-9 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4"
      />
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
          <div @click="delOption(option)" class="cursor-pointer">
            <img src="./icons/x.svg" alt="close" />
          </div>
        </div>
        <div
          @click="addOption"
          class="border-2 rounded p-2 cursor-pointer select-none transition active:bg-slate-200 my-1 flex justify-center items-center"
        >
          <img class="-ml-1" src="./icons/plus.svg" alt="plus" />
          Add option
        </div>
      </div>
    </div>
  </div>
</template>
