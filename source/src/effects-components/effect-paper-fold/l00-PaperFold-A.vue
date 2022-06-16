<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const parameter = {
  backgroundColor: `#000`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

const list = Array(7).fill(0);
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <ul>
      <li v-for="item in list"></li>
    </ul>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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

ul li {
  position: relative;
  width: 400px;
  height: 50px;
  transition: 1s;
  will-change: transform;
}

ul li:nth-child(even) {
  background: linear-gradient(0deg, #eee, #bdbdbd);
  transform: skew(20deg);
}

ul li:nth-child(odd) {
  background: linear-gradient(0deg, #eee, #bdbdbd);
  transform: skew(-20deg);
}

ul:hover li {
  transform: skew(0deg);
}
</style>
