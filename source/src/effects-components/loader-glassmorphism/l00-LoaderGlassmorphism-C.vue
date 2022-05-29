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
    "--outerSize": `${froundFix(parameter.size * (1 + 2 / 15), 0)}px`,
    "--blur": `${froundFix(parameter.size / 15, 2)}px`,
    //阴影
    "--shadowBottom": `${-froundFix((parameter.size * 2) / 3, 2)}px`,
    "--shadowWidth": `${parameter.size * 1.4}px`,
    "--shadowHeight": `${parameter.size * 0.25}px`,
    //动画参数
    "--animationTime": `${parameter.animationTime}s`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="loader">
      <div class="rotate">
        <span></span>
      </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.loader .rotate {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: animate linear calc(var(--animationTime) * 3) infinite;
}
.loader span:nth-child(1) {
  width: var(--outerSize);
  height: var(--outerSize);
  overflow: hidden;
  animation: animate ease-in-out var(--animationTime) infinite;
}
.loader span:nth-child(1)::before {
  content: "";
  position: absolute;
  width: var(--outerSize);
  height: var(--outerSize);
  border-radius: 0;
  background: #ff6198;
  transform: translate(-50%, -50%);
}
.loader span:nth-child(2) {
  background: rgba(233, 30, 99, 0.05);
  backdrop-filter: blur(var(--blur));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 阴影 */
.loader span:nth-child(2)::before {
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
