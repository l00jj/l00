<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import WriteTextA from "./l00-WriteText-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-write-text">
      <WriteTextA></WriteTextA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
