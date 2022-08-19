<script setup lang="ts">
import { ref, onMounted, onUnmounted, WatchCallback } from "vue";
import TopMenu from "@src/components/TopMenu.vue";

import View from "./View/main";

const viewContainer = ref();
onMounted(() => {
  const viewContainerDom = viewContainer.value as HTMLElement;
  const view = new View(viewContainerDom);
  window.view = view;
  onUnmounted(() => view.destroy());
});
</script>

<template>
  <TopMenu></TopMenu>
  <section class="container">
    <div class="viewContainer" ref="viewContainer"></div>
  </section>
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

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.viewContainer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
