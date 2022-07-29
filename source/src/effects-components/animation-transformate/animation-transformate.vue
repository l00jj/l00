<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import TransformateTrianglesA from "./l00-TransformateTriangles-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-transformate-a">
      <TransformateTrianglesA></TransformateTrianglesA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
