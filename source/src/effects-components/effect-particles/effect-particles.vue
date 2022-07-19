<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import FireworksParticlesA from "./l00-FireworksParticles-A.vue";
import MaskParticlesA from "./l00-MaskParticles-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-particles-mask-a">
      <MaskParticlesA></MaskParticlesA>
    </ViewItem>
    <ViewItem style="height: 90vh" name="effect-particles-fireworks-a">
      <FireworksParticlesA></FireworksParticlesA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
