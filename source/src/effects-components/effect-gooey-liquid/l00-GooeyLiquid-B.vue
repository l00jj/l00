<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { froundFix, createID } from "@src/utils/Tools";
import { EventEmitter } from "@src/utils/EventEmitter";

//const props = defineProps<{}>();

// 元素
const container = ref();
const textbox = ref();

// 参数
const uuid = createID();
const text = ref("Welcome to l00 Gooey Liquid Effect");
const globalParameter = reactive({
  svg: {
    filter: {
      id: `filter_${uuid}`,
      useID: `url(#filter_${uuid})`,
    },
  },
  quantity: 30,
  containerWidth: 0,
  containerHeight: 0,
  physics: {
    slowZone: [] as number[][],
  },
});

const containerStyle = ref(`--useFilter:${globalParameter.svg.filter.useID};`);

const physicsBlocks: any[] = [];
const list: Set<LiquidDrop> = reactive(new Set());

class LiquidDrop {
  parameter = {
    sizeRatio: 0,
    positionXRatio: 0,
    baseSize: 50,
    size: 0,
    baseOffset: 0,
    positionX: 0,
    positionY: 0,
  };
  style = {
    width: "0px",
    height: "0px",
    transform: "",
  };
  physics = {
    constantSpeed: 0, //以总高作为计算，在resize中算出
    speed: 0,
    gravity: 9,
  };

  constructor() {
    this.init(true);
  }
  //
  init(random?: boolean) {
    this.random();
    this.setSize();
    this.setPosition();
    this.setSizeStyle();
    this.resize();
    if (random) {
      this.initRandomPositionY();
    }
  }

  //
  random() {
    this.parameter.sizeRatio = Math.random();
    this.parameter.positionXRatio = Math.random();
  }
  setSize() {
    const { baseSize } = this.parameter;
    const size = Math.trunc(baseSize + this.parameter.sizeRatio * baseSize * 2);
    this.parameter.size = size;
  }
  setPosition() {
    const baseOffset = -this.parameter.size / 2;
    this.parameter.baseOffset = baseOffset;
    this.parameter.positionX = 0 + baseOffset;
    this.parameter.positionY = 0;
  }
  setSizeStyle() {
    this.style["width"] = `${this.parameter.size}px`;
    this.style["height"] = `${this.parameter.size}px`;
  }
  resize() {
    const totalWidth = globalParameter.containerWidth;
    const containerHeight = globalParameter.containerHeight;
    const randomPositionX = froundFix(totalWidth * this.parameter.positionXRatio, 2);
    this.parameter.positionX = this.parameter.baseOffset + randomPositionX;
    // 按高度计算物理量，使得动画速率在不同设备速率恒定
    const constantSpeed = Math.trunc(containerHeight / 15);
    this.physics.constantSpeed = constantSpeed > 0 ? constantSpeed : 10;
    const gravity = Math.trunc(containerHeight * 1.3);
    this.physics.gravity = gravity > 0 ? gravity : 1;
    this.physics.speed = 0;
  }

  checkInSlowZone(points: number[][]) {
    const slowZone = globalParameter.physics.slowZone;

    // 判断两个区间是否相交
    const isIntersect = (arr1: number[], arr2: number[]) => {
      let start = [Math.min(...arr1), Math.min(...arr2)]; //区间的两个最小值
      let end = [Math.max(...arr1), Math.max(...arr2)]; //区间的两个最大值
      return Math.max(...start) <= Math.min(...end); //最大值里的最小值 是否 小于等于 最大值的最小值
    };

    for (let zone of slowZone) {
      const X = isIntersect([zone[0], zone[2]], [points[0][0], points[1][0]]);
      const Y = isIntersect([zone[1], zone[3]], [points[0][1], points[1][1]]);
      if (X && Y) return true;
    }
    return false;
  }
  //
  update(time: Time) {
    const { parameter, physics } = this;
    const { size, baseOffset, positionX, positionY } = this.parameter;
    const { delta: msDelta } = time;
    const delta = msDelta / 1000;

    //计算速度
    const corePositionX = positionX - baseOffset;
    const isInSlowZone = this.checkInSlowZone([
      [corePositionX, positionY + baseOffset * 2],
      [corePositionX, positionY],
    ]); // 顶和底

    if (isInSlowZone) {
      physics.speed = physics.speed - ((physics.speed - physics.constantSpeed) * delta * 20) / 2;
    } else {
      physics.speed += physics.gravity * delta;
    }

    const move = physics.speed * delta;
    parameter.positionY += move;
    // 到底重置
    if (parameter.positionY > globalParameter.containerHeight + size) {
      this.init();
    }
    this.style.transform = `translate(${positionX}px,${parameter.positionY}px)`;
  }
  initRandomPositionY() {
    const positionY = Math.round(Math.random() * globalParameter.containerHeight);
    this.parameter.positionY = positionY;
  }
}

