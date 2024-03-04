<script setup>
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import LongTextIcon from './LongTextIcon.vue'
import GroupIcon from './GroupIcon.vue'

const { emit } = getCurrentInstance()

const props = defineProps({
  sequenceNumber: Number,
  qTitle: String,
  placeholder: String,
  required: Boolean
})

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const deleteCard = () => {
  emit('delete-request')
}

const ignored = ref()

const closeMenu = [
  () => {
    showMenu.value = false
  },
  { ignore: [ignored] }
]

const isRequired = ref(false)

const openRequiredRequest = () => {
  toggleMenu()
  isRequired.value = true
  emit('toggle-required-request', isRequired.value)
}

const closeRequiredRequest = () => {
  toggleMenu()
  isRequired.value = false
  emit('toggle-required-request', isRequired.value)
}

const showRequiredText = ref(false)

onMounted(() => {
  document.querySelectorAll('#text-area').forEach((element) => {
    element.style.height = `46px`

    element.addEventListener('keydown', (e) => {
      requestAnimationFrame(() => {
        e.target.style.height = `46px`
        e.target.style.height = `${e.target.scrollHeight}px`
      })
    })
  })
})

const title = ref(props.qTitle)
const placeholder = ref(props.placeholder)

const emitTitleUpdate = (newTitle) => {
  emit('title-update', newTitle)
}

const placeholderUpdate = (newPh) => {
  emit('placeholder-update', newPh)
}

watch(title, () => {
  emitTitleUpdate(title.value)
})

watch(placeholder, () => {
  placeholderUpdate(placeholder.value)
})
</script>
<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span
        class="absolute top-3 -left-4 text-lg text-slate-400 select-none dark:text-neutral-50"
        >{{ sequenceNumber }}</span
      >
      <textarea
        required
        minlength="5"
        v-model="title"
        id="text-area"
        class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100 invalid:border-red-500 invalid:border-2 invalid:focus:outline-red-500"
        type="text"
        placeholder="Click to edit prompt"
        maxlength="60"
        @keydown.enter.prevent
      ></textarea>
      <transition name="fade">
        <img
          v-show="required"
          @mouseover="showRequiredText = true"
          @mouseleave="showRequiredText = false"
          class="absolute right-0 top-0 select-none"
          src="./icons/Enforced.svg"
          alt="is required"
        />
      </transition>
      <div
        v-show="showRequiredText"
        class="text-sm text-slate-400 absolute -top-4 right-6 text-nowrap"
      >
        (This question will be required for users)
      </div>
    </div>
    <div class="relative basis-full grow">
      <LongTextIcon
        class="absolute -left-5 text-lg font-black cursor-pointer select-none w-4 h-4"
      />
      <GroupIcon
        ref="ignored"
        @click="toggleMenu"
        class="absolute top-6 -left-5 text-lg font-black cursor-pointer select-none w-4 h-4 active:bg-slate-200 rounded"
      />
      <transition name="slide-fade">
        <div
          v-on-click-outside="closeMenu"
          v-show="showMenu"
          class="absolute sm:top-7 sm:-left-44 top-7 left-0 text-start select-none rounded bg-white py-1 transition dark:bg-neutral-800"
        >
          <div class="flex flex-col">
            <button
              v-if="required === false"
              @click="openRequiredRequest"
              class="text-left py-1 min-w-36 pl-3 text-black transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 dark:text-slate-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
            >
              Enforce answer
            </button>
            <button
              v-else
              @click="closeRequiredRequest"
              class="text-left py-1 min-w-36 pl-3 text-black transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 dark:text-slate-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
            >
              Neglect answer
            </button>
            <button
              @click="deleteCard"
              class="text-left py-1 min-w-36 pl-3 text-red-600 transition hover:bg-slate-200 cursor-pointer active:bg-slate-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
            >
              Delete
            </button>
          </div>
        </div>
      </transition>
      <textarea
        v-model="placeholder"
        @keydown.enter.prevent
        class="h-28 overflow-hidden w-full py-2 px-2 bg-slate-200 placeholder:text-slate-500 outline-none rounded resize-none transition focus:text-slate-950 text-slate-400 dark:focus:text-neutral-950 dark:text-neutral-500"
        type="text"
        placeholder="Click to add placeholder text"
        maxlength="100"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
/* animation for enforcing/neglecting question */
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* animation for menu */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
