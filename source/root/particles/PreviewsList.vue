<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
import Preview from "./Preview.vue";
import ParticlesRender220720 from "./ParticlesRender220720/View.vue";
import ParticlesRender220721 from "./ParticlesRender220721/View.vue";
</script>

<template>
  <div class="main">
    <!-- <Preview>
      <ParticlesRender220721></ParticlesRender220721>
    </Preview> -->
    <!-- <Preview>
      <ParticlesRender220720></ParticlesRender220720>
    </Preview> -->
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
