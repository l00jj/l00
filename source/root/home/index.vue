<script setup lang="ts">
import { ref, Component, computed, defineAsyncComponent, onBeforeMount, onUnmounted, onMounted } from "vue";
import Home from "./l00-Home.vue";
</script>

<template>
  <Home></Home>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
