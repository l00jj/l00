<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import View from "./View/index";
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
let view: View;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl);
  view.render();
});

onUnmounted(() => {
  view?.destroy();
});
</script>

<template>
  <section v-bind="$attrs" ref="viewArea">
    <div class="background"></div>
    <div class="text-container">
      <div class="title"><span>He</span><span>llo</span></div>
      <div class="left">
        <span>Welcome to<br />l00 Studio</span>
      </div>
      <div class="right"><span>我叫小刘</span></div>
    </div>
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
  background: #dedede;
}

canvas {
  position: relative;
}
</style>

<style scoped>
.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: #888888;
  justify-content: center;
  align-items: center;
}
.title {
  position: absolute;
  font-size: 350px;
  font-weight: 900;
}
.title span:nth-child(2) {
  margin-left: 150px;
}

.left {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  color: #888888;
  transform: translate(-315px, -200px);
}
.left::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-right: 20px solid #888888;
  border-bottom: 20px solid #888888;
  transform: translate(-80px, -10px);
}
.right {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  color: #888888;
  transform: translate(355px, 190px);
}
.right::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-left: 20px solid #888888;
  border-top: 20px solid #888888;
  transform: translate(145px, -10px);
}
</style>
