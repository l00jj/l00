<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const parameter = reactive({
  size: 38,
  top: 38 * 1.5,
  left: 38 * 1.5,
  bgColor: "#222",
});
defineExpose({ parameter });

/**
 * 横竖屏大小调整
 */
const onResize = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  if (clientWidth / clientHeight > 1) {
    parameter.top = parameter.left = parameter.size * 1.5;
  } else {
    parameter.top = clientHeight - parameter.size * 1.5;
    parameter.left = clientWidth / 2;
  }
};
onResize();
onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--size": `${parameter.size}px`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const backButtonStyle = computed(() => {
  const { top, left } = parameter;
  return `top:${top}px;left:${left}px;--top:${top}px;--left:${left}px;`;
});

const backIconStyle = computed(() => {
  const { size } = parameter;
  const iconRatio = 0.3;

  const iconSize = size * iconRatio;
  const iconWeight = 0.5;
  const iconBorder = iconSize * iconWeight;

  const iconCoreX = Math.cos(Math.PI / 4) * iconSize;
  const iconLeftX = Math.cos(Math.PI / 4) * (iconSize + iconBorder);
  const iconOffsetX = (iconLeftX - iconCoreX) / 2;

  return `--iconSize:${iconSize}px;--iconBorder:${iconBorder}px;--iconOffsetX:${iconOffsetX}px`;
});
const backButtonFun = () => {
  window.history.back();
};
</script>

<template>
  <Teleport to="body">
    <div :style="mainStyle">
      <div class="back" :style="backButtonStyle" @click="backButtonFun"><a :style="backIconStyle"></a></div>
    </div>
    <!-- <nav class="" >
      
      <div id="logo">
        <a :href="`${host}/`"><img src="@src/assets/logo/logo.svg" alt="l00" /></a>
      </div>
    </nav> -->
  </Teleport>
</template>

<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
.back {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  animation: firstTime 2s 1;
  opacity: 0.3;
  transition: 500ms;
  outline: none;
}
.back a {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  user-select: none;
  outline: none;
}
.back a::before {
  content: "";
  position: absolute;
  width: var(--iconSize);
  height: var(--iconSize);
  border-bottom: var(--iconBorder) solid #000;
  border-left: var(--iconBorder) solid #000;
  transform: translate(var(--iconOffsetX), 0%) rotate(45deg);
  user-select: none;
  outline: none;
}

.back:hover {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

@keyframes firstTime {
  0% {
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate(-50%, -50%) scale(5);
  }
  90% {
    opacity: 1;
  }
  100% {
    top: var(--top);
    left: var(--left);
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
