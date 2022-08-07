<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import ModernA from "./l00-Modern-A.vue";
import ModernB from "./l00-Modern-B.vue";
import ModernC from "./l00-Modern-C.vue";
import ModernD from "./l00-Modern-D.vue";
import ModernE from "./l00-Modern-E.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="effect-modern-e">
      <ModernE></ModernE>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-modern-d">
      <ModernD></ModernD>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-modern-c">
      <ModernC></ModernC>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-modern-b">
      <ModernB></ModernB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-modern-a">
      <ModernA></ModernA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
