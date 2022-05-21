<script setup lang="ts">
import { ref } from "vue";
let isActivate = ref(false);
</script>

<template>
  <div class="background">
    <div class="box"><span>Gradient</span></div>
    <div class="box"><span>Box</span></div>
    <div class="box"><span>Shadow</span></div>
  </div>
</template>

<style scoped>
.background {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.box {
  position: relative;
  width: 20em;
  height: 12em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5em;
}

.box::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(30px) scale(0.9);
  filter: blur(25px);
  border-radius: 40px;
}

.box span {
  color: #fff;
  font-size: 2.5em;
  z-index: 1;
  font-weight: bold;
}

.box:nth-child(1),
.box:nth-child(1)::before {
  background: linear-gradient(135deg, #f403d1, #64b5f6);
}
.box:nth-child(2),
.box:nth-child(2)::before {
  background: linear-gradient(135deg, #ffec61,#f321d7);
}

.box:nth-child(3),
.box:nth-child(3)::before {
  background: linear-gradient(135deg, #24ff72,#2196f3);
}
</style>
