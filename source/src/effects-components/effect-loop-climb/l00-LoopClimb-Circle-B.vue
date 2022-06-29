<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { createID } from "@src/utils/Tools";

const uuid = createID();
const svgPathID = `path_${uuid}`;
const svgFilterID = `filter_${uuid}`;
const parameter = reactive({
  //
  svgPathID: svgPathID,
  svgTextPathHref: `#${svgPathID}`,
  svgFilterID: svgFilterID,
  svgGFilter: `url(#${svgFilterID})`,
  //
});

const svgPath = ref();
const resize = () => {
  const svgPathEl = svgPath.value as SVGPathElement;
  const svgPathTotalLength = svgPathEl.getTotalLength();
  //const svgPath_strokeDasharray = `${lineLength} ${svgPathTotalLength - lineLength}`;

  //infinityCircle.path.strokeDasharray = svgPath_strokeDasharray;
  //infinityCircle.path.animate_strokeDasharray = `0;${motionPathTotalLength};`;
};
onMounted(() => {
  resize();
});
</script>

<template>
  <section class="background">
    <div class="container">
      <svg viewBox="0 0 600 300">
        <filter :id="parameter.svgFilterID" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g :filter="parameter.svgGFilter">
          <path
            :id="parameter.svgPathID"
            ref="svgPath"
            d="M280 150a75 75 0 1 1 180 0"
            fill="none"
            stroke="#fcf473"
            stroke-width="20"
            stroke-linecap="round"
            stroke-dasharray="100% 200%"
            stroke-dashoffset="0%"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0% 100%;100% 100%;100% 100%;0% 100%"
              dur="4s"
              keyTimes="0;0.25;0.75;1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0%;0%;-59%;0%;0%"
              dur="4s"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              keySplines="0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1;0.65 0 0.35 1"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translateX"
              values="0;-180;0"
              dur="4s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.65 0 0.35 1;0.65 0 0.35 1"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
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
section.background {
  background: #ea257a;
}
.container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  position: absolute;
  width: 600px;
  height: 300px;
  -webkit-box-reflect: below -275px linear-gradient(transparent, #0004);
}
</style>
