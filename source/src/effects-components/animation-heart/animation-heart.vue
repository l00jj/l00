<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import HeartA from "./l00-Heart-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-heart">
      <HeartA></HeartA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
