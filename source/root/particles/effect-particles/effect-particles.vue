<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import FireworksParticlesA from "./l00-FireworksParticles-A.vue";
import ParticlesTestA from "./ParticlesTest-A/ParticlesTest.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="">
      <ParticlesTestA></ParticlesTestA>
    </ViewItem>
    <ViewItem style="height: 90vh" name="effect-particles-fireworks-a">
      <FireworksParticlesA></FireworksParticlesA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
