<script setup lang="ts">
import { ref } from "vue";

const isAnimation = ref(false);

</script>

<template>
  <section>
    <div class="wrap">
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </section>
  <svg>
    <filter id="wavy">
      <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
        <animate attributeName="baseFrequency" dur="60s" values="0.02;0.005;0.02" repeatCount="indexfinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
    </filter>
  </svg>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000;
}

section .wrap {
  display: flex;
}

section .circle {
  position: relative;
  width: 600px;
  height: 600px;
  filter: url(#wavy) blur(1px);
}

section .circle:before {
  content: '';
  position: absolute;
  top: 100px;
  bottom: 100px;
  left: 100px;
  right: 100px;
  border: 20px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 50px #0f0, inset 0 0 50px #0f0;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0002);
  animation: animate 5s linear infinite;
}

section .circle:after {
  content: '';
  position: absolute;
  top: 100px;
  bottom: 100px;
  left: 100px;
  right: 100px;
  border: 20px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, inset 0 0 10px #fff;
}

section .circle:nth-child(2):before {
  animation-duration: 2.5s;
}

@keyframes animate {
  0% {
    box-shadow: 0 0 50px #0f0, inset 0 0 50px #0f0;
    filter: hue-rotate(0deg);
  }

  40% {
    box-shadow: 0 0 60px #0f0, inset 0 0 60px #0f0;
  }

  60% {
    box-shadow: 0 0 80px #0f0, inset 0 0 80px #0f0;
  }

  80% {
    box-shadow: 0 0 100px #0f0, inset 0 0 100px #0f0;
  }

  100% {
    box-shadow: 0 0 50px #0f0, inset 0 0 50px #0f0;
    filter: hue-rotate(360deg);
  }
}
</style>
