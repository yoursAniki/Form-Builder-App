<template>
  <div class="flex flex-col pt-10">
    <div class="relative">
      <span class="absolute top-3 -left-3 text-lg text-slate-400 select-none">1</span>
      <input
        class="w-full py-2 px-2 bg-inherit transition focus:border-none focus:bg-slate-200 mb-1 text-2xl font-bold outline-none min-w-64 rounded"
        type="text"
        value="What’s your name?"
        maxlength="25"
      />
    </div>
    <div class="relative">
      <span class="absolute top-3 -left-3 text-lg font-black cursor-pointer select-none">&#8285;</span>
      <input
        class="w-full py-2 px-2 bg-slate-200 text-slate-700 placeholder:text-slate-500 outline-none rounded"
        type="text"
        placeholder="Click to add placeholder text"
        maxlength="30"
      />
    </div>
  </div>
</template>
