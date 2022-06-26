<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
</script>

<template>
  <section class="background">
    <div class="box">
      <h2>4<span class="zero"></span>4</h2>
    </div>
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: linear-gradient(135deg, #03a9f4 50%, #333 50%);
}
section .box {
  position: absolute;
  animation: animateColor calc(var(--duration) * 5) linear infinite;
}
section .box h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f3f3f3;
  font-size: 15em;
  font-weight: 900;
  text-shadow: -25px 25px 40px rgba(0, 0, 0, 0.5), -10px 10px 0px rgba(255, 255, 255, 0.5),
    -20px 20px 0px rgba(255, 255, 255, 0.2), -30px 30px 0px rgba(255, 255, 255, 0.05);
}

section .box h2 .zero {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 0 15px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #fff, #777);
  box-shadow: -25px 25px 40px rgba(0, 0, 0, 0.5);
}

section .box h2 .zero::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(to top, #fff, #777);
  transform: translateY(-50%);
}
section .box h2 .zero::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #03a9f4 50%, #333 50%);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  animation: animate 5s steps(4) infinite;
}

@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
