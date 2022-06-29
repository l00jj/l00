<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
</script>

<template>
  <button>
    <div class="border"></div>
    <span>BUTTON</span>
  </button>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.background {
  background: #0e1538;
}

button {
  position: relative;
  width: 160px;
  height: 60px;
  display: inline-block;
  background: #fff;
  margin: 20px;
  border: none;
}

button .border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button .border::before,
button .border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  inset: 0px;
  background: linear-gradient(45deg, #ff075b, transparent, transparent, #1aff22);
  background: linear-gradient(45deg, #00ccff, transparent, transparent, #d400d4);
  transition: 1s;
}
button:hover .border::before,
button:hover .border::after {
  inset: -3px;
}

button:hover .border::after {
  filter: blur(5px);
}

button span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: #0e1538;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  letter-spacing: 2px;
  border: 1px solid #040a29;
  overflow: hidden;
  order: -1;
}
button span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.075);
  transform: skew(25deg) translateX(-50%);
}
</style>
