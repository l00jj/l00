<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  text?: string;
}>();

const parameter = reactive({
  text: "LOADING",
  duration: 2,
  timeout: 3,
  backgroundColor: "#000",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--duration": `${parameter.duration + parameter.timeout}s`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const list = computed(() => {
  const text = props.text ? props.text : parameter.text;
  const delay = froundFix(parameter.duration / text.length, 3);
  return text
    .toString()
    .split("")
    .map((char, index) => ({
      id: Symbol(char),
      value: char,
      style: `--delay:${delay * index}s`,
    }));
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="loader">
      <span v-for="item in list" :style="item.style">{{ item.value }}</span>
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
}

.loader span {
  color: #fff;
  font-size: 3em;
  font-weight: 900;
  margin: 0 1em;
  animation: animate var(--duration) var(--delay) linear infinite;
}
@keyframes animate {
  0% {
    filter: blur(0);
  }
  40% {
    filter: blur(1em);
  }
  80% {
    filter: blur(0);
  }
  100% {
    filter: blur(0);
  }
}
</style>
