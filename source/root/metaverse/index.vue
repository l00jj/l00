<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@src/components/TopMenu.vue";
import FloatMenu from "@src/components/FloatMenu.vue";
import list from "@src/stores/graphicsList";
import Alert404 from "@src/components/Alert404";

/**
 * 选择显示模板
 */
const currentPath = ref(window.location.hash);
const onHashchange = () => (currentPath.value = window.location.hash);
onBeforeMount(() => window.addEventListener("hashchange", onHashchange));
onUnmounted(() => window.removeEventListener("hashchange", onHashchange));
const page = computed(() => {
  //const hashCore = currentPath.value.slice(1);
  const path = currentPath.value.split("/")[1];
  console.warn("制作模板");
  let page = list.find((i) => i!.id === path);
  if (!page) {
    page = list[0];
    if (path) Alert404();
  }
  return page;
});

const currentView = computed(() => {
  return defineAsyncComponent(page?.value?.vue);
});

const MenuView = computed(() => {
  return page.value!.id === "index" ? TopMenu : FloatMenu;
});
</script>

<template>
  <component :is="MenuView"></component>
  <div id="main">
    <component :is="currentView"></component>
  </div>
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
</style>
