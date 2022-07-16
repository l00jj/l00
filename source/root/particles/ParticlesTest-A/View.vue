<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import View from "./View/index";
//const props = defineProps<{}>();
/**
 * 视图元素
 */
const canvas = ref<HTMLCanvasElement>();
const viewArea = ref<HTMLElement>();

/**
 * 入口
 */
let view: View;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLCanvasElement = canvas.value as HTMLCanvasElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl);
  view.render();
});

onUnmounted(() => {
  view?.destroy();
});
</script>

<template>
  <div class="viewArea" ref="viewArea">
    <canvas class="" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.viewArea {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}
.viewArea canvas {
  position: relative;
}
</style>
