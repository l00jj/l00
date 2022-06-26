<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import SpreadMenuA from "./l00-SpreadMenu-A.vue";
import MagicMenuA from "./l00-MagicMenu-A.vue";
import SpreadMenuB from "./l00-SpreadMenu-B.vue";
import MagicInputA from "./l00-MagicInput-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 85vh; background: #1b2b3a" name="effect-magic-hover-component-d">
      <section style="position: relative; display: flex; flex-direction: column; gap: 2em">
        <MagicInputA placeholder="First Name"></MagicInputA>
        <MagicInputA plain placeholder="Last Name"></MagicInputA>
      </section>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-c">
      <SpreadMenuB></SpreadMenuB>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-b">
      <MagicMenuA></MagicMenuA>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-a">
      <SpreadMenuA></SpreadMenuA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
