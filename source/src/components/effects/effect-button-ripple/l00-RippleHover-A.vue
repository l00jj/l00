<script setup lang="ts">
import { ref, reactive, onMounted, provide } from "vue";

const props = defineProps<{
  color?: string;
}>();

class Ripple {
  size = 0;
  left = 0;
  top = 0;
  style = {
    "--color": props.color ? props.color : "#2196f3",
    width: "0px",
    height: "0px",
    transform: "translate(0px,0px)",
  };
  constructor() {}
  changeSize(size: number) {
    this.style.width = `${size}px`;
    this.style.height = `${size}px`;
  }
  changePosition(x: number, y: number) {
    this.style.transform = `translate(${x}px,${y}px)`;
  }
}

const ripple = reactive(new Ripple());
const button = ref();

const onMouseenter = (e: MouseEvent) => {
  const buttonEl: HTMLElement = button.value as HTMLElement;
  const { offsetHeight, offsetWidth } = buttonEl;
  const size = Math.ceil(Math.sqrt(offsetHeight ** 2 + offsetWidth ** 2));
  ripple.changeSize(size);
};

const onMousemove = (e: MouseEvent) => {
  const buttonEl: HTMLElement = button.value as HTMLElement;
  const { clientX, clientY } = e;
  const { top, left } = buttonEl.getBoundingClientRect();
  //
  const x = Math.round(clientX - left);
  const y = Math.round(clientY - top);
  ripple.changePosition(x, y);
};
</script>

<template>
  <button @mousemove="onMousemove" @mouseenter="onMouseenter" ref="button">
    <div class="ripple" :style="ripple.style"></div>
    <div class="content"><slot></slot></div>
  </button>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  box-sizing: content-box;
  position: relative;
  padding: 2em 5em;
  border-radius: 5px;
  color: #fff;
  background: #363636;
  border: none;
  overflow: hidden;
  cursor: pointer
}

button > .ripple {
  position: absolute;
  top: 0;
  left: 0;
}

button > .content {
  position: relative;
}

button > .ripple::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: var(--color);
  transition: transform 0.5s ease-in;
  transform: translate(-50%, -50%) scale(0.00001);
}

button:hover > .ripple::before {
  transform: translate(-50%, -50%) scale(2);
}
</style>
