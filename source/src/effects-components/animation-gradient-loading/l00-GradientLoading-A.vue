<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
const bubbles = reactive(Array(5).fill(0));
</script>

<template>
  <section class="background">
    <div class="loader"></div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
.background {
  background: #000;
}
.loader {
  position: relative;
  width: 300px;
  height: 10px;
  background: #fff;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}
.loader::before,
.loader::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
  background-size: 500%;
  animation: animate 20s linear infinite;
}
.loader::after {
  filter: blur(20px);
}
@keyframes animate {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 500% 0;
  }
}
</style>
