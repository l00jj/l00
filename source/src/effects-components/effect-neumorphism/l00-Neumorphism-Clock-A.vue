<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted } from "vue";
import Clock from "./l00-Clock-A.vue";
//
const hourPointer = ref<HTMLElement>();
const minPointer = ref<HTMLElement>();
const secPointer = ref<HTMLElement>();
//
const hourPointerDeg = 360 / 12;
const minPointerDeg = 360 / 60;
const secPointerDeg = 360 / 60;
//
let isTick = true;
const update = () => {
  if (!isTick) return;
  const hourPointerEl = hourPointer.value;
  const minPointerEl = minPointer.value;
  const secPointerEl = secPointer.value;
  if (!hourPointerEl || !minPointerEl || !secPointerEl) return;
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
  secPointerEl.style.transform = `rotate(${secRotate}deg)`;
  minPointerEl.style.transform = `rotate(${minRotate}deg)`;
  hourPointerEl.style.transform = `rotate(${hourRotate}deg)`;
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
</script>

<template>
  <section class="background">
    <div class="clock">
      <Clock></Clock>
      <div class="hour">
        <div class="pointer" ref="hourPointer"></div>
      </div>
      <div class="min">
        <div class="pointer" ref="minPointer"></div>
      </div>
      <div class="sec" ref="secPointer">
        <div class="pointer"></div>
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
section.background {
  background: #091921;
}

.clock {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #091921;
  border-radius: 50%;
  box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05), inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.3), inset 0 15px 15px rgba(0, 0, 0, 0.3);
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
</style>
