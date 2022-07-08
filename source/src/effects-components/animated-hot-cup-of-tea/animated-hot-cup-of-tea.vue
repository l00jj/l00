<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import SmokeA from "./l00-Smoke-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-gravity">
      <SmokeA></SmokeA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
