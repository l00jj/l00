<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
import { BlobSvg, BlobSvgConfig } from "./SvgBlob";
import Preview from "./Preview.vue";

const preview = reactive({
  currentSvg: new BlobSvg({}),
  lastBasePoints: [[1]],
  blobJellyAnimation: "",
  test: true,
});

const viewBox = computed(() => {
  const boxSize = preview.currentSvg.config.boxSize;
  return `0 0 ${boxSize} ${boxSize}`;
});

const previewChangeBlob = () => {
  preview.currentSvg.makeRandoms();
};

//点击图形动一下
const quakeBlob = () => {
  const newBlobSvg = new BlobSvg(preview.currentSvg.config);
  newBlobSvg.makeBasePoints();
  preview.lastBasePoints = newBlobSvg.points.base;
};

//监听变动生成关键点
watchEffect(async () => {
  preview.currentSvg.config.complexity;
  preview.currentSvg.config.makeRandoms();
});

//监听变动生成关键点
watchEffect(async () => {
  const { currentSvg } = preview;
  currentSvg.makeBasePoints();
});

//监听变动生成曲线
watchEffect(async () => {
  const { currentSvg } = preview;
  currentSvg.value.path_d = currentSvg.getPathD();
});

//生成测试视图
watchEffect(async () => {
  if (!preview.test) return;
  const { currentSvg } = preview;
  //生成测试外框
  currentSvg.value.polyline_points = currentSvg.getPolylinePoints();
});

const svgAnimate = ref();

//生成关键点备份
watchEffect(async () => {
  const { currentSvg, lastBasePoints } = preview;
  const base = currentSvg.points.base;
  if (base.length === lastBasePoints.length) {
    const jellyAnimation = BlobSvg.computedBlobJellyAnimation(lastBasePoints, base);
    preview.blobJellyAnimation = jellyAnimation;
  } else preview.blobJellyAnimation = preview.currentSvg.value.path_d;
  svgAnimate.value && (svgAnimate.value as SVGAnimateElement).beginElement();
  preview.lastBasePoints = currentSvg.points.base.map((item) => [...item]);
});
</script>

<template>
  <Preview>
    <template #title>SVG Blob 生成器</template>

    <template #introduce>
      采用固定角度，生成长度不一的顶点，再二次贝塞尔链接。弹动方程采用两点间距离 50% 作3次回弹。
    </template>

    <template #preview>
      <svg
        :viewBox="viewBox"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        v-if="preview.test"
      >
        <defs>
          <marker id="dot" viewBox="0 0 30 30" refX="15" refY="15" markerWidth="10" markerHeight="10">
            <circle cx="15" cy="15" r="10" fill="#ddd" />
          </marker>
        </defs>

        <polyline
          :points="preview.currentSvg.value.polyline_points"
          fill="none"
          stroke="#ddd"
          marker-start="url(#dot)"
          marker-mid="url(#dot)"
          marker-end="url(#dot)"
        />
      </svg>

      <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: rgb(254, 0, 242)"></stop>
            <stop offset="100%" style="stop-color: rgb(251, 2, 128)"></stop>
          </linearGradient>
        </defs>
        <path fill="url(#gradient)" :d="preview.currentSvg.value.path_d" @click="quakeBlob">
          <animate
            id="animate"
            ref="svgAnimate"
            attributeName="d"
            dur="1s"
            repeatCount="1"
            fill="freeze"
            :values="preview.blobJellyAnimation"
          ></animate>
        </path>
      </svg>
    </template>

    <template #console>
      <div class="handles">
        <div class="handle-item">
          <span class="label">Complexity: {{ preview.currentSvg.config.complexity }}</span>
          <el-slider v-model="preview.currentSvg.config.complexity" :min="3" :max="11" :step="1" show-stops />
        </div>

        <div class="handle-item">
          <span class="label">Randomness: {{ preview.currentSvg.config.randomness }}</span>
          <el-slider v-model="preview.currentSvg.config.randomness" :min="2" :max="9" :step="1" show-stops />
        </div>

        <div class="handle-item">
          <span class="label">Rotate: {{ preview.currentSvg.config.rotate }}</span>
          <el-slider v-model="preview.currentSvg.config.rotate" :min="0" :max="360" :step="1" />
        </div>

        <div class="handle-item">
          <el-button plain @click="previewChangeBlob" style="width: 100%; height: 3em; background: transparent"
            >随机新生成</el-button
          >
        </div>

        <div class="handle-item">
          <span class="label">Result</span>
          <el-input
            v-model="preview.currentSvg.value.path_d"
            input-style="background: transparent"
            :rows="4"
            :readonly="true"
            type="textarea"
            resize="none"
            placeholder="Please input"
          />
        </div>
      </div>
    </template>
  </Preview>
</template>

<style scoped>
svg {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.handles {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}
.handle-item {
  position: relative;
  display: flex;
}
.handle-item:not(:last-child) {
  margin-bottom: 2em;
}

.handle-item .label {
  width: 20em;
  line-height: 1.8em;
}
</style>
