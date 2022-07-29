<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUpdated, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import anime from "animejs";
//const props = defineProps<{}>();

const numberOfElements = 81;
const elementsList = Array(numberOfElements);
const elementsDomList = new Set<HTMLElement>();
let list: HTMLElement[];
let animation: anime.AnimeTimelineInstance;
const initAnimations = () => {
  if (list || animation) {
    anime.remove(list);
  }
  list = [...elementsDomList];

  const staggersAnimation = anime
    .timeline({
      targets: list,
      easing: "easeInOutSine",
      delay: anime.stagger(50),
      loop: true,
      autoplay: false,
      duration: 600,
      //loopComplete: (a) => console.log("end"),
      //update: () => console.log(staggersAnimation.progress)
    })
    .add({
      scale: anime.stagger([2.5, 1], { from: "center", grid: [9, 9] }),
      translateX: anime.stagger([-100, 100]),
      rotate: anime.stagger([-45, 45]),
      easing: "easeInOutCirc",
      delay: anime.stagger(10, { from: "center" }),
    })
    .add({
      scale: anime.stagger([2.5, 1], { from: "center", easing: "easeInOutCirc" }),
      translateX: anime.stagger([-200, 200]),
      translateY: anime.stagger([-200, 200]),
      rotate: 0,
      delay: anime.stagger(1, { from: "last" }),
    })
    .add({
      rotate: anime.stagger(2, { from: "center", direction: "reverse", easing: "easeInSine" }),
      translateX: 0,
      translateY: 0,
      delay: anime.stagger(10, { from: "center" }),
    })
    .add({
      scale: anime.stagger([2, 1], { grid: [9, 9], axis: "y" }),
      translateY: anime.stagger([-100, 200], { grid: [9, 9], axis: "y" }),
      rotate: 0,
      delay: anime.stagger(1, { from: "last" }),
    })
    .add({
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      scale: anime.stagger([1.5, 0.5], { from: "center" }),
      rotate: anime.stagger([10, -10], { from: "last" }),
      delay: anime.stagger(50, { from: "center", grid: [9, 9] }),
    })
    .add({
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      rotate: anime.stagger([-10, 10], { from: "last" }),
      scale: 1,
      delay: anime.stagger(50, { from: "center", grid: [9, 9] }),
    })
    .add({
      translateX: 0,
      translateY: anime.stagger(6, { from: "center", direction: "reverse" }),
      rotate: 0,
      delay: anime.stagger(50, { from: "center", grid: [9, 9] }),
    })
    .add({
      translateX: anime.stagger("1rem", { grid: [9, 9], from: "center", axis: "x" }),
      //translateY: anime.stagger("1rem", { grid: [9, 9], from: "center", axis: "y" }),
      delay: anime.stagger(200, { grid: [9, 9], from: "center", direction: "reverse" }),
    })
    .add({
      translateX: anime.stagger([25, -25], { from: "first" }),
      translateY: 0,
      rotate: anime.stagger([40, -40], { from: "first" }),
      delay: anime.stagger(10, { from: "first" }),
    })
    .add({
      translateY: anime.stagger([-240, 240]),
      rotate: () => anime.random(-100, 100),
      scale: anime.stagger([1, 3], { from: "center" }),
      delay: anime.stagger(10, { from: 0 }),
    })
    .add({
      translateX: 0,
      translateY: 0,
      scale: 1,
      rotate: 360,
      duration: 2000,
      delay: 0,
    });

  staggersAnimation.play();
  animation = staggersAnimation;
};

onMounted(() => {
  initAnimations();
});

</script>

<template>
  <section class="background">
    <div class="container">
      <div class="stagger" v-for="item in elementsList" :ref="(el)=>elementsDomList.add(el as HTMLElement)"></div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.background {
  background: #f6f4f2;
}

.container {
  display: flex;
  /*flex-wrap: wrap;*/
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
}

.container .stagger {
  /*position: absolute;*/
  width: 64px;
  height: 128px;
  border: 1px solid #373535;
  background-color: #f6f4f2;
}
</style>
