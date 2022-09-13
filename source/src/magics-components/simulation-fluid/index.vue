<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Preview from "../Preview.vue";  
import Fluid from "./fluid/index.vue";
</script>

<template>
  <div class="main">
    <Preview>
      <Fluid></Fluid>
    </Preview>
    
  </div>
</template>

<style scoped>
</style>
