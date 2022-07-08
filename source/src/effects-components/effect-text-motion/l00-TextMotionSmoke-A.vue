<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const inputText = `In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream(梦幻) World Cups” in Japan. The children drew animals, flowers and people playing soccer under a bule bright sky. They wished each football team good luck by drawing the flags(旗帜) of all the countries that will take part in the World Cup in Japan and South Korea. The picture was put up in a park near a playground in Yokohama. Some football teams will have games there. Are you a football fan(迷)? The World Cup makeds more and more people interested in football Teenagers(青少年) like playing and watching football. Many of them love some football stars so much that they get the pictures of their favourite players on the walls of their rooms. That is the way to show their love for the World Cup as children in Japan.`;

class Target {
  text: string;
  animate = "";
  isSpace = false;
  hasAnimate = false;
  class = {
    char: false,
    smokeOut: false,
    smokeIn: false,
  };
  constructor(text: string) {
    this.text = text;
    this.isSpace = /\S/.test(text);
    this.class.char = this.isSpace;
  }
}

const list = inputText.split("").map((item) => reactive(new Target(item)));

const animate = (target: Target) => {
  if (target.hasAnimate) return;
  target.hasAnimate = true;
  target.class.smokeOut = true;
};
const onTextAnimationend = (event: AnimationEvent, target: Target) => {
  if (event.animationName.includes("smokeOut")) {
    target.class.smokeOut = false;
    target.class.smokeIn = true;
    target.hasAnimate = true;
    return;
  }
  if (event.animationName.includes("smokeIn")) {
    target.class.smokeOut = false;
    target.class.smokeIn = false;
    target.hasAnimate = false;
    return;
  }
};
</script>

<template>
  <section class="background">
    <p class="text">
      <span
        v-for="item in list"
        :class="item.class"
        @mouseenter="animate(item)"
        @touchstart="animate(item)"
        @animationend="onTextAnimationend($event, item)"
        >{{ item.text }}</span
      >
    </p>
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
  background: #111;
}
.text {
  user-select: none;
  position: relative;
  color: #fff;
  text-align: center;
  margin: 40px;
  max-width: 800px;
  font-size: 1.5em;
}
.text span.char {
  position: relative;
  display: inline-flex;
  /* will-change: opacity, transform; */
}

.text span.smokeOut {
  transform-origin: bottom;
  animation: smokeOut 3s linear forwards;
}

@keyframes smokeOut {
  0% {
    opacity: 1;
    filter: blur(0);
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    filter: blur(20px);
    transform: translate(300px, -300px) rotate(720deg) scale(4);
  }
}

.text span.smokeIn {
  opacity: 0;
  transform-origin: bottom;
  animation: smokeIn 2s ease-out forwards;
  animation-delay: 2s;
}

@keyframes smokeIn {
  0% {
    opacity: 0;
    filter: blur(20px);
  }

  100% {
    opacity: 1;
    filter: blur(0px);
  }
}
</style>
