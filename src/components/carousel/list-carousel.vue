<template>
  <div class="q-mb-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      height="80px"
      weidth="100px"
      class="bg-grey-1  rounded-borders"
    >
      <q-carousel-slide v-for="(chunk, index) in props.data" :key="chunk.index" :name="index + 1" class="column no-wrap">
        <div class="row fit width__102 justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <div  v-for="d in chunk" :key="d.id" class="col-2 full-height text-center">
            <q-img v-if="props.typ=='category'" class="rounded-borders full-height" :src="`http://localhost:8000/uploads/media/${d.category_image}`" />
            <q-img v-else class="rounded-borders full-height" :src="`http://localhost:8000/uploads/media/${d.brand_image}`" />
            <span v-if="props.typ=='category'" class="text-caption ">{{ d.category_title ? d.category_title.substring(0, 10): 'Category' }} </span>
            <span v-else class="text-caption ">{{ d.brand_title ? d.brand_title.substring(0, 10): 'Brand' }} </span>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const slide = ref(1)
const props = defineProps({
    data: Array,
    typ: String,
})

// import { useChunk } from '../../composables/chunk.js'
// const chunkLength = ref(6)
// const { chunkedArray } = useChunk(props.data, chunkLength.value)
</script>
<style scoped>
  .width__102{
    width: 102% !important;
  }
  .q-gutter-x-xs, .q-gutter-xs {
    margin-left: -11px;
}
.q-img__image {
    object-fit: contain !important;
}
</style>