<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle } from "vue";

const year = new Date().getFullYear();
const thisYear = year.toString().split("");
const nextYear = (year + 1).toString().split("");

const cubelist = Array(4)
  .fill(0)
  .map((item, cubeIndex) => {
    return {
      faces: Array(4)
        .fill(0)
        .map((item, faceIndex) => {
          const content =
            faceIndex === 1 || faceIndex === 3
              ? Math.trunc(Math.random() * 10).toString()
              : faceIndex === 0
              ? thisYear[cubeIndex]
              : cubeIndex === 3
              ? nextYear[cubeIndex]
              : thisYear[cubeIndex];
          return {
            content,
            style: `--faceIndex:${faceIndex}`,
          };
        }),
      style: `--cubeIndex:${cubeIndex}`,
    };
  });
//console.log(cubelist);
</script>

<template>
  <section class="background">
    <div class="container">
      <div class="cube" v-for="cube in cubelist" :style="cube.style">
        <span v-for="face in cube.faces" :style="face.style">{{ face.content }}</span>
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
section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #3d3d3d;
}
.container {
  display: flex;
  transform-style: preserve-3d;
  gap: 10px;
  transform: rotateY(30deg) rotateX(10deg);
}
.container .cube {
  --size: 100px;
  width: var(--size);
  height: var(--size);
  display: flex;
  transform-style: preserve-3d;
  transition: 2.5s ease-in-out;
  transition-delay: calc(0.25s * var(--cubeIndex));
}
.container .cube::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #373737;
  transform: rotateY(-90deg) translateZ(calc(var(--size) / 2));
}
.container .cube span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 60px;
  font-weight: 900;
  background: linear-gradient(#434343, #535353);
  transform: rotateX(calc(90deg * var(--faceIndex))) translateZ(calc(var(--size) / 2));
}

.container .cube:last-child span {
  color: #333;
  background: linear-gradient(#29c040, #32ed4e);
}
.container .cube:last-child::before {
  background: #29ab3c;
}
.container:hover .cube {
  transform: rotateX(-360deg);
}
.container:hover .cube:last-child {
  transform: rotateX(540deg);
}
</style>
