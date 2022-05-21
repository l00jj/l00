<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const option = reactive({
  size: 200,
  bgColor: "#111",
});
defineExpose({ option });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数
/* 
watchEffect(() => {
  const sideRotate = 360 / option.sideNumbers;
  option.sideRotate = froundFix(sideRotate, 3);
  option.sideRadius = froundFix(option.sideHeight / 2 / Math.tan((Math.PI * sideRotate) / 360), 2);
}); */

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${option.size}px`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

class Blob {
  id = Symbol();
  style = {
    display: "block",
    "--i": 0,
    "--parameter": "",
  };
  constructor(i: number, parameter: string) {
    this.style["--i"] = i;
    this.style["--parameter"] = parameter;
  }
}

const blobs = computed(() =>
  ["84% 16% 71% 29% / 33% 74% 26% 67%", "32% 68% 30% 70% / 70% 74% 26% 30%", "71% 29% 30% 70% / 70% 50% 50% 30%"].map(
    (v, i) => new Blob(i, v)
  )
);

/* //后期可以优化新增的功能：
通过反复计算 <slot>内元素的最大实际 font-size ，自动计算外延和高度
API window.getComputedStyle(document.querySelector('.test'))['font-size']
 */
</script>

<template>
  <div class="loader" :style="mainStyle">
    <span>Loading...</span>
    <div class="blob" v-for="blob in blobs" :key="blob.id" :style="blob.style"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.loader {
  position: relative;
  width: var(--size);
  height: var(--size);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 1.5rem;
}
.blob {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: var(--parameter);
  animation: animateRoll 5s linear infinite;
}
.blob:nth-child(2) {
  animation-direction: reverse;
}
.blob:nth-child(3) {
  animation-duration: 3s;
}

@keyframes animateRoll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
