<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import gsap from "gsap";

//const props = defineProps<{}>();

const backgroundColor = `#000`;
const amount = 50;
const rotate = -15;
const rotateStart = 10;
const stagger = -0.01;

const mainStyle = {
  backgroundColor: `${backgroundColor}`,
};

const followerList = Array(amount)
  .fill(rotate / (amount - 1))
  .map((val, index) => ({
    style: `--i:${index};--rotate:${rotateStart + val * (amount - 1 - index)}deg;`,
  }));
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
      <div class="follower" v-for="item in followerList" :ref="(el) => followerElList.push(el)">
        <p :style="item.style">wel<span>co</span>me</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Poppins";
  src: url("@src/assets/fonts/Poppins/Poppins-Regular.ttf");
}
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
  transform: translate(-50%, -50%);
}
.follower {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.follower p {
  color: #fff;
  font-size: 8rem;
  font-weight: 900;
  white-space: nowrap;
  text-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.1);
  text-transform: lowercase;
  transform: translate(-50%, -50%) rotate(var(--rotate));
}
.follower p span {
  color: #f00;
}

h1 {
  pointer-events: none;
  position: absolute;
  color: #333;
  font-size: 10em;
}
</style>
