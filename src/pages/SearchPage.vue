<template>
    <div class="q-ma-sm">
      <div v-if="searchProduct.length !== 0" class="row q-col-gutter-sm">
        <div v-for="product in searchProduct" :key="product.id" class="col-6 ">
         <product :product="product" />
        </div>
      </div>
      <div v-else class=" ">
         <div class="flex_center h__100">
          <div>
             <h5>No product found</h5>
          </div>
         </div>
      </div>
  </div>
</template>
<script setup>
  import {ref, onMounted ,computed} from 'vue'
  import product from '../components/product/product.vue'
  import { useProductStore } from '../stores/product'
    const productStore =  useProductStore()
    // event bus 
    import { inject } from 'vue'
    const bus = inject('bus')
    let searchProduct = ref([])
    const products = computed(() => {
       return productStore.products
    })
  onMounted(() => {
    if (productStore.products.length == 0) {
       productStore.getProduct()
    }
    bus.on('search-event', (arg) => {
        if (productStore.products.length > 0) {
          searchProduct.value = products.value.filter(d => {
           
            if (arg == "") {
              console.log("no search text found")
            } else {
              return d.title.toLowerCase().includes(arg);
            }
          })
        } else{
        }
    })
  })
</script>
<style scoped>
.flex_center{
   display: flex;
   justify-content: center;
   align-items: center;
}
.h__100{
  height: 80vh;
}
</style>