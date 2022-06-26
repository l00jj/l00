<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const parameter = reactive({
  petalsQuantity: 20,
  shellSize: 500,
  shellRadius: 250,
  fogSize: 500 * 1,
  dotSize: 20,
  coreDotExpandZ: 250, // 1/2 shellSize
  coreDotShrinkZ: 50, // 1/10 shellSize
  outDotExpandZ: 250 + 200, //
});

const shellPetalYsList = Array(parameter.petalsQuantity / 2)
  .fill(360 / parameter.petalsQuantity)
  .map((val, index) => ({
    style: `--petalYIndex:${index};--petalYDeg:${val * index - val * 0.5}deg`,
  }));

const corePetalYsList = Array(parameter.petalsQuantity)
  .fill(360 / parameter.petalsQuantity)
  .map((val, index) => ({
    style: `--petalYIndex:${index};--petalYDeg:${val * index}deg`,
  }));

//[90, 50, 10, -30, -70]
const corePetalXsList = [90, 45, 10, -45, -90].map((val, index) => ({
  style: `--petalXIndex:${index};--petalXDeg:${val}deg`,
}));

const outPetalYsList = corePetalYsList;
//[70, 30, -10, -50, -90]
const outPetalXsList = [67.5, 27.5, -10, -27.5, -67.5].map((val, index) => ({
  style: `--petalXIndex:${index};--petalXDeg:${val}deg`,
}));

const mainStyle = computed(() => ({
  "--shellSize": `${parameter.shellSize}px`,
  "--shellRadius": `${parameter.shellRadius}px`,
  "--fogSize": `${parameter.fogSize}px`,
  "--dotSize": `${parameter.dotSize}px`,
  "--coreDotExpandZ": `${parameter.coreDotExpandZ}px`,
  "--coreDotShrinkZ": `${parameter.coreDotShrinkZ}px`,
  "--outDotExpandZ": `${parameter.outDotExpandZ}px`,
}));
/**
 * 原版在 surface 处可能采取反角旋转，把 surface 转至平行中轴再发射圆粒
 */

const onTransitionend = (event: TransitionEvent) => {
  //console.log("onTransitionend",event)
};
/* (window as any).outDotsAnimation = outDotsAnimation; */

/**
 * 动画环节
 */
let isPlayingOutDotsAnimation = false;
let outDotsAnimation: any[] = [];
const onEnter = () => {
  playOutDotsAnimation();
};
const onLeave = () => {
  finishOutDotsAnimation();
};
const onOutDotsAnimationFinished = (animation: Animation) => {
  if (isPlayingOutDotsAnimation) animation.play();
};
const playOutDotsAnimation = () => {
  isPlayingOutDotsAnimation = true;
  outDotsAnimation.forEach((animation: Animation) => {
    animation.updatePlaybackRate(1);
    animation.play();
  });
};
const finishOutDotsAnimation = () => {
  isPlayingOutDotsAnimation = false;
  outDotsAnimation.forEach((animation: Animation) => {
    animation.updatePlaybackRate(0.2);
  });
};
onMounted(() => {
  outDotsAnimation = outDotsAnimation.map((item) => {
    const animations = item.getAnimations();
    const animation = animations[0] as Animation;
    animation.onfinish = () => onOutDotsAnimationFinished(animation);
    return animation;
  });
});
onUnmounted(() => {
  outDotsAnimation.forEach((i) => (i.onfinish = null));
  outDotsAnimation.length = 0;
});
</script>

<template>
  <section>
    <!--  -->
    <div
      class="view"
      :style="mainStyle"
      @mouseenter="onEnter"
      @touchstart="onEnter"
      @touchend="onLeave"
      @mouseleave="onLeave"
    >
      <div class="fog"></div>
      <div class="container">
        <div class="shell">
          <div class="petalY" v-for="petalY in shellPetalYsList" :style="petalY.style"></div>
        </div>
        <!--  -->
        <div class="out">
          <div class="petalY" v-for="petalY in outPetalYsList" :style="petalY.style">
            <div class="petalX" v-for="petalX in outPetalXsList" :style="petalX.style">
              <div class="surface">
                <span class="dot" :ref="(el) => outDotsAnimation.push(el)"></span>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="core">
          <div class="petalY" v-for="petalY in corePetalYsList" :style="petalY.style">
            <div class="petalX" v-for="petalX in corePetalXsList" :style="petalX.style">
              <span class="dot"></span>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <!--  -->
    <div class="background"></div>
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
  position: static;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #eee;
  background-image: radial-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
}

.view {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.fog {
  position: absolute;
  width: var(--fogSize);
  height: var(--fogSize);
  background-image: radial-gradient(
    closest-side,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.2) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  /* border: 1px solid red; */
}
.container {
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: rotateX(0deg) rotateY(10deg) rotateZ(10deg); */
  transform-style: preserve-3d;
  animation: containerRotate 120s linear infinite;
}

@keyframes containerRotate {
  0% {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateY(720deg) rotateZ(-1080deg);
  }
}

.container .shell {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}
.container .shell .petalY {
  position: absolute;
  width: var(--shellSize);
  height: var(--shellSize);
  background: none;
  border: 2px solid #000;
  border-radius: 50%;
  transform: rotateY(var(--petalYDeg));
}
.container .out .petalY,
.container .core .petalY {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(var(--petalYDeg));
  transform-style: preserve-3d;
}

.container .out .petalX,
.container .core .petalX {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateX(var(--petalXDeg));
  transform-style: preserve-3d;
}
.container .face {
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 0, 0, 0.9);
  transform: translateZ(var(--shellRadius));
  transform-style: preserve-3d;
}
.container .dot {
  position: relative;
  width: var(--dotSize);
  height: var(--dotSize);
  background: #000;
  border-radius: 50%;
}

.container .core .dot {
  transition: 20s ease-in-out;
  transform: translateZ(var(--shellRadius));
}

.container .out .surface {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(var(--shellRadius));
  transform-style: preserve-3d;
  transition: 20s ease;
  transition-delay: 2s;
}

.view .container .shell .petalY {
  border: 2px solid #000;
  border-color: rgba(0, 0, 0, 1);
  transition: 20s ease-in-out;
}
.view:hover .container .shell .petalY {
    border-color: rgba(0, 0, 0, 0.5);
}
.view .container .core {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  transition: 20s ease-in-out;
  transition-delay: 2s;
}
.view:hover .container .core {
  transform: rotateY(180deg);
}
.view .container .out {
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  transition: 20s ease-in-out;
  transition-delay: 2s;
}
.view:hover .container .out {
  transform: rotateY(-180deg);
}
.view:hover .container .core .dot {
  transform: translateZ(var(--coreDotShrinkZ));
}

.view:hover .container .out .surface {
  transform: translateZ(var(--outDotExpandZ));
}

.view .container .out .dot {
  transform: rotateX(0deg);
  animation: outDotRotate 3s linear 1;
  animation-play-state: paused;
}

@keyframes outDotRotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(180deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(-180deg);
  }
}
.background {
  background-color: #ccc;
  transition: 5s;
}
.view:hover + .background {
  background-color: #fff;
}
</style>
