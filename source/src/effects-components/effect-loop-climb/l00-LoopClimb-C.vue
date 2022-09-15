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

const length = 12;
const rotate = 360 / length;
const list = Array(length)
  .fill(0)
  .map((v, k) => {
    return {
      isMotional: k % 3 === 0,
      style: {
        "--rotate": `${rotate * k}deg`,
      },
    };
  });
</script>

<template>
  <section class="background">
    <div class="container">
      <div class="loader">
        <span v-for="item in list" :style="item.style" class="item" :class="{ motion: item.isMotional }"></span>
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

section.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #222;
}
.loader {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: loaderAnimate 3s infinite;
}

@keyframes loaderAnimate {
  0%,
  25% {
    transform: rotate(0deg);
  }
  75%,
  90%,
  100% {
    transform: rotate(90deg);
  }
}
.loader .item {
  position: absolute;
  width: 100%;
  height: 100%;
  /* border: 1px solid #fff; */
  transform: rotate(var(--rotate));
}
.loader .item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.15);
}

.loader .item.motion::before {
  background: #fff;
  box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff;
  animation: itemAnimate 3s infinite;
}
@keyframes itemAnimate {
  0%,
  25% {
    transform: rotate(0deg);
    transform-origin: 150px;
  }
  75%,
  90%,
  100% {
    transform: rotate(180deg);
    transform-origin: 75px;
  }
}
</style>
