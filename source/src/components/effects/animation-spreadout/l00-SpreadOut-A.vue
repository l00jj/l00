<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const option = reactive({
  particleNumbers: 10,
  particleSize: 25,
  particleScope: 300,
  particleScopeScale: 10,
  particleColor: "hsl(184deg 100% 50%)",
  particleShadowColor: "hsl(184deg 100% 50%)",
  bgColor: "hsl(190deg 100% 7%)",
});

defineExpose({ option });

const mainStyle = computed(() =>
  Object.entries({
    "--particle-color": `${option.particleColor}`,
    "--particle-shadow-color": `${option.particleShadowColor}`,
    "--particle-size": `${option.particleSize}px`,
    "--particle-border": `${Math.floor(option.particleSize * 0.16)}px`,
    "--particle-partner-scope": `${Math.floor(option.particleSize * 1.2)}px`,
    "--particle-shadow-size": `${Math.floor(option.particleSize * 0.8)}px`,
    "--particle-scope": `${option.particleScope}px`,
    "--particle-scope-out": `${option.particleScope * option.particleScopeScale}px`,
    "--particle-rotate": `${Math.fround((360 * 100) / option.particleNumbers) / 100}deg`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "")
);

class Particle {
  id = Symbol();
  style = {
    display: "block",
    "--i": 0,
  };
  constructor(i: number) {
    this.style["--i"] = i;
  }
}

const particles = computed(() =>
  Array(option.particleNumbers)
    .fill(0)
    .map((v, i) => new Particle(i))
);
</script>

<template>
  <div class="loader" :style="mainStyle">
    <span v-for="particle in particles" :key="particle.id" :style="particle.style"></span>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}
.loader {
  position: relative;
  width: var(--particle-scope);
  height: var(--particle-scope);
  animation: animateRotate 20s linear infinite;
}


@keyframes animateRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  transform: rotate(calc(var(--particle-rotate) * var(--i)));
}

.loader span::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--particle-size);
  height: var(--particle-size);
  border: var(--particle-border) solid var(--particle-color);
  background: transparent;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--particle-shadow-color),
    var(--particle-partner-scope) var(--particle-partner-scope) 0 var(--particle-color),
    var(--particle-partner-scope) var(--particle-partner-scope) 10px var(--particle-shadow-color),
    calc(var(--particle-partner-scope) * -1) calc(var(--particle-partner-scope) * -1) 0 var(--particle-color),
    calc(var(--particle-partner-scope) * -1) calc(var(--particle-partner-scope) * -1) 10px var(--particle-shadow-color),
    calc(var(--particle-partner-scope) * -1) var(--particle-partner-scope) 0 var(--particle-color),
    calc(var(--particle-partner-scope) * -1) var(--particle-partner-scope) 10px var(--particle-shadow-color),
    var(--particle-partner-scope) calc(var(--particle-partner-scope) * -1) 0 var(--particle-color),
    var(--particle-partner-scope) calc(var(--particle-partner-scope) * -1) 10px var(--particle-shadow-color);
  animation: animateColor 10s linear infinite;
  animation-delay: calc(-0.25s * var(--i));
  transform-origin: 5px;
  transition: 2s;
}

.loader:hover span::before {
  box-shadow: 0 0 10px var(--particle-shadow-color), var(--particle-scope) var(--particle-scope) 0 var(--particle-color),
    var(--particle-scope) var(--particle-scope) 10px var(--particle-shadow-color),
    calc(var(--particle-scope) * -1) calc(var(--particle-scope) * -1) 0 var(--particle-color),
    calc(var(--particle-scope) * -1) calc(var(--particle-scope) * -1) 10px var(--particle-shadow-color),
    calc(var(--particle-scope) * -1) var(--particle-scope) 0 var(--particle-color),
    calc(var(--particle-scope) * -1) var(--particle-scope) 10px var(--particle-shadow-color),
    var(--particle-scope) calc(var(--particle-scope) * -1) 0 var(--particle-color),
    var(--particle-scope) calc(var(--particle-scope) * -1) 10px var(--particle-shadow-color);
  transform-origin: 200px;
}

@keyframes animateColor {
  0% {
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
</style>
