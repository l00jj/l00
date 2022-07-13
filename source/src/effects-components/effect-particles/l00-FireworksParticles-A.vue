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

class Particle {
  id = Symbol();
  style = {
    top: "",
    left: "",
    width: "",
    height: "",
    "--rotate": "0deg",
  };
  constructor(x: number, y: number) {
    this.disappearDelay(2);
    this.style.top = `${y}px`;
    this.style.left = `${x}px`;
    const randomSize = Math.random() * 8;
    this.style.width = `${2 + randomSize}px`;
    this.style.height = `${2 + randomSize}px`;
    const rotateDeg = Math.random() * 360;
    this.style["--rotate"] = `${rotateDeg}deg`;
  }
  disappearDelay(s: number) {
    setTimeout(() => list.delete(this), s * 1000);
  }
}

const list = reactive(new Set<Particle>());

const onMove = (x: number, y: number) => {
  //console.log(x, y);
  list.add(new Particle(x, y));
};
console.log(list);
const onMousemove = (event: MouseEvent) => {
  onMove(event.offsetX, event.offsetY);
};
</script>

<template>
  <section class="background">
    <div class="container" @mousemove="onMousemove">
      <TransitionGroup name="fade">
        <span class="particle" v-for="item in list" :style="item.style" :key="item.id"></span>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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
  background: #111;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.particle {
  pointer-events: none;
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  transform: translate(-50%, -50%) rotate(var(--rotate));
}
.particle::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
  animation: moveParticles 2s linear infinite;
}
@keyframes moveParticles {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(50vmin);
  }
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
