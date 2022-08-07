<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onUnmounted, onMounted } from "vue";
import View from "./View/main";
import exampleImgUrl from "./View/example7.png?url";

const viewContainer = ref();
onMounted(() => {
  const viewContainerDom = viewContainer.value as HTMLElement;
  const view = new View(viewContainerDom);
  view.renderer.core.use(exampleImgUrl);
  onUnmounted(() => view.destroy());
  /* 

const viewContainerDom = document.querySelector('.viewContainer') as HTMLElement;
const view = new Main(viewContainerDom)

view.canvasDom.style.background = 'palevioletred'
view.canvasDom.style.background = 'red'
import("./example1.png?url").then((module) => {
    const url = module.default
    view.renderer.core.use(url)
})
 */
});
</script>

<template>
  <section class="container">
    <div class="viewContainer" ref="viewContainer"></div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.viewContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
