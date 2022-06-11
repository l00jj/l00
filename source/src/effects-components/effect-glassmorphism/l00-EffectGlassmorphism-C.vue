<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const parameter = reactive({
  backgroundColor: "#350048", //
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const color = ref(props.color ? props.color : "#ff1f71");
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <button :style="[`--color:${color}`]">
      <div id="panel">
        <div id="light"></div>
        <div id="glass"></div>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    </button>
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
  /* width: 100%;
  height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  --height: 50px;
  --dur: 0.5s;
  position: relative;
  display: flex;
  width: 155px;
  height: var(--height);
  margin: 20px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

button #content {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;
  letter-spacing: 1px;
  transition: var(--dur);
}

button:hover #content {
  letter-spacing: 1em;
}

button #panel>* {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

button #glass {
  background: rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--height);
  overflow: hidden;
  backdrop-filter: blur(15px);
}

button #glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
  transform: skewX(45deg) translateX(0);
  transition: var(--dur);
}

button:hover #glass::before {
  transform: skewX(45deg) translateX(200%);
}

button #light::before {
  content: '';
}

button #light::before,
button #light::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px var(--color),
    0 0 15px var(--color),
    0 0 30px var(--color),
    0 0 60px var(--color);
  background-color: var(--color);
  transition: var(--dur);
  transition-delay: 0s;
}

button:hover #light::before,
button:hover #light::after {
  height: 50%;
  width: 80%;
  border-radius: var(--height);
  transition-delay: var(--dur);
}

button #light::before {
  top: -5px;
}

button:hover #light::before {
  top: 0;
}

button #light::after {
  bottom: -5px;
}

button:hover #light::after {
  bottom: 0;
}
</style>
