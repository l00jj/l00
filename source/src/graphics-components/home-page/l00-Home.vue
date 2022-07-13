<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, provide, onMounted, onUnmounted } from "vue";

import { RendersAreaMap } from "./components/UtilRendersAreaMap";
import { LoadingManager } from "./components/UtilLoadingManager";

import SectionFirstLoad from "./components/Section-FirstLoad.vue";
import SectionDebug from "./components/Section-Debug.vue";

/**
 * 监听滚动
 */
const scrollMidline = ref(0);
const onScroll = () => {
  const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  scrollMidline.value = scrollTop + clientHeight / 2;
};
onMounted(() => {
  window.addEventListener("scroll", onScroll);
  onScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

/**
 * 监听资源加载情况
 */
let isReady = ref(false);
const loadingManager = reactive(new LoadingManager());
loadingManager.onReady(() => (isReady.value = true));
onUnmounted(() => loadingManager.destroy());
provide("loadingManager", loadingManager);

/**
 * 按区域启动和暂停渲染
 */
const rendersAreaMap = new RendersAreaMap();
onUnmounted(() => rendersAreaMap.destroy());
provide("rendersAreaMap", rendersAreaMap);

/**
 * Debug
 */
const isDebug = ref(window.location.hash.includes("debug"));

/**
 * 异步载入
 */
const AsyncMainComp = defineAsyncComponent(() => import("./l00-Home-Main.vue"));
</script>

<template>
  <!-- 加载环节 -->
  <SectionFirstLoad
    :loaded="loadingManager.loaded"
    :loadTotal="loadingManager.loadTotal"
    :progress="loadingManager.loaded / loadingManager.loadTotal"
    :isReady="isReady"
    class="loading"
  ></SectionFirstLoad>
  <!-- 正式内容 -->
  <AsyncMainComp
    class="main"
    :class="{ debug: isDebug, loading: !isReady }"
    :scrollMidline="scrollMidline"
  ></AsyncMainComp>
  <!-- debug界面 -->
  <SectionDebug v-if="isDebug" :rendersAreaMap="rendersAreaMap"></SectionDebug>
</template>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.loading {
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.debug {
  margin: 150vh 0;
  background: #eee;
}
</style>
