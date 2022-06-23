<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();

const parameter = reactive({
  itemSize: 60,
  itemBackgroundSize: 54,
  indicatorSize: 70,
  indicatorCornerSize: 20,
  //
  backgroundColor: "#222327",
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  const indicatorCornerTranslate = froundFix(
    Math.sqrt(
      Math.pow(parameter.indicatorSize / 2 + parameter.indicatorCornerSize / 2, 2) -
        Math.pow(parameter.indicatorCornerSize / 2, 2)
    ),
    2
  );
  return Object.entries({
    "--itemSize": `${parameter.itemSize}px`,
    "--itemMargin": `0 ${parameter.itemSize / 5}px`,
    "--itemBackgroundSize": `${parameter.itemBackgroundSize}px`,
    "--backgroundColor": "#222327",
    "--itemTransition": "1s 500ms",
    "--indicatorSize": `${parameter.indicatorSize}px`,
    "--indicatorCornerSize": `${parameter.indicatorCornerSize}px`,
    "--indicatorCornerTranslateX": `-${parameter.indicatorCornerSize / 2}px`,
    "--indicatorCornerTranslateY": `${indicatorCornerTranslate}px`,
    //原生 style
    "background-color": parameter.backgroundColor,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const navigationMenu: any[] = reactive([
  { text: "", backgroundColor: "#f44336", class: "home", active: false },
  { text: "", backgroundColor: "#ffa117", class: "person", active: false },
  { text: "", backgroundColor: "#0fc70f", class: "snapchat", active: false },
  { text: "", backgroundColor: "#2196f3", class: "camera", active: false },
  { text: "", backgroundColor: "#f44336", class: "setting", active: false },
]);

const indicatorTranslateX = ref(0);

const onClick = (mouseenterItem: any) => {
  const el: HTMLElement = mouseenterItem.el as HTMLElement;
  indicatorTranslateX.value = el.offsetLeft - 5;

  navigationMenu.forEach((item: any) => {
    item.active = item === mouseenterItem;
  });
};

onMounted(() => {
  onClick(navigationMenu[0]);
});

/**
 * 非精确小圆角版本
 */
</script>

<template>
  <section v-bind="$attrs" class="navigation" :style="mainStyle">
    <ul>
      <div class="indicator" :style="{ transform: `translate(${indicatorTranslateX}px, -50%)` }"></div>
      <li
        v-for="item in navigationMenu"
        :class="{ active: item.active }"
        :style="`--itemBackgroundColor: ${item.backgroundColor}`"
        :ref="(el) => (item.el = el)"
        @click="onClick(item)"
      >
        <a>
          <div class="background"></div>
          <span>{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "ionicons";
  src: url("@src/assets/icons/ionicons/docs/fonts/ionicons.woff2");
}

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
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.navigation ul {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 25px;
  border-radius: 10px;
  background: #fff;
}
.navigation ul li {
  position: relative;
  width: var(--itemSize);
  height: var(--itemSize);
  margin: var(--itemMargin);
  display: flex;
  align-items: center;
  justify-content: center;
}
.navigation ul li a {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
}
.navigation ul li span {
  position: absolute;
  top: 0;
  width: var(--itemSize);
  height: var(--itemSize);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--backgroundColor);
  font-family: "ionicons";
  font-size: 1.5em;
  line-height: 0;
  transition: 500ms;
}

.navigation ul li a div.background {
  content: "";
  position: absolute;
  top: 0;
  width: var(--itemSize);
  height: var(--itemSize);
  border-radius: 50%;
  background: var(--itemBackgroundColor);
  opacity: 0;
  transition: 500ms;
}

.navigation ul li a div.background::before {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 10px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--itemBackgroundColor);
  filter: blur(5px);
  opacity: 0.5;
}

.navigation ul div.indicator {
  position: absolute;
  left: 0;
  width: var(--indicatorSize);
  height: var(--indicatorSize);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #fff;
  transform: translateX();
  transition: 1s;
}

.navigation ul div.indicator::before {
  content: "";
  position: absolute;
  width: var(--indicatorCornerSize);
  height: var(--indicatorCornerSize);
  border-radius: 50%;
  background: transparent;
  border-color: transparent #fff transparent transparent;
  border-style: solid;
  border-width: calc(var(--indicatorCornerSize) / 2);
  box-sizing: content-box;
  transform: translate(calc(-1 * var(--indicatorCornerTranslateY)), var(--indicatorCornerTranslateX)) rotate(45deg);
}

.navigation ul div.indicator::after {
  content: "";
  position: absolute;
  width: var(--indicatorCornerSize);
  height: var(--indicatorCornerSize);
  border-radius: 50%;
  background: transparent;
  border-color: transparent #fff transparent transparent;
  border-style: solid;
  border-width: calc(var(--indicatorCornerSize) / 2);
  box-sizing: content-box;
  transform: translate(calc(1 * var(--indicatorCornerTranslateY)), var(--indicatorCornerTranslateX)) rotate(135deg);
}

.navigation ul li.active a div.background {
  opacity: 1;
  transition: var(--itemTransition);
}

.navigation ul li.active a {
  height: 150%;
  transition: var(--itemTransition);
}

.navigation ul li.active span {
  color: #fff;
  transition: var(--itemTransition);
}
</style>
