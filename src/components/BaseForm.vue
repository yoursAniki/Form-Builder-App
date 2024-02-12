<script setup>
import TrashButton from '@/components/TrashButton.vue'
</script>

<template>
  <div
    class="bg-white whitespace-nowrap border-2 rounded select-none shadow-md hover:shadow-lg w-72 h-48 overflow-hidden dark:bg-neutral-900"
  >
    <div class="flex flex-col min-h-full">
      <div class="m-3 mx-4 flex-auto">
        <!-- Name of the form -->
        <div
          class="font-bold text-xl text-black text-wrap truncate select-text dark:text-neutral-100"
        >
          <slot name="title"></slot>
        </div>
        <!-- Date of update -->
        <div class="text-sm mt-1 text-slate-400 dark:text-neutral-400">
          <slot name="date"></slot>
        </div>
      </div>
      <div class="m-3 mx-4 flex justify-between">
        <button
          class="transition text-slate-400 bg-slate-100 rounded p-1 px-2 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300"
        >
          PUBLISHED
        </button>

        <TrashButton />
      </div>
    </div>
  </div>
</template>
