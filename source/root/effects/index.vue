<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@src/components/TopMenu.vue";
import effectsList from "@src/stores/effectsList";
import RightMenu from "./RightMenu.vue";

/**
 * 选择显示模板
 */
const currentPath = ref(window.location.hash);
const onHashchange = () => (currentPath.value = window.location.hash);
onBeforeMount(() => window.addEventListener("hashchange", onHashchange));
onUnmounted(() => window.removeEventListener("hashchange", onHashchange));
const currentView = computed(() => {
  const path = currentPath.value.slice(1);
  let effect = effectsList.find((i) => i.id === path);
  if (!effect) {
    effect = effectsList[0];
    location.hash = `#${effect.id}`;
  }
  return defineAsyncComponent(effect.vue);
});

/**
 * 监听宽度变化视情况加入侧栏与底栏
 */
</script>

<template>
  <TopMenu></TopMenu>
  <div class="preview">
    <component :is="currentView"></component>
  </div>
  <RightMenu></RightMenu>
  <div class="more"></div>
  <!-- 
  <Preview /> -->
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
