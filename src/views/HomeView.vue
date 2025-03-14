<template>
  <div>
    <Button label="User" class="mt-4" :loading="isPending" @click="getUsers" />
    <div v-if="isPending" class="mt-4">Loading...</div>
    <div v-else class="mt-4">{{ users ? JSON.stringify(users) : 'No hay usuarios' }}</div>
  </div>
</template>

<script setup>
  import Button from 'primevue/button';
  import { useUsers } from '@/composables/users'

  const { data: users, isPending, refetch: getUsers } = useUsers()

</script>

<style lang="scss" scoped></style>