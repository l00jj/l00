<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const option = reactive({
  size: 50,
  bgColor: "#dde1e7",
});
defineExpose({ option });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数
/* 
watchEffect(() => {
  const sideRotate = 360 / option.sideNumbers;
  option.sideRotate = froundFix(sideRotate, 3);
  option.sideRadius = froundFix(option.sideHeight / 2 / Math.tan((Math.PI * sideRotate) / 360), 2);
}); */

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${option.size}px`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

class Blob {
  id = Symbol();
  style = {
    display: "block",
    "--i": 0,
    "--parameter": "",
  };
  constructor(i: number, parameter: string) {
    this.style["--i"] = i;
    this.style["--parameter"] = parameter;
  }
}

const blobs = computed(() =>
  ["84% 16% 71% 29% / 33% 74% 26% 67%", "32% 68% 30% 70% / 70% 74% 26% 30%", "71% 29% 30% 70% / 70% 50% 50% 30%"].map(
    (v, i) => new Blob(i, v)
  )
);
`
#dde1e7ff hsla(216, 17%, 89%, 1)
#ffffff73 hsla(0, 0%, 100%, 0.45)
#5d677949 hsla(218, 13%, 42%, 0.288)
`;
</script>

<template>
  <div class="panel" :style="mainStyle">
    <div class="example1"></div>
    <div class="example2"></div>
    <div class="example3"></div>
    <div class="example4"></div>
    <div class="example5"></div>
    <div class="example6"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.panel {
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: var(--bgColor);
}
.panel > div {
  margin: calc(var(--size) * 0.5);
}

.example1 {
  position: relative;
  width: var(--size);
  height: var(--size);
  background: var(--bgColor);
  border-radius: calc(var(--size) * 0.1);
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example2 {
  position: relative;
  width: var(--size);
  height: var(--size);
  background: var(--bgColor);
  border-radius: calc(var(--size) * 0.1);
  box-shadow: inset -3px -3px 7px #ffffff73, inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example3 {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bgColor);
  border-radius: 50%;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example3::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 80%;
  background: transparent;
  border-radius: 50%;
  box-shadow: inset -3px -3px 7px #ffffff73, inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example4 {
  position: relative;
  width: var(--size);
  height: var(--size);
  background: var(--bgColor);
  border-radius: calc(var(--size) * 0.1);
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288), inset 0 0 0 #ffffff00,
    inset 0px 0px 0px hsla(218, 13%, 42%, 0);
  transition: 1s;
}
.example4:hover {
  /* animation: animation 0.5s linear; */
  box-shadow: 0 0 0 #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset -3px -3px 7px #ffffff73,
    inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}
@keyframes animation {
  0% {
    box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288), inset 0 0 0 #ffffff00,
      inset 0px 0px 0px hsla(218, 13%, 42%, 0);
  }
  50% {
    box-shadow: 0px 0px 0px #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset 0 0 0 #ffffff00,
      inset 0px 0px 0px hsla(218, 13%, 42%, 0);
  }
  100% {
    box-shadow: 0 0 0 #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset -3px -3px 7px #ffffff73,
      inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
  }
}

.example5 {
  position: relative;
  width: var(--size);
  height: var(--size);
  background: var(--bgColor);
  border-radius: 50%;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288), inset 0 0 0 #ffffff00,
    inset 0px 0px 0px hsla(218, 13%, 42%, 0);
  transition: 1s;
}
.example5:hover {
  box-shadow: 0 0 0 #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset -3px -3px 7px #ffffff73,
    inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example6 {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bgColor);
  border-radius: 50%;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px hsla(218, 13%, 42%, 0.288), inset 0 0 0 #ffffff00,
    inset 0px 0px 0px hsla(218, 13%, 42%, 0);
  transition: 1s;
}

.example6::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 80%;
  background: transparent;
  border-radius: 50%;
  box-shadow: 0 0 0 #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset -3px -3px 7px #ffffff73,
    inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
  transition: 1s;
}

.example6:hover {
  overflow: hidden;
  box-shadow: 0 0 0 #ffffff00, 0px 0px 0px hsla(218, 13%, 42%, 0), inset -3px -3px 7px hsla(218, 13%, 42%, 0.288),
    inset 3px 3px 5px hsla(218, 13%, 42%, 0.288);
}

.example6:hover::before {
  box-shadow: -3px -3px 7px hsla(218, 13%, 42%, 0.288), 3px 3px 5px hsla(218, 13%, 42%, 0.288), inset 0 0 0 #ffffff00,
    inset 0px 0px 0px hsla(218, 13%, 42%, 0);
}
</style>
