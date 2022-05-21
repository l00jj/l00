<script setup lang="ts">
import { update } from "lodash";
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import Text3D from "./components/l00-3DViews-A.vue";

/* 
const currentPath = ref(window.location.hash);
const onHashchange = () => (currentPath.value = window.location.hash);
onBeforeMount(() => window.addEventListener("hashchange", onHashchange));
onUnmounted(() => window.removeEventListener("hashchange", onHashchange));
const currentView = computed(() => {
  const path = currentPath.value.slice(1);
  let example = examplesList.find(i => i.id === path)
  if (!example) example = examplesList[0]
  return defineAsyncComponent(example.vue);
}); */

const viewSize = reactive({
  width: 0,
  height: 0,
});

const updateViewSize = () => {
  viewSize.width = window.innerWidth;
  viewSize.height = window.innerHeight;
};

updateViewSize();
window.addEventListener("resize", updateViewSize);
</script>

<template>
  <div id="main">
    <Text3D :width="viewSize.width" :height="viewSize.height"></Text3D>
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
