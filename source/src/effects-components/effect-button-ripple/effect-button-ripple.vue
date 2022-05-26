<script setup lang="ts">
import { ref } from "vue";
import RippleHoverA from "./l00-RippleHover-A.vue";
import RippleCikckA from "./l00-RippleCikck-A.vue";
</script>

<template>
  <section style="background: #222">
    <RippleHoverA><h2>RippleHoverA</h2></RippleHoverA>
    <RippleHoverA color="#755bea"><h2>RippleHoverA</h2></RippleHoverA>
  </section>
  <section style="background: #040d15">
    <RippleCikckA><h2>RippleCikckA</h2></RippleCikckA>
    <RippleCikckA :color="['#755bea', '#ff72c0']"><h2>RippleCikckA</h2></RippleCikckA>
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
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

section > * {
  margin: 3em;
}

.float {
  position: absolute;
}

.float > * {
  transform: translateX(-50%) translateY(-50%);
}
</style>
