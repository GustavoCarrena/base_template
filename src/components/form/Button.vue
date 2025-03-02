<script setup>
  import Button from 'primevue/button'

  defineProps({
    label: { type: String, default: null },
    icon: { type: String, default: null },
    severity: { type: String, default: 'primary' },
    variant: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  })
</script>

<template>
  <Button :label="label" :icon="icon" :severity="severity" :variant="variant" :loading="loading" :disabled="disabled"
    raised />
</template>
