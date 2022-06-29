<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import ElasticTextA from "./l00-ElasticText-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-elastic-line-text-a">
      <ElasticTextA></ElasticTextA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
