<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import DelayFollowA from "./l00-DelayFollow-A.vue";
import DelayFollowB from "./l00-DelayFollow-B.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-delay-follow-b">
      <DelayFollowB></DelayFollowB>
    </ViewItem>
    <ViewItem style="height: 90vh" name="effect-delay-follow-a">
      <DelayFollowA></DelayFollowA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
