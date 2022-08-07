<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import ShapeLightningA from "./l00-ShapeLightning-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-shape-lightning">
      <ShapeLightningA></ShapeLightningA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
