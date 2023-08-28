<script setup lang="ts">
//importing necessary vue components and event providers and database
import { ref } from 'vue'
import ProductModal from './ProductModal.vue'
import type {IProduct} from "../../views/Main.vue";


//const available = ref(true) // for now value set true default, after it will controlled by props
//const bidValue = ref(0)

//defining props from parent component
const props = defineProps<{
  product: IProduct,
  bid? : number,
}>()

const modalRef = ref(false)


//this function controls the modal view of the product
const openModal = () => {
  if (typeof props.bid !== 'undefined' || !props.product.isOpen) {
    return;
  }

  modalRef.value = true;
}
</script>



<template>
<div class="clickable group relative rounded-xl ">
  <div
      class="lg:aspect-none group-hover:opacity-80"
      @click="openModal()">
    <img
        :src="product.imageSrc"
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"

    />
  </div>
  <div class="mt-4 flex justify-between">
    <div>
      <h3 class="text-sm text-black">
        {{ product.name }}
      </h3>
      <p class="mt-1 text-sm text-black">{{ product.color }}</p>
    </div>
    <p class="text-sm font-medium text-black">{{ product.lastBid }}</p>
    <p class="text-sm font-medium text-black">{{ product.openPrice }}</p>
    <p class="text-sm font-medium text-black" v-if="props.bid">{{ props.bid }}</p>
  </div>
</div>

<div v-if="modalRef" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex backdrop-brightness-50">
  <ProductModal @closeModal="modalRef = false" :product="product" :bid="bid" />
</div>




</template>
