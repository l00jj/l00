<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Preview from "../Preview.vue";
import SimulationRefractionA from "./SimulationRefraction-A.vue";
</script>

<template>
  <div class="main">
    <Preview>
      <SimulationRefractionA></SimulationRefractionA>
    </Preview>
  </div>
</template>

<style scoped></style>
