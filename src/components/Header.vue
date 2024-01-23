<script setup></script>

<template>
  <header class="px-4 py-5 bg-white text-lg text-black flex justify-between items-center md:px-8">
    <router-link to="/">
      <h1 class="font-bold select-none cursor-pointer">SimpleForms</h1>
    </router-link>
    <div class="flex gap-2 items-center md:gap-6">
      <div>Username</div>
      <button
        class="text-xs w-14 h-8 border-2 rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none md:text-lg md:w-28 md:h-10"
      >
        Log out
      </button>
    </div>
  </header>
</template>
