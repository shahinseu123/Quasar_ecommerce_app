<template>
  <div class="q-ma-sm">
    <q-carousel
      animated
      v-model="slide"
      rounde
      infinite
      autoplay="autoplay"
      height="120px"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide  v-for="(slide, index) in props.sliders" :key="slide.id" :name="index+1" :img-src="`http://localhost:8000/uploads/media/${slide.slider_image}`" />
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
    const slide = ref(1)
    const autoplay = ref(true)
    const props = defineProps({
      sliders: Array,
    })
</script>