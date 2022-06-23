<script setup lang="ts">
import { ref, reactive, computed, onMounted, VueElement } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const text = ref("Welcome To l00 Watch This Effect Text Climbing Stairs !");

// 参数
//const vStairsOffsetRight = ref(0); // 总体偏移 left
//const vStairsOffsetTop = ref(0); // 总体偏移 top

const vStairsLength = ref(9);

const vStairsHeight = ref(120); //阶梯的高度
const vMLStairsWidth = ref(40); //中间截图的宽度，对应的是一阶的高度
const vMLStairsHeight = vStairsHeight;

const vMRStairsWidth = ref(80); //中间截图的宽度，对应的是一阶的宽度
const vMRStairsHeight = vStairsHeight;

// 元素
const initialtextbox = ref();
const background = ref();
const container = ref();

const stairs = Array(vStairsLength.value)
  .fill(0)
  .map((val, index) =>
    reactive({
      id: index,
      class: index % 2 ? "stepPortrait" : "stepTransverse",
      values: {} as any,
      style: {} as any,
      element: null as unknown as HTMLElement,
    })
  );

// 属性
const containerStyle = reactive({});

const resize = () => {
  // 属性值汇总
  const containerEl = container.value as HTMLElement;
  const containerWidth = containerEl.offsetWidth;
  const containerHeight = containerEl.offsetHeight;
  const stairsLength = vStairsLength.value; //全部层数
  const mlStairsWidth = vMLStairsWidth.value;
  const mrStairsWidth = vMRStairsWidth.value;
  const mStairsLength = stairsLength - 2; //中间层数
  const mlStairsLength = Math.ceil(mStairsLength / 2); //阶级高度层数
  const mrStairsLength = Math.floor(mStairsLength / 2); //阶级宽度层数

  // 计算偏移
  const stairsOffsetTop = -Math.floor(containerHeight * 0.1);
  const stairsOffsetRight = Math.floor(containerWidth * 0.05);

  // 计算两端
  // 如有修改需要可以通过计算得出前后入口出口的具体长度
  const stairStartEndWidth = (containerWidth  - mrStairsLength * mrStairsWidth) / 2;
  const stairStartWidth = stairStartEndWidth;
  const stairEndWidth = stairStartEndWidth;
  console.log(stairStartEndWidth)

  const totalWidth = stairStartWidth + stairEndWidth + mrStairsLength * mrStairsWidth;
  const totalHeight = mlStairsLength * mlStairsWidth;
  const headStartRight = (containerWidth - totalWidth) / 2 + stairsOffsetRight; // 阶梯开始位置 left
  const headStartTop = (containerHeight - totalHeight) / 2 + stairsOffsetTop; // 阶梯开始位置 top

  // 计算文字滑动的距离
  const textboxAnimationDuration = 12;
  const textboxWidth = initialtextbox.value.offsetWidth;
  const textboxLeft_start = Math.max(stairStartWidth, stairEndWidth, mlStairsWidth, mrStairsWidth); //这里需要计算的是最开始一块的长度
  const textboxLeft_end = -textboxWidth;
  Object.assign(containerStyle, {
    "--textboxAnimationDuration": `${textboxAnimationDuration}s`,
    "--textboxLeft_start": `${textboxLeft_start}px`,
    "--textboxLeft_end": `${textboxLeft_end}px`,
  });

  // 计算文字滑动速度计算延迟
  const animationDistance = Math.abs(textboxLeft_end - textboxLeft_start);
  const animationSpeed = animationDistance / textboxAnimationDuration;

  // 计算中间层级
  let sumRight = 0;
  let sumTop = 0;
  let sumDistance = 0;
  let sumDelay = 0;
  for (let stair of stairs) {
    if (stair.id === 0 || stair.id === stairs.length - 1) {
      if (stair.id === 0) {
        //
        stair.values.width = stairStartWidth;
        stair.values.height = vStairsHeight.value;
        stair.values.top = headStartTop + totalHeight;
        stair.values.right = headStartRight;
        stair.values.delay = (stair.values.width - textboxLeft_start) / animationSpeed;
        //
        sumRight += stair.values.right + stair.values.width;
        sumTop += stair.values.top;
        sumDistance += stair.values.width;
      } else {
        stair.values.width = stairEndWidth;
        stair.values.height = vStairsHeight.value;
        stair.values.top = headStartTop;
        stair.values.right = headStartRight + (totalWidth - stairEndWidth);
        stair.values.delay = (sumDistance - textboxLeft_start + stair.values.width) / animationSpeed;
      }
    } else {
      if (stair.id % 2) {
        //
        stair.values.width = mlStairsWidth;
        stair.values.height = vMLStairsHeight.value;
        stair.values.top = sumTop - stair.values.width / 2;
        stair.values.right = sumRight - stair.values.width / 2;
        //
        sumTop -= stair.values.width;
        sumRight -= stair.values.width;
      } else {
        //
        stair.values.width = mrStairsWidth;
        stair.values.height = vMRStairsHeight.value;
        stair.values.top = sumTop;
        stair.values.right = sumRight + stair.values.width / 2;
        //
        sumTop -= 0;
        sumRight += stair.values.width * 1.5;
      }
      //
      stair.values.delay = (sumDistance - textboxLeft_start + stair.values.width) / animationSpeed;
      sumDistance += stair.values.width;
    }
    //
    stair.style.width = `${stair.values.width}px`;
    stair.style.height = `${stair.values.height}px`;
    stair.style.top = `${stair.values.top}px`;
    stair.style.right = `${stair.values.right}px`;
    if (stair.values.delay) stair.style["--delay"] = `${stair.values.delay}s`;
  }
};

onMounted(() => {
  resize();
});
</script>

<template>
  <section class="background" ref="background">
    <div class="container" ref="container" :style="containerStyle">
      <div
        class="step"
        v-for="(item, index) in stairs"
        :class="item.class"
        :ref="(el)=>(stairs[index].element = el as HTMLElement)"
        :style="item.style"
      >
        <span class="textbox">{{ text }}</span>
      </div>
    </div>
    <span class="initialtextbox" ref="initialtextbox">{{ text }}</span>
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

.background {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}
.container {
  position: relative;
  /* width: 100%;
  height: 100%; */
  width: 720px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  overflow: hidden;
  perspective: 800px;
  perspective-origin: 150% -150%;
  background-image: linear-gradient(190deg, #def, #9ab 53%, #789 53%, #456);
}

.step {
  position: absolute;
  overflow: hidden;
  border-radius: solid rgb(136, 135, 135);
  border-width: 1px 0;
}

.stepTransverse {
  color: #0672ff;
  background-color: #fff;
  transform: rotateX(90deg);
}

.stepPortrait {
  color: #fd1a03;
  background-color: #bcd;
  transform: rotateX(90deg) rotateY(90deg);
}

.initialtextbox,
.step .textbox {
  position: absolute;
  left: var(--textboxLeft_start);
  top: 12px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 60px;
  white-space: nowrap;
  animation: textClimb 12s linear infinite;
  animation-delay: var(--delay);
}

@keyframes textClimb {
  from {
    left: var(--textboxLeft_start);
  }
  to {
    left: var(--textboxLeft_end);
  }
}

.initialtextbox {
  position: absolute;
  top: auto;
  left: auto;
  visibility: hidden;
  animation: none;
}
</style>
