<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";
import { vLongshadow } from "./vLongshadow";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const parameter = reactive({
  backgroundColor: "#ff3463", //
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const longshadow = reactive({
  color: "#e8305b",
  angle: 45,
  length: 750,
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <input type="range" v-model="longshadow.angle" :max="360" :min="0" :step="1" />
    <div class="container">
      <span v-longshadow="longshadow"></span>
      <span v-longshadow="longshadow" shape="circular"></span>
      <span v-longshadow="longshadow" shape="triangle"></span>
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
  flex-direction: column;
  overflow: hidden;
}

.container {
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  --size: 200px;
  --shapeColor: #fff;
}

.container span {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: block;
  background: var(--shapeColor);
}

.container span:not(:first-child) {
  margin-left: calc(var(--size) * 0.8);
}

.container span[shape="circular"] {
  border-radius: 50%;
}
.container span[shape="triangle"] {
  background: transparent;
  border-top: calc(var(--size) / 2) solid transparent;
  border-bottom: calc(var(--size) / 2) solid var(--shapeColor);
  border-left: calc(var(--size) / 2) solid transparent;
  border-right: calc(var(--size) / 2) solid var(--shapeColor);
}
</style>
