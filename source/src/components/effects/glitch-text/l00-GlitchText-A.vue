<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
  text: string;
}>();

const option = reactive({
  size: 80,
  bgColor: "#222",
});
defineExpose({ option });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--fontSize": `${option.size}px`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <div class="glitch" :style="mainStyle">
    <span>{{ props.text }}</span>
    <span class="debris">{{ props.text }}</span>
    <span class="debris">{{ props.text }}</span>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.glitch {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fontSize);
  font-weight: 900;
  white-space: nowrap;
  color: #fff;
}

.glitch span {
  position: absolute;
  text-shadow: -0.03em -0.03em 0 #41d9ff, 0 -0.05em 0 #254dfd, 0.03em 0.03em 0 #e830ff;
  animation: glitch 700ms linear infinite;
}
@keyframes glitch {
  0% {
    text-shadow: -0.03em -0.03em 0 #41d9ff, 0 -0.05em 0 #254dfd, 0.03em 0.03em 0 #e830ff;
  }
  25% {
    text-shadow: 0em 0em 0 #41d9ff, 0 0em 0 #254dfd, -0em -0em 0 #e830ff;
  }
  30% {
    text-shadow: 0.03em -0.03em 0 #41d9ff, 0.03em -0.05em 0 #254dfd, -0.03em 0.03em 0 #e830ff;
  }
  50% {
    text-shadow: 0.03em 0.03em 0 #41d9ff, 0 0.05em 0 #254dfd, -0.03em -0.03em 0 #e830ff;
  }
  75% {
    text-shadow: 0em 0em 0 #41d9ff, 0 0em 0 #254dfd, -0em -0em 0 #e830ff;
  }
  80% {
    text-shadow: -0.03em 0.03em 0 #41d9ff, 0 0.05em 0 #254dfd, 0.03em -0.03em 0 #e830ff;
  }
  100% {
    text-shadow: -0.03em -0.03em 0 #41d9ff, 0 -0.05em 0 #254dfd, 0.03em 0.03em 0 #e830ff;
  }
}

.glitch span.debris {
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-0.05em, -0.025em);
  opacity: 0.8;
  animation: glitchDebris 500ms linear infinite;
}

@keyframes glitchDebris {
  0% {
    transform: translate(-0.1em, -0.025em);
  }
  5% {
    transform: translate(0.1em, -0.025em);
  }
  10% {
    transform: translate(0.05em, -0.025em);
  }
  15% {
    transform: translate(-0.05em, -0.025em);
  }
  30%,
  100% {
    transform: translate(0em, -0em);
  }
}

.glitch span.debris:last-child {
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  transform: translate(0.05em, 0.025em);
  opacity: 0.8;
  animation: glitchDebris 350ms linear infinite;
}

@keyframes glitchDebris {
  0% {
    transform: translate(-0.1em, 0.025em);
  }
  5% {
    transform: translate(0.1em, 0.025em);
  }
  10% {
    transform: translate(-0.05em, 0.025em);
  }
  15% {
    transform: translate(0.05em, 0.025em);
  }
  30%,
  100% {
    transform: translate(0em, -0em);
  }
}
</style>
