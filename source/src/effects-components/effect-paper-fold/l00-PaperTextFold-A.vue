<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  text: string;
}>();

const parameter = {
  backgroundColor: `#000`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

const clips = [
  [0, 45],
  [45, 55],
  [55, 100],
].map((item, index) => {
  const top = item[0];
  const bottom = item[1];
  const height = bottom - top;
  const isEven = !(index % 2);
  const skewXDeg = 60;
  const skewX = isEven ? 0 : -skewXDeg;
  return reactive({
    top,
    bottom,
    height,
    skewXDeg,
    isOdd: !isEven,
    style: {
      "--clipTop": `${top}%`,
      "--clipHeight": `${height}%`,
      "--clipSkewX": `${skewX}deg`,
      "--clipTranslateX": `${0}px`,
      "--clipTextTranslateY": `-${top}%`,
      clipPath: `polygon(0% ${top}%, 100% ${top}%, 100% ${bottom}%, 0% ${bottom}%`,
    },
  });
});

const containerStyle = reactive({
  "--transitionDuration": "1s",
  "--totalTranslateX": "0px",
});

const updateClipsTranslateX = (totalHeight: number) => {
  let oddTranslateX = 0;
  let evenTranslateX = 0;
  clips.forEach((clip) => {
    if (clip.isOdd) {
      clip.style["--clipTranslateX"] = `${oddTranslateX}px`;
      evenTranslateX += ((totalHeight * clip.height) / 100) * -Math.tan((clip.skewXDeg * Math.PI) / 180);
    } else {
      clip.style["--clipTranslateX"] = `${evenTranslateX}px`;
      oddTranslateX += ((totalHeight * clip.height) / 100) * Math.tan((clip.skewXDeg * Math.PI) / 180);
    }
  });
  containerStyle["--totalTranslateX"] = `${-evenTranslateX}px`;
};

const warper = ref();
const warperOffsetHeight = ref(0);

onMounted(() => {
  warperOffsetHeight.value = (warper.value as HTMLElement).offsetHeight;
  updateClipsTranslateX(warperOffsetHeight.value);
});

/**
 *  clip-path
 *  https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path
 */
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="container" ref="warper" :style="containerStyle">
      <span class="background">{{ text }}</span>
      <span class="clip" v-for="clip in clips" :style="clip.style">{{ text }}</span>
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
  transform: perspective(0px) skewY(0deg) translateX(var(--totalTranslateX));
  transition-duration: var(--transitionDuration);
}

span {
  position: relative;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 15em;
  font-weight: 900;
  line-height: 1;
  transform-style: preserve-3d;
  transform-origin: top;
}

span.background {
  color: #fff;
  transition-delay: var(--transitionDuration);
}

.container:hover span.background {
  color: transparent;
  transition-delay: unset;
}

span.clip {
  position: absolute;
  transform: skewX(0deg) translate(0px, 0px);
  transition-duration: var(--transitionDuration);
  will-change: transform;
}

.container:hover {
  transform: perspective(1000px) skewY(15deg) translateX(var(--totalTranslateX));
}
.container:hover span.clip {
  transform: translateX(var(--clipTranslateX)) skewX(var(--clipSkewX));
}
.container:hover span.clip:nth-child(odd) {
  color: #e91e63;
}
</style>
