<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import InfiniteSpaceA from "./l00-InfiniteSpace-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-infinite-space-a">
      <InfiniteSpaceA></InfiniteSpaceA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
