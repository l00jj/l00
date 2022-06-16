<script setup lang="ts">
import TopMenu from "@src/components/TopMenu.vue";
import FloatMenu from "@src/components/FloatMenu.vue";
import { useRoute } from "vue-router";
import { computed, inject, watchEffect, onUnmounted } from "vue";
import ProjectsRouter from "@src/components/Projects/ProjectsRouter";

const route = useRoute();

const projectsRouter: ProjectsRouter = inject("projectsRouter") as ProjectsRouter;

const menuComponent = computed(() => {
  //console.log(route.name)
  return !route.name ||
    route.name === projectsRouter.indexPageRouteName ||
    route.name === projectsRouter._404PageRouteName
    ? TopMenu
    : FloatMenu;
});
</script>

<template>
  <component :is="menuComponent"></component>
  <router-view></router-view>
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
