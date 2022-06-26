<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import GravityA from "./l00-Gravity-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-gravity">
      <GravityA></GravityA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
