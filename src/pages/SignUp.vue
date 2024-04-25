<script setup>
import { ref } from 'vue'
import InputData from '@/components/InputData.vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const email = ref()
const password = ref()

const startSignUp = async () => {
  authStore.signUp({
    email: email.value,
    password: password.value
  })
}
</script>
<template>
  <div class="h-screen bg-wrapper wrapper flex flex-col bg-slate-200">
    <div class="flex items-center flex-col flex-auto justify-center">
      <!-- Карточка с логином -->
      <div
        class="bg-slate-800 bg-opacity-30 px-5 py-7 flex flex-col gap-8 rounded-3xl items-center sm:w-auto w-11/12 text-black"
      >
        <p class="text-2xl font-semibold">Sign Up</p>
        <div class="flex flex-col gap-1 sm:w-auto w-full">
          <div class="flex flex-col gap-1">
            <p class="lessons-text text-lg font-bold">Nickname or email</p>
            <InputData
              class="mb-4 bg-slate-200 py-3 px-3 sm:w-80 rounded-xl focus:outline-none text-black"
              type="email"
              v-model="email"
            />
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex justify-between lessons-text">
              <p class="lessons-text text-lg font-bold">Password</p>
              <div class="text-sm primary-color">Forgot password?</div>
            </div>
            <InputData
              class="mb-4 bg-slate-200 py-3 px-3 sm:w-80 rounded-xl focus:outline-none text-black"
              type="password"
              v-model="password"
            />
          </div>
          <button
            @click="startSignUp"
            class="select-button rounded-xl border-2 bg-slate-200 py-3 text-black text-xl font-semibold mt-3 select-none"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div class="text-black text-lg text-center mt-6">
        Are you already registered?
        <div class="primary-color font-bold inline">Sign in</div>
      </div>
    </div>
  </div>
</template>
