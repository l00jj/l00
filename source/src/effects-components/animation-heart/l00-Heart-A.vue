<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const backgroundColor = ref(`#042104`);
const size = ref(16); // 需要偶数， 否则旋转时有误差跳动
const listLength = ref(30); // 数量
const rotate = computed(() => 360 / listLength.value);
const duration = ref(2); // 时长
const delay = computed(() => duration.value / listLength.value); // 时差，关键

const list = Array(listLength.value)
  .fill(0)
  .map((val, index) => ({
    style: `--rotate:${rotate.value * index}deg;--delay:${delay.value * index}s;`,
  }));

const mainStyle = {
  "--size": `${size.value}px`,
  "--duration": `${duration.value}s`,
  backgroundColor: `${backgroundColor.value}`,
};
</script>

<template>
  <section :style="mainStyle">
    <div class="loader">
      <span v-for="item in list" :style="item.style"></span>
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

.loader {
  position: relative;
  animation: animateColor calc(var(--duration) * 5) linear infinite;
}

@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.loader span {
  position: absolute;
  width: 200px;
  height: 2px;
  display: flex;
  align-items: center;
  background: transparent;
  transform: rotate(var(--rotate));
  transform-origin: left;
}

.loader span::before {
  content: "";
  position: absolute;
  left: calc(var(--size) / -2);
  width: var(--size);
  height: var(--size);
  background: #00ff0a;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a, 0 0 60px #00ff0a, 0 0 80px #00ff0a,
    0 0 100px #00ff0a;
  transform: scale(0);
  animation: animate var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes animate {
  0%,
  100% {
    transform: translateX(0px) scale(1);
  }
  50% {
    transform: translateX(200px) scale(0.5);
  }
}
</style>
