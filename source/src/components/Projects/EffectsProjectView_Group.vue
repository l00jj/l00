<script setup lang="ts">
import { useRoute } from "vue-router";
import { watchEffect, onUnmounted } from "vue";

const route = useRoute();

const stopWatchEffect = watchEffect(() => {
  route.path && window.scrollTo(0, 0);
});

onUnmounted(() => {
  stopWatchEffect();
});
</script>

<template>
  <div class="effectsProjectView-group">
    <slot></slot>
  </div>
</template>

<style scoped>
.effectsProjectView-group {
  display: flex;
  flex-direction: column;
}
</style>
