<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import RenderViewHead from "./Section-3-RenderView-Head.vue";

//const props = defineProps<{}>();
</script>

<template>
  <section>
    <div class="container">
      <div class="head">
        <RenderViewHead></RenderViewHead>
      </div>
      <div class="content main">
        <span class="important">Author: l00.小刘</span>
        <span class="important">WeChatID: junjian12</span>
        <span>Powered by: Vue.js / Three.js / Cinema4D / Blender</span>
      </div>
      <div class="content copyright">
        <span>
          BGM: And So It Begins — CC BY 3.0<br />
          Audio Library: youtu.be/JpoEFiAJdxo
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
  background: #111;
}
.head {
  /* pointer-events: none; */
  position: relative;
  width: 100vw;
  height: 100vh;
}
.content {
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  white-space: nowrap;
  color: #ffffff44;
  font-size: 1.5vh;
  font-weight: 900;
}

.content .important {
  color: #ffffff66;
}
.content.main {
  top: 10vh;
  left: 2vh;
}
.content.copyright {
  bottom: 4vh;
  left: 2vh;
  color: #ffffff22;
}
</style>
