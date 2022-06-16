<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import CheckeredGradientA from "./l00-CheckeredGradient-A.vue";
import CheckeredGradientB from "./l00-CheckeredGradient-B.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="effect-checkered-gradient-b">
      <CheckeredGradientB></CheckeredGradientB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-checkered-gradient-a">
      <CheckeredGradientA></CheckeredGradientA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
