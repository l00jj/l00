<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string;
}>();
</script>

<template>
  <section class="background">
    <button class="button"><span>BUTTON</span></button>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
}
section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  flex-direction: column;
  gap: 60px;
  background: #eee;
}
button.button {
  position: relative;
  padding: 15px 40px;
  border: none;
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 2px;
  background: #222;
  clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
  transition: 0.5s;
}
button.button:hover {
  background: #666;
  clip-path: polygon(100% 0, 90% 50%, 100% 100%, 10% 100%, 0% 50%, 10% 0%);
}
</style>
