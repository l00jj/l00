<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  text: string;
}>();

const parameter = reactive({
  flakeQuantity: 60,
  backgroundColor: `#fff`,
});

const standard = ref<HTMLElement>();

type CharInput = {
  index: number;
  flakeWidth: number;
  flakeRotate: number;
  flakeTranslateZ: number;
};
class Char {
  style = {
    "--flakeWidth": "",
    "--flakeHead": "",
    "--flakeRotateY": "",
    "--flakeTranslateZ": "",
  };
  constructor({ index, flakeWidth, flakeRotate, flakeTranslateZ }: CharInput) {
    this.style["--flakeWidth"] = `${flakeWidth}px`;
    this.style["--flakeHead"] = `${-flakeWidth * index}px`;
    this.style["--flakeRotateY"] = `${flakeRotate * index}deg`;
    this.style["--flakeTranslateZ"] = `${flakeTranslateZ}px`;
  }
}
const charsList: Char[] = reactive([]);
const updateTextFlakes = () => {
  if (!standard?.value) return;
  const standardEl = standard.value;
  //console.log(standardEl.offsetWidth);

  charsList.length = 0;
  const flakeWidth = standardEl.offsetWidth / parameter.flakeQuantity;
  const flakeRotate = 360 / parameter.flakeQuantity;
  const flakeTranslateZ = (flakeWidth * 0.5) / Math.tan(((flakeRotate / 2) * Math.PI) / 180);
  for (let index = 0; index < parameter.flakeQuantity; index++)
    charsList.push(new Char({ index, flakeWidth, flakeRotate, flakeTranslateZ }));
};

const viewStyle = computed(() => ({
  "--text": `"${props.text}"`,
}));

onMounted(() => {
  updateTextFlakes();
});
</script>

<template>
  <section class="background">
    <div class="view" :style="viewStyle">
      <div class="standard" ref="standard">
        <span class="char"></span>
      </div>
      <div class="circle">
        <span v-for="char in charsList" class="char slice" :style="char.style"></span>
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
.background {
  background: #673ab7;
}
.view {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

.circle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  animation: animateRoll 8s linear infinite;
}
.standard {
  visibility: hidden;
  position: absolute;
}
.char::before {
  content: var(--text);
  font-size: 4em;
  /* font-family: monospace; */
  white-space: nowrap;
  letter-spacing: 30px;
}
.slice {
  position: absolute;
  width: var(--flakeWidth);
  overflow: hidden;
  border-top: 4px solid #35146f;
  border-bottom: 4px solid #35146f;
  color: #35146f;
  background: #fff;
  transform: rotateY(var(--flakeRotateY)) translateZ(var(--flakeTranslateZ));
  transform-style: preserve-3d;
}
.slice::before {
  position: relative;
  left: var(--flakeHead);
  /* transform: translate(var(--flakeHead), 0px) */
}

@keyframes animateRoll {
  0% {
    transform: perspective(1200px) rotateY(360deg) rotateX(15deg);
  }
  100% {
    transform: perspective(1200px) rotateY(0deg) rotateX(15deg);
  }
}
</style>
