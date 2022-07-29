<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";
//import anime from "animejs";
//const props = defineProps<{}>();

const starsNumber = ref(80);
const starsList: Star[] = reactive([]);
class Star {
  x: string;
  y: string;
  radius: string;
  index: number;
  style: string;
  constructor({ x, y, radius, index }: { [key: string]: any }) {
    this.x = x as string;
    this.y = y as string;
    this.radius = radius;
    this.index = index as number;
    this.style = `--x:${x};--y:${y};--radius:${radius};--index:${this.index};`;
  }
  static create() {
    starsList.length = 0;
    for (let i = 0; i < starsNumber.value; i++) {
      const star = new Star({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        radius: `${(Math.random() * 0.7 + 0.6) * 2}px`,
        index: i,
      });
      starsList.push(star);
    }
  }
}
Star.create();

const meteorsNumber = ref(80);
const meteorsList: Meteor[] = reactive([]);
class Meteor {
  x: string;
  y: string;
  index: number;
  style: string;
  dom?: HTMLElement;
  constructor({ x, y, index }: { [key: string]: any }) {
    this.x = x as string;
    this.y = y as string;
    this.index = index as number;
    this.style = `--x:${x};--y:${y};--index:${this.index};`;
  }
  static create() {
    meteorsList.length = 0;
    for (let i = 0; i < meteorsNumber.value; i++) {
      const meteor = new Meteor({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        index: i,
      });
      meteorsList.push(meteor);
    }
  }
  static loopPlayID: number;
  static loopPlay() {
    window.clearInterval(Meteor.loopPlayID);
    let index = 0;
    Meteor.loopPlayID = window.setInterval(() => {
      index = (index + 1) % meteorsList.length;
      const meteor = meteorsList[index];
      if (meteor && meteor.dom) {
        const animations = meteor.dom.getAnimations();
        if (animations && animations.length) animations[0].play();
      }
    }, 800);
  }
}
Meteor.create();
Meteor.loopPlay();
</script>

<template>
  <section class="background">
    <div class="sky">
      <div class="star" v-for="item in starsList" :style="item.style"></div>
      <div
        class="meteor"
        v-for="item in meteorsList"
        :style="item.style"
        :ref="(el)=>(item.dom=el as HTMLElement)"
      ></div>
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
  background: linear-gradient(to right, #ff47a1 0%, #ff9f4d 100%);
}

.sky {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sky .star {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--radius);
  height: var(--radius);
  border-radius: 50%;
  background: white;
  animation: flicker 1.5s infinite alternate-reverse;
  animation-delay: calc(var(--index) * 50ms);
  transform: translate(-50%, -50%);
}
@keyframes flicker {
  0%,
  25% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.meteors {
  width: 150vh;
  height: 100vw;
  background: red;
  transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(120deg);
}
.meteor {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 100px;
  height: 2px;
  margin: 0;
  padding: 0;
  opacity: 1;
  background-color: white;
  background: linear-gradient(90deg, white, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 6px white);
  overflow: hidden;
  transform-origin: left;
  transform: rotate(-60deg);
  animation: slide 1s linear 1 both;
  animation-play-state: paused;
}
@keyframes slide {
  0% {
    opacity: 0;
    width: 150px;
    transform: rotate(-60deg) translateX(-0px);
  }
  30% {
    opacity: 1;
  }
  55% {
    width: 100px;
    transform: rotate(-60deg) translateX(-250px);
  }
  100% {
    width: 0px;
    transform: rotate(-60deg) translateX(-300px);
    opacity: 0;
  }
}
</style>
