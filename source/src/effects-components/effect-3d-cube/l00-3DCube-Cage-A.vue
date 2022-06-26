<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle } from "vue";

const mainStyle = {};

const isPausedAnimation = ref(true);

const changeAnimationPlayState = () => (isPausedAnimation.value = !isPausedAnimation.value);

const createGridBackground = (width: number, height: number, strokeWidth: number, quantity: number) => {
  // 横向 多条竖状渐变
  const columns = Array(quantity)
    .fill(width / (quantity + 1))
    .map((val: number, index: number) => {
      const point = val * (index + 1);
      const offset = strokeWidth / 2;
      const head = point - offset;
      const end = point + offset;
      return `transparent ${head}px, #000 ${head}px, #000 ${end}px, transparent ${end}px`;
    });
  const columnsLinearGradient = `linear-gradient(90deg, ${columns.join(",")})`;
  // 纵向 多条横状渐变
  const rows = Array(quantity)
    .fill(height / (quantity + 1))
    .map((val: number, index: number) => {
      const point = val * (index + 1);
      const offset = strokeWidth / 2;
      const head = point - offset;
      const end = point + offset;
      return `transparent ${head}px, #000 ${head}px, #000 ${end}px, transparent ${end}px`;
    });
  const rowsLinearGradient = `linear-gradient(0deg, ${rows.join(",")})`;
  return `${columnsLinearGradient}, ${rowsLinearGradient}`;
};

class Plane {
  style = {
    width: "",
    height: "",
    backgroundImage: "",
    transform: "",
  };
  constructor(width: number, height: number, deg: number, translateZ: number) {
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
    this.style.transform = `rotateY(${deg}deg) translateZ(${translateZ}px)`;
  }
}

const planes = Array(4)
  .fill(90)
  .map((val, index) => {
    const rotateY = val * index;
    return [new Plane(400, 400, rotateY, 0), new Plane(400, 400, rotateY, 100), new Plane(400, 400, rotateY, 200)];
  })
  .flat();

const cubeStyle = reactive({
  "--size": `400px`,
  "--backgroundImage": createGridBackground(400, 400, 1, 8),
});
</script>

<template>
  <section v-bind="$attrs" class="background" :style="mainStyle">
 
    <div class="backgroundView">
      <div class="pattern pattern1"></div>
      <div class="pattern pattern2"></div>
    </div>


    <div id="cube" class="view" @click="changeAnimationPlayState" :style="cubeStyle">
      <div id="planes" class="rotate-animate" :class="{ 'paused-animation': !isPausedAnimation }">
      <div class="plane shadow"></div>
        <div class="plane around" v-for="plane of planes" :style="plane.style"></div>
        <div class="plane around content text" style="transform: rotateY(0deg) translateZ(160px)">
          <span>Welcome</span>
          <span>To </span>
          <span>l00 Studio</span>
        </div>
        <div class="plane around content img" style="transform: rotateY(180deg) translateZ(160px)">
          <img width="300" src="@src/assets/logo/logo.png" />
        </div>
      </div>
    </div>


    <div class="control">
      <button @click="changeAnimationPlayState" style="padding: 0.2em 1em">
        {{ isPausedAnimation ? "关闭旋转" : "开启旋转" }}
      </button>
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
  overflow: hidden;
}

section.background {
  background-color: #fff;
}
.control {
  position: absolute;
  transform: translate(0, -300px);
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#cube {
  --color: #ff308f;
  --color-light: #ff308f77;
  position: absolute;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
}

#cube.view {
  transform: rotateX(0deg);
  perspective: 1000px;
}

#cube > #planes {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 子元素将保留其 3D 位置。 */
  transform-style: preserve-3d;
}

#cube > #planes.rotate-animate {
  transform: rotateY(30deg);
  animation: animate 30s linear infinite;
}

#cube > #planes.paused-animation {
  animation-play-state: paused;
}

@keyframes animate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

#cube > #planes > .plane {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

#cube > #planes > .around {
  pointer-events: none;
  box-sizing: border-box;
  border: 2px solid #000;
    background-image: var(--backgroundImage);
}

#cube > #planes > .around.content {
  pointer-events: all;
  border: none;
}
#cube > #planes > .around.content.text {
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  font-weight: 900;
  gap: 0rem;
  background: none;
}

#cube > #planes > .around.content.img {
background: none;
}

#cube > #planes > .top {
  transform: rotateX(90deg) rotateZ(90deg) translateZ(calc(var(--size) / 2));
  background: rgba(0, 0, 0, 0.25);
}

#cube > #planes > .shadow {
  transform: translate3d(0, calc(var(--size) / 1.25), 0) rotateX(-90deg);
  background: rgba(0, 0, 0, 0.25);
  
   box-shadow: 0 0 120px rgba(0, 0, 0, 0.1), 0 0 200px rgba(0, 0, 0, 0.1), 0 0 200px rgba(0, 0, 0, 0.1),
    0 0 200px rgba(0, 0, 0, 0.1);
    filter: blur(15px);
}




.backgroundView {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
  perspective-origin: 50% 10px;
}

.pattern {
  position: relative;
  width: 100%;
  height: 70%;
}
.pattern.pattern1 {
  background: linear-gradient(#eee ,#fff);
  box-shadow: inset 0 -50px 200px rgba(255, 255, 255, 1);
}
.pattern.pattern2 {
  height: 100%;
  transform-origin: top;
  transform: rotateX(90deg);
  box-shadow: inset 0 50px 200px rgba(255, 255, 255, 1);
  background: linear-gradient( #fff,#eee);
}
</style>
