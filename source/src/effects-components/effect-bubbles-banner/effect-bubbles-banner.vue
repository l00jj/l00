<script setup lang="ts">
import { ref, reactive, computed } from "vue";
let isActivate = ref(false);

const colors = {
  "white": {
    "--base": "#f1f1f1",
    "--dark": "#e4e3e8",
    "--color": '#ff2a2a',
    "--circle-outside": "linear-gradient(135deg, #fff, var(--dark))",
    "--circle-inside": "linear-gradient(315deg, #fff,  var(--dark))",
  },
  "red": {
    "--base": "#ff2a2a",
    "--dark": "#e60000",
    "--color": '#fff',
    "--circle-outside": "linear-gradient(135deg, var(--base), var(--dark))",
    "--circle-inside": "linear-gradient(315deg, var(--base),  var(--dark))",
  }
}

const select = ref('white')
const color = computed(() => {
  const list = Object.entries(colors[select.value as keyof typeof colors])
  return list.map(item => item.join(':')).join(';')
})
const change = () => {
  if (select.value === 'white') {
    select.value = 'red'
  } else {
    select.value = 'white'
  }
}

const count = ref(200)//泡泡总数
const windowWidth = ref(window.innerWidth)//屏宽
const windowHeight = ref(window.innerHeight)//屏高
const bubbles = computed(() => Array(count.value).fill(0).map(() => {
  const size = 1 + Math.random() * 10;
  const x = Math.floor(Math.random() * windowWidth.value);
  const y = Math.floor(Math.random() * windowHeight.value);
  return `top:${y}px; left:${x}px; width:${size}px; height:${size}px; animation-duration:${1 * size}s; animation-delay:${size}s`
}))



</script>

<template>
  <section :style="[color]">
    <div class="box" @click="change">
      <div class="circle">
        <h2>♥77♥</h2>
      </div>
    </div>
    <div class="bubbles">
      <i v-for="item in bubbles" :style="item"></i>
    </div>
  </section>
</template>

<style scoped>
section * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: var(--base);
  overflow: hidden;
}

section .box {
  position: absolute;
  width: 450px;
  height: 450px;
}

section .box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #000, transparent);
  transform: rotate(45deg);
  transform-origin: left;
  opacity: 0.1;
}

section .box .circle {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--circle-outside);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

section .box .circle::before {
  content: '';
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  background: var(--circle-inside);
  border-radius: 50%;
}

section .box .circle h2 {
  color: var(--color);
  font-size: 4em;
  z-index: 2;
}

section .bubbles i {
  position: absolute;
  background: var(--color);
  border-radius: 50%;
  animation: animate ease-out infinite;
  opacity: 0;
}

section .bubbles i:nth-child(even) {
  background: transparent;
  border: 1px solid var(--color);

  /* animation-duration: calc(var(--d)); */
}

@keyframes animate {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(-2000%);
    opacity: 0;
  }
}
</style>
