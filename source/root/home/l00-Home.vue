<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, provide, onMounted, onUnmounted } from "vue";

import TopMenu from "@src/components/TopMenu.vue";

import { RendersAreaMap } from "./components/UtilRendersAreaMap";
import { LoadingManager } from "./components/UtilLoadingManager";

import SectionFirstLoad from "./components/Section-FirstLoad.vue";
import SectionBGM from "./components/Section-BGM.vue";
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
let isMainShow = ref(false);
let isLoading = ref(true);
const loadingManager = reactive(new LoadingManager());
loadingManager.onReady(() => setTimeout(() => (isLoading.value = false), 2500));
onUnmounted(() => loadingManager.destroy());
provide("loadingManager", loadingManager);
const onAfterLoaded = () => (isMainShow.value = true);

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
  <!-- 顶部导航栏 -->
  <TopMenu :style="{ zIndex: isMainShow ? '1' : '0' }"></TopMenu>
  <!-- 加载环节 -->
  <SectionFirstLoad
    :loaded="loadingManager.loaded"
    :loadTotal="loadingManager.loadTotal"
    :progress="loadingManager.loaded / loadingManager.loadTotal"
    :isLoading="isLoading"
    @onAfterLeave="onAfterLoaded"
  ></SectionFirstLoad>
  <!-- 正式内容 -->
  <div :class="{ debug: isDebug, loading: !isMainShow }">
    <AsyncMainComp :scrollMidline="scrollMidline"></AsyncMainComp>
  </div>
  <!-- 背景音乐 -->
  <SectionBGM :isReady="isMainShow"></SectionBGM>
  <!-- debug界面 -->
  <SectionDebug v-if="isDebug" :rendersAreaMap="rendersAreaMap"></SectionDebug>
</template>

<style scoped>
.debug {
  margin: 150vh 0;
  background: #eee;
}
.loading {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: block;
  z-index: -1;
  overflow: hidden;
}
</style>
