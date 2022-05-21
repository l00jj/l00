<script setup lang="ts">
import { ref, reactive, onUnmounted, watchEffect, WatchStopHandle } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

class Block {
  id = Symbol();
  style = {
    display: "block",
    "z-index": 0,
    "--delay": "0s",
  };
  constructor(index: number) {
    this.style["z-index"] = index;
    this.style["--delay"] =`-${index}s`;
  }
}

const length = 10;
const blocks = reactive(
  Array(length)
    .fill(0)
    .map((v, i) => new Block(length - i))
);

const onClick = () => {};
</script>

<template>
  <div
    class="loader"
    style="
      --block-size: 200px;
      --block-height: 40px;
      --block-color: hsl(232, 6%, 26%);
      --block-hover-color: hsl(204, 85%, 57%);
      --block-l-color: hsl(204, 5%, 19%);
      --block-l-hover-color: hsl(205, 59%, 30%);
      --block-t-color: hsl(218, 7%, 22%);
      --block-t-hover-color: hsl(203, 64%, 44%);
    "
  >
    <div v-for="block in blocks" :key="block.id" class="block" :style="block.style"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.loader {
  position: relative;
  transform: skewY(-15deg) translate(50px, 50px);
  animation: animateColor 3s infinite;
}

@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.loader::before {
  content: "";
  position: absolute;
  width: calc(var(--block-size) * 1.5);
  height: calc(var(--block-size) * 1.5);
  bottom: calc(var(--block-size) * -0.75);
  background: rgba(0, 0, 0, 0.1);
  filter: blur(20px);
  transform: skewX(45deg);
}

.loader > .block {
  position: relative;
  width: var(--block-size);
  height: var(--block-height);
  display: block;
  background: var(--block-color);
  color: hsl(232, 6%, 26%);
  transition: 0.5s;
  animation: animateMove 5s ease-in-out infinite;
  animation-delay:var(--delay) ;
}

@keyframes animateMove {
  0%,
  100% {
    transform: translateX(calc(var(--block-size) * -0.35));
  }
  50% {
    transform: translateX(calc(var(--block-size) * 0.35));
  }
}

.loader > .block::before {
  content: "";
  position: absolute;
  width: calc(var(--block-size) * 0.75);
  height: var(--block-height);
  top: 0px;
  left: calc(var(--block-size) * -0.75);
  background: var(--block-l-color);
  transition: 0.5s;
  transform-origin: right;
  transform: skewY(45deg);
}

.loader > .block::after {
  content: "";
  position: absolute;
  top: calc(var(--block-size) * -0.75);
  left: 0px;
  width: 100%;
  height: calc(var(--block-size) * 0.75);
  background: var(--block-t-color);
  transform-origin: bottom;
  transform: skewX(45deg);
  transition: 0.5s;
}

.loader > .block:hover {
  background: var(--block-hover-color);
  transition: 0s;
}

.loader > .block:hover::before {
  background: var(--block-l-hover-color);
  transition: 0s;
}
.loader > .block:hover::after {
  background: var(--block-t-hover-color);
  transition: 0s;
}
</style>
