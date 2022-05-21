<script setup lang="ts">
import { ref } from "vue";
import Glowing3DCube from "./l00-3DGlowingCube.vue";

</script>

<template>
  <section style="background: #050505">
    <Glowing3DCube></Glowing3DCube>
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.float {
  position: absolute;
}

.float>* {
  transform: translateX(-50%) translateY(-50%);
}
</style>
