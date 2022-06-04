<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  hoverDirection?: string;
}>();

const parameter = reactive({
  fontSize: 16,
  blockWidth: 200,
  blockLength: 40,
  hoverDirection: "left",
  backgroundColor: "#434750",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  const hoverTranslateX = props.hoverDirection ? props.hoverDirection : parameter.hoverDirection;

  return Object.entries({
    "--fontSize": `${parameter.fontSize}px`,
    "--blockWidth": `${parameter.blockWidth}px`,
    "--blockLength": `${parameter.blockLength}px`,
    "--hoverTranslateX": `${hoverTranslateX === "left" ? "-" : ""}2.5em`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const menu = reactive(["Home", "About Me", "My Service", "Portfolio", "Contact"]);

class Block {
  id = Symbol();
  style: string;
  constructor(index: number) {
    this.style = [
      ["z-index", index],
      ["--delay", `-${index}s`],
    ].reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
  }
}

const list = computed(() =>
  menu
    .map((title) => ({
      title,
    }))
    .reverse()
);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <ul
      class="menu"
      style="
        --color: #999;
        --hover-color: #fff;
        --block-color: hsl(232, 6%, 26%);
        --block-hover-color: hsl(204, 85%, 57%);
        --block-l-color: hsl(204, 5%, 19%);
        --block-l-hover-color: hsl(205, 59%, 30%);
        --block-t-color: hsl(218, 7%, 22%);
        --block-t-hover-color: hsl(203, 64%, 44%);
      "
    >
      <li v-for="item in list">
        <a>{{ item.title }}</a>
      </li>
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
  flex-direction: column-reverse;
  transform: skewY(-15deg);
}

ul li {
  position: relative;
  list-style: none;
  width: var(--blockWidth);
  font-size: var(--fontSize);
  background: var(--block-color);
  padding: 1em;
  transition: 500ms;
}
ul li:hover {
  background: var(--block-hover-color);
  transform: translateX(var(--hoverTranslateX));
}

ul li::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc(var(--blockLength) * -1);
  width: var(--blockLength);
  height: 100%;
  background: var(--block-l-color);
  transform-origin: right;
  transform: skewY(45deg);
  transition: 500ms;
}
ul li:hover:before {
  background: var(--block-l-hover-color);
}

ul li::after {
  content: "";
  position: absolute;
  top: calc(var(--blockLength) * -1);
  left: 0;
  width: 100%;
  height: var(--blockLength);
  transform-origin: bottom;
  transform: skewX(45deg);
  background: var(--block-t-color);
  transition: 500ms;
}
ul li:hover:after {
  background: var(--block-t-hover-color);
}

ul li a {
  display: block;
  text-decoration: none;
  color: var(--color);
  letter-spacing: 0.05em;
  transition: 500ms;
}

ul li:hover a {
  color: var(--hover-color);
}

ul li:first-child::after {
  box-shadow: -6.5em 6.5em 1.5em rgba(0, 0, 0, 0.2);
}
</style>
