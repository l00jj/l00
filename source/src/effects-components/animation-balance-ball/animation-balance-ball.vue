<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import BalanceBallA from "./l00-BalanceBall-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-balance-ball-a">
      <BalanceBallA></BalanceBallA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
