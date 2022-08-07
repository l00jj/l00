<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import TopMenu from "@src/components/TopMenu.vue";
import Preview from "./Preview.vue";
</script>

<template>
  <TopMenu></TopMenu>
  <Preview></Preview>
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
