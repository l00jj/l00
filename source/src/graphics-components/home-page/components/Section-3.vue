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
      <div class="content">
        <span class="">WeChatID: junjian12</span>
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
  bottom: 2vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
  font-size: 3vh;
  font-weight: 900;
}
</style>
