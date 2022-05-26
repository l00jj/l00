<script setup lang="ts">
import { ref } from "vue";
import GlassRowGroupA from "./l00-GlassRowGroup-A.vue";
import GlassRowGroupItemA from "./l00-GlassRowGroupItem-A.vue";
import GlassButtonA from "./l00-GlassButton-A.vue";
</script>

<template>
 <section style="background: #350048;">
    <GlassButtonA color="#ff1f71">Glass</GlassButtonA>
    <GlassButtonA color="#2bd2ff">Glass</GlassButtonA>
    <GlassButtonA color="#1eff45">Glass</GlassButtonA>
  </section>
  <section style="background: #1e2759;">
    <GlassRowGroupA>
      <GlassRowGroupItemA :active="true"><a><span>Home</span></a></GlassRowGroupItemA>
      <GlassRowGroupItemA><a><span>person</span></a></GlassRowGroupItemA>
      <GlassRowGroupItemA><a><span>+</span></a></GlassRowGroupItemA>
      <GlassRowGroupItemA><a><span>setting</span></a></GlassRowGroupItemA>
      <GlassRowGroupItemA><a><span>chat</span></a></GlassRowGroupItemA>
    </GlassRowGroupA>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}
</style>
