<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const parameter = reactive({
  backgroundColor: "#151515", //
});

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="container">
      <div class="boardWrap">
        <div class="board">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div class="layer"></div>
        </div>
      </div>
      <div class="background"></div>
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

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --size: 60px;
  --thickness: calc(var(--size) / 3);
  --number: 8;
  --totalSize: calc(var(--size) * var(--number));
  --backgroundSize: calc(var(--size) * 2);
  --duration: 1s;
}

.boardWrap {
  position: absolute;
  transition: var(--duration);
  z-index: 1;
}

.board {
  position: relative;
  width: var(--totalSize);
  height: var(--totalSize);

  transform: rotate(-30deg) skew(25deg);
  box-shadow: -20px 20px 20px rgba(0, 0, 0, 0.4);
  transition: var(--duration);
}

.board span {
  position: relative;
  width: var(--totalSize);
  height: var(--size);
  display: block;
  background-size: var(--backgroundSize);
}

.board span:nth-child(odd) {
  background-image: linear-gradient(90deg, #f1f1f1 0%, #f1f1f1 50%, #333 50%, #333 100%);
}

.board span:nth-child(even) {
  background-image: linear-gradient(-90deg, #f1f1f1 0%, #f1f1f1 50%, #333 50%, #333 100%);
}

.board::before {
  content: "";
  position: absolute;
  width: var(--totalSize);
  height: var(--thickness);
  transform-origin: top left;
  transform: rotate(90deg) skew(45deg); /* translate(-100%, 0); */
  background-image: linear-gradient(90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
  background-size: var(--backgroundSize);
}

.board::after {
  content: "";
  position: absolute;
  width: var(--totalSize);
  height: var(--thickness);
  transform-origin: top left;
  transform: skew(-45deg); /* translate(-100%, 0); */
  background-image: linear-gradient(-90deg, #fff 0%, #fff 50%, #000 50%, #000 100%);
  background-size: var(--backgroundSize);
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(0px);
  transform: translate(2px, -2px);
  transition: var(--duration);
}
.layer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -80%;
  width: 30%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transform: skew(-45deg);
  transition: var(--duration);
}

.background {
  pointer-events: none;
  position: static;
  width: 100%;
  height: 100%;
  background: #ddd;
}
.background::before {
  pointer-events: none;
  content: "";
  position: static;
  width: 0%;
  height: 100%;
  display: block;
  background: #ff4181;
  transform-origin: bottom left;
  transform: skew(55deg);
  transition: var(--duration);
}

.boardWrap:hover {
  transform: translate(0, -40px);
}
.boardWrap:hover .board {
  box-shadow: -50px 50px 50px rgba(0, 0, 0, 0.3);
}
.boardWrap:hover .layer {
  backdrop-filter: blur(5px);
  transform: translate(40px, -40px);
}
.boardWrap:hover .layer::before {
  left: 150%;
}
.boardWrap:hover + .background::before {
  width: 180%;
}

</style>