const createElement = () => {
  for (let i = 0; i < globalParameter.quantity; i++) {
    const liquidDrop = new LiquidDrop();
    list.add(liquidDrop);
  }
};

const onAnyResize = () => {
  const containerEl = container.value as HTMLElement;
  const containerWidth = containerEl.offsetWidth;
  const containerHeight = containerEl.offsetHeight;
  globalParameter.containerWidth = containerWidth;
  globalParameter.containerHeight = containerHeight;
  // 计算减速区
  physicsBlocks.forEach((block: HTMLElement) => {
    const topleftX = block.offsetLeft;
    const topleftY = block.offsetTop;
    const bottomrightX = block.offsetLeft + block.offsetWidth;
    const bottomrightY = block.offsetTop + block.offsetHeight;
    globalParameter.physics.slowZone.push([topleftX, topleftY, bottomrightX, bottomrightY]);
  });
  //console.log(globalParameter.physics.slowZone);
};

// 更新坐标
class Time extends EventEmitter {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
  }

  onTickLoopFunction = () => {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("tick");

    window.requestAnimationFrame(this.currentTickLoopFunction);
  };

  // 当清除时，函数为空函数已终结 requestAnimationFrame
  currentTickLoopFunction = () => {};

  // Tick
  tick() {
    //避免重复启动 currentTickLoopFunction
    if (this.currentTickLoopFunction !== this.onTickLoopFunction) {
      this.currentTickLoopFunction = this.onTickLoopFunction;
      this.currentTickLoopFunction();
    }
  }

  onTick(fun: Function) {
    return this.on("tick", fun);
  }

  destroy() {
    this.currentTickLoopFunction = () => {};
    return this.clearEvents();
  }
}

const time = new Time();
time.onTick(() => {
  list.forEach((item) => item.update(time));
});

const resizeObserver = new ResizeObserver((entries) => {
  onAnyResize();
  list.forEach((item) => item.init(true));
});

//
onMounted(() => {
  onAnyResize();
  createElement();
  time.tick();
  resizeObserver.observe(container.value);
  resizeObserver.observe(textbox.value);
});

onUnmounted(() => {
  time.destroy();
  resizeObserver.disconnect();
});
</script>

<template>
  <section class="background">
    <div class="container" ref="container" :style="containerStyle">
      <div class="physics-block" style="top: 0" :ref="(el) => physicsBlocks.push(el)"></div>
      <div class="physics-block" style="bottom: 0" :ref="(el) => physicsBlocks.push(el)"></div>
      <div class="text" physics :ref="(el) => physicsBlocks.push(el)">
        <span>{{ text }}</span>
      </div>
      <div class="drops">
        <span v-for="item in list" :style="item.style"></span>
      </div>
    </div>
    <div class="physics-block" style="top: 0"></div>
    <div class="physics-block" style="bottom: 0"></div>
    <div class="text" ref="textbox">
      <span>{{ text }}</span>
    </div>
  </section>
  <svg>
    <filter :id="globalParameter.svg.filter.id">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
      <feColorMatrix
        type="matrix"
        values="
      1 0 0 0 0
      0 1 0 0 0 
      0 0 1 0 0 
      0 0 0 30 -15"
      />
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}

svg {
  display: none;
}

section.background {
  background: linear-gradient(0deg, #bdbdbd, #ffffff);
}

.container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: var(--useFilter);
}

.text {
  position: absolute;
  padding: 0.5rem 3.5rem;
  border-radius: 1rem;
  background: #000;
}
.text span {
  color: #fff;
  font-size: 3.5rem;
  font-weight: 900;
}

.text[physics] span {
  color: #000;
}

.physics-block {
  position: absolute;
  width: 100%;
  height: 8%;
  display: block;
  /* border-top: 1px solid red; */
  /* border-bottom: 1px solid red; */
  /* background: transparent; */
  background: #000;
}
.drops {
  position: absolute;
  top: 0;
  left: 0;
}
.drops span {
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  background: #000;
  /* background: red; */
  border-radius: 50%;
}
</style>
