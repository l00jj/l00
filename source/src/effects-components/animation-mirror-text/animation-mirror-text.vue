<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import MirrorTextA from "./MirrorText-A-Example.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="animation-mirror-text-a">
      <MirrorTextA></MirrorTextA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
