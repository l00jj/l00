<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  isPlay: boolean;
  color?: string | [string, string];
  perspective?: [number, number];
}>();

const option = reactive({
  sideNumbers: 16, //一个多少片
  sideHeight: 45, //每片的高度，单位px
  sideRotate: 0, //[自动计算]每片的旋转角度，单位deg
  sideRadius: 0, //[自动计算]每片的外延半径，单位px
  sideTextOffset: 46, //文字对齐偏移，单位px
  perspectiveMin: 100, //视距
  perspectiveMax: 1000, //视距
});

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

watchEffect(() => {
  const sideRotate = 360 / option.sideNumbers;
  option.sideRotate = froundFix(sideRotate, 5);
  option.sideRadius = froundFix(option.sideHeight / 2 / Math.tan((Math.PI * sideRotate) / 360), 5);
});

const mainStyle = computed(() => {
  return Object.entries({
    "--side-height": `${option.sideHeight}px`,
    "--side-rotate": `${option.sideRotate}deg`,
    "--side-translateZ": `${option.sideRadius}px`,
    "--side-textOffset": `${option.sideTextOffset}px`,
    "--perspectiveMin": `${props.perspective && props.perspective[0] ? props.perspective[0] : option.perspectiveMin}px`,
    "--perspectiveMax": `${props.perspective && props.perspective[1] ? props.perspective[1] : option.perspectiveMax}px`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

class Side {
  id = Symbol();
  style = { "--i": 0 };
  constructor(i: number) {
    this.style["--i"] = i;
  }
}

const sides = computed(() =>
  Array(option.sideNumbers)
    .fill(0)
    .map((v, i) => new Side(i))
);

/* //后期可以优化新增的功能：
通过反复计算 <slot>内元素的最大实际 font-size ，自动计算外延和高度
API window.getComputedStyle(document.querySelector('.test'))['font-size']
 */
</script>

<template>
  <div class="container">
    <div class="view" :class="{ paused: !props.isPlay }" :style="mainStyle">
      <div class="target">
        <div class="side" v-for="side in sides" :key="side.id" :style="side.style"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #222 url("./assets/logo/bg.png");
}
.view {
  transform-style: preserve-3d;
  transform: perspective(1000px);
  animation: animateView 25s ease infinite alternate;
}
@keyframes animateView {
  0% {
    transform: perspective(var(--perspectiveMin));
  }
  100% {
    transform: perspective(var(--perspectiveMax));
  }
}

.target {
  transform-style: preserve-3d;
  transform: rotateY(-45deg);
  animation: animateRoll 25s linear infinite;
}

@keyframes animateRoll {
  0% {
    transform: rotateX(0deg) rotate(0deg);
  }
  100% {
    transform: rotateX(360deg) rotate(360deg);
  }
}

.target .side {
  position: absolute;
  height: var(--side-height);
  padding: 0 10px;
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: 900;
  vertical-align: middle;
  line-height: var(--side-textOffset);
  text-shadow: 0 calc(var(--side-height) / 9) calc(var(--side-height) / 3) rgba(0, 0, 0, 0.25);
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5), transparent);
  transform-style: preserve-3d;
  transform: translate(-50%, -50%) rotateX(calc(var(--side-rotate) * var(--i))) translateZ(var(--side-translateZ));
}
:slotted(*) {
  font-style: initial;
  white-space: nowrap;
  text-transform: uppercase;
}

.view.paused,
.view.paused .target {
  animation-play-state: paused;
}
</style>
