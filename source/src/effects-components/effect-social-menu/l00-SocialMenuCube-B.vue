<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const backgroundColor = `#ccc`;
const duration = 1;
const cubeSize = 3.75;
const cubeThickness = (cubeSize * 4) / 5;
const cubeFaceTranslate = cubeSize / 2 + cubeThickness / 2;
const shadowTranslate = cubeSize / 2 + cubeThickness / 2;
const cubeMove = cubeSize / 2;
const cubeFaceOffset = 0.01;
const cubeTopColor = "#fefefe";
const cubeLeftColor = "#e0e0e0";
const cubeFrontColor = "#f1f1f1";

const mainStyle = {
  "--cubeSize": `${cubeSize}rem`,
  "--cubeThickness": `${cubeThickness}rem`,
  "--cubeLeftTranslate": `-${cubeFaceTranslate - cubeFaceOffset}rem, -${cubeSize / 2 - cubeFaceOffset}rem`,
  "--cubeFrontTranslate": `${cubeFaceTranslate - cubeFaceOffset}rem, ${cubeFaceTranslate - cubeFaceOffset}rem`,
  "--cubeMoveTranslate": `${cubeMove}rem, -${cubeMove}rem`,
  "--shadowTranslate": `-${shadowTranslate}rem, ${shadowTranslate}rem`,
  "--cubeTopColor": `${cubeTopColor}`,
  "--cubeLeftColor": `${cubeLeftColor}`,
  "--cubeFrontColor": `${cubeFrontColor}`,
  "--duration": `${duration}s`,
  backgroundColor: `${backgroundColor}`,
};

const mixColor = (a: string, b: string) => {
  const toInteger = (input: string) => {
    input = input[0] === "#" ? input.slice(1) : input;
    return [input.slice(0, 2), input.slice(2, 4), input.slice(4, 6)].map((s) => parseInt(s, 16));
  };

  const mixColor = (colorA: number, colorB: number) => {
    const b = Math.max(colorA, colorB);
    const t = Math.min(colorA, colorB);
    let ro = b / 255;
    //ro = 1 - Math.pow(1 - ro, 2);
    return Math.round(t * ro);
  };

  const mixRGB = (rbgA: number[], rbgB: number[]) => {
    return rbgA.map((colorA, index) => {
      const colorB = rbgB[index];
      return mixColor(colorA, colorB);
    });
  };

  const rbgA = toInteger(a);
  const rbgB = toInteger(b);
  return (
    "#" +
    mixRGB(rbgA, rbgB)
      .map((i) => i.toString(16))
      .join("")
  );
};

mixColor;

const list = computed(() =>
  [
    {
      icon: '"\\f09a"',
      color: "#3b5999",
    },
    {
      icon: '"\\f099"',
      color: "#55acee",
    },
    {
      icon: '"\\f0d5"',
      color: "#dd4b39",
    },
    {
      icon: '"\\f2ab"',
      color: "#fffa37",
    },
    {
      icon: '"\\f16d"',
      color: "#34405f",
    },
  ].map((item) => ({
    icon: item.icon,
    style: {
      "--content": `${item.icon}`,
      "--color": `${item.color}`,
      "--hoverCubeLeftColor": `${mixColor(item.color, cubeLeftColor)}`,
      "--hoverCubeFrontColor": `${mixColor(item.color, cubeFrontColor)}`,
    },
  }))
);
const ulStyle = reactive({ "--currentIcon": `"?"` });
const changeIcon = (icon: string) => (ulStyle["--currentIcon"] = icon);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <ul :style="ulStyle">
      <li v-for="item in list" :style="item.style" @mouseenter="changeIcon(item.icon)">
        <span class="shadow"></span>
        <div class="cube">
          <span class="face front"></span>
          <span class="face left"></span>
          <span class="face top"></span>
        </div>
      </li>
    </ul>
    <h1 class="title">3D Cube Social Menu</h1>
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
  position: absolute;
  color: #6b6b6b;
  font-size: 5em;
  font-weight: 900;
  transform: translateY(-3em);
}

ul {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: var(--cubeTopColor);
}

ul li .cube .face.top::after,
ul li .cube .face.left::after,
ul li .cube .face.front::after {
  content: var(--content);
  position: absolute;
  font-family: "Font_Awesome_Brands";
  font-size: 1.8rem;
  color: #b0b0b0;
  transition: var(--duration);
}
ul li .cube .face.left::after {
  transform: rotate(90deg);
}

ul li .cube .face.left {
  position: absolute;
  width: var(--cubeThickness);
  height: var(--cubeSize);
  background: var(--cubeLeftColor);
  transition: var(--duration);
  transform-origin: top;
  transform: skewY(-45deg) translate(var(--cubeLeftTranslate));
}

ul li .cube .face.front {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeThickness);
  background: var(--cubeFrontColor);
  transition: var(--duration);
  transform-origin: top;
  transform: skewX(-45deg) translate(var(--cubeFrontTranslate));
}

ul li .shadow {
  position: absolute;
  width: var(--cubeSize);
  height: var(--cubeSize);
  background: rgba(0, 0, 0, 0.2);
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
ul li:hover .cube .face.top::after,
ul li:hover .cube .face.left::after,
ul li:hover .cube .face.front::after {
  color: #fff;
}

ul li:hover .cube .face.left {
  background: var(--hoverCubeLeftColor);
}
ul li:hover .cube .face.front {
  background: var(--hoverCubeFrontColor);
}
ul li:hover .cube .face.front::before {
  box-shadow: -1px -1px 0 var(--color);
}

ul::before {
  content: var(--currentIcon);
  position: absolute;
  font-family: sans-serif, "Font_Awesome_Brands";
  font-size: 27rem;
  color: rgba(0, 0, 0, 0.05);
  filter: blur(5px);
}
</style>
