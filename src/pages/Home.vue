<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, provide, inject } from 'vue'

import BaseModal from '@/components/BaseModal.vue'
import Header from '../components/Header.vue'
import BaseForm from '@/components/BaseForm.vue'
import SettingsDrawer from '@/components/SettingsDrawer.vue'
import SettingsButton from '@/components/SettingsButton.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
//TODO: Организовыать удаление всех форм
const deleteAllForms = () => {}

const isDrawerOpened = ref(false)

const openDrawer = () => {
  isDrawerOpened.value = true
}

const closeDrawer = () => {
  isDrawerOpened.value = false
}

provide('drawerActions', {
  openDrawer,
  closeDrawer,
  isDrawerOpened
})
</script>

<template>
  <transition name="slide-transition" leave-active-class="slide-leave-active">
    <SettingsDrawer v-show="isDrawerOpened" />
  </transition>

  <Header>
    <template v-slot:title>
      <SettingsButton @click="openDrawer" />

      <div class="text-black dark:text-neutral-300">Your Forms</div>
    </template>

    <template v-slot:button>
      <!-- Здесь можно разместить еще кнопку -->
      <div></div>

      <button
        @click="openModal"
        class="text-sm text-red-500 w-20 h-10 border-2 md:rounded-md rounded transition hover:bg-slate-100 cursor-pointer active:bg-slate-200 select-none shadow md:text-lg md:w-36 md:h-10 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:text-red-400"
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

  <div
    class="bg-slate-100 md:pt-12 md:px-20 pt-6 sm:px-8 px-4 pb-6 dark:bg-neutral-900 min-h-screen flex-frow"
  >
    <div class="flex items-start gap-8 xl:justify-normal flex-wrap justify-center">
      <router-link to="/builder">
        <div
          class="flex items-center justify-center w-72 h-48 whitespace-nowrap text-lg border-2 rounded text-gray-400 cursor-pointer transition hover:-translate-x-2 hover:-translate-y-2 active:bg-slate-200 select-none hover:shadow-md shadow-sm dark:text-neutral-100"
        >
          + Create a form
        </div>
      </router-link>

      <BaseForm>
        <template v-slot:title> My first form for my new company </template>
        <template v-slot:date> Updated a week ago </template>
      </BaseForm>
      <BaseForm>
        <template v-slot:title> My second form </template>
        <template v-slot:date> Updated a month ago </template>
      </BaseForm>
    </div>
  </div>
</template>
