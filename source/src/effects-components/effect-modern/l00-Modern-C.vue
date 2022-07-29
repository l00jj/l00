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
  <section class="background">
    <button style="--color: #1e9bff"><span>BUTTON</span><i></i><i></i></button>
    <button style="--color: #ff1867"><span>BUTTON</span><i></i><i></i></button>
    <button style="--color: #6eff3e"><span>BUTTON</span><i></i><i></i></button>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
}

section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

section.background {
  flex-direction: column;
  gap: 60px;
  background: #27282c;
}

button {
  cursor: pointer;
  position: relative;
  padding: 0.8em 1.8em;
  border: none;
  color: #fff;
  font-size: 1.5em;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-decoration: none;
  background: #444;
  transition: 0.5s;
}
button::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #27282c;
}

button:hover {
  letter-spacing: 0.25em;
  color: var(--color);
  background: var(--color);
  box-shadow: 0 0 35px var(--color);
}
button span {
  position: relative;
}
button i {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
button i::before,
button i::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--color);
  background: #27282c;
  transform: translate(-50%, -50%);
  transition: 0.5s;
}
button i::before {
  background: var(--color);
}
button:hover i::before,
button:hover i::after {
  box-shadow: 0 0 10px var(--color);
  transform: translate(-50%, -50%) rotate(-45deg);
}
button i:nth-of-type(1)::before,
button i:nth-of-type(1)::after {
  top: 0;
  left: 100%;
}
button:hover i:nth-of-type(1)::before {
  top: 100%;
  left: 0%;
}
button:hover i:nth-of-type(1)::after {
  top: 0%;
  left: 0%;
}
button i:nth-of-type(2)::before,
button i:nth-of-type(2)::after {
  top: 100%;
  left: 0%;
}
button:hover i:nth-of-type(2)::before {
  top: 0%;
  left: 100%;
}
button:hover i:nth-of-type(2)::after {
  top: 100%;
  left: 100%;
}
</style>
