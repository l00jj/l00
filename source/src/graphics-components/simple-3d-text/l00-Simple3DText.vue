<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Experience from "./Experience/Experience";
//
const props = defineProps<{
  onMounted?: Function;
}>();

/**
 * 视图元素
 */
const canvas = ref();
const viewArea = ref();

/**
 * 入口
 */
let experience: Experience;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  experience = new Experience(canvasEl, viewAreaEl);
  if (props.onMounted && typeof props.onMounted === "function") await props.onMounted(experience);
  experience.render();
});

onUnmounted(() => {
  experience?.destroy();
});
</script>

<template>
  <section v-bind="$attrs" ref="viewArea">
    <div class="background"></div>
    <canvas class="" ref="canvas"></canvas>
  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f4f4 url("./assets/png/bg.png");
}

canvas {
  position: relative;
}
</style>
