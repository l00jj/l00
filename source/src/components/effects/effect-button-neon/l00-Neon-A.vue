<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const option = reactive({
  neonColor: `hsl(317 100% 54%)`, //
  neonBgColor: `hsl(323 21% 16%)`, //
});

defineExpose({ option });

const mainStyle = computed(() => {
  const style = {
    "--neon-color": `${option.neonColor}`,
    "--neonBg-color": `${option.neonBgColor}`,
  };

  return Object.entries(style)
    .map((i) => i.join(":"))
    .join(";");
});

</script>

<template>
  <a :style="mainStyle">
    <solt>l00</solt>
  </a>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  position: relative;
  z-index: 0;
  padding: 0.25em 1em;
  display: inline-block;
  text-decoration: none;
  font-size: 4rem;
  font-weight: 800;
  color: var(--neon-color);
  border: 0.125em solid var(--neon-color);
  border-radius: 0.25em;
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--neon-color);
  box-shadow: inset 0 0 0.5em 0 var(--neon-color), 0 0 0.5em 0 var(--neon-color);
  cursor: pointer;
}

a::before {
  content: "";
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: var(--neon-color);
  transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
  filter: blur(1em);
  opacity: 0.7;
}

a::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--neon-color);
  border: 0.1em solid var(--neon-color);
  z-index: -1;
  box-shadow: 0 0 2em 0.5em var(--neon-color);
  opacity: 0;
  /* transition: opacity 100ms linear; */
}

a:focus,
a:hover {
  color: var(--neonBg-color);
  text-shadow:none;
  animation: animateColor 0.5s ease 1;
}

@keyframes animateColor {
  0%,
  30% {
    color: var(--neon-color);
  }
  10%,
  100% {
    color: var(--neonBg-color);
  }
  20%,
  40% {
    color: var(--neon-color);
  }
}

a:focus::before,
a:hover::before,
a:focus::after,
a:hover::after {
  opacity: 1;
  animation: animate 0.5s ease 1;
}

@keyframes animate {
  0%,
  30% {
    opacity: 0.7;
  }
  10%,
  100% {
    opacity: 1;
  }
  20%,
  40% {
    opacity: 0.5;
  }
}
</style>
