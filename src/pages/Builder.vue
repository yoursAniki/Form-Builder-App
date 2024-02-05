<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import Header from '../components/Header.vue'
import BaseModal from '@/components/BaseModal.vue'
import ShortTextCard from '../components/ShortTextCard.vue'
import LongTextCard from '../components/LongTextCard.vue'
import SingleQuestionCard from '../components/SingleQuestionCard.vue'
import MultiQuestionCard from '@/components/MultiQuestionCard.vue'

const cards = ref([])

const addCard = (cardName) => {
  cards.value.push({
    id: Date.now(),
    component: cardName,
    order: cards.value.length + 1,
    isRequired: false
  })
}

onMounted(() => {
  cards.value = JSON.parse(localStorage.getItem('cards')) || []
})

watch(
  cards,
  (newVal) => {
    localStorage.setItem('cards', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)

const deleteCard = (cardId) => {
  const index = cards.value.findIndex((comp) => comp.id === cardId)

  if (index !== -1) {
    cards.value.splice(index, 1)
    updateSequenceNumbers()
    localStorage.setItem('cards', JSON.stringify(cards.value))
  }
}

const deleteAllCards = () => {
  cards.value.splice(0, cards.value.length)
  localStorage.setItem('cards', JSON.stringify(cards.value))
}

const isModalOpen = ref(false)

const updateSequenceNumbers = () => {
  cards.value.forEach((card, index) => {
    card.order = index + 1
  })
}

watch(cards, () => {
  updateSequenceNumbers()
})

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const toggleRequiredRequest = (card) => {
  card.isRequired = !card.isRequired
}
</script>

<template>
  <Header>
    <template v-slot:title>SimpleForms</template>

    <template v-slot:button>
      <button
        class="text-xs w-16 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10"
      >
        View Preview
      </button>
      <button
        class="bg-slate-950 text-xs w-14 h-10 md:rounded-md rounded transition hover:bg-slate-800 cursor-pointer active:bg-slate-700 select-none shadow md:text-lg md:w-28 md:h-10 text-white"
      >
        Publish
      </button>
    </template>
  </Header>

  <div class="flex justify-center text-center flex-col m-auto items-center pt-12 px-8">
    <button
      @click="openModal"
      class="text-red-500 border-2 md:rounded-md rounded transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 active:border-slate-300 select-none shadow text-lg w-36 h-10"
    >
      Delete All
    </button>

    <!-- Переносить строчки в modalInner во избежание выхода содержимого за рамки окна -->
    <BaseModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
      modalInner="Do you really want to delete all the questions?"
      @confirm-request="deleteAllCards"
    />

    <div v-if="cards && cards.length > 0" class="flex flex-col">
      <component
        v-for="card in cards"
        :key="card.id"
        :is="card.component"
        :data="card"
        v-bind="card.props"
        @delete-request="deleteCard(card.id)"
        @toggle-required-request="toggleRequiredRequest(card)"
        :sequenceNumber="card.order"
      />
    </div>
    <div v-else class="text-slate-400 text-lg py-1 px-2 mt-16 border-2 border-slate-300">
      You didn't add any questions
    </div>

    <div class="text-lg mt-16 pb-7">
      <div>Add New Question</div>
      <div class="flex gap-2 mt-2">
        <button
          @click="addCard(ShortTextCard)"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm"
        >
          <img src="../components/icons/Short.svg" alt="short" />
          <div>Short</div>
        </button>
        <button
          @click="addCard(LongTextCard)"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm"
        >
          <img src="../components/icons/Long.svg" alt="long" />
          <div>Long</div>
        </button>
        <div
          @click="addCard(SingleQuestionCard)"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm"
        >
          <img src="../components/icons/Single.svg" alt="single" />
          <div>Single</div>
        </div>
        <button
          @click="addCard(MultiQuestionCard)"
          class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm"
        >
          <img src="../components/icons/Multi.svg" alt="multi" />
          <div>Multi</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
