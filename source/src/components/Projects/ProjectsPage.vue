<script setup lang="ts">
import ProjectsPage_List from "./ProjectsPage_List.vue";
import ProjectsPage_Banner from "./ProjectsPage_Banner.vue";
</script>

<template>
  <ProjectsPage_Banner>
    <slot name="banner"></slot>
  </ProjectsPage_Banner>
  <ProjectsPage_List></ProjectsPage_List>
</template>

<style scoped></style>
