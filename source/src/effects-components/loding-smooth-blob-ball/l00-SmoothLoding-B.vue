<script setup lang="ts">
import { ref, reactive, toRefs, computed, watchEffect } from "vue";

const option = reactive({
  ballBumber: 8, //小球个数
  ballSize: 100, //小球大小
  ballMiniScale: 0.4, //小球缩小比例
  ballDelay: 0.15, //每个小球的动作延迟，不同的参数与总效果时长作为搭配会有其他效果出现
  loaderSize: 300, //整体大小，整体活动范围
  dur: 3, //效果时长
  //
  ballSmootScale: 0.1, //[不需要调整]融合比例，默认 0.1
  ballSmooth: 0, //此参数为计算参数，无法调整
});

watchEffect(() => {
  option.ballSmooth = option.ballSize * option.ballSmootScale;
});

const mainStyle = computed(() => {
  const style = {
    "--ball-size": `${option.ballSize}px`,
    "--ball-rotate": `${360 / option.ballBumber}deg`,
    "--ball-translateX": `${(option.loaderSize - option.ballSize * option.ballMiniScale) / 2}px`,
    "--ball-miniScale": option.ballMiniScale,
    "--ball-delay": `${option.ballDelay}s`,
    "--ball-smooth ": `${option.ballSmooth}px`,
    "--loader-size": `${option.loaderSize}px`,
  };

  return Object.entries(style)
    .map((i) => i.join(":"))
    .join(";");
});

class Ball {
  id = Symbol();
  style = {
    display: "block",
    "--i": 0,
  };
  constructor(index: number) {
    this.style["--i"] = index;
  }
}

const balls = computed(() =>
  Array(option.ballBumber)
    .fill(0)
    .map((v, i) => new Ball(i))
);

const matrix = computed(
  () => `1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 ${option.ballSmooth * 2} -${option.ballSmooth}`
);
</script>

<template>
  <div class="container" :style="mainStyle">
    <div class="loader">
      <div class="ball" v-for="ball in balls" :style="ball.style"></div>
    </div>
    <div class="content"><slot></slot></div>

    <svg>
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="option.ballSmooth" />
        <feColorMatrix type="matrix" :values="matrix" result="matrix" />
      </filter>
    </svg>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

svg {
  display: none;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  color: #fff;
  font-size: 2em;
  font-weight: 400;
}

.loader {
  position: absolute;
  width: var(--loader-size);
  height: var(--loader-size);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  filter: url("#blurMe") drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
}

.loader > .ball {
  position: absolute;
  width: var(--ball-size);
  height: var(--ball-size);
  border-radius: 50%;
  background: #fff;
  animation: ballRotate 5s ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--ball-delay));
}

@keyframes ballRotate {
  0%,
  10% {
    transform: rotate(0deg) translateX(0px) scale(1);
  }
  30%,
  70% {
    transform: rotate(calc(var(--ball-rotate) * var(--i))) translateX(var(--ball-translateX))
      scale(var(--ball-miniScale));
    box-shadow: 0 0 0 var(--ball-smooth) #ffffff99;
  }
  90%,
  100% {
    transform: rotate(0deg) translateX(0px) scale(1);
  }
}
</style>
