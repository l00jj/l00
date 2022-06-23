<script setup lang="ts">
import { ref, reactive, computed, onMounted, VueElement } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const text = ref("Welcome To l00 Watch!");

</script>

<template>
  <section class="background" ref="background">
    <div class="container">
      <div class="step stepA">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepB">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepC">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepD">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepE">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepF">
        <span class="textbox">{{ text }}</span>
      </div>
      <div class="step stepG">
        <span class="textbox">{{ text }}</span>
      </div>
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

.background {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}
.container {
  position: relative;
  width: 720px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  overflow: hidden;
  perspective: 800px;
  perspective-origin: 150% -150%;
  background-image: linear-gradient(190deg, #def, #9ab 53%, #789 53%, #456);
}

.step {
  position: absolute;
  overflow: hidden;
  border-radius: solid rgb(136, 135, 135);
  border-width: 1px 0;
}

.stepA,
.stepC,
.stepE,
.stepG {
  width: 80px;
  height: 120px;
  background-color: #fff;
  transform: rotateX(90deg);
}

.stepA .textbox,
.stepC .textbox,
.stepE .textbox,
.stepG .textbox {
  color: #0672ff;
}

.stepB,
.stepD,
.stepF {
  width: 40px;
  height: 120px;
  background-color: #bcd;
  transform: rotateX(90deg) rotateY(90deg);
}

.stepB .textbox,
.stepD .textbox,
.stepF .textbox {
  color: #fd1a03;
}

.step .textbox {
  position: absolute;
  left: 400px;
  top: 12px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 60px;
  white-space: nowrap;
  animation: textClimb 12s linear infinite;
}

@keyframes textClimb {
  from {
    left: 400px;
  }
  to {
    left: -800px;
  }
}

.stepA {
  width: 320px;
  top: 200px;
  left: 460px;
}

.stepB {
  top: 180px;
  left: 440px;
}
.stepB .textbox {
  animation-delay: 0.4s;
}

.stepC {
  top: 160px;
  left: 380px;
}
.stepC .textbox {
  animation-delay: 1.2s;
}

.stepD {
  top: 140px;
  left: 360px;
}

.stepD .textbox {
  animation-delay: 1.6s;
}

.stepE {
  top: 120px;
  left: 300px;
}
.stepE .textbox {
  animation-delay: 2.4s;
}

.stepF {
  top: 100px;
  left: 280px;
}

.stepF .textbox {
  animation-delay: 2.8s;
}

.stepG {
  width: 400px;
  top: 80px;
  left: -100px;
}
.stepG .textbox {
  animation-delay: 6s;
}
</style>
