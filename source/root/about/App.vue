<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import L00 from "./L00.vue";
</script>

<template>
  <L00></L00>
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
