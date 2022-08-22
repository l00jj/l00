<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { DatGui } from "@src/utils/DatGui";

const viewArea = ref();

onMounted(() => {
  const viewAreaEl = viewArea.value as HTMLElement;
  const datGui = new DatGui(viewAreaEl);
  onUnmounted(() => datGui.destroy());
  // Setup
  const uiFolder = datGui.ui.addFolder("Balls");
  uiFolder.open();

  uiFolder.addColor(parameter, "ball1Color");
  uiFolder.addColor(parameter, "ball2Color");
  uiFolder.addColor(parameter, "ball3Color");
  uiFolder.addColor(parameter, "ball4Color");

  uiFolder.add(parameter, "ball1Size", 20, 800, 1);
  uiFolder.add(parameter, "ball2Size", 20, 800, 1);
  uiFolder.add(parameter, "ball3Size", 20, 800, 1);
  uiFolder.add(parameter, "ball4Size", 20, 800, 1);
});

const parameter = reactive({
  ball1Size: 800,
  ball2Size: 200,
  ball3Size: 200,
  ball4Size: 38,
  ball1Color: "#fe4e4e",
  ball2Color: "#fff",
  ball3Color: "#06c8f0",
  ball4Color: "#fff",
});

const cssBall1Size = computed(() => `${parameter.ball1Size}px`);
const cssBall2Size = computed(() => `${parameter.ball2Size}px`);
const cssBall3Size = computed(() => `${parameter.ball3Size}px`);
const cssBall4Size = computed(() => `${parameter.ball4Size}px`);
</script>

<template>
  <section class="background" ref="viewArea">
    <div class="loader">
      <div class="ball1">
        <div class="ball2">
          <div class="ball3">
            <div class="ball4"></div>
          </div>
        </div>
      </div>
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
.background {
  background: #1c1f2f;
}
.loader {
  position: absolute;
  top: unset;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}
.loader .ball1 {
  position: absolute;
  top: 0;
  width: v-bind(cssBall1Size);
  height: v-bind(cssBall1Size);
  display: flex;
  justify-content: center;
  background: v-bind("parameter.ball1Color");
  border-radius: 50%;
  transform: translate(0, -50%);
  animation: ball1 4s ease-in-out infinite;
}
@keyframes ball1 {
  0%,
  100% {
    transform: translate(0, -50%) rotate(-3deg);
  }
  50% {
    transform: translate(0, -50%) rotate(3deg);
  }
}
.loader .ball1 .ball2 {
  position: absolute;
  top: 0;
  width: v-bind(cssBall2Size);
  height: v-bind(cssBall2Size);
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background: v-bind("parameter.ball2Color");
  transform: translate(0, -100%);
  animation: ball2 4s ease-in-out infinite;
}
@keyframes ball2 {
  0%,
  100% {
    transform: translate(0, -100%) rotate(6deg);
  }
  50% {
    transform: translate(0, -100%) rotate(-6deg);
  }
}
.loader .ball1 .ball2 .ball3 {
  position: absolute;
  top: 0;
  width: v-bind(cssBall3Size);
  height: calc(v-bind(cssBall3Size) / 2);
  display: flex;
  justify-content: center;
  border-bottom-left-radius: v-bind(cssBall3Size);
  border-bottom-right-radius: v-bind(cssBall3Size);
  background: v-bind("parameter.ball3Color");
  transform-origin: top;
  transform: translate(0, -100%);
  animation: ball3 4s ease-in-out infinite;
}
@keyframes ball3 {
  0%,
  100% {
    transform: translate(0, -100%) rotate(45deg);
  }
  50% {
    transform: translate(0, -100%) rotate(-45deg);
  }
}
.loader .ball1 .ball2 .ball3 .ball4 {
  position: absolute;
  top: 0;
  width: v-bind(cssBall4Size);
  height: v-bind(cssBall4Size);
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background: v-bind("parameter.ball4Color");
  transform-origin: top;
  transform: translate(-50%, -100%);
  will-change: left;
  animation: ball4 4s ease-in-out infinite;
}
@keyframes ball4 {
  0%,
  100% {
    left: -15%;
  }
  50% {
    left: 115%;
  }
}
</style>
