<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
import Preview from "./Preview.vue";
import ParticlesTestA from "./ParticlesTest-A/View.vue";
</script>

<template>
  <div class="main">
    <Preview>
      <ParticlesTestA></ParticlesTestA>
    </Preview>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
