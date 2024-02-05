<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

import BaseModal from '@/components/BaseModal.vue'
import Header from '../components/Header.vue'
import BaseForm from '@/components/BaseForm.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
//TODO: Организовыать удаление всех форм
const deleteAllForms = () => {}
</script>

<template>
  <Header>
    <template v-slot:title> Your Forms </template>

    <template v-slot:button>
      <!-- Здесь можно что-то разместить -->
      <div></div>

      <button
        @click="openModal"
        class="text-sm text-red-500 w-20 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10"
      >
        Remove All
      </button>
    </template>
  </Header>

  <BaseModal
    v-if="isModalOpen"
    @close="isModalOpen = false"
    modalInner="Do you really want to delete all the forms?"
    @confirm-request="deleteAllForms"
  />

  <div class="md:pt-12 md:px-24 pt-6 sm:px-8 px-4">
    <div
      class="flex items-start justify-center md:gap-8 sm:gap-6 gap-3 sm:justify-normal flex-wrap"
    >
      <router-link to="/builder">
        <div
          class="whitespace-nowrap md:py-20 md:px-16 sm:py-16 sm:px-8 sm:text-lg py-8 px-2 border-2 rounded text-gray-400 cursor-pointer transition hover:-translate-x-2 hover:-translate-y-2 active:bg-slate-200 select-none hover:shadow-md shadow-sm"
        >
          + Create a form
        </div>
      </router-link>
      
        <!-- Добавить адаптивный отступ -->
        <BaseForm />

    </div>
  </div>
</template>
