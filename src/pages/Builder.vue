<script setup>
import ShortTextCard from '../components/ShortTextCard.vue'
</script>

<template>
  <div class="flex justify-center text-center flex-col m-auto items-center">
    <div class="text-lg">Questions</div>
    <ShortTextCard />



    
    <div class="text-lg mt-16 pb-7">
      <div>Add New Question</div>
      <div class="flex gap-2 mt-2">
        <div class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none">
          <img src="../components/icons/Short.svg" alt="short">
          <div>Short</div>
        </div>
        <div class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none">
          <img src="../components/icons/Long.svg" alt="Long">
          <div>Long</div>
        </div>
        <div class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none">
          <img src="../components/icons/Single.svg" alt="Single">
          <div>Single</div>
        </div>
        <div class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none">
          <img src="../components/icons/Multi.svg" alt="Multi">
          <div>Multi</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>

</style>