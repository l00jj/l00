<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import SoapBubbleA from "./l00-SoapBubble-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="animation-soap-bubble-a">
      <SoapBubbleA></SoapBubbleA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
