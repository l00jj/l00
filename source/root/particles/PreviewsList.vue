<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
import Preview from "./Preview.vue";
import ParticlesRender220720 from "./ParticlesRender220720/View.vue";
import ParticlesRender220721 from "./ParticlesRender220721/View.vue";
import ParticlesRender220722 from "./ParticlesRender220722/View.vue";
import BoomA from "./ParticlesRender220723-Boom-A/View.vue";
import BoomB from "./ParticlesRender220724-Boom-B/View.vue";
</script>

<template>
  <div class="main">
    <Preview>
      <ParticlesRender220722></ParticlesRender220722>
    </Preview>
    <Preview>
      <BoomB></BoomB>
    </Preview>
    <Preview>
      <BoomA></BoomA>
    </Preview>
    
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
