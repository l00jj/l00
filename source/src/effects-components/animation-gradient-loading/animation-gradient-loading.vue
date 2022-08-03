<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import GradientLoadingA from "./l00-GradientLoading-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-gradient-loading-a">
      <GradientLoadingA></GradientLoadingA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
