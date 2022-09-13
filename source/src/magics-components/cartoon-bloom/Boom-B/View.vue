<script setup lang="ts">
import { ref, reactive, computed, getCurrentScope, onMounted, onUnmounted } from "vue";
import Renderer from "./core/Main";

// https://codepen.io/alexzaworski/pen/mEZvrG

//const props = defineProps<{}>();
const viewDom = ref<HTMLElement>();

onMounted(() => {
  const renderer = new Renderer(viewDom.value as HTMLElement);
  //renderer.render();
  renderer.world.createEmitterParticles(renderer.sizes.width / 2, renderer.sizes.height / 2);
  onUnmounted(() => renderer.destroy);
});
</script>

<template>
  <section class="background">
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
  background: hsl(222.8571428571deg, 13.7254901961%, 20%);
}
.viewContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
