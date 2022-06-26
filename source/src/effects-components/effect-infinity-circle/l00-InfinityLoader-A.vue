<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const backgroundColor = ref(`#1c1c1c`);

const circleSize = ref(200);
const itemSzie = ref(40);
const circleTranslateX = computed(() => (circleSize.value - itemSzie.value) / 2);

const mainStyle = {
  "--itemSzie": `${itemSzie.value}px`,
  "--circleSize": `${circleSize.value}px`,
  "--circle1TranslateX": `-${circleTranslateX.value}px`,
  "--circle2TranslateX": `${circleTranslateX.value}px`,
  backgroundColor: `${backgroundColor.value}`,
};
</script>

<template>
  <section :style="mainStyle">
    <div class="loader">
      <div class="circle">
        <span></span>
      </div>
      <div class="circle">
        <span></span>
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
.loader {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.circle {
  position: absolute;
  width: var(--circleSize);
  height: var(--circleSize);
  display: flex;
  align-items: center;
  transform: translateX(var(--circle1TranslateX));
}

.circle span {
  position: absolute;
  left: 50%;
  width: 100px;
  height: 2px;
  display: flex;
  align-items: center;
  background: red;
  transform-origin: left;
  transform: rotate(0deg);
  animation: animateRotate 8s linear infinite;
}

@keyframes animateRotate {
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(-360deg);
    visibility: hidden;
  }
}

.circle span::before {
  content: "";
  position: absolute;
  right: 0;
  width: var(--itemSzie);
  height: var(--itemSzie);
  border-radius: 50%;
  background: #fff;
}

.circle:nth-child(2) {
  transform: translateX(var(--circle2TranslateX)) rotate(180deg);
  
}
.circle:nth-child(2) span {
  animation-delay: -1s;
}

</style>
