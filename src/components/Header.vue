<script setup lang="ts">
import ProfileDropdown from '../ui/ProfileDropdown.vue'
</script>

<template>
  <header class="flex items-center justify-between px-5 py-4 bg-stone-400 text-white">
    <router-link :to="{ name: 'Main' }">
      <h1 class="text-4xl font-bold">BIDTUNE</h1>
    </router-link>
    <div class="md:visible flex items-center space-x-4">
      <div>$ user balance</div>
      <div>0x....</div>
      <ProfileDropdown></ProfileDropdown>
    </div>
  </header>
</template>

<style scoped></style>
