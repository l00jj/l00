<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const backgroundColor = ref(`#1c1c1c`);

const mainStyle = {
  backgroundColor: `${backgroundColor.value}`,
};

const circles = reactive(
  Array(2)
    .fill(0)
    .map((i) =>
      Array(21)
        .fill(0)
        .map((v, i) => i)
    )
);

var cx = 100;
var cy = 100;
var rx = 90;
var ry = 90;

var path =
  "M" +
  (cx - rx) +
  " " +
  cy +
  "a" +
  rx +
  " " +
  ry +
  " 0 1 0 " +
  2 * rx +
  " 0" +
  "a" +
  rx +
  " " +
  ry +
  " 0 1 0 " +
  -2 * rx +
  " 0" +
  "z";
path;

/**
 * 创建路径
 * size 单个圆的外围大小
 * strokeWidth 路径宽度
 */
const createInfinityCirclePath = (size: number, strokeWidth: number) => {
  const r = (size - strokeWidth) / 2;
  const halfStrokeWidth = strokeWidth / 2;
  const halfHeight = size / 2;

  // 整体参数
  const parameter = {
    width: 4 * r + strokeWidth,
    height: size,
  };

  // 计算整体大小
  const viewBox = `0 0 ${parameter.width} ${parameter.height}`;

  // 计算圆环路径
  const pathDNode = [
    `M${halfStrokeWidth} ${halfHeight}`, //起始点， 左中
    `A${r} ${r} 0 1 0 ${size - halfStrokeWidth} ${halfHeight}`, //中间点
    `A${r} ${r} 0 1 1 ${size - halfStrokeWidth + r * 2} ${halfHeight}`, //右端点
    `A${r} ${r} 0 1 1 ${size - halfStrokeWidth} ${halfHeight}`, //回折中间点
    `A${r} ${r} 0 1 0 ${halfStrokeWidth} ${halfHeight}`, //回折起点
    `z`,
  ];
  const path = {
    d: pathDNode.join(""),
    strokeWidth: strokeWidth.toString(),
  };

  return { parameter, viewBox, path };
};

const infinityCircle = createInfinityCirclePath(200, 40);

</script>

<template>
  <section :style="mainStyle">
    <div class="container">
      <!-- <div class="loader">
        <div class="circle">
          <span class="dot"></span>
        </div>
      </div> -->
      <div class="loader">
        <svg :viewBox="infinityCircle.viewBox" fill="#3d1">
          <!-- <path
            id="motionPath"
            d="M 40 30 Q 10,9 20,100 L 100 80 L60 40"
            stroke="red"
            stroke-dasharray="4 4"
            fill="none"
            stroke-width="1"
          ></path> -->
          <path
            id="motionPath"
            :d="infinityCircle.path.d"
            stroke="#000"
            stroke-dasharray="4 4"
            fill="none"
            :stroke-width="infinityCircle.path.strokeWidth"
          ></path>
          <text id="texts" x="0" y="15" fill="red">I love SVG</text>
          <circle id="circle" cx="0" cy="0" r="20" fill="#fff" />
          <animateMotion id="circle" xlink:href="#circle" dur="10s" begin="0s" fill="freeze" repeatCount="indefinite">
            <mpath xlink:href="#motionPath" />
          </animateMotion>
        </svg>
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
  overflow: hidden;
}
.loader {
  position: relative;
  width: 400px;
}
/* 
.background {
  background: #042104;
}
section {
  --color: #00ff0a;
  --size: 15px;
}
section * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  animation: animateColor 8s linear infinite;
}
@keyframes animateColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.container {
  display: flex;
}
.container .circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 calc(-1 * var(--size) / 2);
}
.container .circle span {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.container .circle span::before {
  position: absolute;
  content: "";
  top: calc(50% - var(--size) / 2);
  right: 0;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color), 0 0 20px var(--color),
    0 0 40px var(--color), 0 0 60px var(--color), 0 0 80px var(--color),
    0 0 100px var(--color);
  transform: scale(0.11);
  animation: animate 4s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
  0% {
    transform: scale(1);
  }
  50%,
  100% {
    transform: scale(0.1);
  }
}
.container .circle:nth-child(2) {
  transform: rotate(-180deg);
}
.container .circle:nth-child(2) span::before {
  animation-delay: calc(-0.1s * var(--i));
} */
</style>
