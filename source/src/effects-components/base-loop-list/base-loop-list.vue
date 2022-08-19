<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import LoopListA from "./l00-LoopList-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="base-loop-list-a">
      <LoopListA></LoopListA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
