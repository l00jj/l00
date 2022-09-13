<script setup lang="ts">
import ProjectsPage from "@src/components/Projects/ProjectsPage.vue";
import IndexPageBanner from "./IndexPageBanner.vue";
</script>

<template>
  <ProjectsPage>
    <template v-slot:banner>
      <IndexPageBanner></IndexPageBanner>
    </template>
  </ProjectsPage>
</template>

<style></style>
