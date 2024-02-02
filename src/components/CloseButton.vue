<script setup>
import { ref } from 'vue'

const closeColor = ref('#CCCCCC')
const isHovered = ref(false)

const hoverChangeColor = (hovered) => {
  isHovered.value = hovered
  closeColor.value = hovered ? '#878787' : '#CCCCCC'
}

const clickChangeColor = () => {
  closeColor.value = 'black'

  setTimeout(() => {
    closeColor.value = '#878787'
  }, 145)
}
</script>

<template>
  <button class="select-none cursor-pointer active:stroke-slate-900">
    <svg
      v-bind:class="{ hover: isHovered }"
      @click="clickChangeColor"
      v-on:mouseover="hoverChangeColor(true)"
      v-on:mouseout="hoverChangeColor(false)"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="feather-icon / x">
        <path
          id="Shape"
          d="M18 6L6 18"
          :stroke="closeColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Shape_2"
          d="M6 6L18 18"
          :stroke="closeColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </button>
</template>
