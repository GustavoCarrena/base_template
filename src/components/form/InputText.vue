<script setup>

  import InputText from 'primevue/inputtext'

  defineProps({
    label: { type: String, default: null },
    name: { type: String, default: null },
    errorMsg: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  })

  const model = defineModel()
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <label class="pl-1 text-sm font-semibold" for="inputtext">{{ label }}</label>
    <InputText id="inputtext" v-model="model" class="w-full" :name type="text" :invalid="!!errorMsg" />
    <span class="text-red-500">{{ errorMsg }}</span>
  </div>
</template>