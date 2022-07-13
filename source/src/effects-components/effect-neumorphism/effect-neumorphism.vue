<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import NeumorphismBaseA from "./l00-Neumorphism-Base-A.vue";
import NeumorphismClockA from "./l00-Neumorphism-Clock-A.vue";
import NeumorphismClockB from "./l00-Neumorphism-Clock-B.vue";
import NeumorphismPlayerA from "./l00-Neumorphism-Player-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="effect-neumorphism-player-a">
      <NeumorphismPlayerA></NeumorphismPlayerA>
    </ViewItem>
    <ViewItem style="height: 100vh; background: #dde1e7" name="effect-neumorphism-base-a">
      <NeumorphismBaseA></NeumorphismBaseA>
    </ViewItem>
    <ViewItem style="height: 100vh" name="effect-neumorphism-clock-b">
      <NeumorphismClockB></NeumorphismClockB>
    </ViewItem>
    <ViewItem style="height: 100vh" name="effect-neumorphism-clock-a">
      <NeumorphismClockA></NeumorphismClockA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
