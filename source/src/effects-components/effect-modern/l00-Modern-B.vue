<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  bubblesNumber: 64,
  //
  backgroundColor: "#fff",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <button>
      <div class="effect"></div>
      <span>welcome</span>
    </button>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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

button {
  --animationDuration: 500ms;

  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8em 2.5em;
  color: royalblue;
  font-size: 25px;
  border: none;
  overflow: hidden;
  background: #fff;
}

button .effect {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15em solid royalblue;
}

button .effect::before {
  content: "";
  position: absolute;
  width: 8%;
  height: 500%;
  display: block;
  background: #fff;
  transform: rotate(-60deg);
  transition: var(--animationDuration);
}

button:hover .effect::before {
  width: 100%;
  background: royalblue;
  transform: rotate(-90deg);
}

button span {
  position: relative;
  line-height: 1.2em;
  transition: var(--animationDuration);
}

button:hover span {
  color: #fff;
}
</style>
