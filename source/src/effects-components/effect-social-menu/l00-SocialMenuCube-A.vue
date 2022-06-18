<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const backgroundColor = `#ccc`;
const duration = 1;
const cubeSize = 3.75;
const cubeThickness = cubeSize / 4;
const cubeFaceTranslate = cubeSize / 2 + cubeThickness / 2;
const shadowTranslate = (cubeSize / 2 + cubeThickness / 2) / 2;
const cubeMove = cubeSize / 2;

const mainStyle = {
  "--cubeSize": `${cubeSize}rem`,
  "--cubeThickness": `${cubeThickness}rem`,
  "--cubeLeftTranslateX": `-${cubeFaceTranslate}rem`,
  "--cubeLeftTranslateY": `-${cubeFaceTranslate}rem`,
  "--cubeFrontTranslateX": `${cubeFaceTranslate}rem`,
  "--cubeFrontTranslateY": `${cubeFaceTranslate}rem`,
  "--cubeMoveTranslate": `${cubeMove}rem, -${cubeMove}rem`,
  "--shadowTranslate": `-${shadowTranslate}rem, ${shadowTranslate}rem`,
  "--duration": `${duration}s`,
  backgroundColor: `${backgroundColor}`,
};

const list = computed(() =>
  [
    {
      icon: "\\f09a",
      background: "#3b5999",
    },
    {
      icon: "\\f099",
      background: "#55acee",
    },
    {
      icon: "\\f0d5",
      background: "#dd4b39",
    },
    {
      icon: "\\f2ab",
      background: "#fffa37",
    },
    {
      icon: "\\f16d",
      background: "#34405f",
    },
  ].map((item) => `--content:"${item.icon}";--color:${item.background};`)
);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <h1 class="title">3D Cube Social Menu</h1>
    <ul>
      <li v-for="item in list" :style="item">
        <span class="shadow"></span>
        <div class="cube">
          <span class="face front"></span>
          <span class="face left"></span>
          <span class="face top"></span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome_Brands";
  src: url("@src/assets/icons/Font-Awesome/Font Awesome 6 Brands-Regular-400.otf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
}

section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}

.title {
  color: #6b6b6b;
  font-size: 5em;
  font-weight: 900;
  margin-bottom: 1em;
  /* transform: translateY(-3em); */
}

ul {
  position: relative;
  display: flex;
  font-size: 16px;
}

ul li {
  position: relative;
  margin: 0 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-30deg) skew(25deg);
}

ul li .cube {
  position: relative;
  width: var(--cubeSize);
  height: var(--cubeSize);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--duration);
}
ul li .cube .face {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--duration);
}
ul li .cube .face::before {
  transition: var(--duration);
}

ul li .cube .face.top {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeSize);
  background: #fefefe;
}

ul li .cube .face.top::before {
  content: var(--content);
  position: absolute;
  font-family: "Font_Awesome_Brands";
  font-size: 2rem;
  color: #000;
  transition: var(--duration);
}

ul li .cube .face.left {
  position: absolute;
  width: var(--cubeThickness);
  height: var(--cubeSize);
  background: #b1b1b1;
  transition: var(--duration);
  transform-origin: right;
  transform: skewY(-45deg) translate(var(--cubeLeftTranslateX), var(--cubeLeftTranslateY));
}

ul li .cube .face.front {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeThickness);
  background: #c6c6c6;
  transition: var(--duration);
  transform-origin: top;
  transform: skewX(-45deg) translate(var(--cubeFrontTranslateX), var(--cubeFrontTranslateY));
}

ul li .cube .face.left::before,
ul li .cube .face.front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  mix-blend-mode: multiply;
}

ul li .shadow {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeSize);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: blur(3px);
  transform: translate(var(--shadowTranslate));
  transition: var(--duration);
}

ul li:hover .cube {
  transform: translate(var(--cubeMoveTranslate));
}
ul li:hover .shadow {
  filter: blur(15px);
}

ul li:hover .face.top {
  background: var(--color);
}
ul li:hover .face.top::before {
  color: #fff;
}
ul li:hover .cube .face.left::before,
ul li:hover .cube .face.front::before {
  background: var(--color);
}
ul li:hover .cube .face.front::before {
  box-shadow: -1px -1px 0 var(--color);
}
</style>
