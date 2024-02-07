<script setup></script>

<template>
  <div class="bg-slate-100">
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
html {
  background-color: rgb(241 245 249);
  height: 100%;
}

/* Styles scrollbar */
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background: #e8e8e8;
}
::-webkit-scrollbar-thumb {
  background: #bababa;
  border-radius: 20px;
  border: 3px solid #dbdbdb;
}
</style>
