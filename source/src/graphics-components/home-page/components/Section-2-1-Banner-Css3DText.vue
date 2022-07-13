<script setup lang="ts">
import { reactive, ref, inject, onMounted } from "vue";
import Css3DText from "./Section-2-1-Banner-Css3DText/index.vue";
import { RendersAreaMap } from "./UtilRendersAreaMap";
//
const rendersAreaMap = inject("rendersAreaMap") as RendersAreaMap;
//
const viewReactArea = ref<HTMLElement>();
const view = reactive({
  isPlay: true,
  time: {
    isTicking: true,
  },
  render() {
    this.isPlay = true;
    this.time.isTicking = true;
  },
  pausedRender() {
    this.isPlay = false;
    this.time.isTicking = false;
  },
  onDestroyed() {},
});

onMounted(async () => {
  rendersAreaMap && rendersAreaMap.set(viewReactArea.value as HTMLElement, view);
});
</script>

<template>
  <div class="viewArea">
    <div class="viewReactArea" ref="viewReactArea"></div>
    <Css3DText :perspective="[100, 300]" :isPlay="view.isPlay">
      <span style="font-size: 3.5rem"><i style="color: #ff246f">l00</i>web<i style="color: #12b5ff">w</i>elcome</span>
    </Css3DText>
  </div>
</template>

<style scoped>
.viewReactArea {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50vh 0 30vh 0;
  margin: -50vh 0 -30vh 0;
  background: none;
}
.viewArea {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.viewArea canvas {
  position: relative;
}

.background {
  background: #111;
}
@media all and (orientation: portrait) {
  .viewArea .viewReactArea {
    padding: 0;
    margin: 0;
  }
}
</style>
