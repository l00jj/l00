<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import PaperFold from "./l00-PaperFold-A.vue";
//import PaperTextFoldA from "./l00-PaperTextFold-A-TEST.vue";
import PaperTextFoldA from "./l00-PaperTextFold-A.vue";
</script>

<template>
  <ViewGroup>

    <ViewItem style="height: 80vh" name="effect-paper-fold-text-a">
      <PaperTextFoldA text="welcome"></PaperTextFoldA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-paper-fold-a">
      <PaperFold></PaperFold>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
