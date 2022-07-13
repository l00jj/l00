<script setup lang="ts">
import { reactive, ref, computed, watchEffect, inject, onMounted, onUnmounted } from "vue";
import View from "./Section-2-2-Banner-RenderView-Text/index";
import { RendersAreaMap } from "./UtilRendersAreaMap";
import { LoadingManager } from "./UtilLoadingManager";
//
const rendersAreaMap = inject("rendersAreaMap") as RendersAreaMap;
const loadingManager = inject("loadingManager") as LoadingManager;

/**
 * 视图元素
 */
const canvas = ref<HTMLElement>();
const viewArea = ref<HTMLElement>();
const viewReactArea = ref<HTMLElement>();
const viewControlsArea = ref<HTMLElement>();

/**
 * 入口
 */
let view: View;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  const viewControlsAreaEl: HTMLElement = viewControlsArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl, viewControlsAreaEl);
  view.render();
  //
  rendersAreaMap && rendersAreaMap.set(viewReactArea.value as HTMLElement, view);
  loadingManager && loadingManager.add(view);
});

onUnmounted(() => {
  view?.destroy();
});
</script>

<template>
  <div class="viewArea" ref="viewArea">
    <div class="viewReactArea" ref="viewReactArea"></div>
    <canvas class="background" ref="canvas"></canvas>
    <div class="viewControlsArea" ref="viewControlsArea"></div>
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
  padding: 50vh 0 30vh 0;
  margin: -50vh 0 -30vh 0;
  background: none;
}
.viewArea {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.viewArea canvas {
  position: relative;
}
.viewArea .viewControlsArea {
  position: absolute;
  width: 100%;
  height: 100%;
}
.background {
  background: #f4f4f4 url("./Section-2-2-Banner-RenderView-Text/assets/logo/bg.png");
}

/*竖屏*/
@media all and (orientation: portrait) {
  .viewArea .viewReactArea {
    padding: 0;
    margin: 0;
  }
  .viewArea .viewControlsArea {
    position: absolute;
    width: 50%;
    height: 50%;
  }
}
</style>
