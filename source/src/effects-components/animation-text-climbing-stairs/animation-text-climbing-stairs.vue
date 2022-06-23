<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import TextClimbingStairs_Old from "./l00-TextClimbingStairs-A.vue";
import TextClimbingStairs from "./l00-TextClimbingStairs-B.vue";
</script>

<template>
  <ViewGroup>

    <ViewItem style="height: 100vh" name="animation-text-climbing-stairs">
      <TextClimbingStairs></TextClimbingStairs>
    </ViewItem>

    <ViewItem style="height: 100vh" name="">
      <TextClimbingStairs_Old></TextClimbingStairs_Old>
    </ViewItem>

  </ViewGroup>
</template>

<style scoped></style>
