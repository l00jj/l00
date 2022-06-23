<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const createID = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const len = chars.length;
  const random =
    new Date().valueOf() + Math.floor((Math.floor(1 + Math.random() * 8) + Math.random()) * 1000) * 10000000000000;
  const result: string[] = [];
  let sum = random;
  while (sum) {
    result.push(chars[sum % len]);
    sum = Math.floor(sum / len);
  }
  result.reverse();
  return result.join("");
};

const uuid = createID();

const backgroundColor = ref(`#1c1c1c`);

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
    id: `motionPath_${uuid}`,
    d: pathDNode.join(""),
    strokeWidth: strokeWidth.toString(),
  };

  const circle = {
    id: `circle_${uuid}`,
  };

  return { parameter, viewBox, path, circle };
};

const infinityCircle = createInfinityCirclePath(200, 40);

const mainStyle = {
  "--loaderWidth": `${infinityCircle.parameter.width}px`,
  backgroundColor: `${backgroundColor.value}`,
};
</script>

<template>
  <section :style="mainStyle">
    <div class="container">
      <div class="loader">
        <svg :viewBox="infinityCircle.viewBox">
          <path
            :id="infinityCircle.path.id"
            :d="infinityCircle.path.d"
            stroke="#000"
            fill="none"
            :stroke-width="infinityCircle.path.strokeWidth"
          ></path>
          <circle :id="infinityCircle.circle.id" cx="0" cy="0" r="20" fill="#fff" />
          <animateMotion
            :xlink:href="`#${infinityCircle.circle.id}`"
            dur="10s"
            begin="0s"
            fill="freeze"
            repeatCount="indefinite"
          >
            <mpath :xlink:href="`#${infinityCircle.path.id}`" />
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
  width: var(--loaderWidth);
}
</style>
