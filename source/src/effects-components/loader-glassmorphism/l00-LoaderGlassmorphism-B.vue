<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const parameter = reactive({
  size: 150,
  animationTime: 2,
  backgroundColor: "#eafdff",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${parameter.size}px`,
    "--blur": `${froundFix(parameter.size / 15, 2)}px`,
    //阴影
    "--shadowBottom": `${-froundFix((parameter.size * 2) / 3, 2)}px`,
    "--shadowWidth": `${parameter.size * 1.4}px`,
    "--shadowHeight": `${parameter.size * 0.25}px`,
    //动画参数
    "--animationTranslateX_1": `${parameter.size * 0.55}px`,
    "--animationTranslateX_2": `${parameter.size * -0.55}px`,
    "--animationTime": `${parameter.animationTime}s`,
    "--animationDelay": `${froundFix(parameter.animationTime / -2, 2)}s`,
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #5989ff;
  border-radius: 50%;
  animation: animate ease-in-out var(--animationTime) infinite;
}
.loader span:nth-child(2) {
  background: rgba(56, 109, 241, 0.05);
  backdrop-filter: blur(var(--blur));
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation-delay: var(--animationDelay);
}

@keyframes animate {
  0%,
  100% {
    transform: translateX(var(--animationTranslateX_1));
  }
  50% {
    transform: translateX(var(--animationTranslateX_2));
  }
}

/* 阴影 */
.loader span::before {
  content: "";
  position: absolute;
  bottom: var(--shadowBottom);
  width: var(--shadowWidth);
  height: var(--shadowHeight);
  display: block;
  border-radius: 50%;
  background: #5989ff;
  background: radial-gradient(rgba(0, 0, 0, 0.04), transparent, transparent);
}
</style>
