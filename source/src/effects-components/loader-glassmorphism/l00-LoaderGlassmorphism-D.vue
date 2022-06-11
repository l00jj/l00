<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const parameter = reactive({
  backgroundColor: "#151515", //
});
defineExpose({ parameter });

// 实际应用时需要考虑兼容问题
// https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const value = ref(0);
const inputValue = computed({
  get: () => value.value,
  set: (val) => {
    val = val < 0 ? 0 : val > 100 ? 100 : val;
    value.value = froundFix(val, 2);
  },
});
const inputValueShow = computed(() => Math.round(inputValue.value));

const loaderStyle = computed(() => ({
  filter: `hue-rotate(${270 - (270 * inputValue.value) / 100}deg)`,
}));

const sliderBarStyle = computed(() => ({
  width: `${inputValue.value}%`,
}));

const fillRangeValue = computed(() => 100 - Math.pow(inputValue.value / 100, 3) * 100);

const fillRangeTopleftStyle = computed(() => ({
  width: `${fillRangeValue.value / 2}%`,
}));

const fillRangeTopRightStyle = computed(() => ({
  height: `${fillRangeValue.value / 2}%`,
}));

const fillRangeBottomLeftStyle = computed(() => ({
  height: `${fillRangeValue.value / 2}%`,
}));

const fillRangeBottomRightStyle = computed(() => ({
  width: `${fillRangeValue.value / 2}%`,
}));

const onMousedown = () => onStart("mouse");
const onMouseup = () => {
  window.removeEventListener("mouseup", onMouseup);
  window.removeEventListener("mousemove", onMousemove);
  autoRunner.start();
};
const onMousemove = (event: MouseEvent) => {
  onMoving(event.clientX, event.clientY);
  event.preventDefault();
};

const onTouchstart = () => onStart("touch");
const onTouchend = () => {
  window.removeEventListener("touchend", onTouchend);
  window.removeEventListener("touchmove", onTouchmove);
  autoRunner.start();
};
const onTouchmove = (event: TouchEvent) => {
  const touch = event.touches[0];
  onMoving(touch.clientX, touch.clientY);
  event.preventDefault && event.preventDefault();
};

const onStart = (flag: string) => {
  if (flag === "mouse") {
    window.addEventListener("mouseup", onMouseup);
    window.addEventListener("mousemove", onMousemove);
  }
  if (flag === "touch") {
    window.addEventListener("touchend", onTouchend);
    window.addEventListener("touchmove", onTouchmove, { passive: false });
  }
  autoRunner.stop();
};

const sliderRunway = ref();
let isTransverse = true; //是否横向
const onMoving = (x: number, y: number) => {
  const sliderRunwayEl: HTMLElement = sliderRunway.value as HTMLElement;
  const runwayClientRect = sliderRunwayEl.getBoundingClientRect();
  const number = isTransverse ? x : y;
  const head = isTransverse ? runwayClientRect.left : runwayClientRect.top;
  const end = isTransverse ? runwayClientRect.width : runwayClientRect.height;
  const percentage = (100 * (number - head)) / end;
  inputValue.value = percentage;
};

class AutoRunner extends EventEmitter {
  isAction = false;
  constructor() {
    super();
    this.start();
  }

  start() {
    this.isAction = true;
    // 松开后2秒开始提升
    this.timeout = setTimeout(() => this.loop(0), 1700) as unknown as number;
  }

  timeout = 0;
  elapsed = 0;
  loop(time: number) {
    // 采用真实事件作为速率
    const lastTime = time === 0 ? Date.now() : time;
    const currentTime = Date.now();
    const delta = currentTime - lastTime;
    inputValue.value += (10 * delta) / 1000;
    //
    if (this.isAction && inputValue.value < 100)
      this.timeout = setTimeout(() => this.loop(currentTime)) as unknown as number;
    else this.stop();
  }

  stop() {
    this.isAction = false;
    clearTimeout(this.timeout);
  }
}

const autoRunner = new AutoRunner();
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="container">
      <div class="loader" :style="loaderStyle">
        <span class="rangeValue">{{ inputValueShow }}</span>
        <div class="range" style="width: 500px">
          <div class="slider">
            <div class="runway" ref="sliderRunway">
              <div class="bar" :style="sliderBarStyle" @touchstart.passive="onTouchstart" @mousedown="onMousedown">
                <div class="button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fillRangeTransition fillRangeTopleft" :style="fillRangeTopleftStyle"></div>
      <div class="fillRangeTransition fillRangeTopRight" :style="fillRangeTopRightStyle"></div>
      <div class="fillRangeTransition fillRangeBottomLeft" :style="fillRangeBottomLeftStyle"></div>
      <div class="fillRangeTransition fillRangeBottomRight" :style="fillRangeBottomRightStyle"></div>
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

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  /* animation: animateColor linear 5s infinite; */

  --sliderHeight: 30px;
  --sliderButtonSize: 30px;
  --sliderColor: #22ff08; /* #22ff08 #ffa737 */
}

.loader .rangeValue {
  position: relative;
  color: var(--sliderColor);
  font-size: 20em;
  font-weight: 900;
}
.loader .rangeValue::after {
  content: "%";
}

.loader .range .slider {
  position: relative;
  width: 100%;
  height: var(--sliderHeight);
  padding: 0 calc(var(--sliderButtonSize) / 2);
  border-radius: var(--sliderHeight);
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 0 2px #151515, inset 0 0 5px #000;
  overflow: hidden;
}

.loader .range .slider .runway {
  position: relative;
  width: 100%;
  height: 100%;
}

.loader .range .slider .runway .bar {
  position: relative;
  left: 0;
  height: 100%;
  background: var(--sliderColor);
}

.loader .range .slider .runway .bar .button {
  cursor: grab;
  position: absolute;
  right: 0;
  width: var(--sliderButtonSize);
  height: var(--sliderButtonSize);
  border-radius: 50%;
  background: var(--sliderColor);
  border: 10px solid #222;
  transform: translate(50%, 0);
}
.loader .range .slider .runway .bar .button:active {
  cursor: grabbing;
}

.loader .range .slider .runway .bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--sliderButtonSize);
  height: var(--sliderButtonSize);
  display: block;
  background: var(--sliderColor);
  transform: translate(-100%, 0);
}

.fillRangeTransition {
  transition: 200ms;
}

.fillRangeTopleft {
  position: absolute;
  width: 50%;
  height: 50%;
  pointer-events: none;
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  left: 0;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
}

.fillRangeTopRight {
  position: absolute;
  width: 50%;
  height: 50%;
  pointer-events: none;
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  right: 0;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.25);
}
.fillRangeBottomLeft {
  position: absolute;
  width: 50%;
  height: 50%;
  pointer-events: none;
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.25);
}
.fillRangeBottomRight {
  position: absolute;
  width: 50%;
  height: 50%;
  pointer-events: none;
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  right: 0;
  bottom: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.25);
}

@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
