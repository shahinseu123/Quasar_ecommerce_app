<template>
  <span class="heading__line ">{{ props.h_title }}</span>
</template>

<script setup>
 const props = defineProps({
    h_title: String,
 })
</script>

<style scoped>
.heading__line {
  display: flex;
  width: 100%;
  align-items: center;
  color: teal;
}
.heading__line::before,
.heading__line::after {
  content: "";
  background: teal;
  height: 1px;
  margin: 4px;
  flex: 1;
}
</style>
