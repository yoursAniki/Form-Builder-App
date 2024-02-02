<script setup>
import CloseButton from './CloseButton.vue'
</script>

<template>
  <div class="fixed inset-0 z-10 bg-black bg-opacity-80">
    <div class="bg-white rounded max-w-sm mx-auto my-8 relative">
      <div class="p-2 select-none absolute right-0">
        <CloseButton />
      </div>
      <div class="p-6 pt-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis corporis officiis ut,
        nulla, voluptatum fugiat illo nisi voluptate quisquam, quis provident molestiae? Minus,
        laudantium eos alias eius accusantium totam dolorem?
      </div>
    </div>
  </div>
</template>

<style>
#Shape,
#Shape_2 {
  transition: stroke 0.3s ease;
}
</style>
