<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted, watchEffect, WatchStopHandle } from "vue";
//import gsap from "gsap";

const parameter = reactive({
  duration: 10,
  amount: 12,
});

const rowDelay = parameter.duration / parameter.amount / 4;

class Dot {
  rowIndex: number;
  el!: HTMLElement;
  style = {
    "--duration": `${parameter.duration}s`,
    "--delay": ``,
  };
  constructor(rowIndex: number) {
    this.rowIndex = rowIndex;
    this.update();
  }
  update() {
    const random = (rowDelay * Math.trunc((Math.random() - 0.5) * 6 * 10)) / 10;
    this.style["--delay"] = `${rowDelay * this.rowIndex + random}s`;
  }
}

const rows = Array(parameter.amount)
  .fill(0)
  .map((val, rowIndex) =>
    Array(parameter.amount)
      .fill(0)
      .map((val, index) => reactive(new Dot(rowIndex)))
  );

const onDotAnimationChanged = (dot: Dot) => {
  dot.update();
};
</script>

<template>
  <section class="background" ref="scene">
    <div class="box">
      <div class="row" v-for="row in rows">
        <span
          class="dot"
          v-for="dot in row"
          :style="dot.style"
          @animationiteration="onDotAnimationChanged(dot)"
          :ref="(el)=>dot.el=(el as HTMLElement)"
        ></span>
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
.background {
  background: #130e23;
}
.box {
  display: flex;
  flex-direction: column-reverse;
  animation: color 10s infinite;
}

@keyframes color {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.box .row {
  position: relative;
  display: flex;
}

.dot {
  position: relative;
  width: 40px;
  height: 40px;
  display: block;
}
.dot::before {
  content: "";
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
  background: #00ff0a;
  box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a, 0 0 60px #00ff0a, 0 0 80px #00ff0a,
    0 0 100px #00ff0a;
  transform: scale(0.1);
  /* transition: 2s; */
  animation: animate ease infinite;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
}

@keyframes animate {
  0%,
  20% {
    transform: scale(0.1);
  }
  25%,
  75% {
    transform: scale(1);
  }
  80%,
  100% {
    transform: scale(0.1);
  }
}
</style>
