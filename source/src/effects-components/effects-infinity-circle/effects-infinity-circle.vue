<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import InfinityLoaderA from "./l00-InfinityLoader-A-SVG.vue";
import InfinityLoaderB from "./l00-InfinityLoader-B-SVG.vue";
import InfinityLoaderC from "./l00-InfinityLoader-C-SVG.vue";
import InfinityLoaderD from "./l00-InfinityLoader-D.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 85vh" name="effects-infinity-circle-d">
      <InfinityLoaderD></InfinityLoaderD>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effects-infinity-circle-c">
      <InfinityLoaderC></InfinityLoaderC>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effects-infinity-circle-b">
      <InfinityLoaderB></InfinityLoaderB>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effects-infinity-circle-a">
      <InfinityLoaderA></InfinityLoaderA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
