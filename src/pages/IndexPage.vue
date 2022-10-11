<template>
  <q-page class="">
    <listCarousel typ="category" :data="categoryStore.chunkedCategory" />
    <mainCarousel :sliders="sliderStore.sliders" />
    <listCarousel typ="brand" :data="brandStore.chunkedBrand" />
    <parallax />
    <listProduct v-for="category in categoryStore.categoryProduct" :key="category.id" :category="category" />
  </q-page>
</template>

<script setup>
   import {ref, onMounted, computed} from 'vue';
   import parallax from '../components/extra/parallax.vue'
   import listCarousel from 'src/components/carousel/list-carousel.vue';
   import mainCarousel from 'src/components/carousel/main-carousel.vue';
   import listProduct from 'src/components/carousel/list-product.vue';
  //  category 
   import { useCategoryStore } from '../stores/category'
   const categoryStore =  useCategoryStore()
  //  brands 
   import { useBrandStore } from '../stores/brand'
   const brandStore =  useBrandStore()
  //  sliders 
   import { useSliderStore } from '../stores/slider'
   const sliderStore =  useSliderStore()
  //  parallax 
   import { useParallaxStore } from '../stores/parallax'
   const parallaxStore =  useParallaxStore()
  //  products 
   import { useProductStore } from '../stores/product'
   const productStore =  useProductStore()
  //  products 
   import { useCuponStore } from '../stores/cupon'
   const cuponStore =  useCuponStore()

   
onMounted(() => {
  categoryStore.getCategory()
  categoryStore.getCategoryProduct()
  brandStore.getBrand()
  sliderStore.getSlider()
  parallaxStore.getParallax()
  productStore.getProduct()
  cuponStore.getCupon()
})
</script>
<style>
  .q-img__image {
    object-fit: contain !important;
}
.scroll {
    overflow: hidden !important;
}
</style>