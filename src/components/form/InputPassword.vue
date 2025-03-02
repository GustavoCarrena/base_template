<script setup>
  import { FloatLabel } from 'primevue'
  import Password from 'primevue/password'

  defineProps({
    label: { type: String, default: null },
    name: { type: String, default: null },
    errorMsg: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    feedback: { type: Boolean, default: false },
  })

  const model = defineModel()
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <label class="pl-1 text-sm font-semibold" for="password">{{ label }} <span v-if="required"
        class="text-red-500">*</span></label>
    <Password id="password" v-model="model" :name="name" :invalid="!!errorMsg" :feedback toggleMask />
    <span class="text-red-500">{{ errorMsg }}</span>
  </div>
</template>

<style scoped>
  ::v-deep(.p-component) {
    width: 100%;
  }
</style>