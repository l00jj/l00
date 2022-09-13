<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import ValidationCheckA from "./l00-ValidationCheck-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="base-input-validation-check-a">
      <ValidationCheckA></ValidationCheckA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
