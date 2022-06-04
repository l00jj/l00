<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  singleWidth: 0,
  translateY: 0,
  //
  backgroundColor: "#222",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--singleWidth": `${parameter.singleWidth}px`,
    "--translateY": `${parameter.translateY}px`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const textLength = 20;
const text = computed(() => "".padStart(textLength, "~"));
const wavy = ref();
onMounted(() => {
  const wavyEl = wavy.value as HTMLElement;
  const singleWidth = Math.floor((2 * wavyEl.offsetWidth) / textLength / 3); //2* wavyEl.offsetWidth / textLength /3;
  const translateY = -wavyEl.offsetHeight / 2;
  parameter.singleWidth = singleWidth;
  parameter.translateY = translateY;
  setTimeout(() => wavyEl.classList.toggle("animate"));
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="wavy">
      <span ref="wavy">{{ text }}</span>
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
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wavy {
  position: relative;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* background: #333; */

  --bubblesSize: 16px;
  --bubblesShadowSize: 10px;
  --aColor: #4fc3dc;
  --aDarkColor: #4fc3dc44;
  --bColor: #ff2d75;
  --bDarkColor: #ff2d7544;
}

.wavy span {
  position: absolute;
  font-size: 4em;
  line-height: 1;
  color: transparent;
  text-decoration-style: wavy;
  text-decoration-color: #fff;
  text-decoration-line: underline;
  user-select: none;
}

.wavy span.animate {
  animation: animate 2s linear infinite;
}

@keyframes animate {
  0% {
    transform: translate(0px, var(--translateY));
  }
  100% {
    transform: translate(var(--singleWidth), var(--translateY));
  }
}
</style>
