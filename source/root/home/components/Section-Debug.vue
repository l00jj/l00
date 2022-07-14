<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { RendersAreaMap } from "./UtilRendersAreaMap";

const props = defineProps<{
  rendersAreaMap: RendersAreaMap;
}>();

const rendersAreaMap = props.rendersAreaMap;
const rendersAreaMapSummary =reactive( { playing: 0, total: 0 });
const checkRendersAreaMap = () => {
  const result = [...rendersAreaMap.renders].map((render) => ({ render, isPlaying: (render as any).time.isTicking }));
  console.log(result);
  rendersAreaMapSummary.playing = result.reduce((a, b) => a + (b.isPlaying ? 1 : 0), 0);
  rendersAreaMapSummary.total = result.length;
};
(window as any).rendersAreaMap = props.rendersAreaMap;
(window as any).checkRendersAreaMap = checkRendersAreaMap;
</script>

<template>
  <section class="container">
    <div class="rendersAreaMapSummary" @click="checkRendersAreaMap">
      正在渲染区域: {{ rendersAreaMapSummary.playing }}/{{ rendersAreaMapSummary.total }}
    </div>
  </section>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  z-index: 100;
}
</style>
