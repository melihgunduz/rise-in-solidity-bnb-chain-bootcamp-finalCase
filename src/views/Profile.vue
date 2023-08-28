<script setup lang="ts">
  //importing necessary vue components and event providers and database
  import {computed, reactive, ref, watchEffect} from "vue";
  import { ref as databaseRef, onValue, get } from "firebase/database"
  import { database } from "../firebase.ts"

  import ProductCard from '../components/Products/ProductCard.vue'
  import type {IProduct} from "./Main.vue";

  //lines at below represents user data and bid values from the database. To line 40
  export interface IBid {
    bid: number;
    currency: string;
    productId: number;
  }

  export interface IBidProduct extends IProduct {
    bid: number;
  }


  const productsRef = databaseRef(database, 'products/');
  const walletAddress = '0x545AC3bd0334b832cC68bdac2962CFa7390239BE';
  const bidsRef = databaseRef(database, 'bids/' + walletAddress);
  const pendingUserBidsRef = databaseRef(database, 'userPendingBids/' + walletAddress);
  const bids = reactive({} as { [key: string]: IBid });
  const products = reactive({} as { [key: string]: IProduct });
  const pendingUserBids = reactive({} as { [key: number]: string });
  const pendingBidProducts = ref([] as IBidProduct[]);

  const bidProducts = computed(() => {
    const list = [] as IBidProduct[];

    for (const id in bids) {
      if (typeof products[id] !== 'undefined') {
        list.push({...products[id], bid: bids[id].bid});
      }
    }

    return list;
  });

  //watch effect provides follow the bids and refresh the list
  watchEffect(async () => {
    const list = [] as IBidProduct[];

    for (const key in pendingUserBids) {
      if (key === '' || key === null || pendingUserBids[key] === '' || pendingUserBids[key] === null) {
        continue;
      }

      const pendingBidsRef = databaseRef(database, 'pendingBids/' + pendingUserBids[key]);
      const pendingBid = (await get(pendingBidsRef)).val();
      if (typeof pendingBid === 'undefined' ||pendingBid === null) {
        continue;
      }

      if (typeof products[pendingBid.productId] !== 'undefined') {
        list.push({...products[pendingBid.productId], bid: pendingBid.bid});
      }
    }

    pendingBidProducts.value = list;
  })

    //after we got the values from database writing to the list
    onValue(productsRef, (snapshot) => {
    Object.assign(products, snapshot.val());

    onValue(bidsRef, (snapshot) => {
      Object.assign(bids, snapshot.val());
    });

    onValue(pendingUserBidsRef, (snapshot) => {
      Object.assign(pendingUserBids, snapshot.val());
    });
  });
</script>

<template>
<div>
  <h1 class="my-2 mx-5 font-bold text-4xl">Products Offered by You</h1>

  <div class="mx-5 my-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    <ProductCard v-for="(product, i) in bidProducts" :key="i" :product="product" :bid="product.bid" />
  </div>
</div>
<div>
  <h1 class="my-2 mx-5 font-bold text-4xl">Pending Bids</h1>

  <div class="mx-5 my-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    <ProductCard v-for="(product, i) in pendingBidProducts" :key="i" :product="product" :bid="product.bid" />
  </div>
</div>
</template>

<style scoped></style>
