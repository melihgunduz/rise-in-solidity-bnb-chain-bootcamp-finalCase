<script setup lang="ts">
import { ref } from 'vue';
const profileItems = [
  {
   message: 'Profile',
   link: 'Profile'
  },
  {
   message: 'Home',
   link: 'Main'
  }
]

const show = ref(false)

</script>

<template>

<div class="items-center flex">
    <button v-on:focusout="show = false" @click="show = !show">
        <img class="block mx-auto h-12 rounded-full" 
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
    </button>
</div>
<Transition name="slide">
<div v-if="show" class="absolute right-0 top-20">
    <ul class="w-40 bg-white text-neutral-950 rounded-md drop-shadow-lg" @click="show = false">
        <li class="hover:bg-teal-500 rounded-md" v-for="item in profileItems">
            <router-link class="py-3 px-3 block" :to="{name: item.link}">{{item.message}}</router-link>
        </li>
    </ul>
</div>
</Transition>

</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    transition: translateY(10px) 0.2s;
    opacity: 0;
}
</style>
