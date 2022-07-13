<script setup lang="ts">
import { reactive, ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";
import Text from "./Section-1-Text.vue";
import Model from "./Section-1-Model.vue";
//
const props = defineProps<{
  scrollMidline: number;
}>();
const progress = ref(0);





</script>

<template>
  <Text :scrollMidline="props.scrollMidline" v-model:progress="progress"></Text>
  <Model :progress="progress"></Model>
</template>

<style scoped></style>
