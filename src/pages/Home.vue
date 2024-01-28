<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <Header title="Your forms" sectionName="Username" sectionLogin="Unsigned" />
  
  <div class="pt-12 px-24">
    <div class="flex">
      <router-link to="/builder">
        <div class="py-20 px-16 border-2 rounded text-gray-400 text-lg cursor-pointer transition hover:-translate-x-2 hover:-translate-y-2 active:bg-slate-200 select-none">+ Create a form</div>
      </router-link>
    </div>
  </div>

</template>