<script setup lang="ts">
import TopMenu from "@src/components/TopMenu.vue";
import RightMenu from "./RightMenu.vue";
</script>

<template>
  <TopMenu></TopMenu>
  <router-view></router-view>
  <RightMenu></RightMenu>
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
