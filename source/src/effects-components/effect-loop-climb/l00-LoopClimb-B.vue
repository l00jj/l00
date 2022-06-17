<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const parameter = {
  backgroundColor: `#000`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="road-container">
      <div class="road">
        <div class="shadow"></div>
      </div>
    </div>

    <div class="cube-container">
      <div class="cube"></div>
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
  --animationDuration: 1.5s;
  --size: 120px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.road-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#2e2e2e, #333);
}
.road {
  position: relative;
  width: 800px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #525252;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(30deg);
}
.road::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, #fff 70%, transparent 70%);
  background-size: 120px;
  animation: roadAnimate var(--animationDuration) linear infinite;
}

@keyframes roadAnimate {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -120px; /* 与background-size对应则无缝 */
  }
}

.road::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: #2d2d2d;
  transform-origin: top;
  transform: translate(0, 100%) rotateX(-45deg);
}

.road .shadow {
  position: absolute;
  bottom: 0;
  width: 95%; /* 精确需要用函数 */
  height: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), transparent);
  transform: translate(0, calc(100% + 30px)); /* 增加马路厚度 */
}

.cube-container {
  position: absolute;
  width: calc(var(--size) * 2);
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, transparent, #0004);
  animation: cubeContainerAnimate var(--animationDuration) linear infinite;
}

@keyframes cubeContainerAnimate {
  0% {
    transform: translate(calc(var(--size) * 0.5), -15px);
  }
  100% {
    transform: translate(calc(var(--size) * -0.5), -15px);
  }
}
.cube {
  position: relative;
  width: var(--size);
  height: var(--size);
  background: #fff;
  transform-origin: right bottom;
  animation: cubeAnimate var(--animationDuration) linear infinite;
  will-change: transform;
}

@keyframes cubeAnimate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
</style>
