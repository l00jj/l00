<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import { url } from "inspector";

//const props = defineProps<{}>();

const createID = () => {
  // 洗牌
  const shuffle = (list: any[]) => {
    const len = list.length;
    for (let i = 0; i < len - 1; i++) {
      const index = len - 1 - i;
      const random = Math.floor(Math.random() * (len - i));
      const backup = list[index];
      list[index] = list[random];
      list[random] = backup;
    }
  };

  // 进制转换
  const toRadixString = (input: number, radix: string[]) => {
    const len = radix.length;
    const result: string[] = [];
    let sum = input;
    while (sum) {
      result.push(radix[sum % len]);
      sum = Math.floor(sum / len);
    }
    result.reverse();
    return result.join("");
  };

  // x位进制
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // 制作
  shuffle(chars);
  const aString = toRadixString(Math.floor((Math.floor(1 + Math.random() * 8) + Math.random()) * 1000), chars);
  shuffle(chars);
  const bString = toRadixString(new Date().valueOf(), chars);
  return aString + bString;
};

const uuid = createID();
const backgroundColor = ref(`#231635`);

// d="M20, 60 C20, -50 180, 150 180, 60 C180-60 20, 150 20, 60 z" // 另一种无限符号

/**
 * 创建路径
 * size 单个圆的外围大小
 * strokeWidth 路径宽度
 */
const createInfinityCirclePath = (size: number, strokeWidth: number) => {
  // 整体参数
  const radius = (size - strokeWidth) / 2; // 圆弧半径
  const halfHeight = size / 2; // 一半高度
  const halfStrokeWidth = strokeWidth / 2; // 一半轨道宽度
  const space = size * 1.5; // 两圆距离
  const spaceBessel = radius * 2;
  const blur = 20; // 光晕
  const blurMargin = blur * 2;
  const magic = 0.551915024494;

  // 对外参数
  const parameter = {
    width: radius * 2 + space + strokeWidth + blurMargin * 2,
    height: size + blurMargin * 2,
  };

  // 计算整体大小
  const viewBox = `0 0 ${parameter.width} ${parameter.height}`;

  // 计算圆环路径
  const pathDNode = [
    `M${blurMargin + halfStrokeWidth + radius} ${blurMargin + halfStrokeWidth + radius * 2}`, //起始点， 左圆下点
    `a${radius} ${radius} 0 1 1 ${0} ${-radius * 2}`, //左圆上点
    `c${spaceBessel * magic} ${0}, ${space - spaceBessel * magic} ${radius * 2}, ${space} ${radius * 2}`, //右圆下点
    `a${radius} ${radius} 0 1 0 ${0} ${-radius * 2}`, //右圆上点
    `c${-spaceBessel * magic} ${0}, ${spaceBessel * magic - space} ${radius * 2}, ${-space} ${radius * 2}`, //左圆下点
    `z`,
  ];

  const path = {
    d: pathDNode.join(""),
    strokeWidth: strokeWidth.toString(),
    strokeDasharray: `0 0`,
    animate_strokeDasharray: `0;0;`,
  };

  // 滤镜
  const filterID = "filter_" + uuid;
  const filter = {
    id: filterID,
    useID: `url(#${filterID})`,
    blur: blur,
  };

  const linearGradientID = "linearGradient_" + uuid;
  const linearGradient = {
    id: linearGradientID,
    useID: `url(#${linearGradientID})`,
  };

  return reactive({ parameter, viewBox, linearGradient, filter, path });
};

const infinityCircle = createInfinityCirclePath(200, 40);

const mainStyle = {
  "--linearGradientID": infinityCircle.linearGradient.useID,
  "--loaderWidth": `${infinityCircle.parameter.width}px`,
  backgroundColor: `${backgroundColor.value}`,
};

const motionPath = ref();

const resize = () => {
  const motionPathEl = motionPath.value as SVGPathElement;
  const motionPathTotalLength = motionPathEl.getTotalLength();
  const lineLength = Math.floor(motionPathTotalLength / 5); // 光条长度
  const svgPath_strokeDasharray = `${lineLength} ${motionPathTotalLength - lineLength}`;

  infinityCircle.path.strokeDasharray = svgPath_strokeDasharray;
  infinityCircle.path.animate_strokeDasharray = `0;${motionPathTotalLength};`;
};

onMounted(() => {
  resize();
});
</script>

<template>
  <section :style="mainStyle">
    <div class="container">
      <div class="loader">
        <svg :viewBox="infinityCircle.viewBox">
          <filter :id="infinityCircle.filter.id" filterUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceGraphic" :stdDeviation="infinityCircle.filter.blur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient :id="infinityCircle.linearGradient.id">
            <stop offset="0%" stop-color="#d2305c" />
            <stop offset="25%" stop-color="#ff5e00" />
            <stop offset="50%" stop-color="#ffeb00" />
            <stop offset="75%" stop-color="#1cff00" />
            <stop offset="100%" stop-color="#00b9ff" />
          </linearGradient>

          <path
            fill="none"
            :d="infinityCircle.path.d"
            :stroke-width="infinityCircle.path.strokeWidth"
            stroke="#140b1d"
          ></path>
          <!-- :stroke="`url(#${infinityCircle.linearGradient.id})`" -->
          <path
            id="motionPath"
            fill="none"
            ref="motionPath"
            :d="infinityCircle.path.d"
            :stroke-width="infinityCircle.path.strokeWidth"
            :stroke-dasharray="infinityCircle.path.strokeDasharray"
            stroke-linecap="round"
            :filter="infinityCircle.filter.useID"
          >
            <animate
              attributeName="stroke-dashoffset"
              :values="infinityCircle.path.animate_strokeDasharray"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
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
  width: var(--loaderWidth);
}

svg path#motionPath {
  fill: none;
  stroke: var(--linearGradientID);
}
</style>
