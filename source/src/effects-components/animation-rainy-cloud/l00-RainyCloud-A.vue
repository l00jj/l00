<script setup lang="ts">
import { ref, reactive, onUnmounted, watchEffect, WatchStopHandle } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

class Drips {
  id = Symbol();
  style = {
    display: "block",
    "--delay": "0s",
  };
  constructor() {
    this.randomStyleDelay();
  }
  randomStyleDelay() {
    const delay = Math.floor(Math.random() * 30 + 3) / 10;
    const delayCode = `${delay}s`;
    this.style["--delay"] = delayCode;
    return delayCode;
  }
}

const drips = reactive(
  Array(20)
    .fill(0)
    .map((v, i) => new Drips())
);

const onClick = () => drips.forEach((drip) => drip.randomStyleDelay());
</script>

<template>
  <div class="sky" style="--sky-height: 400px; --drip-size: 10px" @click="onClick">
    <div class="cloud"></div>
    <div class="rain">
      <div v-for="drip in drips" :key="drip.id" class="drip" :style="drip.style"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.sky {
  position: relative;
  height: var(--sky-height);
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #fff;
}
.sky > .cloud {
  position: relative;
  top: -50px;
  width: 320px;
  height: 100px;
  background: #fff;
  border-radius: 100px;
}
.sky > .cloud::before {
  content: "";
  position: absolute;
  width: 110px;
  height: 110px;
  top: -50px;
  left: 40px;
  border-radius: 110px;
  background: #fff;
  box-shadow: 100px -15px 0 27px #fff;
}

.sky > .rain {
  position: absolute;
  display: flex;
  justify-content: center;
}
.sky > .rain > .drip {
  width: var(--drip-size);
  height: var(--drip-size);
  margin: calc(var(--drip-size) / 5);
  border-radius: var(--drip-size);
  background: #fff;
  animation: animate 1.5s cubic-bezier(0.2,0,1,0.1) infinite;
  animation-delay: calc(var(--delay) * -1);
}

@keyframes animate {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
  70% {
    transform: translateY(calc(var(--sky-height) - var(--drip-size) * 1.2)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(calc(var(--sky-height) - var(--drip-size) * 1.2)) scale(0);
    opacity: 0;
  }
}
</style>
