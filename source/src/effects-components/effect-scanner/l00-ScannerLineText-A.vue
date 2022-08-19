<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  text?: string;
}>();

const text = computed(() => (props.text ? props.text : "\b ♣ Css Only ♠ \b"));
</script>

<template>
  <section class="background">
    <div class="text" :data-text="text"></div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #111;
}
.text {
  position: relative;
  display: flex;
}
.text::before,
.text::after {
  content: attr(data-text);
  font-size: 6em;
  font-weight: 900;
  white-space: nowrap;
}
.text::before {
  position: relative;
  color: #222;
}
.text::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  border-right: 4px solid #fff;
  color: #fff;
  overflow: hidden;
  filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #fff);
  animation: animate 8s ease infinite;
}
@keyframes animate {
  0%,
  10%,
  100% {
    width: 0;
  }
  70%,
  90% {
    width: 100%;
  }
}
</style>
