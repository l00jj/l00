<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import gsap from "gsap";

//const props = defineProps<{}>();

const backgroundColor = `#000`;
const size = 100;
const amount = 30;
const stagger = -0.05;

const mainStyle = {
  "--size": `${size}px`,
  backgroundColor: `${backgroundColor}`,
};

const followerList = Array(amount).fill(0);
const followerElList: any[] = [];
const container = ref();

const onceEvent = (event: MouseEvent) => {
  // 断后
  toAnimation = () => {};

  // 更改入口
  const onComplete = () => {
    const containerEl = container.value as HTMLElement;
    containerEl.style.display = "inherit";

    toAnimation = (event: MouseEvent) => {
      gsap.to(followerElList, {
        x: event.offsetX,
        y: event.offsetY,
        stagger: stagger,
      });
    };
  };

  // 调整出现位置
  gsap.to(followerElList, {
    x: event.offsetX,
    y: event.offsetY,
    duration: 0,
    onComplete,
  });
};

let toAnimation = (event: MouseEvent) => {
  onceEvent(event);
};

const onMousemove = (event: MouseEvent) => {
  toAnimation(event);
};

onMounted(() => {});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle" @mousemove="onMousemove">
    <h1>Let Move Mouse</h1>
    <div class="container" ref="container" style="display: none">
      <span class="follower" v-for="item in followerList" :ref="(el) => followerElList.push(el)"></span>
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
  flex-direction: column;
  overflow: hidden;
}

.container {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  transform: translate(-50%, -50%);
}
span.follower {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(#00d0ff, #ff005e);
}

h1 {
  pointer-events: none;
  position: absolute;
  color: #333;
  font-size: 10em;
  white-space: nowrap;
}
</style>
