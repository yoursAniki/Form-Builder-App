<script setup>
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import CloseButton from './CloseButton.vue'
import SingleQuestionIcon from './SingleQuestionIcon.vue'
import GroupIcon from './GroupIcon.vue'
import PlusIcon from './PlusIcon.vue'

const { emit } = getCurrentInstance()

const props = defineProps({
  sequenceNumber: Number,
  opts: Array,
  qTitle: String,
  required: Boolean
})

let countOptions = 0
const options = ref([])

const addOption = () => {
  if (countOptions >= 12) return

  emit('add-option')
  countOptions++
}

const delOption = (opt) => {
  emit('del-option', opt)
  countOptions--
}

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

//TODO ПЕРЕНЕСТИ В ФУНКЦИЮ RESIZE
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

const resizeOpt = (opt) => {
  const scrollTop = opt.scrollTop // Сохраняем текущее положение вертикального скролла
  const cursorPosition = opt.selectionStart // Сохраняем текущее положение курсора

  opt.value = opt.value.trim()
  opt.value += ' '

  opt.style.height = 'auto'
  let newHeight = opt.scrollHeight + 'px'

  if (opt.style.height !== newHeight) {
    opt.style.height = newHeight
  }

  opt.scrollTop = scrollTop // Восстанавливаем положение вертикального скролла
  opt.setSelectionRange(cursorPosition, cursorPosition) // Восстанавливаем положение курсора
}

// Отправка измененных options в родительский компонент (Builder)
const emitOptionsUpdate = (newOptions) => {
  emit('options-update', newOptions)
}

watch(
  options,
  () => {
    emitOptionsUpdate(options)
  },
  { deep: true }
)

const title = ref(props.qTitle)

const emitTitleUpdate = (newTitle) => {
  emit('title-update', newTitle)
}

watch(title, () => {
  emitTitleUpdate(title.value)
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
        v-model="title"
        id="text-area"
        class="overflow-hidden w-full py-2 pl-3 pr-2 bg-inherit transition focus:border-none mb-1 text-2xl font-bold outline-none min-w-64 rounded resize-none focus:outline-2 focus:outline-dashed focus:outline-slate-300 text-black dark:text-neutral-100"
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
      <SingleQuestionIcon
        class="absolute top-3 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4"
      />
      <GroupIcon
        ref="ignored"
        @click="toggleMenu"
        class="absolute top-9 -left-4 text-lg font-black cursor-pointer select-none w-4 h-4 active:bg-slate-200 rounded"
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
      <div class="py-2 px-2 outline-none resize-none flex max-w-xs flex-wrap w-full" v-auto-animate>
        <div
          class="rounded pb-2 pt-2 mr-2 border-2 flex px-2 my-1"
          v-for="option in opts"
          :key="option"
        >
          <textarea
            v-model="option.text"
            wrap="on"
            @keydown.enter.prevent
            class="resize-none bg-inherit outline-none overflow-hidden text-base text-black w-full dark:text-white"
            name="option"
            maxlength="50"
            rows="1"
            @input="resizeOpt($event.target)"
          >
          </textarea>
          <CloseButton @click="delOption(option)" class="pl-1" />
        </div>
        <div
          @click="addOption"
          class="text-slate-700 dark:text-neutral-300 border-2 rounded p-2 cursor-pointer select-none transition active:bg-slate-200 my-1 flex justify-center items-center"
        >
          <PlusIcon class="-ml-1 px-1 pr-2" />
          Add option
        </div>
      </div>
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
