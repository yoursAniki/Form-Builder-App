<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import Header from '../components/Header.vue'
import BaseModal from '@/components/BaseModal.vue'
import ShortTextCard from '../components/ShortTextCard.vue'
import LongTextCard from '../components/LongTextCard.vue'
import SingleQuestionCard from '../components/SingleQuestionCard.vue'
import MultiQuestionCard from '@/components/MultiQuestionCard.vue'
import SingleQuestionIcon from '@/components/SingleQuestionIcon.vue'
import ShortTextIcon from '@/components/ShortTextIcon.vue'
import MultiQuestionIcon from '@/components/MultiQuestionIcon.vue'
import LongTextIcon from '@/components/LongTextIcon.vue'

const components = {
  ShortTextCard,
  LongTextCard,
  SingleQuestionCard,
  MultiQuestionCard
}

const cards = ref([])

const addCard = (cardName) => {
  cards.value.push({
    id: Date.now(),
    component: cardName,
    order: cards.value.length + 1,
    isRequired: false,
    options: []
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

const updateSequenceNumbers = () => {
  cards.value.forEach((card, index) => {
    card.order = index + 1
  })
}

watch(cards, () => {
  updateSequenceNumbers()
})

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const toggleRequiredRequest = (card) => {
  card.isRequired = !card.isRequired
}

const isFormEmpty = () => {
  return cardsCount.value === 0
}

const cardsCount = computed(() => {
  return cards.value.length
})

const isWarningModalOpen = ref(false)

const openWarningModal = () => {
  isWarningModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const router = useRouter()

const goHomePage = () => {
  router.push('/')
  deleteAllCards()
}

//! Здесь будет функция, принимающая в виде аргументов конкретный card из component и массив options
//* Вызывать она будет по эмиту из дочерних элементов (карточек)

const renderOptions = (opts, card) => {
  card.options = opts
}

const addOpt = (card) => {
  card.options.push({
    text: ''
  })
}
</script>

<template>
  <Header>
    <template v-slot:title>
      <router-link to="/">
        <div class="text-black dark:text-neutral-300" v-show="isFormEmpty()">SimpleForms</div>
      </router-link>
      <div
        class="text-black dark:text-neutral-300"
        v-show="!isFormEmpty()"
        @click="openWarningModal()"
      >
        SimpleForms
      </div>
    </template>

    <template v-slot:button>
      <button
        class="text-slate-500 text-xs w-16 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:text-neutral-200"
      >
        View Preview
      </button>
      <button
        class="bg-slate-950 text-xs w-14 h-10 md:rounded-md rounded transition hover:bg-slate-800 cursor-pointer active:bg-slate-700 select-none shadow md:text-lg md:w-28 md:h-10 text-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-500"
      >
        Publish
      </button>
    </template>
  </Header>

  <BaseModal
    v-if="isWarningModalOpen"
    @close="isWarningModalOpen = false"
    modalInner="Do you really want to leave this page? The changes will not be saved."
    @confirm-request="goHomePage"
  />

  <div class="bg-slate-100 min-h-screen flex-grow dark:bg-neutral-900">
    <div class="flex justify-center text-center flex-col m-auto items-center pt-12 px-8">
      <button
        v-if="cards && cards.length > 0"
        @click="openModal"
        class="text-red-500 border-2 md:rounded-md rounded transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 active:border-slate-300 select-none shadow text-lg w-36 h-10 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
      >
        Delete All
      </button>

      <!-- * Переносить строчки в modalInner во избежание выхода содержимого за рамки окна -->
      <BaseModal
        v-if="isModalOpen"
        @close="isModalOpen = false"
        modalInner="Do you really want to delete all the questions?"
        @confirm-request="deleteAllCards"
      />

      <div v-auto-animate>
        <div
          v-if="cards.length === 0"
          class="text-slate-400 text-lg py-1 px-2 mt-6 dark:text-neutral-300"
        >
          You didn't add any questions
        </div>

        <div v-auto-animate class="flex flex-col">
          <component
            v-for="card in cards"
            :key="card.id"
            :is="components[card.component]"
            :data="card"
            v-bind="card.props"
            @delete-request="deleteCard(card.id)"
            @toggle-required-request="toggleRequiredRequest(card)"
            :sequenceNumber="card.order"
            @options-update="renderOptions($event._value, card)"
            :opts="card.options"
            @add-option="addOpt(card)"
          />
        </div>
      </div>

      <div class="text-lg mt-16 pb-7">
        <div class="text-slate-700 dark:text-neutral-300">Add New Question</div>
        <div class="flex gap-2 mt-2">
          <button
            @click="addCard('ShortTextCard')"
            class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm dark:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-300 dark:text-neutral-300"
          >
            <ShortTextIcon />
            <!-- <img src="../components/icons/Short.svg" alt="short" /> -->
            <div class="text-slate-500 dark:text-neutral-300">Short</div>
          </button>
          <button
            @click="addCard('LongTextCard')"
            class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm dark:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-300 dark:text-neutral-300"
          >
            <LongTextIcon />
            <!-- <img src="../components/icons/Long.svg" alt="long" /> -->
            <div class="text-slate-500 dark:text-neutral-300">Long</div>
          </button>
          <div
            @click="addCard('SingleQuestionCard')"
            class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm dark:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-300 dark:text-neutral-300"
          >
            <SingleQuestionIcon />
            <!-- <img src="../components/icons/Single.svg" alt="single" /> -->
            <div class="text-slate-500 dark:text-neutral-300">Single</div>
          </div>
          <button
            @click="addCard('MultiQuestionCard')"
            class="border-2 rounded px-3 py-2 cursor-pointer flex items-center flex-col transition active:bg-slate-200 hover:-translate-x-1 hover:-translate-y-1 select-none hover:shadow-md shadow-sm dark:bg-neutral-800 dark:active:bg-neutral-700 dark:border-neutral-300 dark:text-neutral-300"
          >
            <MultiQuestionIcon />
            <!-- <img src="../components/icons/Multi.svg" alt="multi" /> -->
            <div class="text-slate-500 dark:text-neutral-300">Multi</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
