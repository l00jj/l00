<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import TextMotionFlyingA from "./l00-TextMotionFlying-A.vue";
import TextMotionSmokeA from "./l00-TextMotionSmoke-A.vue";
import TextMotionIconsA from "./l00-TextMotionIcons-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-text-motion-magic-icons-a">
      <TextMotionIconsA></TextMotionIconsA>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-text-motion-smoke-text-a">
      <TextMotionSmokeA></TextMotionSmokeA>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-text-motion-flying-text-a">
      <TextMotionFlyingA></TextMotionFlyingA>
    </ViewItem>
  </ViewGroup>
</template>
<style scoped></style>
