<script setup lang="ts">
import { ref, reactive } from "vue";
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import SpreadMenuA from "./l00-SpreadMenu-A.vue";
import MagicMenuA from "./l00-MagicMenu-A.vue";
import SpreadMenuB from "./l00-SpreadMenu-B.vue";
import MagicInputA from "./l00-MagicInput-A.vue";
import ClaymorphismListA from "./l00-ClaymorphismList-A.vue";
import MagicMenuB from "./l00-MagicMenu-B.vue";
import SpreadMenuC from "./l00-SpreadMenu-C.vue";
import MagicMenuC from "./l00-MagicMenu-C.vue";
import SpreadMenuD from "./l00-SpreadMenu-D.vue";
import MagicInputB from "./l00-MagicInput-B.vue";

const vMagicInputB = ref("");
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-magic-hover-component-magic-input-b">
      <MagicInputB v-model="vMagicInputB"></MagicInputB>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-magic-hover-component-claymorphism-list-a">
      <ClaymorphismListA></ClaymorphismListA>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-magic-hover-component-spread-menu-c">
      <SpreadMenuC></SpreadMenuC>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-magic-hover-component-spread-menu-d">
      <SpreadMenuD></SpreadMenuD>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-magic-menu-c">
      <MagicMenuC></MagicMenuC>
    </ViewItem>

    <ViewItem style="height: 85vh; background: #1b2b3a" name="effect-magic-hover-component-magic-input-a">
      <section style="position: relative; display: flex; flex-direction: column; gap: 2em">
        <MagicInputA placeholder="First Name"></MagicInputA>
        <MagicInputA plain placeholder="Last Name"></MagicInputA>
      </section>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-spread-menu-b">
      <SpreadMenuB></SpreadMenuB>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-magic-menu-a">
      <MagicMenuA></MagicMenuA>
    </ViewItem>

    <ViewItem style="height: 85vh" name="effect-magic-hover-component-spread-menu-a">
      <SpreadMenuA></SpreadMenuA>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-magic-hover-component-magic-menu-b">
      <MagicMenuB></MagicMenuB>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
