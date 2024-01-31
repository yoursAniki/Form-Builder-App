<script setup>
defineProps({
  sequenceNumber: Number
})
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
        src="./icons/Short.svg"
        class="absolute -left-5 text-lg font-black cursor-pointer select-none w-4 h-4"
        alt="short"
      />
      <img
        src="./icons/Group.svg"
        class="absolute top-6 -left-5 text-lg font-black cursor-pointer select-none w-4 h-4"
        alt="group"
      />
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
