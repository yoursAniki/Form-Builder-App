<!-- eslint-disable vue/multi-word-component-names -->
<script setup></script>

<template>
  <header
    class="px-4 py-5 bg-white text-lg flex justify-between items-center md:px-8 shadow-sm dark:bg-neutral-800"
  >
    <h1 class="font-bold select-none flex gap-1">
      <slot name="title"></slot>
    </h1>

    <div class="flex gap-2 items-center md:gap-6">
      <slot name="button"></slot>
    </div>
  </header>
</template>
