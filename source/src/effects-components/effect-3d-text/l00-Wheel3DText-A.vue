<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  text?: string;
}>();

const option = reactive({
  facesNumber: 15, //一个多少片 //3, 9, 15, 45 奇数可以视觉上更好
  duration: 20, //时间
});

const text = props.text ? props.text : "l00";
const durationTime = computed(() => `${option.duration}s`);
class Face {
  id = Symbol();
  style: { [key: string]: string | number } = {};
  constructor(i: number) {
    this.style.transform = `translate(0, -50%) rotateX(${(i * 360) / option.facesNumber}deg)`;
    this.style.animationDelay = `${-(i * option.duration) / option.facesNumber}s`;
  }
}

const faces = computed(() =>
  Array(option.facesNumber)
    .fill(0)
    .map((v, i) => new Face(i))
);
</script>

<template>
  <section class="background">
    <div class="view">
      <div class="faces">
        <span class="face" v-for="face in faces" :style="face.style">{{ text }}</span>
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
section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.background {
  background: #333;
}
.view {
  position: relative;
  width: 100%;
  /* 控制高度 */
  height: 9rem;
  transform-style: preserve-3d;
}
.view .faces {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: animate v-bind(durationTime) linear infinite;
}
@keyframes animate {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(360deg);
  }
}

.view .faces .face {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  line-height: 1;
  color: #fffd;
  font-size: 8rem;
  font-weight: 900;
  -webkit-text-stroke: 2px #000;
  text-shadow: 0 0 3rem rgba(0, 0, 0, 0.3);
  transform-origin: bottom;
  animation: animateOpacity v-bind(durationTime) linear infinite;
}
.view .faces .face:nth-child(3n + 2) {
  color: #e3f2fddd;
}
.view .faces .face:nth-child(3n + 3) {
  color: #fce4ecdd;
}

@keyframes animateOpacity {
  0%,
  5%,
  95%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
}
</style>
