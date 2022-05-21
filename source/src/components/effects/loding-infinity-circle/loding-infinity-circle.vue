<script setup  lang="ts">
import { reactive } from 'vue'

const circles = reactive(Array(2).fill(0).map(i =>
  Array(21).fill(0).map((v, i) => i)
))
</script>

<template>
  <div class="background">
    <section>
      <div class="container">
        <div v-for="(list, index) in circles" :key="index" class="circle">
          <span v-for="(item, index) in list" :key="index" :style="`--i:${item}`"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.background {
  background: #042104;
}
section {
  --color: #00ff0a;
  --size: 15px;
}
section * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  animation: animateColor 8s linear infinite;
}
@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.container {
  display: flex;
}
.container .circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 calc(-1 * var(--size) / 2);
}
.container .circle span {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.container .circle span::before {
  position: absolute;
  content: "";
  top: calc(50% - var(--size) / 2);
  right: 0;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color), 0 0 20px var(--color),
    0 0 40px var(--color), 0 0 60px var(--color), 0 0 80px var(--color),
    0 0 100px var(--color);
  transform: scale(0.11);
  animation: animate 4s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
  0% {
    transform: scale(1);
  }
  50%,
  100% {
    transform: scale(0.1);
  }
}
.container .circle:nth-child(2) {
  transform: rotate(-180deg);
}
.container .circle:nth-child(2) span::before {
  animation-delay: calc(-0.1s * var(--i));
}
</style>