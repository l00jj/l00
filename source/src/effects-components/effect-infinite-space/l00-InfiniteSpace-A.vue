<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import inputImageUrl from "./l00-InfiniteSpace-A/image.jpg?url";

const parameter = reactive({
  isTest: false,
  /**
   *  perspective 500 targetLength 2000 时中心空位为 20%
   *  perspective 500 targetLength 4500 时中心空位为 10%
   *  perspective 1000 targetLength 4000 时中心空位为 20%
   */
  perspective: 1000,
  backgroundImageUrl: "",
  imageWidth: 0,
  imageHeight: 0,
  targetWidth: 0,
  targetHeight: 0,
  targetLength: 4000,
  speed: 50, //每秒移动速度
  targetleftTranslateZ: 0,
  targetbottomTranslateZ: 0,
  targetImageWidth: 0,
  targetImageMoveDuration: 0,
  targettopImageCentreDeviateY: 0,
  targettopImageMoveEnd: 0,
  targetbottomImageCentreDeviateY: 0,
  targetbottomImageMoveEnd: 0,
  targetleftImageCentreDeviateX: 0,
  targetleftImageMoveEnd: 0,
  targetrightImageCentreDeviateX: 0,
  targetrightImageMoveEnd: 0,
});

const sceneStyle = computed(() => ({
  "--perspective": `${parameter.perspective}px`,
  "--backgroundImageUrl": `url(${parameter.backgroundImageUrl})`,
  "--targetLength": `${parameter.targetLength}px`,
  "--targetleftTranslateZ": `${parameter.targetleftTranslateZ}px`,
  "--targetbottomTranslateZ": `${parameter.targetbottomTranslateZ}px`,
  "--targetImageWidth": `${parameter.targetImageWidth}px`,
  "--targetImageMoveDuration": `${parameter.targetImageMoveDuration}s`,
  "--targettopImageCentreDeviateY": `${parameter.targettopImageCentreDeviateY}px`,
  "--targettopImageMoveEnd": `${parameter.targettopImageMoveEnd}px`,
  "--targetbottomImageCentreDeviateY": `${parameter.targetbottomImageCentreDeviateY}px`,
  "--targetbottomImageMoveEnd": `${parameter.targetbottomImageMoveEnd}px`,
  "--targetleftImageCentreDeviateX": `${parameter.targetleftImageCentreDeviateX}px`,
  "--targetleftImageMoveEnd": `${parameter.targetleftImageMoveEnd}px`,
  "--targetrightImageCentreDeviateX": `${parameter.targetrightImageCentreDeviateX}px`,
  "--targetrightImageMoveEnd": `${parameter.targetrightImageMoveEnd}px`,
  /* backgroundColor: "#050505", */
}));

/**
 * 贴图相关
 */
let imageObjectUrl = "";
const image = new Image();
const setImage = (imageUrl: string) => {
  fetch(imageUrl)
    .then((cb) => cb.blob())
    .then((blob) => {
      // 清除之前的URL
      URL.revokeObjectURL(imageObjectUrl);
      // 更新
      imageObjectUrl = URL.createObjectURL(blob);
      image.src = imageObjectUrl;
      parameter.backgroundImageUrl = imageObjectUrl;
    });
};
image.onload = (event) => updateImage();
const updateImage = () => {
  //
  const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;
  parameter.imageWidth = imageWidth;
  parameter.imageHeight = imageHeight;
  const { targetWidth, targetHeight, targetLength, speed } = parameter;
  const minUnit = Math.trunc(Math.min(targetWidth, targetHeight) / 5);
  const targetImageWidth = minUnit;
  const targetImageHeight = (targetImageWidth * imageHeight) / imageWidth;
  parameter.targetImageWidth = targetImageWidth;
  // 计算UV轴的贴图移动距离的公因数
  const commonfactor = targetImageWidth * targetImageHeight;
  // 计算滑动时间
  const targetImageMoveDuration = commonfactor / parameter.speed;
  parameter.targetImageMoveDuration = targetImageMoveDuration;
  // Top
  const targettopImageCentreDeviateY = 0;
  parameter.targettopImageCentreDeviateY = targettopImageCentreDeviateY;
  parameter.targettopImageMoveEnd = targettopImageCentreDeviateY - commonfactor;
  // Bottom
  const targetbottomImageCentreDeviateY = targetLength % targetImageHeight;
  parameter.targetbottomImageCentreDeviateY = targetbottomImageCentreDeviateY;
  parameter.targetbottomImageMoveEnd = targetbottomImageCentreDeviateY + commonfactor;
  // Left
  const targetleftImageCentreDeviateX = 0;
  parameter.targetleftImageCentreDeviateX = targetleftImageCentreDeviateX;
  parameter.targetleftImageMoveEnd = targetleftImageCentreDeviateX - commonfactor;
  // Right
  const targetrightImageCentreDeviateX = targetWidth % targetImageWidth;
  parameter.targetrightImageCentreDeviateX = targetrightImageCentreDeviateX;
  parameter.targetrightImageMoveEnd = targetrightImageCentreDeviateX + commonfactor;
};
/**
 * 场景相关
 */
