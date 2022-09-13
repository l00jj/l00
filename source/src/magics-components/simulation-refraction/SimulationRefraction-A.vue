<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import View from "./SimulationRefraction-A/main";

const viewContainer = ref();
onMounted(() => {
  const viewContainerDom = viewContainer.value as HTMLElement;
  const view = new View(viewContainerDom);
  onUnmounted(() => view.destroy());
});
</script>

<template>
  <div class="viewContainer" ref="viewContainer"></div>
</template>

<style scoped>
.viewContainer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
