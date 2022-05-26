<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@src/components/TopMenu.vue";
import list from "@src/stores/graphicsList";

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
  return page ? page : list[0];
});

const MenuView = computed(() => {
  return page.value!.id === "index" ? TopMenu : null;
});

const currentView = computed(() => {
  const path = currentPath.value.slice(1);
  let page = list.find((i) => i!.id === path);
  page = page ? page : list[0];
  //后期可以不直接跳转，可以弹出404框
  return defineAsyncComponent(page!.vue);
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
