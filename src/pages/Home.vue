<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

import BaseModal from '@/components/BaseModal.vue'
import Header from '../components/Header.vue'

const isModalOpen = ref(false)

// Организовыать удаление всех форм
const deleteAllForms = () => {}
</script>

<template>
  <Header title="Your forms">
    <!-- Здесь можно что-то разместить -->
    <div></div>

    <button
      @click="isModalOpen = true"
      class="text-xs text-red-500 w-16 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10"
    >
      Remove All
    </button>
  </Header>

  <BaseModal
    v-if="isModalOpen"
    @close="isModalOpen = false"
    modalInner="Do you really want to delete all the forms?"
    @confirm-request="deleteAllForms"
  />

  <div class="md:pt-12 md:px-24 pt-6 px-8">
    <div class="flex sm:items-start sm:justify-normal items-center justify-center">
      <router-link to="/builder">
        <div
          class="whitespace-nowrap md:py-20 md:px-16 sm:py-16 sm:px-8 sm:text-lg text py-8 px-6 border-2 rounded text-gray-400 cursor-pointer transition hover:-translate-x-2 hover:-translate-y-2 active:bg-slate-200 select-none hover:shadow-md shadow-sm"
        >
          + Create a form
        </div>
      </router-link>
    </div>
  </div>
</template>
