<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  text: string;
}>();

const parameter = {
  text: props.text ? props.text : "",
  backgroundColor: `#fff`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="cube">
      <span class="face front">{{ parameter.text }}</span>
      <span class="face back">{{ parameter.text }}</span>
      <span class="face top">{{ parameter.text }}</span>
      <span class="face bottom">{{ parameter.text }}</span>
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
.cube {
  --colorDuration: 2s;
  --rotateDuration: 2s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(0deg);
  transition: var(--rotateDuration);
}
.cube:hover {
  transform: perspective(1000px) rotateX(360deg);
}
.cube span.face {
  position: absolute;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: sans-serif;
  font-size: 22px;
  border: 2px solid #000;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.2);
  transition: var(--colorDuration);
}

.cube:hover span.face {
  color: #fff;
  border: 2px solid #000;
  background: rgba(3, 169, 244, 0.8);
  box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.2);
}

.cube span.face.front {
  transform: rotateX(0deg) translate3d(0, 0, 25px);
}
.cube span.face.top {
  transform: rotateX(90deg) translate3d(0, 0, 25px);
}
.cube span.face.back {
  transform: rotateX(180deg) translate3d(0, 0, 25px);
}
.cube span.face.bottom {
  transform: rotateX(270deg) translate3d(0, 0, 25px);
}
</style>
