<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
//const props = defineProps<{}>();

const list = computed(() =>
  [
    {
      icon: "f099",
      color: "#1da1f2",
    },
    {
      icon: "f1d7",
      color: "#25d366",
    },
    {
      icon: "f09a",
      color: "#629ea0",
    },
    {
      icon: "f167",
      color: "#ff0000",
    },
  ].map((item) => `--content:"\\${item.icon}";--color:${item.color};`)
);
</script>

<template>
  <section class="background">
    <ul class="group">
      <li class="button" v-for="item in list" :style="item"></li>
    </ul>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome_Brands";
  src: url("@src/assets/icons/Font-Awesome/Font Awesome 6 Brands-Regular-400.otf");
}

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
}
.background {
  background: #fff;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
}
.group {
  position: relative;
  display: flex;
  gap: 3em;
}
.button {
  list-style: none;
  position: relative;
  width: 10em;
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 1em 2em rgba(0, 0, 0, 0.1);
}
.button::before {
  content: var(--content);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: initial;
  justify-content: center;
  line-height: 10rem;
  color: transparent;
  -webkit-text-stroke: 0.025em var(--color);
  font-family: "Font_Awesome_Brands";
  font-size: 6em;
  transition: 0.5s;
}
.button::after {
  content: var(--content);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0%;
  overflow: hidden;
  display: flex;
  align-items: initial;
  justify-content: center;
  border-bottom: 4px solid var(--color);
  line-height: 10rem;
  color: var(--color);
  font-family: "Font_Awesome_Brands";
  font-size: 6em;
  background: #fff;
  transition: 0.5s;
}
.button:hover::after {
  height: 100%;
}
</style>
