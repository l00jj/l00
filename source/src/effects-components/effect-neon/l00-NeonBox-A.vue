<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  neonSize?: number;
  neonPadding?: string;
}>();

const parameter = {
  neonSize: props.neonSize ? props.neonSize : 2,
  neonPadding: props.neonPadding ? props.neonPadding : `0.25em 1em`,
  duration: 2,
  neonColor: `#03e9f4`,
};

const mainStyle = {
  "--neonSize": `${parameter.neonSize}px`,
  "--neonPadding": `${parameter.neonPadding}`,
  "--neonColor": `${parameter.neonColor}`,
  "--delay": `${parameter.duration / 4}s`,
  "--duration": `${parameter.duration / 2}s`,
};
</script>

<template>
  <section :style="mainStyle">
    <a>
      <slot></slot>
      <span class="neon top"></span>
      <span class="neon bottom"></span>
      <span class="neon left"></span>
      <span class="neon right"></span>
    </a>
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
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

a {
  position: relative;
  z-index: 0;
  padding: var(--neonPadding);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 4rem;
  font-weight: 800;
  color: var(--neonColor);

  cursor: pointer;
  overflow: hidden;
}

section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  transition: var(--delay);
}

section:hover::before {
  background: var(--neonColor);
  box-shadow: 0 0 5px var(--neonColor), 0 0 25px var(--neonColor), 0 0 50px var(--neonColor), 0 0 200px var(--neonColor);
}

a span.neon.top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--neonSize);
  background: linear-gradient(90deg, transparent, var(--neonColor));
  animation: animateTop var(--duration) linear infinite;
}

@keyframes animateTop {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

a span.neon.right {
  position: absolute;
  top: -100%;
  right: 0;
  width: var(--neonSize);
  height: 100%;
  background: linear-gradient(180deg, transparent, var(--neonColor));
  animation: animateRight var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes animateRight {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}
a span.neon.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--neonSize);
  background: linear-gradient(-90deg, transparent, var(--neonColor));
  animation: animateBottom var(--duration) linear infinite;
}
@keyframes animateBottom {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

a span.neon.left {
  position: absolute;
  top: -100%;
  left: 0;
  width: var(--neonSize);
  height: 100%;
  background: linear-gradient(0deg, transparent, var(--neonColor));
  animation: animateLeft var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes animateLeft {
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
}
/* 
a {
  position: relative;
  z-index: 0;
  padding: 0.25em 1em;
  display: inline-block;
  text-decoration: none;
  font-size: 4rem;
  font-weight: 800;
  color: var(--neon-color);
  border: 0.125em solid var(--neon-color);
  border-radius: 0.25em;
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--neon-color);
  box-shadow: inset 0 0 0.5em 0 var(--neon-color), 0 0 0.5em 0 var(--neon-color);
  cursor: pointer;
}

a::before {
  content: "";
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: var(--neon-color);
  transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
  filter: blur(1em);
  opacity: 0.7;
}

a::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--neon-color);
  border: 0.1em solid var(--neon-color);
  z-index: -1;
  box-shadow: 0 0 2em 0.5em var(--neon-color);
  opacity: 0;
}

a:focus,
a:hover {
  color: var(--neonBg-color);
  text-shadow: none;
  animation: animateColor 0.5s ease 1;
}

@keyframes animateColor {
  0%,
  30% {
    color: var(--neon-color);
  }
  10%,
  100% {
    color: var(--neonBg-color);
  }
  20%,
  40% {
    color: var(--neon-color);
  }
}

a:focus::before,
a:hover::before,
a:focus::after,
a:hover::after {
  opacity: 1;
  animation: animate 0.5s ease 1;
}

@keyframes animate {
  0%,
  30% {
    opacity: 0.7;
  }
  10%,
  100% {
    opacity: 1;
  }
  20%,
  40% {
    opacity: 0.5;
  }
} */
</style>
