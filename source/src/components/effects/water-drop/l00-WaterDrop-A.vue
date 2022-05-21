<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
  text: string;
}>();

const option = reactive({
  size: 150,
  bgColor: "#eee",
});
defineExpose({ option });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${option.size}px`,
    "--highlight1-size": `${(20 * option.size) / 150}px`,
    "--highlight2-size": `${(10 * option.size) / 150}px`,
    "--boxShadow": `
inset ${(10 * option.size) / 150}px ${(10 * option.size) / 150}px ${(10 * option.size) / 150}px rgba(0,0,0,0.05),
${(15 * option.size) / 150}px ${(25 * option.size) / 150}px ${(10 * option.size) / 150}px rgba(0,0,0,0.05),
${(15 * option.size) / 150}px ${(20 * option.size) / 150}px ${(20 * option.size) / 150}px rgba(0,0,0,0.05),
inset ${(-10 * option.size) / 150}px ${(-10 * option.size) / 150}px ${
      (15 * option.size) / 150
    }px rgba(255,255,255,0.9);`.replaceAll("\n", ""),
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <div class="waterdrop" :style="mainStyle">
    <svg
      version="1.1"
      id="图层_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 400 270"
      style="width: 67px; fill: #555"
      xml:space="preserve"
    >
      <g>
        <path
          class="st0"
          d="M23.5,269h-14c-4.42,0-8-3.58-8-8V25c0-13.25,10.75-24,24-24h14c4.42,0,8,3.58,8,8v236C47.5,258.25,36.75,269,23.5,269z"
        />
      </g>
      <g>
        <path
          class="st0"
          d="M214.5,1h-108c-13.25,0-24,10.75-24,24v236c0,4.42,3.58,8,8,8h108c13.25,0,24-10.75,24-24V9C222.5,4.58,218.92,1,214.5,1z M175.5,224c0,4.42-3.58,8-8,8h-30c-4.42,0-8-3.58-8-8V46c0-4.42,3.58-8,8-8h30c4.42,0,8,3.58,8,8V224z"
        />
      </g>
      <g>
        <path
          class="st0"
          d="M390.5,1h-108c-13.25,0-24,10.75-24,24v236c0,4.42,3.58,8,8,8h108c13.25,0,24-10.75,24-24V9C398.5,4.58,394.92,1,390.5,1z M351.5,224c0,4.42-3.58,8-8,8h-30c-4.42,0-8-3.58-8-8V46c0-4.42,3.58-8,8-8h30c4.42,0,8,3.58,8,8V224z"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.waterdrop {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: var(--boxShadow);
}

.waterdrop::before {
  content: "";
  position: absolute;
  top: 27%;
  left: 29%;
  width: var(--highlight1-size);
  height: var(--highlight1-size);
  border-radius: 50%;
  background: #ffffffdd;
  transform: translate(-50%, -50%);
}

.waterdrop::after {
  content: "";
  position: absolute;
  top: 16%;
  left: 40%;
  width: var(--highlight2-size);
  height: var(--highlight2-size);
  border-radius: 50%;
  background: #ffffffff;
  transform: translate(-50%, -50%);
}
</style>
