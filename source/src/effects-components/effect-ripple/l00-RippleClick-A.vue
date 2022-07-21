<script setup lang="ts">
import { ref, reactive, onUnmounted, watchEffect, WatchStopHandle, CSSProperties } from "vue";

class Emitter {
  _emitter_evnets_: Map<string | number | symbol, Set<(...input: any[]) => {}>> = new Map();
  on(key: string | number | symbol, fun: () => {}) {
    let evnets = this._emitter_evnets_.get(key);
    if (evnets) {
      evnets.add(fun);
    } else {
      evnets = new Set([fun]);
      this._emitter_evnets_.set(key, evnets);
    }
  }
  emit(key: string | number | symbol, ...input: any[]) {
    let evnets = this._emitter_evnets_.get(key);
    evnets &&
      evnets.forEach((evnet) => {
        try {
          evnet(...input);
        } catch (e) {
          console.error(e);
        }
      });
  }
}

const props = defineProps<{
  color?: string | [string, string];
}>();

const watcherStopHandles: WatchStopHandle[] = [];

onUnmounted(() => {
  watcherStopHandles.forEach((stopHandle) => stopHandle());
  watcherStopHandles.length = 0;
});

const button = {
  el: {},
  style: {
    display: "block",
    "--color": "",
  },
};

watcherStopHandles.push(
  watchEffect(() => {
    const color = props.color;
    const colorDefault = `linear-gradient(90deg,#0162c8,#55e7fc)`;
    button.style["--color"] = color
      ? typeof color === "string" && color[0] === "#"
        ? color
        : color[0] && color[1]
        ? `linear-gradient(90deg,${props.color[0]},${props.color[1]})`
        : colorDefault
      : colorDefault;
  })
);

class Ripple extends Emitter {
  id = Symbol();
  x: number;
  y: number;
  size: number;
  style: CSSProperties;
  onAnimationEnd = () => {};
  constructor(x = 0, y = 0, size = 0) {
    super();
    this.x = x;
    this.y = y;
    this.size = size;
    this.style = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      height: `${size}px`,
    };
  }
  changeSize(size: number) {}
  changePosition(x: number, y: number) {}
}

//symbol

const ripples = reactive(new Set() as Set<Ripple>);
/*
const onMouseenter = (e: MouseEvent) => {

};

const onMousemove = (e: MouseEvent) => {

};
 */
const onClick = (e: MouseEvent) => {
  const buttonEl = button.el as HTMLElement;
  const { clientX, clientY } = e;
  const { offsetHeight, offsetWidth } = buttonEl;
  const { top, left } = buttonEl.getBoundingClientRect();
  //
  const size = Math.ceil(Math.sqrt(offsetHeight ** 2 + offsetWidth ** 2));
  const x = Math.round(clientX - left);
  const y = Math.round(clientY - top);
  //
  const ripple = new Ripple(x, y, size);
  ripples.add(ripple);
  ripple.on("animationend", () => ripples.delete(ripple));
};
</script>

<template>
  <button @click="onClick" :ref="(el) => (button.el = (el as HTMLElement))" :style="button.style">
    <div
      class="ripple"
      v-for="ripple in ripples"
      :key="ripple.id"
      @animationend="() => ripple.emit('animationend')"
      :style="ripple.style"
    ></div>
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
  border-radius: 10em;
  color: #fff;
  background: var(--color);
  border: none;
  overflow: hidden;
  cursor: pointer;
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
  background: #fff;
  visibility: hidden;
  animation: animate 1s 1;
}

@keyframes animate {
  0% {
    visibility: visible;
    transform: translate(-50%, -50%) scale(0.00001);
    opacity: 0.5;
  }

  100% {
    visibility: visible;
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
</style>
