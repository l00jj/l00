<script setup lang="ts">
import { ref ,computed,watchEffect} from "vue";
import NeonA from "./l00-Neon-A.vue";


const vNeonA=ref()
const neonBgColor= computed(()=>vNeonA?.value?.option?.neonBgColor)

</script>

<template>
  <section :style="{'background': neonBgColor}">
    <NeonA ref="vNeonA"></NeonA>
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
  min-height: 100vh;
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
