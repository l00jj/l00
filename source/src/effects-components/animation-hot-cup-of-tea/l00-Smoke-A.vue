<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const shuffle = (list: any[]) => {
  const len = list.length;
  for (let i = 0; i < len - 1; i++) {
    const index = len - 1 - i;
    const random = Math.floor(Math.random() * (len - i));
    const backup = list[index];
    list[index] = list[random];
    list[random] = backup;
  }
  return list;
};

const total = 20;
const list = shuffle(
  Array(total)
    .fill(0)
    .map((val, index) => index)
).map((item) => ({
  style: `--delay:${item * 0.5}s`,
}));
</script>

<template>
  <section class="background">
    <div class="container">
      <div class="plate"></div>
      <div class="cup">
        <div class="top">
          <div class="circle">
            <div class="tea"></div>
          </div>
          <div class="vapour">
            <span v-for="item in list" :style="item.style"></span>
          </div>
        </div>
        <div class="handle"></div>
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
  background: #607d8b;
}
.container {
  position: relative;
  top: 50px;
}
.cup {
  position: relative;
  width: 280px;
  height: 300px;
  background: linear-gradient(to right, #f9f9f9, #d9d9d9);
  border-bottom-left-radius: 45%;
  border-bottom-right-radius: 45%;
}
.cup .top {
  position: relative;
  top: -30px;
  left: 0;
  width: 100%;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(to right, #f9f9f9, #d9d9d9);
}
.cup .top .circle {
  position: absolute;
  top: 5px;
  left: 10px;
  width: calc(100% - 20px);
  height: 50px;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(to left, #f9f9f9, #d9d9d9);
}
.cup .top .circle .tea {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: 100%;
  border-radius: 50%;
  background: linear-gradient(#c57e65, #e28462);
}

.cup .handle {
  position: absolute;
  top: 40px;
  right: -70px;
  width: 160px;
  height: 180px;
  border: 25px solid #dcdcdc;
  border-left: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-radius: 50%;
  transform: rotate(42deg);
}
.plate {
  position: absolute;
  bottom: -50px;
  left: 50%;
  width: 500px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(to right, #f9f9f9, #e7e7e7);
  box-shadow: 0 35px 35px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
}
.plate::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  border-radius: 50%;
  background: linear-gradient(to left, #f9f9f9, #e7e7e7);
}

.plate::after {
  content: "";
  position: absolute;
  top: 30px;
  bottom: 15px;
  left: 30px;
  right: 30px;
  border-radius: 50%;
  background: radial-gradient(rgba(0, 0, 0, 0.2) 25%, transparent, transparent);
}
.cup .top .vapour {
  position: relative;
  display: flex;
  padding: 0 20px;
}

.cup .top .vapour span {
  position: relative;
  bottom: 50px;
  min-width: 8px;
  height: 120px;
  display: block;
  margin: 0 2px 50px;
  background: #fff;
  border-radius: 50%;
  animation: animate 5s linear infinite;
  opacity: 0;
  filter: blur(8px);
  animation-delay: var(--delay);
}

@keyframes animate {
  0% {
    transform: translateY(0) scaleX(1);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  50% {
    transform: translateY(-150px) scaleX(5);
  }
  95% {
    opacity: 0;
  }
  100% {
    transform: translateY(-300px) scaleX(10);
  }
}
</style>
