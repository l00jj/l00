<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, watchEffect, WatchStopHandle } from "vue";
import gsap from "gsap";

const blocksList = Array(100)
  .fill(0)
  .map((item) => Symbol());
const blockElsList = new Set<HTMLElement>();
const scene = ref<HTMLElement>();

const parameter = reactive({
  //
  dynamicSceneWidth: 0,
  dynamicsceneHeight: 0,
  computedSceneBorderLeft: 0,
  computedSceneBorderRight: 0,
  computedSceneBorderTop: 0,
  computedSceneBorderBottom: 0,
});

const onSceneResize = () => {
  if (!scene.value) return;
  const sceneEl = scene.value;
  parameter.dynamicSceneWidth = sceneEl.offsetWidth;
  parameter.dynamicsceneHeight = sceneEl.offsetHeight;
};

const watchStopHandle: WatchStopHandle = watchEffect(() => {
  parameter.computedSceneBorderRight = parameter.dynamicSceneWidth / 2;
  parameter.computedSceneBorderLeft = -parameter.computedSceneBorderRight;
  parameter.computedSceneBorderBottom = parameter.dynamicsceneHeight / 2;
  parameter.computedSceneBorderTop = -parameter.computedSceneBorderBottom;
});

const resizeObserver = new ResizeObserver(onSceneResize);

//
onMounted(() => {
  scene.value && resizeObserver.observe(scene.value);
  setTimeout(() => animateBlocks());
});

onUnmounted(() => {
  resizeObserver.disconnect();
  watchStopHandle();
});
//
let isAnimating = ref(true);
const chengeAnimateState = () => {
  isAnimating.value = !isAnimating.value;
  isAnimating.value && animateBlocks();
};
let animateLock = false;
const animateBlocks = () => {
  if (animateLock) return;
  animateLock = true;
  gsap.to([...blockElsList], {
    scale: gsap.utils.random(1, 5, true),
    translateX: gsap.utils.random(parameter.computedSceneBorderLeft, parameter.computedSceneBorderRight, true),
    translateY: gsap.utils.random(parameter.computedSceneBorderTop, parameter.computedSceneBorderBottom, true),
    duration: 2,
    ease: "elastic.out(1, 0.3)",
    stagger: 0.01,
    onComplete: () => {
      animateLock = false;
      isAnimating.value && setTimeout(() => animateBlocks(), 1000);
    },
  });
};
//
</script>

<template>
  <section class="background" ref="scene">
    <div class="view">
      <div class="blocks">
        <div
          class="block"
          v-for="block in blocksList"
          :ref="(el) => blockElsList.add(el as HTMLElement)"
          :key="block"
        ></div>
      </div>
      <h2 class="title"><span>Graphic Motion Example</span><br />AnimeJS | GSAP</h2>
    </div>
    <div class="console" @click="chengeAnimateState">
      <span>Click To {{ isAnimating ? "Stop" : "Animate" }}</span>
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
  background: #e80202;
}
.view {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  position: absolute;
  color: #fff;
  text-align: center;
  font-size: 6rem;
  line-height: 1em;
  font-weight: 900;
  white-space: nowrap;
}
.title span {
  font-size: 0.4em;
  line-height: 0.4em;
  font-weight: 400;
}

.blocks {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  position: absolute;
  width: 50px;
  height: 100px;
  background: #e80202;
  box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.2);
  will-change: transform;
}
.console {
  cursor: pointer;
  position: absolute;
  bottom: 5%;
  color: #fff;
  font-size: 1.5em;
  opacity: 0.3;
}
.console:hover {
  opacity: 1;
}
</style>
