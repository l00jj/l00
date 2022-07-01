<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted, watchEffect, WatchStopHandle } from "vue";
import gsap from "gsap";

const inputText = `In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream(梦幻) World Cups” in Japan. The children drew animals, flowers and people playing soccer under a bule bright sky. They wished each football team good luck by drawing the flags(旗帜) of all the countries that will take part in the World Cup in Japan and South Korea. The picture was put up in a park near a playground in Yokohama. Some football teams will have games there. Are you a football fan(迷)? The World Cup makeds more and more people interested in football Teenagers(青少年) like playing and watching football. Many of them love some football stars so much that they get the pictures of their favourite players on the walls of their rooms. That is the way to show their love for the World Cup as children in Japan.`;

const list = inputText.split("");
const charEls = new Set<HTMLElement>();
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
  //如有需要可以精细计算每个文字极限位移
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
let animateLock = false;

const animateBlocks = () => {
  if (animateLock) return;
  animateLock = true;
  const tl = gsap.timeline({
    defaults: {
      duration: 5,
      ease: "circ.inOut",
      //ease: "expo.inOut",
      //ease: "elastic.inOut(1, 0.75)",
      stagger: 0.02,
    },
    onComplete: () => {
      animateLock = false;
      isAnimating.value && setTimeout(() => animateBlocks(), 1000);
    },
  });
  const {
    computedSceneBorderLeft: sceneLeft,
    computedSceneBorderRight: sceneRight,
    computedSceneBorderTop: sceneTop,
    computedSceneBorderBottom: sceneBottom,
  } = parameter;
  tl.to([...charEls], {
    "--rotate": gsap.utils.unitize(gsap.utils.random(-360, 360, true), "deg"),
    "--translateX": gsap.utils.unitize(gsap.utils.random(sceneLeft, sceneRight, true), "px"),
    "--translateY": gsap.utils.unitize(gsap.utils.random(sceneTop, sceneBottom, true), "px"),
    /* modifiers: {
      "--translateX": (n) => n + "px",
      "--translateY": (n) => n + "px",
    }, */
  });

  tl.to([...charEls], {
    "--rotate": 0,
    "--translateX": 0,
    "--translateY": 0,
  });
};
</script>

<template>
  <section class="background" ref="scene">
    <div class="view">
      <p class="text">
        <span v-for="item in list" :ref="(el) => charEls.add(el as HTMLElement)" :class="{ char: item !== ' ' }">
          {{ item }}
        </span>
      </p>
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
.view {
  position: absolute;
  max-width: 650px;
  margin: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  position: relative;
  text-align: center;
}
.text span.char {
  position: relative;
  display: inline-flex;
  color: #00cefe;
  transform: rotate(var(--rotate)) translate(var(--translateX), var(--translateY));
  /* will-change: transform; */
}
</style>
