<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();
</script>

<template>
  <section class="background">
    <button class="button"><span>BUTTON</span></button>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
}
section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  flex-direction: column;
  gap: 60px;
  background: #eee;
}
button.button {
  position: relative;
  padding: 0.625em 1.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.125em solid black;
  color: black;
  font-size: 16px;
  text-decoration: none;
  letter-spacing: 0.125em;
  box-sizing: border-box;
  transition: 0.5s;
}
button.button span {
  display: flex;
  justify-content: center;
  align-items: center;
}
button.button span::before,
button.button span::after {
  content: "";
  position: absolute;
  display: block;
  width: 1.7em;
  height: 1.7em;
  box-sizing: content-box;
  transition: 0.5s;
}
button.button span::before {
  left: -0.5em;
  border-bottom: 0.125em solid black;
  border-left: 0.125em solid black;
  transform: rotate(45deg);
}
button.button:hover span::before {
  left: -1.5em;
  animation: animateBefore 1s infinite;
}
button.button span::after {
  right: -0.5em;
  border-top: 0.125em solid black;
  border-right: 0.125em solid black;
  transform: rotate(45deg);
}
button.button:hover span::after {
  right: -1.5em;
  animation: animateAfter 1s infinite;
}
button.button:hover {
  border-radius: 3em;
}
@keyframes animateBefore {
  0%,
  100% {
    transform: translateX(0.2em) rotate(45deg);
  }
  50% {
    transform: translateX(-0.2em) rotate(45deg);
  }
}
@keyframes animateAfter {
  0%,
  100% {
    transform: translateX(-0.2em) rotate(45deg);
  }
  50% {
    transform: translateX(0.2em) rotate(45deg);
  }
}
</style>
