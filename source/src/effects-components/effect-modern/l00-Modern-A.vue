<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const parameter = {
  backgroundColor: `#262626`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

const svg = ref();
const text = ref();
const svgStyle = reactive({
  "--textWidth": 0,
  "--perimeter": 0,
  "--hoverDashoffset": 0,
});

// 正式使用可以在更新场景中更正具体偏移
const svgUpdate = () => {
  const svgEl: SVGSVGElement = svg.value as SVGSVGElement;
  const textEl: HTMLElement = text.value as HTMLElement;
  const textWidth = textEl.offsetWidth;
  const width = svgEl.width.animVal.value;
  const height = svgEl.height.animVal.value;
  const perimeter = width * 2 + height * 2;
  const hoverDashoffset = textWidth * 2 + height + (width - textWidth) / 2;
  svgStyle["--textWidth"] = textWidth;
  svgStyle["--perimeter"] = perimeter;
  svgStyle["--hoverDashoffset"] = hoverDashoffset;
};

onMounted(() => {
  svgUpdate();
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <a>
      <svg ref="svg" :style="svgStyle">
        <rect></rect>
      </svg>
      <span ref="text">welcome</span>
    </a>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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

a {
  text-decoration: none;
}

a {
  position: relative;
  padding: 0.8em 2.5em;
  color: #fff;
  font-size: 25px;
}

a svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
a svg rect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #fff;
  stroke-width: 4;
  stroke-dasharray: var(--perimeter), var(--perimeter);
  stroke-dashoffset: 0;
  transition: 1s ease-in;
}

a:hover svg rect {
  stroke-dasharray: var(--textWidth), var(--perimeter);
  stroke-dashoffset: var(--hoverDashoffset);
  stroke: #00bcd4;
}
</style>
