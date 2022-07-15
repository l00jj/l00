<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import ProfileCardA from "./l00-ProfileCard-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="base-card-a">
      <ProfileCardA></ProfileCardA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
