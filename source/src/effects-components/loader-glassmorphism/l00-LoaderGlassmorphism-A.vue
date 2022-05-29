<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const parameter = reactive({
  size: 150,
  scale: 0.4,
  time: 4,
  backgroundColor: "#1a191d",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${parameter.size}px`,
    "--scale": `${parameter.scale}`,
    "--blur": `${parameter.size / 10}px`,
    "--animationTime": `${parameter.time}s`,
    "--translate_1": `translate(${-parameter.size}px,${froundFix(parameter.size / 3, 2)}px)`,
    "--translate_2": `translate(${parameter.size}px,${-froundFix(parameter.size / 3, 2)}px)`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.loader {
  position: relative;
  width: var(--size);
  height: var(--size);
}
.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loader span:nth-child(1) {
  border-radius: 50%;
  background: #ffffff15;
  box-shadow: inset 0.25px 0.25px 0.25px #ffffff33, inset 0.5px 0.5px 0.5px #ffffff22, inset 1px 1px 1px #ffffff11;
  backdrop-filter: blur(var(--blur));
  z-index: 2;
}

.loader span:nth-child(2) {
  border-radius: 50%;
  background: #04fe4d;
  animation: var(--animationTime) animate ease-in-out infinite;
}

.loader span:nth-child(3) {
  background: #fff;
  animation: var(--animationTime) animate ease-in-out infinite;
  animation-delay: calc(var(--animationTime) * -0.5);
}
@keyframes animate {
  0% {
    transform: var(--translate_1) scale(0.4) rotate(0deg);
    z-index: 3;
  }
  50% {
    transform: var(--translate_2) scale(0.4) rotate(360deg);
    z-index: 3;
  }
  50.0001% {
    z-index: 1;
  }
  100% {
    transform: var(--translate_1) scale(0.4) rotate(0deg);
    z-index: 1;
  }
}
</style>
