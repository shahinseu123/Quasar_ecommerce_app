<template>
  <div v-if="chunkedArray.length !== 0" class="q-mb-md">
    <headingLine :h_title="category.category_title" />
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      height="190px"
      class="bg-grey-1  rounded-borders"
    >
      <q-carousel-slide v-for="(chunk, index) in chunkedArray" :key="chunk.index" :name="index + 1" class="column no-wrap">
        <div class="row fit width__102 justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <div v-for="prod in chunk" :key="prod.id" class="col-4 full-height ">
            <product :product="prod" />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import headingLine from '../extra/heading-line.vue'
import product from '../product/product.vue'
import { computed, ref } from 'vue'
const slide = ref(1)
const props = defineProps({
    category: Object,
})

// chunk composition function 
import { useChunk } from '../../composables/chunk.js'
const chunkLength = ref(3)
const { chunkedArray } = useChunk(props.category.product, chunkLength.value)
</script>
<style scoped>
  .width__102{
    width: 102% !important;
  }
  .q-gutter-x-xs, .q-gutter-xs {
    margin-left: -11px;
}
.flex_justify_between{
  display: flex;
  justify-content: space-between;
}
.old {
  color: red;
  text-decoration: line-through;
}
.regular{
  color: green;
}

.mb__25{
  margin-bottom:-25px;
}

</style>