<script setup lang="ts">
import { ref, computed, provide, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@src/components/TopMenu.vue";
import list from "@src/stores/effectsList";
import RightMenu from "./RightMenu.vue";
import Alert404 from "@src/components/Alert404";

/**
 * 选择显示模板
 */
const currentPath = ref(window.location.hash);
const onHashchange = () => (currentPath.value = window.location.hash);
onBeforeMount(() => window.addEventListener("hashchange", onHashchange));
onUnmounted(() => window.removeEventListener("hashchange", onHashchange));
const page = computed(() => {
  const path = currentPath.value.slice(1);
  let page = list.find((i) => i!.id === path);
  if (!page) {
    page = list[0];
    if (path !== "") Alert404();
  }
  return page;
});

const currentView = computed(() => {
  return defineAsyncComponent(page?.value?.vue);
});
</script>

<template>
  <TopMenu></TopMenu>
  <div class="preview">
    <component :is="currentView"></component>
  </div>
  <RightMenu></RightMenu>
  <div class="more"></div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.preview {
  position: relative;
  width: 100%;
  padding: 0;
}
.more {
  background: #dde1e7;
}
</style>
