<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  bubblesNumber: 64,
  //
  backgroundColor: "#0c192c",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const list = computed(() =>
  Array(parameter.bubblesNumber)
    .fill(0)
    .map(() => `--duration:${froundFix(125 / (9 + Math.random() * 15), 4)}s;`)
);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="bubbles">
      <span v-for="item in list" :style="item"></span>
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
  overflow: hidden;
}

.bubbles {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  --bubblesSize: 16px;
  --bubblesShadowSize: 10px;
  --aColor: #4fc3dc;
  --aDarkColor: #4fc3dc44;
  --bColor: #ff2d75;
  --bDarkColor: #ff2d7544;
}

.bubbles span {
  position: relative;
  width: var(--bubblesSize);
  height: 100%;
  margin: 0 4px;
  display: flex;
  justify-content: center;
}
.bubbles span::before {
  content: "";
  position: absolute;
  width: var(--bubblesSize);
  height: var(--bubblesSize);
  border-radius: 50%;
  background: var(--aColor);
  box-shadow: 0 0 0 var(--bubblesShadowSize) var(--aDarkColor), 0 0 50px var(--aColor), 0 0 100px var(--aColor);
  animation: animate 15s linear infinite;
  animation-duration: var(--duration);
}
.bubbles span:nth-child(even):before {
  background: var(--bColor);
  box-shadow: 0 0 0 var(--bubblesShadowSize) var(--bDarkColor), 0 0 50px var(--bColor), 0 0 100px var(--bColor);
}

@keyframes animate {
  0% {
    bottom: 0%;
    transform: scale(0);
  }
  100% {
    bottom: 100%;
    transform: scale(1);
  }
}
</style>
