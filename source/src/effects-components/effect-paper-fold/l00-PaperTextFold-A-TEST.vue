<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import { update } from "lodash";

const props = defineProps<{
  text: string;
}>();

const parameter = {
  backgroundColor: `#000`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

const text = computed(() => (props.text ? props.text : "TEXT"));
const foldRatio = 0.1;
const foldTopRatio = computed(() => `${(1 - 0.1) * 50}%`);
const foldMiddleRatio = computed(() => `${0.1 * 100}%`);
const foldBottomRatio = computed(() => `${100 - (1 - 0.1) * 50}%`);
const foldStyle = {
  top: computed(() => ({
    clipPath: `polygon(0% 0%, 100% 0%, 100% ${foldTopRatio.value}, 0% ${foldTopRatio.value})`,
  })),
  middle: computed(() => ({
    clipPath: `polygon(0% ${foldTopRatio.value}, 100% ${foldTopRatio.value}, 100% ${foldBottomRatio.value}, 0% ${foldBottomRatio.value})`,
  })),
  bottom: computed(() => ({
    clipPath: `polygon(0% ${foldBottomRatio.value}, 100% ${foldBottomRatio.value}, 100% 100%, 0 100%)`,
  })),
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
    },
  });
});
const updateClipsTranslateX = (totalHeight: number) => {
  /*    const clipTranslateX = isEven ? 0 : lastTranslateX; 
    if (!isEven)
      lastTranslateX =
        lastTranslateX + 
    console.log(lastTranslateX);
    return
  })
);
 */
  let lastTranslateX = 0;
  clips.forEach((clip) => {
    clip.style["--clipTranslateX"] = `${lastTranslateX}px`;
    if (clip.isOdd) {
      lastTranslateX += ((totalHeight * clip.height) / 100) * -Math.tan((clip.skewXDeg * Math.PI) / 180);
    }
  });
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
    <div class="container" ref="container">
      <div class="clip" background ref="warper">
        <span>{{ text }}</span>
      </div>
      <div class="clip" v-for="clip in clips" :style="clip.style" part>
        <span>{{ text }}</span>
      </div>
    </div>
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
.container {
  position: relative;
  transform: perspective(0px) skewY(0deg);
  transition: 2s;
}

.clip {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
}
.clip span {
  position: relative;
  font-size: 15em;
  font-weight: 900;
}
.clip[background] {
  position: relative;
}
.clip[background] span {
  position: relative;
  color: transparent;
}

.clip[part] {
  top: var(--clipTop);
  width: 100%;
  height: var(--clipHeight);
  overflow: hidden;
  transform-origin: top;
  transition: 1s linear;
}
.clip[part]:nth-child(odd) {
  transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
}

.clip[part] span {
  position: absolute;
  transform: translateY(var(--clipTextTranslateY));
}

.container:hover {
  transform: perspective(1000px) skewY(15deg);
}

.container:hover .clip[part] {
  transform: skewX(var(--clipSkewX)) translateX(var(--clipTranslateX));
}
.container:hover .clip[part]:nth-child(odd) {
  color: #e91e63;
  transition-timing-function: cubic-bezier(0, 0.42, 1, 1);
}
</style>
