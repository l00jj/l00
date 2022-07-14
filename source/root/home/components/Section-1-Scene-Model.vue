<script setup lang="ts">
import { reactive, ref, computed, watch, inject, onMounted, onUnmounted } from "vue";
import View from "./Section-1/index";
import { RendersAreaMap } from "./UtilRendersAreaMap";
import { LoadingManager } from "./UtilLoadingManager";
//
const rendersAreaMap = inject("rendersAreaMap") as RendersAreaMap;
const loadingManager = inject("loadingManager") as LoadingManager;
//
const props = defineProps<{
  progress: number;
}>();

//
//const props = defineProps<{}>();

/**
 * 视图元素
 */
const canvas = ref<HTMLElement>();
const viewArea = ref<HTMLElement>();
const viewReactArea = ref<HTMLElement>();

/**
 * 入口
 */
let view: View;

/**
 * 装载渲染器
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl);
  view.render();
  // 放置渲染触发范围监听
  rendersAreaMap && rendersAreaMap.set(viewReactArea.value as HTMLElement, view);
  loadingManager && loadingManager.add(view);
});

onUnmounted(() => {
  view?.destroy();
});

const onScroll = (progress: number) => {
  if (!view || !view.world.commander) return;
  view.world.commander.setProgress(progress);
  view.world.commander.computeProgress();
};
onMounted(() => {
  onUnmounted(watch(() => props.progress, onScroll));
});
</script>

<template>
  <div class="viewReactArea" ref="viewReactArea"></div>
  <slot></slot>
  <div class="viewArea" ref="viewArea">
    <canvas class="background" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.viewReactArea {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: none;
}
.viewArea {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.viewArea canvas {
  pointer-events: none;
  position: relative;
}
</style>
