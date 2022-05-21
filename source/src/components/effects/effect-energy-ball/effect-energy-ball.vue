<script setup lang="ts">
import { ref } from "vue";
let isActivate = ref(false);
</script>

<template>
  <div class="background">
    <div :class="['energy-ball', { 'stop': isActivate }]" @click="isActivate=!isActivate">
      <div class="item" style="--color:#fbad04;--w:22%;--h:2%;--d:2.5s;"></div>
      <div class="item" style="--color:#03a1d9;--w:18%;--h:3%;--d:5s;"></div>
      <div class="item" style="--color:#f7036d;--w:1%;--h:17%;--d:7.5s;"></div>
      <div class="item" style="--color:#93ff16;--w:4%;--h:23%;--d:10s;"></div>
    </div>
  </div>
</template>

<style scoped>
.background {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.energy-ball {
  position: relative;
  width: 150px;
  height: 150px;
}

.energy-ball.stop>.item {
  animation: none
}

.energy-ball>.item {
  position: absolute;
  width: calc(100% - var(--w));
  left: calc(var(--w)/2);
  height: calc(100% - var(--h));
  top: calc(var(--h)/2);
  background: var(--color);
  border-radius: 50%;
  animation-duration: calc(var(--d));
  mix-blend-mode: screen;
  filter: blur(5px);
  animation: animate 5s linear infinite;
}

.energy-ball>.item:nth-child(even) {
  animation-direction: reverse;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
