<script setup lang="ts">
import { update } from "lodash";
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import Component from "./components/index.vue";
</script>

<template>
  <div id="main">
    <Component></Component>
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
