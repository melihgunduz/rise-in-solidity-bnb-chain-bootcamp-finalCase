<script setup lang="ts">
  //importing necessary vue components and event providers and database
  import {computed, onMounted, ref} from "vue";
  import { ref as databaseRef, onValue } from "firebase/database"
  import { database } from "../firebase.ts"

  import ProductCard from '../components/Products/ProductCard.vue'

  //lines at below represents user data and bid values from the database. To line 24
  export interface IProduct {
    color: string;
    currency: string;
    isOpen: boolean;
    name: string;
    openPrice: number;
    imageSrc: string;
    id: number;
    lastBid: number;
  }

  const productsRef = databaseRef(database, 'products/');
  const products = ref([] as IProduct[]);
  const openProducts = computed(() => products.value.filter((i) => i.isOpen));
  const closedProducts = computed(() => products.value.filter((i) => !i.isOpen));


  //after we got the values from database writing to the list
  onValue(productsRef, (snapshot) => {
    products.value = snapshot.val();
  });
</script>

<template>
<div>
  <h1 class="my-2 mx-5 font-bold text-4xl">Products On Auction</h1>

  <div class="mx-5 my-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    <ProductCard v-for="(product, i) in openProducts" :key="i" :product="product" />
  </div>
</div>

<div>
  <h1 class="my-2 mx-5 font-bold text-4xl">Products Out Of Auction</h1>

  <div class="mx-5 my-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    <ProductCard v-for="(product, i) in closedProducts" :key="i" :product="product" />
  </div>
</div>
</template>

<style scoped></style>
