<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/Header.vue'
import BaseModal from '@/components/BaseModal.vue'

const router = useRouter()

const cards = ref([])

onMounted(() => {
  const storedCards = localStorage.getItem('cards')
  if (storedCards) {
    cards.value = JSON.parse(storedCards)
  }
})

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

const deleteAllCards = () => {
  cards.value.splice(0, cards.value.length)
  localStorage.setItem('cards', JSON.stringify(cards.value))
}

const goHomePage = () => {
  router.push('/')
  deleteAllCards()
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
      <router-link to="/builder">
        <button
          class="text-slate-500 text-xs w-16 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:text-neutral-200"
        >
          Edit questions
        </button>
      </router-link>
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
    <div
      class="flex justify-center text-center flex-col m-auto items-center pt-12 px-8 gap-7 pb-14"
    >
      <div v-for="card in cards" :key="card.id" class="flex flex-col">
        <div v-if="card.component === 'ShortTextCard'" class="flex flex-col relative">
          <div
            class="absolute top-3 -left-4 text-lg text-slate-400 select-none dark:text-neutral-50"
          >
            {{ card.order }}
          </div>
          <textarea
            v-model="card.title"
            disabled
            id="text-area"
            class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100"
            type="text"
            maxlength="60"
            @keydown.enter.prevent
          ></textarea>
          <img
            v-show="card.isRequired"
            class="absolute right-0 top-0 select-none"
            src="/src/components/icons/Enforced.svg"
            alt="is required"
          />
          <textarea
            @keydown.enter.prevent
            :placeholder="card.placeholder"
            id="text-area"
            class="overflow-hidden w-full py-2 px-2 bg-slate-200 placeholder:text-slate-500 outline-none rounded resize-none transition text-slate-950 dark:text-neutral-950"
            type="text"
            maxlength="50"
          ></textarea>
        </div>
        <div v-if="card.component === 'LongTextCard'" class="flex flex-col relative">
          <div
            class="absolute top-3 -left-4 text-lg text-slate-400 select-none dark:text-neutral-50"
          >
            {{ card.order }}
          </div>
          <textarea
            v-model="card.title"
            disabled
            id="text-area"
            class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100"
            type="text"
            maxlength="60"
            @keydown.enter.prevent
          ></textarea>
          <img
            v-show="card.isRequired"
            class="absolute right-0 top-0 select-none"
            src="/src/components/icons/Enforced.svg"
            alt="is required"
          />
          <textarea
            :placeholder="card.placeholder"
            @keydown.enter.prevent
            class="h-28 overflow-hidden w-full py-2 px-2 bg-slate-200 placeholder:text-slate-500 outline-none rounded resize-none transition text-slate-950 dark:text-neutral-950"
            type="text"
            maxlength="100"
          ></textarea>
        </div>
        <div v-if="card.component === 'SingleQuestionCard'" class="flex flex-col relative">
          <div
            class="absolute top-3 -left-4 text-lg text-slate-400 select-none dark:text-neutral-50"
          >
            {{ card.order }}
          </div>
          <textarea
            v-model="card.title"
            disabled
            id="text-area"
            class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold outline-none min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100"
            type="text"
            maxlength="60"
            @keydown.enter.prevent
          ></textarea>
          <img
            v-show="card.isRequired"
            class="absolute right-0 top-0 select-none"
            src="/src/components/icons/Enforced.svg"
            alt="is required"
          />

          <div
            class="rounded pb-2 pt-2 mr-2 border-2 flex px-2 my-1"
            v-for="option in card.options"
            :key="option"
          >
            <form class="flex">
              <input
                tabindex="-1"
                type="radio"
                class="cursor-pointer resize-none bg-inherit outline-none overflow-hidden text-base text-black dark:text-white"
                :name="'options_' + option.id"
                :value="option.text"
                :id="'option_' + option.id"
                v-model="card.selectedOption"
              />
              <label class="text-black pl-2 dark:text-white" :for="'option_' + option.id">{{
                option.text
              }}</label>
            </form>
          </div>
        </div>
        <div v-if="card.component === 'MultiQuestionCard'" class="flex flex-col relative">
          <div
            class="absolute top-3 -left-4 text-lg text-slate-400 select-none dark:text-neutral-50"
          >
            {{ card.order }}
          </div>
          <textarea
            v-model="card.title"
            disabled
            id="text-area"
            class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold outline-none min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100"
            type="text"
            maxlength="60"
            @keydown.enter.prevent
          ></textarea>
          <img
            v-show="card.isRequired"
            class="absolute right-0 top-0 select-none"
            src="/src/components/icons/Enforced.svg"
            alt="is required"
          />

          <div
            class="rounded pb-2 pt-2 mr-2 border-2 flex px-2 my-1"
            v-for="option in card.options"
            :key="option"
          >
            <form class="flex">
              <input
                type="checkbox"
                class="cursor-pointer resize-none bg-inherit outline-none overflow-hidden text-base text-black dark:text-white"
                :name="'options_' + option.id"
                :value="option.text"
                :id="'option_' + option.id"
              />
              <label class="text-black pl-2 dark:text-white" :for="'option_' + option.id">{{
                option.text
              }}</label>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
