<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
const bubbles = reactive(Array(5).fill(0));
</script>

<template>
  <section class="background">
    <div class="bubble" v-for="bubble in bubbles">
      <span class="reflect"></span>
      <span class="reflect"></span>
      <span class="reflect"></span>
      <span class="reflect"></span>
      <span class="reflect"></span>
      <span class="highlight"></span>
      <span class="highlight"></span>
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
  background: #000;
}
.bubble {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.25);
  animation: animate 8s ease-in-out infinite;
}
@keyframes animate {
  0%,
  100% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(20px);
  }
}
.bubble:nth-child(2) {
  position: relative;
  zoom: 0.45;
  top: -100px;
  left: -10px;
  animation-delay: -4s;
}
.bubble:nth-child(3) {
  position: relative;
  zoom: 0.25;
  top: -300px;
  right: -80px;
  animation-delay: -6s;
}
.bubble:nth-child(4) {
  position: relative;
  zoom: 0.35;
  left: -120px;
  bottom: -200px;
  animation-delay: -3s;
}
.bubble:nth-child(5) {
  position: relative;
  zoom: 0.5;
  left: 0px;
  top: 200px;
  animation-delay: -5s;
}
.bubble span {
  position: absolute;
  border-radius: 50%;
}
.bubble span.reflect:nth-child(1) {
  inset: 10px;
  border-left: 15px solid #0fb4ff;
  filter: blur(8px);
}
.bubble span.reflect:nth-child(2) {
  inset: 10px;
  border-right: 15px solid #ff4484;
  filter: blur(8px);
}
.bubble span.reflect:nth-child(3) {
  inset: 20px;
  border-top: 15px solid #ffeb3b;
  filter: blur(8px);
}
.bubble span.reflect:nth-child(4) {
  inset: 30px;
  border-left: 15px solid #ff4484;
  filter: blur(12px);
}
.bubble span.reflect:nth-child(5) {
  inset: 10px;
  border-bottom: 10px solid #fff;
  filter: blur(8px);
  transform: rotate(330deg);
}
.bubble span.highlight:nth-child(6) {
  position: absolute;
  top: 50px;
  left: 45px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  filter: blur(2px);
}
.bubble span:nth-child(7) {
  position: absolute;
  top: 80px;
  left: 80px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  filter: blur(2px);
}
</style>
