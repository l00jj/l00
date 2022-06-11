<script setup lang="ts">
import { ref, reactive, computed, watch, provide, defineExpose } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = {
  backgroundColor: "#1e2759",
};

const glassItems = new Set();
provide("glassItems", glassItems);

const glassMarker = reactive({ left: 50, width: 0 });
provide("glassMarker", glassMarker);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <ul>
      <slot></slot>
      <div id="marker" :style="{ left: `${glassMarker.left}px`, width: `${glassMarker.width}px` }"></div>
    </ul>
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
  /* width: 100%;
  height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
}

ul {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
}

ul :deep(li) {
  list-style: none;
  z-index: 1;
  padding: 20px 30px;
  backdrop-filter: blur(15px);
}

#marker {
  position: absolute;
  top: 0;
  transition: 0.5s;
}

#marker::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 40px;
  border-radius: 8px;
  background: #5da6ff;
  box-shadow: 0 0 15px #5da6ff, 0 0 30px #5da6ff, 0 0 45px #5da6ff, 0 0 60px #5da6ff;
}

ul li:nth-child(1).active ~ #marker::before {
  background: #5da6ff;
  box-shadow: 0 0 15px #5da6ff, 0 0 30px #5da6ff, 0 0 45px #5da6ff, 0 0 60px #5da6ff;
}

ul li:nth-child(2)[active] ~ #marker::before {
  background: #ff0;
  box-shadow: 0 0 15px #ff0, 0 0 30px #ff0, 0 0 45px #ff0, 0 0 60px #ff0;
}

ul li:nth-child(3)[active] ~ #marker::before {
  background: #0f0;
  box-shadow: 0 0 15px #0f0, 0 0 30px #0f0, 0 0 45px #0f0, 0 0 60px #0f0;
}

ul li:nth-child(4)[active] ~ #marker::before {
  background: #df2fff;
  box-shadow: 0 0 15px #df2fff, 0 0 30px #df2fff, 0 0 45px #df2fff, 0 0 60px #df2fff;
}

ul li:nth-child(5)[active] ~ #marker::before {
  background: #ff308f;
  box-shadow: 0 0 15px #ff308f, 0 0 30px #ff308f, 0 0 45px #ff308f, 0 0 60px #ff308f;
}
</style>
