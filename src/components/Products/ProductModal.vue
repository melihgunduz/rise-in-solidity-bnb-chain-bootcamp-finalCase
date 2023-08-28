<script setup lang="ts">
  //importing necessary vue components and event providers and database
  import { ref as databaseRef, set } from "firebase/database"
  import { database } from '../../firebase'
  import type {IProduct} from "../../views/Main.vue";
  import {ref} from "vue";
  import type {IBid} from "../../views/Profile.vue";
  import { v4 as uuidv4 } from 'uuid';


  //defining props from parent component
  const props = defineProps<{
    product: IProduct,
  }>();

  //defining emits for control the functions in another component
  const emit = defineEmits(['closeModal'])

  const bidValue = ref(0)


  //this function makes bid. When this function called it will call our smart contract function
  const bid = () => {
    const walletAddress = '0x545AC3bd0334b832cC68bdac2962CFa7390239BE';

    if (bidValue.value <= props.product.lastBid) {
      alert('Düşük teklif verilemez');
      return;
    }

    // işlem kontrata gidecek -- pendingBidId id kontrat üzerinden onaylandığında backend e gönderilecek.
    const pendingBidId = uuidv4();

    //user pending bids ve pending bids tablosuna aşağıdaki değerler yazılıyor
    set(databaseRef(database, 'pendingBids/' + pendingBidId), {
      walletAddress: walletAddress,
      bid: bidValue.value,
      currency: props.product.currency,
      productId: props.product.id,
    });

    set(databaseRef(database, 'userPendingBids/' + walletAddress + '/' + props.product.id), pendingBidId);

    alert('Teklif alındı.');

    emit('closeModal')
    // emits.closeModal();
  }
</script>

<template>
<div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
    <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
      <div class="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Modal Title
            </h3>
            <button class="bg-transparent text-black text-3xl" @click="$emit('closeModal')">
              <span class="bg-transparent text-black mx-0 my-0 py-0">
                x
              </span>
            </button>
        </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <h3>{{props.product.name}}</h3>
            <div>Open price: {{props.product.openPrice}} {{props.product.currency}}</div>
            <div>Last bid: {{props.product.lastBid}} {{props.product.currency}}</div>
            <div class="flex items-center">
              <label class="mr-2">Your bid: </label>
              <input type="number" v-model.number="bidValue" class="border-amber-200 px-1 border-2 rounded-xl">
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('closeModal')">
              Close
            </button>
            <button class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="bid">
              Bid
            </button>
          </div>
      </div>
    </div>
</template>
