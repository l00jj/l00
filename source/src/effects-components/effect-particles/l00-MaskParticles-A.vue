<script setup lang="ts">
import { ref, reactive, computed, getCurrentScope, onMounted } from "vue";
import { Particles } from "./l00-MaskParticles-A";

/**
 * Stats
 */

//const props = defineProps<{}>();
const viewDom = ref<HTMLElement>();
onMounted(() => {
  const particles = new Particles(viewDom.value as HTMLElement);
  particles.render();
});
</script>

<template>
  <section class="background">
    <img class="bgimg" src="./l00-MaskParticles-A-BG.jpg" />
    <div class="viewContainer" ref="viewDom"></div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
}

section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

section.background {
  background: #111;
}
.bgimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.viewContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.viewContainer :deep(canvas) {
  mix-blend-mode: screen;
}
</style>
