<script setup lang="ts">
import TopMenu from "@src/components/TopMenu.vue";
import FloatMenu from "@src/components/FloatMenu.vue";
import { useRoute } from "vue-router";
import { computed, inject, watchEffect, onUnmounted } from "vue";
import ProjectsRouter from "@src/components/Projects/ProjectsRouter";
</script>

<template>
  <TopMenu></TopMenu>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
