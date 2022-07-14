<script setup lang="ts">
import { reactive, ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";
import Model from "./Section-1-Scene-Model.vue";
import Text from "./Section-1-Scene-Text.vue";
//
const props = defineProps<{
  scrollMidline: number;
}>();
const progress = ref(0);

//
</script>

<template>
  <section class="container">
    <Model :progress="progress">
      <Text :scrollMidline="props.scrollMidline" v-model:progress="progress"></Text>
    </Model>
  </section>
</template>

<style scoped>
section.container {
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: #dedede;
}
</style>
