<script setup>
defineProps({
  title: String
})
</script>

<template>
  <header
    class="px-4 py-5 bg-white text-lg text-black flex justify-between items-center md:px-8 shadow-sm"
  >
    <router-link to="/">
      <h1 class="font-bold select-none cursor-pointer">{{ title }}</h1>
    </router-link>
    <div class="flex gap-2 items-center md:gap-6">
      <slot></slot>
    </div>
  </header>
</template>
