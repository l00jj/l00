<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@components/TopMenu.vue";
import SvgBlobPreview from "./SvgBlobPreview.vue";
import CSSBlobPreview from "./CSSBlobPreview.vue";
</script>

<template>
  <TopMenu></TopMenu>
  <div id="main">
    <SvgBlobPreview></SvgBlobPreview>
    <CSSBlobPreview></CSSBlobPreview>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-width: 1200px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
