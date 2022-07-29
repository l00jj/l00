<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import Stars from "./l00-Stars-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-stars-a">
      <Stars></Stars>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
