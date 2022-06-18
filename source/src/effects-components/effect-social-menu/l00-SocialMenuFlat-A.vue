<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  //
  backgroundColor: "#fff",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const list = computed(() =>
  [
    {
      icon: "\\f09a",
      background: "#3b5999",
    },
    {
      icon: "\\f099",
      background: "#55acee",
    },
    {
      icon: "\\f0d5",
      background: "#dd4b39",
    },
    {
      icon: "\\f2ab",
      background: "#fffa37",
    },
    {
      icon: "\\f16d",
      background: "#34405f",
    },
  ].map((item) => `--content:"${item.icon}";--backgroundColor:${item.background};`)
);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <ul>
      <li v-for="item in list" :style="item">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome_Brands";
  src: url("@src/assets/icons/Font-Awesome/Font Awesome 6 Brands-Regular-400.otf");
}

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

ul {
  position: relative;
  display: flex;
  font-size: 16px;
}

ul li {
  --iconColor: red;
  --backgroundColor: green;
  position: relative;
  width: 3.75em;
  height: 3.75em;
  margin: 0 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-30deg) skew(25deg);
}

ul li::after {
  content: var(--content);
  position: absolute;
  font-family: "Font_Awesome_Brands";
  font-size: 2em;
  color: #fff;
  transition: 1s;
}

ul li:hover::after {
  transform: translate(2em, -2em);
}
ul li span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--backgroundColor);
  transition: 1s;
}
ul li:hover span:nth-child(1) {
  opacity: 0.2;
}
ul li:hover span:nth-child(2) {
  opacity: 0.4;
  transform: translate(1em, -1em);
}
ul li:hover span:nth-child(3) {
  opacity: 0.6;
  transform: translate(2em, -2em);
}
ul li:hover span:nth-child(4) {
  opacity: 0.8;
  transform: translate(3em, -3em);
}
ul li:hover span:nth-child(5) {
  opacity: 1;
  transform: translate(4em, -4em);
}


</style>
