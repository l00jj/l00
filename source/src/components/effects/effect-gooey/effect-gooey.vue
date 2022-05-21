<script setup lang="ts">
import { ref } from "vue";

const isAnimation = ref(false);

const changeAnimation = () => (isAnimation.value = !isAnimation.value);

const vDraggable = (() => {
  const deployDragger = (el: HTMLElement) => {
    let x: number, y: number, elX: number, elY: number;
    let isDrop = false;

    const onDragStart = (event: DragEvent) => {
      //console.log(event)
      const target: HTMLElement = event.target as HTMLElement;
      x = event.clientX;
      y = event.clientY;
      target.style.left.match(/\d*/);
      elX = parseInt(target.style.left.match(/\d*/)![0]);
      elX = elX ? elX : 0;
      elY = parseInt(target.style.top.match(/\d*/)![0]);
      elY = elY ? elY : 0;
      isDrop = true;
    };

    const onDrag = (event: DragEvent) => {
      if (!isDrop) return;
      isDrop = false;
      setTimeout(() => (isDrop = true), 300);
      const { clientX, clientY } = event;
      const target: HTMLElement = event.target as HTMLElement;
      //console.log(clientX - x, clientY - y)
      target.style.left = `${elX + clientX - x}px`;
      target.style.top = `${elY + clientY - y}px`;
    };

    el.draggable = true;
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("drag", onDrag);
    el.addEventListener("dragover", (e) => e.preventDefault()); //防止drag最后一下的位置偏移
  };

  return {
    created(el: HTMLElement) {
      deployDragger(el);
    },
  };
})();
</script>

<template>
  <div class="background">
    <section>
      <div class="container">
        <div :class="`circle circle1 ${isAnimation ? 'animation' : ''}`" style="top: 30px; left: 30px" v-draggable
          @click="changeAnimation"></div>
        <div :class="`circle circle2 ${isAnimation ? 'animation' : ''}`" style="top: 30px; left: 180px" v-draggable
          @click="changeAnimation"></div>
      </div>
    </section>
    <svg>
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        <feColorMatrix type="matrix" values="
      1 0 0 0 0
      0 1 0 0 0 
      0 0 1 0 0 
      0 0 0 20 -10 " />
      </filter>
    </svg>
  </div>
</template>

<style scoped>
.background {
  background: #042104;
}

section {
  display: inherit;
}

section * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  height: 100vh;
  filter: url(#blurMe);
}

svg {
  display: none;
}

.container .circle {
  background: red;
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
}

.container .animation {
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.container .circle1 {
  background: linear-gradient(90deg, #f00, #0ff);
}

.container .circle2 {
  background: linear-gradient(90deg, #ffeb3b, #da00ff);
}
</style>
