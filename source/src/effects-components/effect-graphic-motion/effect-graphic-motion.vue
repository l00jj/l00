<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import GraphicMotionA from "./l00-GraphicMotion-A.vue";
import GraphicMotionB from "./l00-GraphicMotion-B.vue";
import GraphicMotionFlyingTextA from "./l00-GraphicMotionFlyingText-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-graphic-motion-a">
      <GraphicMotionA></GraphicMotionA>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-graphic-motion-b">
      <GraphicMotionB></GraphicMotionB>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-graphic-motion-flying-text-a">
      <GraphicMotionFlyingTextA></GraphicMotionFlyingTextA>
    </ViewItem>
  </ViewGroup>
</template>
<style scoped></style>
