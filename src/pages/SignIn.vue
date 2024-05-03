<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore()

const email = ref()
const password = ref()

const startSignIn = async () => {
  await authStore.auth({
    email: email.value,
    password: password.value
  }, 'signin')
  router.push('/')
}
</script>
<template>
  <div class="h-screen bg-wrapper wrapper flex flex-col bg-slate-200 relative">
    <!-- ! Возможно аутентификация будет обязательной -->
    <!-- <router-link to="/">
      <div
        class="absolute select-none top-3 left-5 text-black text-xl font-medium uppercase flex gap-2 items-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="feather-icon / arrow-left">
            <path
              id="Shape"
              d="M20 12H4"
              stroke="#111111"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              id="Shape_2"
              d="M10 18L4 12L10 6"
              stroke="#111111"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        <div>go back</div>
      </div>
    </router-link> -->
    <div class="flex items-center flex-col flex-auto justify-center">
      <!-- Карточка с логином -->
      <div
        class="bg-slate-800 bg-opacity-30 px-5 py-7 flex flex-col gap-8 rounded-3xl items-center sm:w-auto w-11/12 text-black shadow-md"
      >
        <p class="text-2xl font-semibold">Sign In</p>
        <div class="flex flex-col gap-1 sm:w-auto w-full">
          <div class="flex flex-col gap-1">
            <p class="lessons-text text-lg font-bold">Email</p>
            <input
              class="mb-4 bg-slate-200 py-3 px-3 sm:w-80 rounded-xl focus:outline-none text-black"
              type="email"
              v-model="email"
            />
          </div>
          <div class="flex flex-col gap-1 relative">
            <div class="flex justify-between lessons-text">
              <p class="lessons-text text-lg font-bold">Password</p>
              <div class="text-sm primary-color">Forgot password?</div>
            </div>
            <input
              class="mb-4 bg-slate-200 py-3 px-3 sm:w-80 rounded-xl focus:outline-none text-black"
              type="password"
              v-model="password"
            />
            <div v-if="authStore.error" class="absolute text-red-700 -bottom-3">
              {{ authStore.error }}
            </div>
          </div>
          <span v-if="authStore.loading" class="loading loading-spinner loading-lg mx-auto"></span>

          <button
            v-else
            @click="startSignIn"
            class="select-button rounded-xl border-2 bg-slate-200 py-3 text-black text-xl font-semibold mt-3 select-none hover:bg-slate-300 active:bg-slate-400"
          >
            Sign In
          </button>
        </div>
      </div>
      <div class="text-black text-lg text-center mt-6">
        Go back to
        <router-link to="/signup">
          <div class="primary-color font-bold inline select-none">Sign up</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
