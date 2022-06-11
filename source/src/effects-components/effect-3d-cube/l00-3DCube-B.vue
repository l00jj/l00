<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const props = defineProps<{
  color?: string | [string, string];
}>();

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = {
  backgroundColor: "#fff",
};

const cube = ref();
const controlAnimate = ref(true);
const changeControlAnimate = () => {
  controlAnimate.value = !controlAnimate.value;
  cube.value
    .getAnimations()
    .forEach((animation: Animation) => (controlAnimate.value ? animation.play() : animation.pause()));
};
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="container">
      <div class="view">
        <div class="cube" ref="cube">
          <span data-top></span>
          <span data-front></span>
          <span data-back></span>
          <span data-left> </span>
          <span data-right> </span>
          <span data-shadow></span>
        </div>
      </div>
    </div>
    <div class="control">
      <button @click="changeControlAnimate" style="padding: 0.2em 1em">
        {{ controlAnimate ? "关闭旋转" : "开启旋转" }}
      </button>
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
.control {
  position: absolute;
  transform: translate(0, -300px);
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: perspective(1000px) rotateX(-30deg) rotateY(-60deg);
  transform-style: preserve-3d;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  animation: animate 45s linear infinite;
  --size: 300px;
}
@keyframes animate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.cube span {
  position: absolute;
  width: 300px;
  height: 300px;
  display: block;
}
.cube span[data-front] {
  background: #d8aa77;
  transform: translate3d(0, 0, calc(var(--size) / 2));
}
.cube span[data-back] {
  background: #d8aa77;
  transform: translate3d(0, 0, calc(var(--size) / -2));
}

.cube span[data-left] {
  background: #ca9864;
  transform: translate3d(calc(var(--size) / -2), 0, 0) rotateY(-90deg);
}

.cube span[data-right] {
  background: #ca9864;
  transform: translate3d(calc(var(--size) / 2), 0, 0) rotateY(90deg);
}
.cube span[data-top] {
  background: #e8bb84;
  transform: translate3d(0, calc(var(--size) / -2), 0) rotateX(90deg);
}
.cube span[data-shadow] {
  background: rgba(0, 0, 0, 0.1);
  transform: translate3d(0, calc(var(--size) / 1.25), 0) rotateX(-90deg);
  filter: blur(15px);
}

.cube span[data-front]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(./l00-3DCube-B/front.png) no-repeat center center;
  background-size: 50%;
}

.cube span[data-back]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(./l00-3DCube-B/back.png) no-repeat center bottom;
  background-size: 50%;
}

.cube span[data-top]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(./l00-3DCube-B/tap.png) repeat-y center center;
  background-size: 20%;
  transform: rotateZ(-90deg);
}
.cube span[data-left]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 25%;
  background: url(./l00-3DCube-B/tap.png) repeat-y top center;
  background-size: 20%;
  transform: rotateZ(180deg);
}

.cube span[data-right]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 25%;
  background: url(./l00-3DCube-B/tap.png) repeat-y bottom center;
  background-size: 20%;
  transform: rotateZ(0deg);
}
</style>
