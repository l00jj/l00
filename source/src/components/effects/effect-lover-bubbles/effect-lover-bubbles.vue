<script setup lang="ts">
import { ref, computed } from "vue";

const colors = {
  "white": {
    "--color": '#ff2a2a',
    "--base": "#f1f1f1",
    "--light": "#fff",
    "--dark": "#e4e3e8",
    "--bubble-color": '#ff2a2a',
    "--circle-outside": "linear-gradient(135deg, var(--light), var(--dark))",
    "--circle-inside": "linear-gradient(315deg, var(--light),  var(--dark))",
  },
  "red": {
    "--color": 'hsl(60deg 100% 88% / 1)',
    "--base": "hsl(350deg 95% 40% / 1)",
    "--light": "hsl(350deg 100% 45%)",
    "--dark": "hsl(350deg 97% 35%)",
    "--bubble-color": 'hsl(60deg 100% 88% / 1)',
    "--circle-outside": "linear-gradient(135deg, var(--light), var(--dark))",
    "--circle-inside": "linear-gradient(315deg, var(--light),  var(--dark))",
  }
}

const select = ref('red')
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
  const size = 1 + Math.random() * 7;
  const x = Math.floor(Math.random() * windowWidth.value);
  const y = Math.floor(Math.random() * windowHeight.value);
  return {
    size, style: `top:${y}px; left:${x}px; width:${size}px; height:${size}px; animation-duration:${1 * size}s; animation-delay:${size}s`
  }
}))
</script>

<template>
  <section :class="[select]" :style="[color]">
    <div
      style="position: absolute;z-index: 999;background-image:url('./src/examples/css/effect-lover-bubbles/love.svg');">
    </div>
    <div class="box" @click="change">
      <div class="circle">
        <h2>love<br>77</h2>
      </div>
    </div>
    <div class="bubbles">
      <!--  -->
      <i v-for="bubble in bubbles" class="shadow" :style="bubble.style">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :width="bubble.size" :height="bubble.size"
          viewBox="0 0 8 8">
          <path
            d="M2 0c-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0 .55.23 1.04.59 1.41l3.41 3.41 3.41-3.41c.36-.36.59-.85.59-1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59z"
            fill="var(--bubble-color)" />
        </svg>
      </i>
    </div>
  </section>
</template>

<style scoped>
@media screen and (orientation: portrait) {
  section {
    --box-size: 60vw
  }
}

@media screen and (orientation:landscape) and (max-width:1440px) {
  section {
    --box-size: 350px
  }
}

@media screen and (orientation:landscape) and (min-width:1440px) {
  section {
    --box-size: 450px
  }
}

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
  font-family: open-iconic;
  position: absolute;
}

section .box {
  position: absolute;
  width: var(--box-size);
  height: var(--box-size);
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
  text-align: center;
  color: var(--color);
  font-size: 450%;
  z-index: 2;
}

section .bubbles i {
  position: absolute;
  /* */
  /* */
  animation: animate ease-out infinite;
  opacity: 0;
  color: var(--bubble-color);
}

section .bubbles i svg {
  position: absolute;
}

section.red .bubbles i::before {
  content: '';
  display: block;
  position: absolute;
  top: -1px;
  width: 100%;
  height: 100%;
  background: var(--bubble-color);
  border-radius: 50%;
  filter: blur(2px);
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
