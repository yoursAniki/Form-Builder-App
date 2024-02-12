<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>

<template>
  <header
    class="px-4 py-5 bg-white text-lg text-black flex justify-between items-center md:px-8 shadow-sm dark:bg-neutral-800 dark:text-neutral-300"
  >
    <h1 class="font-bold select-none cursor-pointer">
      <slot name="title"></slot>
    </h1>

    <div class="flex gap-2 items-center md:gap-6">
      <slot name="button"></slot>
    </div>
  </header>
</template>
