<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import { DatGui } from "@src/utils/DatGui";

const parameter = reactive({
  stepQuantity: 6,
  stepWidth: 300,
  stepHeight: 60,
  stepLength: 60,
  stepTopFaceColor: "#cf8df1",
  stepFrontFaceColor: "#ae52dd",
  stairsBothFaceColor: "#a54bcf",
});

const stairsStyle = reactive({
  "--stepWidth": "0px",
  "--stepWidthHalf": "0px",
  "--stepHeight": "0px",
  "--stepLength": "0px",
  "--stairsHeight": "0px",
  "--stairsLength": "0px",
  "--stairsLengthHalf": "0px",
  "--stepTopFaceColor": "#f00",
  "--stepFrontFaceColor": "#f00",
  "--stairsBothFaceColor": "#f00",
});

const stairsSteps = computed(() =>
  Array(parameter.stepQuantity)
    .fill(0)
    .map((val, index) => ({ style: `--index:${index};` }))
);

const stopWatchEffect = watchEffect(() => {
  const { stepQuantity, stepWidth, stepHeight, stepLength, stepTopFaceColor, stepFrontFaceColor, stairsBothFaceColor } =
    parameter;
  const stairsLength = stepLength * stepQuantity;
  const stairsHeight = stepHeight * stepQuantity;
  stairsStyle["--stepWidth"] = `${stepWidth}px`;
  stairsStyle["--stepWidthHalf"] = `${stepWidth / 2}px`;
  stairsStyle["--stepHeight"] = `${stepHeight}px`;
  stairsStyle["--stepLength"] = `${stepLength}px`;
  stairsStyle["--stairsHeight"] = `${stairsHeight}px`;
  stairsStyle["--stairsLength"] = `${stairsLength}px`;
  stairsStyle["--stairsLengthHalf"] = `${stairsLength / 2}px`;
  stairsStyle["--stepTopFaceColor"] = `${stepTopFaceColor}`;
  stairsStyle["--stepFrontFaceColor"] = `${stepFrontFaceColor}`;
  stairsStyle["--stairsBothFaceColor"] = `${stairsBothFaceColor}`;
});

const viewArea = ref<HTMLElement>();

onMounted(() => {
  const viewAreaEl = viewArea.value as HTMLElement;
  const datGui = new DatGui(viewAreaEl);
  onUnmounted(() => datGui.destroy());
  // Setup
  const uiStairs = datGui.ui.addFolder("stairs");
  uiStairs.addColor(parameter, "stepFrontFaceColor");
  uiStairs.addColor(parameter, "stairsBothFaceColor");
  uiStairs.addColor(parameter, "stepTopFaceColor");
  uiStairs.add(parameter, "stepQuantity").min(3).max(30).step(1);
  uiStairs.add(parameter, "stepWidth").min(50).max(500).step(1);
  uiStairs.add(parameter, "stepHeight").min(10).max(100).step(1);
  uiStairs.add(parameter, "stepLength").min(10).max(100).step(1);
  uiStairs.open();
});

onUnmounted(() => stopWatchEffect());
</script>

<template>
  <section class="background" ref="viewArea">
    <div class="container">
      <div class="stairs" :style="stairsStyle">
        <div class="base"></div>
        <div class="step" v-for="step in stairsSteps" :style="step.style">
          <i></i>
          <i></i>
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
section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(#eac4ff, #9e57c5);
}
.container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.stairs {
  position: absolute;
  width: var(--stairsLength);
  height: var(--stepWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(160deg);
  animation: animate 10s linear infinite;
}
@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}

.stairs .base {
  position: absolute;
  width: var(--stairsLength);
  height: var(--stepWidth);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--stairsBothFaceColor);
  transform: rotateX(-90deg) translateZ(var(--stepWidthHalf));
  transform-style: preserve-3d;
}
.stairs .base::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10%;
  background: var(--stairsBothFaceColor);
  transform: translateZ(0px);
  filter: blur(20px);
  opacity: 0.5;
}
.stairs .base::after {
  content: "";
  position: absolute;
  width: var(--stepWidth);
  height: var(--stairsHeight);
  background: var(--stepFrontFaceColor);
  transform: rotateX(90deg) rotateY(90deg) translate3D(0px, -50%, var(--stairsLengthHalf));
}

.stairs .step {
  position: absolute;
  bottom: 0;
  left: calc(var(--stepLength) * var(--index));
  width: var(--stepLength);
  height: calc(var(--stepHeight) * calc(var(--index) + 1));
  /* background: var(--stairsBothFaceColor); */
  background: none;
}
.stairs .step::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--stepLength);
  height: var(--stepWidth);
  background: var(--stepTopFaceColor);
  transform: rotateX(90deg) translateZ(var(--stepWidthHalf));
}
.stairs .step:hover::before {
  filter: brightness(1.1);
  cursor: pointer;
}
.stairs .step::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--stepWidth);
  height: var(--stepHeight);
  background: var(--stepFrontFaceColor);
  transform: rotateY(-90deg) translateZ(var(--stepWidthHalf));
}

.stairs .step i {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  background: var(--stairsBothFaceColor);
}
.stairs .step i:nth-child(1) {
  transform: translateZ(calc(var(--stepWidthHalf) * 1));
}
.stairs .step i:nth-child(2) {
  transform: translateZ(calc(var(--stepWidthHalf) * -1));
}
</style>
