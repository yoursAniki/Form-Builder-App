<script setup>
import Header from './components/Header.vue';

</script>

<template>
  <div class="bg-slate-100">
    <Header />
    <div class="pt-12 px-24">
      <router-view></router-view>
    </div>

  </div>

</template>

<style>
html {
  background-color: rgb(241 245 249);
}
</style>
