<script setup lang="ts">
import { ref, reactive, watchEffect, WatchStopHandle, computed, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import gsap from "gsap";

const props = defineProps<{
  width: number;
  height: number;
  length: number;
  color?: string[];
  uvu?: number;
  uvv?: number;
}>();

const cubeStyle = reactive({
  "--width": "",
  "--height": "",
  "--length": "",
  "--colorFront": "",
  "--colorTop": "",
  "--colorLeft": "",
  "--uvu": "",
  "--uvv": "",
});

const stopWatchEffect: WatchStopHandle = watchEffect(() => {
  cubeStyle["--width"] = `${props.width}px`;
  cubeStyle["--height"] = `${props.height}px`;
  cubeStyle["--length"] = `${props.length}px`;
  cubeStyle["--colorFront"] = `${props.color && props.color[0] ? props.color[0] : `#f1f1f1`}`;
  cubeStyle["--colorTop"] = `${props.color && props.color[1] ? props.color[1] : `#fff`}`;
  cubeStyle["--colorLeft"] = `${props.color && props.color[2] ? props.color[2] : `#e1e1e1`}`;
  //cubeStyle["--uvu"] = `${props.uvu ? props.uvu : 0}px`;
  cubeStyle["--uvv"] = `${props.uvv ? props.uvv : 0}px`;
  console.log("stopWatchEffect");
});

// 暂时只支持横向动画
const cubeTarget = ref();
const stopWatchGSAPEffect: WatchStopHandle = watchEffect(() => {
  if (!cubeTarget.value) return;
  const cubeTargetEl = cubeTarget.value;
  const uvu = props.uvu;
  gsap.to(cubeTargetEl, {
    "--uvu": gsap.utils.unitize(() => uvu, "px"),
    duration: 2,
    ease: "elastic.out(1, 0.5)",
  });
});

const isCubeActive = ref(false);
const cubeOnClick = () => {
  isCubeActive.value = !isCubeActive.value;
};
onUnmounted(() => {
  stopWatchEffect();
  stopWatchGSAPEffect();
});
</script>

<template>
  <div class="cube" :style="cubeStyle">
    <div class="view">
      <div class="target" ref="cubeTarget">
        <span class="face backShadow"></span>
        <span class="face bottomShadow"></span>
        <span class="face back"></span>
        <span class="face front"></span>
        <span class="face top"></span>
        <span class="face left"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cube {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cube .view {
  transform: skewY(-15deg);
}
.cube .target {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform: translate(var(--uvu), var(--uvv));
}
/* .cube .target, 用GASPd代替*/
.cube .face {
  transition: 1s linear;
}

.cube .face.back {
  position: relative;
  width: var(--width);
  height: var(--height);
  background-color: var(--colorFront);
}

.cube .face.top {
  position: absolute;
  top: 0;
  width: var(--width);
  height: var(--length);
  background-color: var(--colorTop);
  transform: skewX(45deg) translate(var(--length), 0px);
  transform-origin: bottom;
}
.cube .face.left {
  position: absolute;
  left: 0;
  width: var(--length);
  height: var(--height);
  background-color: var(--colorLeft);
  transform: skewY(45deg) translate(0px, 0px);
  transform-origin: left;
}
.cube .face.front {
  position: absolute;
  width: var(--width);
  height: var(--height);
  background-color: var(--colorFront);
  box-shadow: -1px -1px 0px var(--colorFront);
  transform: skewY(0deg) translate(var(--length), var(--length));
}

.cube .face.bottomShadow {
  position: absolute;
  bottom: 0;
  width: var(--width);
  height: var(--length);
  background-color: rgba(0, 0, 0, 0.15);
  transform: skewX(45deg) translate(0px, var(--length));
  transform-origin: bottom;
  filter: blur(10px);
  box-shadow: 0px 0px 20px 10px rgb(0, 0, 0, 0.15);
}

.cube .face.backShadow {
  position: absolute;
  width: var(--width);
  height: var(--height);
  background-color: rgba(0, 0, 0, 0.1);
  filter: blur(20px);
  box-shadow: 0px 0px 30px 10px rgb(0, 0, 0, 0.1);
}
</style>