const scene = ref<HTMLElement>();
const updatetarget = () => {
  const sceneEl = scene.value;
  if (!sceneEl) return;
  const targetWidth = sceneEl.offsetWidth;
  const targetHeight = sceneEl.offsetHeight;
  parameter.targetWidth = targetWidth;
  parameter.targetHeight = targetHeight;
  parameter.targetleftTranslateZ = -targetWidth / 2;
  parameter.targetbottomTranslateZ = -targetHeight / 2;
};

//window.testParameter = parameter;

/**
 * 监听变动
 */
const resizeObserver = new ResizeObserver((entries) => {
  updatetarget();
  updateImage();
});
onUnmounted(() => {
  resizeObserver.disconnect();
});
onMounted(() => {
  resizeObserver.observe(scene.value as HTMLElement);
  setImage(inputImageUrl);
});
</script>

<template>
  <section ref="scene" :style="sceneStyle">
    <div class="view" :class="{ test: parameter.isTest }">
      <div class="target">
        <div class="top paper"></div>
        <div class="bottom paper"></div>
        <div class="left paper"></div>
        <div class="right paper"></div>
        <div class="front">
          <span>BRANDSLOGAN</span>
          <span>BRANDSLOGO</span>
          <span>[ Infinite Space ]</span>
        </div>
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

.view {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  perspective: var(--perspective);
}

.view .target {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

.view .target .top {
  position: absolute;
  width: 100%;
  height: var(--targetLength);
  background-color: rgba(0, 0, 255, 0.5);
  transform: rotateX(-90deg) translate3d(0px, 50%, var(--targetbottomTranslateZ));
}

.view .target .bottom {
  position: absolute;
  width: 100%;
  height: var(--targetLength);
  background-color: rgba(0, 0, 255, 0.5);
  transform: rotateX(90deg) translate3d(0px, -50%, var(--targetbottomTranslateZ));
}
.view .target .left {
  position: absolute;
  width: var(--targetLength);
  height: 100%;
  background-color: rgba(0, 255, 255, 0.5);
  transform: rotateY(90deg) translate3d(50%, 0, var(--targetleftTranslateZ));
}

.view .target .right {
  position: absolute;
  width: var(--targetLength);
  height: 100%;
  background-color: rgba(0, 255, 255, 0.5);
  transform: rotateY(-90deg) translate3d(-50%, 0, var(--targetleftTranslateZ));
}

.view .target .front {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
}

.view .target .paper {
  background-image: var(--backgroundImageUrl);
}

.view .target .top.paper {
  background-size: var(--targetImageWidth);
  animation: targettopAnimate var(--targetImageMoveDuration) linear infinite;
}
@keyframes targettopAnimate {
  0% {
    background-position: center var(--targettopImageCentreDeviateY);
  }
  100% {
    background-position: center var(--targettopImageMoveEnd);
  }
}

.view .target .bottom.paper {
  background-size: var(--targetImageWidth);
  animation: targetbottomAnimate var(--targetImageMoveDuration) linear infinite;
}
@keyframes targetbottomAnimate {
  0% {
    background-position: center var(--targetbottomImageCentreDeviateY);
  }
  100% {
    background-position: center var(--targetbottomImageMoveEnd);
  }
}

.view .target .left.paper {
  background-size: var(--targetImageWidth);
  animation: targetleftAnimate var(--targetImageMoveDuration) linear infinite;
}
@keyframes targetleftAnimate {
  0% {
    background-position: var(--targetleftImageCentreDeviateX) center;
  }
  100% {
    background-position: var(--targetleftImageMoveEnd) center;
  }
}

.view .target .right.paper {
  background-size: var(--targetImageWidth);
  animation: targetrightAnimate var(--targetImageMoveDuration) linear infinite;
}
@keyframes targetrightAnimate {
  0% {
    background-position: var(--targetrightImageCentreDeviateX) center;
  }
  100% {
    background-position: var(--targetrightImageMoveEnd) center;
  }
}
</style>

<style scoped>
.view .target .front {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  font-weight: 600;
}

.view .target .front span:nth-child(1) {
  padding: 0.1em 1em;
  color: #fff;
  background: #000;
}
.view .target .front span:nth-child(2) {
  margin-top: 0.25em;
}
.view .target .front span:nth-child(3) {
  padding: 0.1em 1em;
  color: #fff;
  font-size: 0.25em;
  background: #ff1f6b;
}
</style>

<style scoped>
.view.test::before {
  content: "";
  position: absolute;
  width: 20%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid crimson;
}
.view.test .target {
  border: 1px solid crimson;
  transform: translate3d(0px, 0px, 0px);
}
</style>
