<script setup lang="ts">
import { reactive, onMounted } from "vue";
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
</script>

<template>
  <section class="background">
    <div class="container">
      <svg viewBox="0 0 400 300">
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
            d="M75 150 c100 -75, 150 75, 250 0"
            fill="none"
            stroke="#ff075b"
            stroke-width="50"
            stroke-linecap="round"
          >
            <animate
              attributeName="d"
              values="M75 150 c100 -75, 150 75, 250 0;M75 150 c100 75, 150 -75, 250 0;M75 150 c100 -75, 150 75, 250 0;"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate attributeName="stroke" values="#ff075b;#1aff22;#ff075b;" dur="2s" repeatCount="indefinite" />
          </path>
          <text font-size="18" fill="red" textLength="250" lengthAdjust="spacingAndGlyphs" transform="translate(0 -35)">
            <textPath :href="parameter.svgTextPathHref">Elastic Line Animation Effects.</textPath>
            <animate attributeName="fill" values="#ff075b;#1aff22;#ff075b;" dur="2s" repeatCount="indefinite" />
          </text>
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: #000;
}
.container {
  position: relative;
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
