<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import GooeyLiquidA from "./l00-GooeyLiquid-A.vue";
import GooeyLiquidB from "./l00-GooeyLiquid-B.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-gooey-liquid-b">
      <GooeyLiquidB></GooeyLiquidB>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-gooey-liquid-a">
      <GooeyLiquidA></GooeyLiquidA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
