<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import IconFacial from "./l00-Icon-Facial.vue";
import IconFacialGlitch from "./l00-Icon-FacialGlitch.vue";
//const props = defineProps<{}>();
</script>

<template>
  <div class="container">
    <div class="scanner-group">
      <div class="scanner analysis">
        <IconFacial stroke="#222" class="bg"></IconFacial>
        <IconFacialGlitch path-stroke="#3fefef" class="bg analysing"></IconFacialGlitch>
      </div>
      <div class="scanner scanning">
        <IconFacial stroke="#3fefef"></IconFacial>
      </div>
      <div class="scanner scanning line"></div>
    </div>
    <span>Facial Scanning</span>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  --size: 300px;
  --color: #3fefef;
  --lineHeight: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: colorChange 12s linear infinite;
}

@keyframes colorChange {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.scanner-group {
  position: relative;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
}
.scanner {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.scanner svg {
  width: var(--size);
  height: var(--size);
}
.container span {
  margin-top: 1em;
  color: var(--color);
  font-size: calc(var(--size) * 0.12);
  font-weight: 500;
  text-align: center;
  animation: flicker 3s ease-in-out infinite;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.scanner.analysis {
  top: 0;
  height: 50%;
  align-items: flex-start;
  animation: analysis 6s ease-in-out infinite;
}
.scanner.scanning {
  bottom: 0;
  height: 50%;
  align-items: flex-end;
  animation: scanning 6s ease-in-out infinite;
}

@keyframes analysis {
  0%,
  100% {
    height: 100%;
  }
  50% {
    height: 0%;
  }
}

@keyframes scanning {
  0%,
  100% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
}

.scanner.line {
  display: flex;
  align-items: flex-start;
  overflow: initial;
}
.line::before {
  content: "";
  position: relative;
  width: 100%;
  height: var(--lineHeight);
  display: block;
  border-radius: var(--lineHeight);
  filter: drop-shadow(0 0 20px var(--color)) drop-shadow(0 0 60px var(--color));
  transform: translate(0, -50%);
  background: var(--color);
}

.scanner.analysis .bg {
  position: absolute;
}

.scanner.analysis .analysing :deep(path) {
  stroke-dasharray: 50% 50%;
  animation: analysing 6s ease-in-out infinite;
}
@keyframes analysing {
  0%,
  50% {
    stroke-dashoffset: 1000;
    stroke-dasharray: 100% 0%;
  }
  51%,
  80% {
    stroke-dashoffset: 0;
    stroke-dasharray: 0% 100%;
  }
  100% {
    stroke-dashoffset: 1000;
    stroke-dasharray: 100% 0%;
  }
}
</style>
