<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const props = defineProps<{
  color?: string | [string, string];
}>();

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = {
  backgroundColor: "#050505",
};

const isPausedAnimation = ref(true);
const planes = Array(4)
  .fill(0)
  .map((v, i) => i);
const changeAnimationPlayState = () => (isPausedAnimation.value = !isPausedAnimation.value);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div id="cube" class="view" @click="changeAnimationPlayState">
      <div id="planes" class="rotate-animate" :class="{ 'paused-animation': !isPausedAnimation }">
        <div class="plane top"></div>
        <div class="plane corral" v-for="plane of planes" :style="`--i:${plane}`">
          <h2>77</h2>
          <h2 class="shadow">77</h2>
        </div>
        <div class="plane light"></div>
      </div>
    </div>

    <div class="control">
      <button @click="changeAnimationPlayState" style="padding: 0.2em 1em">
        {{ isPausedAnimation ? "关闭旋转" : "开启旋转" }}
      </button>
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
.control {
  position: absolute;
  transform: translate(0, -300px);
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#cube {
  --size: 300px;
  --color: #ff308f;
  --color-light: #ff308f77;
  position: absolute;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
}

#cube.view {
  transform: rotateX(-30deg);
}

#cube > #planes {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* 子元素将保留其 3D 位置。 */
  transform-style: preserve-3d;
}

#cube > #planes.rotate-animate {
  transform: rotateY(30deg);
  animation: animate 10s linear infinite;
}

#cube > #planes.paused-animation {
  animation-play-state: paused;
}

@keyframes animate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

#cube > #planes > .plane {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

#cube > #planes > .corral {
  transform: rotateY(calc(90deg * var(--i))) translateZ(calc(var(--size) / 2));
  background: linear-gradient(#151515, var(--color));
}

#cube > #planes > .top {
  transform: rotateX(90deg) rotateZ(90deg) translateZ(calc(var(--size) / 2));
  background: #222;
}

#cube > #planes > .light {
  transform: rotateX(90deg) rotateZ(90deg) translateZ(calc(var(--size) * -0.8));
  background: var(--color);
  filter: blur(20px);
  box-shadow: 0 0 120px var(--color-light), 0 0 200px var(--color-light), 0 0 200px var(--color-light),
    0 0 200px var(--color-light);
}

#cube > #planes > .corral > h2 {
  position: absolute;
  color: #fff;
  font-size: 10em;
  transform: translateZ(50px);
}

#cube > #planes > .corral > h2.shadow {
  color: #00000022;
  transform: translateZ(0px);
}
</style>
