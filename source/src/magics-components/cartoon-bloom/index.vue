<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Preview from "../Preview.vue";  
import BoomA from "./Boom-A/View.vue";
import BoomB from "./Boom-B/View.vue";
</script>

<template>
  <div class="main">
    <Preview>
      <BoomB></BoomB>
    </Preview>
    <Preview>
      <BoomA></BoomA>
    </Preview>
  </div>
</template>

<style scoped>
</style>
