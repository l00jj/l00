<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import NeonButtonA from "./l00-Neon-Button-A.vue";
import NeonTextA from "./l00-Neon-Text-A.vue";
import NeonTextB from "./l00-Neon-Text-B.vue";
import NeonTextC from "./l00-Neon-Text-C.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="effect-neon-button-a">
      <NeonButtonA></NeonButtonA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-c">
      <NeonTextC text="Happy Weekend"></NeonTextC>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-b">
      <NeonTextB text="Loading"></NeonTextB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-a">
      <NeonTextA text="Happy Weekend"></NeonTextA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
