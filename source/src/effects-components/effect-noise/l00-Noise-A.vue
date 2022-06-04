<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  compensate: 50,
  //
  backgroundColor: "#222",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--compensate": `${parameter.compensate}px`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="background"></div>
  </section>
  <svg>
    <filter id="noise">
      <!-- 该滤镜利用 Perlin 噪声函数创建了一个图像。它实现了人造纹理比如说云纹、大理石纹的合成。 -->
      <feTurbulence id="turbulence">
        <animate
          attributeName="baseFrequency"
          dur="10s"
          values="0.9 0.9;0.8 0.8;0.9 0.9;"
          repeatCount="indefinite"
        ></animate>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" :scale="parameter.compensate" />
    </filter>
  </svg>
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
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.background {
  position: relative;
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.background::before {
  content: "";
  position: absolute;
  top: calc(-1 * var(--compensate));
  left: calc(-1 *  var(--compensate));
  width: calc(100% + var(--compensate));
  height: calc(100% + var(--compensate));
  background: repeating-linear-gradient(#111, #111 50%, #fff 50%, #fff);
  background-size: 5px 5px;
  filter: url(#noise);
}

svg {
  display: none;
}
</style>
