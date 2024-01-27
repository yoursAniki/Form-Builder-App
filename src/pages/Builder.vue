<script setup>
import { ref, computed } from 'vue'

import Header from '../components/Header.vue'
import ShortTextCard from '../components/ShortTextCard.vue'
import LongTextCard from '../components/LongTextCard.vue'
import SingleQuestionCard from '../components/SingleQuestionCard.vue';

const cards = ref([])
const longCards = ref([])
const singleCards = ref([])

let num = 1

const addCard = () => {
  cards.value.push({
    number: num
  })
  num++
}
const addLongCard = () => {
  longCards.value.push({
    number: num
  })
  num++
}
const addSingleCard = () => {
  singleCards.value.push({
    number: num
  })
  num++
}
// const amountOfCards = computed(() => cards.value.length + longCards.value.length)
</script>

<template>
  <Header title="SimpleForms" sectionName="View Preview" sectionLogin="Publish"/>


  <div class="flex justify-center text-center flex-col m-auto items-center pt-12">
    <div class="text-lg">Questions</div>
    <ShortTextCard :number="card.number" v-for="card in cards" :key="card" />
    <LongTextCard :number="longCard.number" v-for="longCard in longCards" :key="longCard" />
    <SingleQuestionCard v-for="singleCard in singleCards" :key="singleCard" />
    
    <div class="text-lg mt-16 pb-7">
      <div>Add New Question</div>
      <div class="flex gap-2 mt-2">
        <div
          @click="addCard"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none"
        >
          <img src="../components/icons/Short.svg" alt="short" />
          <div>Short</div>
        </div>
        <div
          @click="addLongCard"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none"
        >
          <img src="../components/icons/Long.svg" alt="long" />
          <div>Long</div>
        </div>
        <div
          @click="addSingleCard"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none"
        >
          <img src="../components/icons/Single.svg" alt="single" />
          <div>Single</div>
        </div>
        <div
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none"
        >
          <img src="../components/icons/Multi.svg" alt="multi" />
          <div>Multi</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
