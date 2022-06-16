<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const parameter = reactive({
  backgroundColor: "#ffffff", //
});

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="view">
      <div class="pattern pattern1"></div>
      <div class="pattern pattern2"></div>
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
  flex-direction: column;
  overflow: hidden;
}

.view {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.pattern {
  --lightColor: #fff;
  --barkColor: #262626;
  --size: 100px;
  --sizehalf: 50px;

  position: relative;
  width: 100%;
  height: 50%;
  background: linear-gradient(45deg, var(--barkColor) 25%, transparent 25%),
    linear-gradient(-45deg, var(--barkColor) 25%, transparent 25%),
    linear-gradient(135deg, var(--barkColor) 25%, transparent 25%),
    linear-gradient(-135deg, var(--barkColor) 25%, transparent 25%);
  background-size: var(--size) var(--size);
  background-position: var(--sizehalf) 0, var(--sizehalf) var(--sizehalf), 0 0px, 0px var(--sizehalf);
}
.pattern.pattern1 {
  box-shadow: inset 0 -50px 200px rgba(0, 0, 0, 0.5);
}
.pattern.pattern2 {
  height: 100%;
  transform-origin: top;
  transform: rotateX(65deg);
  box-shadow: inset 0 50px 200px rgba(0, 0, 0, 0.5);
}
</style>
