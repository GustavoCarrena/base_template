<template>
  <component :is="ContentApp">
    <router-view />
  </component>
</template>
<script setup>
import { RouterView } from 'vue-router'
import ContentApp from '@/components/content/content-app.vue'
</script>
