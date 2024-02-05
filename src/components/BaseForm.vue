<script setup>
import TrashButton from '@/components/TrashButton.vue'
</script>

<template>
  <div
    class="bg-white whitespace-nowrap border-2 rounded text-gray-400 transition select-none shadow-md hover:shadow-lg w-72 h-48"
  >
    <div class="flex flex-col min-h-full">
      <div class="m-3 mx-4 flex-auto">
        <!-- Name of the form -->
        <div class="font-bold select-none text-xl text-black text-wrap">My firstвавав</div>
        <!-- Date of update -->
        <div class="text-sm mt-1 text-slate-400">Updated 2 days ago</div>
      </div>
      <div class="m-3 mx-4 flex justify-between">
        <button class="bg-slate-100 rounded p-1 px-2 hover:bg-slate-200 transition">
          PUBLISHED
        </button>

        <TrashButton />
      </div>
    </div>
  </div>
</template>
