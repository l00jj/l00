<script setup lang="ts">
import { ref, reactive, computed, getCurrentScope, onMounted, onUnmounted } from "vue";
import Renderer from "./core/Main";
import exampleImageUrl from "./assets/example.png?url";

/**
 * Stats
 */
// https://www.youtube.com/watch?v=w2-0bNVpZUs

//const props = defineProps<{}>();
const viewDom = ref<HTMLElement>();

onMounted(() => {
  var exampleImage = new Image();
  exampleImage.src = exampleImageUrl;
  exampleImage.onload = () => {
    renderer.world.background.use(exampleImage);
    renderer.render();
  };
  const renderer = new Renderer(viewDom.value as HTMLElement);
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
