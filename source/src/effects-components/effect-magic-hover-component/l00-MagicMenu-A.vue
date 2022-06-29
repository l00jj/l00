<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

//const props = defineProps<{}>();

const parameter = {
  backgroundColor: `#333`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

const list = computed(() => ["Home", "About Me", "My Service", "Portfolio", "Contact"]);

const marker = reactive({
  style: {
    top: 0,
    width: 100,
    height: 0,
  },
  cursor: {
    size: 15,
    border: 4,
  },
});

const markerStyle = computed(() => {
  const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数
  const sin45Deg = Math.sin(Math.PI * 0.25);
  const cursorSize = marker.cursor.size + marker.cursor.border; //带外壳的大小
  const cursorDiagonalSize = cursorSize / sin45Deg; //对角线长度
  const translateRadius = ((cursorSize + cursorDiagonalSize + marker.cursor.size * 1.2) * sin45Deg) / 2; //不旋转情况下最小移动距离 + 偏移
  const translateY = froundFix(translateRadius, 2); //添加偏移
  const translateX = translateY; //实际需要移动的X距离
  //
  const cursorStyle = `--cursor-size:${marker.cursor.size}px;--cursor-border: ${marker.cursor.border}px solid #30a3ff;--cursor-translateX:${translateX}px;--cursor-translateY:${translateY}px;`;
  const mainStyle = `top:${marker.style.top}px;width:${marker.style.width}px;height:${marker.style.height}px;`;
  return cursorStyle + mainStyle;
});

const onMouseenter = (event: MouseEvent) => {
  const el = event.target as HTMLElement;
  marker.style.top = el.offsetTop;
  marker.style.width = el.offsetWidth;
  marker.style.height = el.offsetHeight;
};
const ul = ref<HTMLElement>();
onMounted(() => {
  // 如有需要可以用ref整个li做状态管理
  // 下面需要初始化一下光标位置
  if (ul.value) onMouseenter({ target: ul.value.querySelector("li") } as MouseEvent);
});
</script>

<template>
  <section :style="mainStyle">
    <ul class="list" ref="ul">
      <span class="marker" :style="markerStyle"></span>
      <li v-for="item in list" @mouseenter.self="onMouseenter">
        <a>{{ item }}</a>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul li {
  list-style: none;
}

ul li a {
  position: relative;
  display: inline-block;
  margin: 0.5em 0;
  font-size: 2em;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.marker {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background: #f00; */
  transition: 1s;
}

.marker::before {
  content: "";
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-top: var(--cursor-border);
  border-right: var(--cursor-border);
  transform: rotate(45deg) translate(calc(var(--cursor-translateX) * -1), var(--cursor-translateY));
}
.marker::after {
  content: "";
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-top: var(--cursor-border);
  border-left: var(--cursor-border);
  transform: rotate(-45deg) translate(calc(var(--cursor-translateX) * 1), var(--cursor-translateY));
}
</style>
