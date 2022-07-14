<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, provide, onMounted, onUnmounted } from "vue";

import Section1 from "./components/Section-1.vue";
import Section2 from "./components/Section-2.vue";
import Section3 from "./components/Section-3.vue";

const props = defineProps<{
  scrollMidline: number;
}>();
</script>

<template>
  <div class="main">
    <Section1 :scrollMidline="props.scrollMidline"></Section1>
    <Section2 style="margin-top: -50vh"></Section2>
    <Section3></Section3>
  </div>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
