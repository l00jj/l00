<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted } from "vue";
import Clock from "./l00-Clock-A.vue";
//
const hourPointerDeg = 360 / 12;
const minPointerDeg = 360 / 60;
const secPointerDeg = 360 / 60;
//
let isTick = true;
const update = () => {
  if (!isTick) return;
  //
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  //
  const secRotate = seconds * secPointerDeg;
  const minRotate = minutes * minPointerDeg;
  const hourRotate = hours * hourPointerDeg + minutes / 12;
  //
  parameter.secRotate = secRotate;
  parameter.minRotate = minRotate;
  parameter.hourRotate = hourRotate;
  //
  setTimeout(update, 1000);
};
const startTick = () => {
  isTick = true;
  update();
};
const stopTick = () => {
  isTick = false;
};
onMounted(() => {
  startTick();
});
onUnmounted(() => {
  stopTick();
});
//
const parameter = reactive({
  secRotate: 0,
  minRotate: 0,
  hourRotate: 0,
});
const mainStyle = computed(() => ({
  "--secRotate": `${parameter.secRotate}deg`,
  "--minRotate": `${parameter.minRotate}deg`,
  "--hourRotate": `${parameter.hourRotate}deg`,
}));
</script>

<template>
  <section :style="mainStyle">
    <div class="background"></div>
    <div class="container">
      <div class="clock">
        <Clock></Clock>
        <div class="hour">
          <div class="pointer"></div>
        </div>
        <div class="min">
          <div class="pointer"></div>
        </div>
        <div class="sec">
          <div class="pointer"></div>
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
@keyframes animate {
  0%,
  100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.background {
  position: absolute;
  top: -10px;
  bottom: -10px;
  width: 100%;
  display: block;

  background: linear-gradient(calc(var(--hourRotate) + 90deg), #03a9f4 50%, transparent 50%),
    linear-gradient(calc(var(--minRotate) + 90deg), #e91e63 50%, #ffc107 50%);
  animation: animate 5s ease-in-out infinite;
}

.container {
  position: absolute;
  width: 390px;
  height: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-left: none;
  border-right: none;
  backdrop-filter: blur(25px);
  border-radius: 50%;
  box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05), inset 10px 0px 10px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.1), inset -10px 0px 10px rgba(255, 255, 255, 0.05);
  animation: animate 5s ease-in-out infinite;
  animation-delay: -2.5s;
}
.clock {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-left: none;
  border-right: none;
  border-radius: 50%;
  background-image: radial-gradient(transparent, rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(25px);
  box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05), inset 10px 0px 10px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.1), inset -10px 0px 10px rgba(255, 255, 255, 0.05);
}
.clock::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
}
.clock .hour,
.clock .min,
.clock .sec {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.clock .hour {
  width: 160px;
  height: 160px;
}
.clock .min {
  width: 190px;
  height: 190px;
}
.clock .sec {
  width: 230px;
  height: 230px;
}
.clock .hour .pointer,
.clock .min .pointer,
.clock .sec .pointer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
}
.clock .hour .pointer::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 80px;
  background: #ff105e;
  border-radius: 6px 6px 0 0;
}
.clock .min .pointer::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 90px;
  background: #fff;
  border-radius: 6px 6px 0 0;
}
.clock .sec .pointer::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 150px;
  background: #fff;
  border-radius: 6px 6px 0 0;
}

.clock .hour .pointer {
  transform: rotate(var(--hourRotate));
}
.clock .min .pointer {
  transform: rotate(var(--minRotate));
}
.clock .sec .pointer {
  transform: rotate(var(--secRotate));
}
</style>
