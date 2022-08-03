<script setup lang="ts">
import { ref, reactive, watchEffect, watch, onUnmounted, onMounted } from "vue";

// 鼠标组，控制开始、移动和结束
const onMousedown = () => onStart("mouse");
const onMouseup = () => {
  window.removeEventListener("mouseup", onMouseup);
  window.removeEventListener("mousemove", onMousemove);
};
const onMousemove = (event: MouseEvent) => {
  onMoving(event.clientX, event.clientY);
  event.preventDefault();
};

// 触屏组，控制开始、移动和结束
const onTouchstart = () => onStart("touch");
const onTouchend = () => {
  window.removeEventListener("touchend", onTouchend);
  window.removeEventListener("touchmove", onTouchmove);
};
const onTouchmove = (event: TouchEvent) => {
  const touch = event.touches[0];
  onMoving(touch.clientX, touch.clientY);
  event.preventDefault && event.preventDefault();
};

// 事件开始入口
const onStart = (flag: string) => {
  if (flag === "mouse") {
    window.addEventListener("mouseup", onMouseup);
    window.addEventListener("mousemove", onMousemove);
  }
  if (flag === "touch") {
    window.addEventListener("touchend", onTouchend);
    window.addEventListener("touchmove", onTouchmove, { passive: false });
  }
};

// 点击时间入口
const onClick = (event: MouseEvent) => {
  onMoving(event.clientX, event.clientY);
  event.preventDefault();
};

// 移动中的入口
const sliderRunway = ref();
let isTransverse = true; //是否横向
const onMoving = (x: number, y: number) => {
  const sliderRunwayEl: HTMLElement = sliderRunway.value as HTMLElement;
  const runwayClientRect = sliderRunwayEl.getBoundingClientRect();
  const position = isTransverse ? x : y;
  const head = isTransverse ? runwayClientRect.left : runwayClientRect.top;
  const distance = isTransverse ? runwayClientRect.width : runwayClientRect.height;
  const end = head + distance;
  const limit = position < head ? head : position > end ? end : position; //实际限定范围内的偏移值
  const offset = limit - head; //计算具体偏移0点距离
  //
  inputValue.updateRange(offset, distance);
};

// 数值控制
const inputValue = reactive({
  value: 0, //最终值，[min, max]
  step: 1, //步值，正常是设定值
  min: 0, //最小值，正常是设定值
  max: 100, //最大值，正常是设定值
  offset: 0, //滑块距离0点起始位置的偏移量，px
  length: 0, //滑块的长度，px
  updateRange(offset: number, length?: number) {
    this.offset = offset;
    this.length = typeof length === "number" ? length : this.length;
    let value = this.length ? (100 * this.offset) / this.length : 0; //偏离的值，此处是百分比
    value = value - (value % this.step); //计入步值
    this.value = value;
  },
  updateValue(value: number, min?: number, max?: number) {
    this.value = value;
    this.min = typeof min === "number" ? min : this.min;
    this.max = typeof max === "number" ? max : this.max;
    this.offset = this.length ? ((this.value - this.min) * this.length) / this.max : 0; //偏离的百分比
  },
});

// 显示
const sliderButton = ref<HTMLElement>();
const sliderBar = ref<HTMLElement>();
watchEffect(() => {
  const sliderButtonDom = sliderButton.value;
  const sliderBarDom = sliderBar.value;
  if (!sliderButtonDom || !sliderBarDom) return;
  //
  sliderButtonDom.style.transform = `translateX(${inputValue.offset}px)`;
  sliderBarDom.style.width = `${inputValue.value}%`;
});
const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  inputValue.updateValue(parseInt(value));
};
</script>

<template>
  <section class="background">
    <div class="form">
      <div class="form-item">
        <!-- Input -->
        <div style="width: 400px">
          <div class="slider">
            <div class="runway" ref="sliderRunway" @click.self="onClick">
              <div class="bar" ref="sliderBar"></div>
              <div class="surface"></div>
              <div class="button" ref="sliderButton" @touchstart="onTouchstart" @mousedown="onMousedown"></div>
            </div>
          </div>
        </div>
        <!-- Label -->
        <input class="rangeValue" :value="inputValue.value" @change="onChange" />
      </div>
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #edf1f4;
}
.form {
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 60px;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff;
}
.form-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
<style scoped>
.rangeValue {
  position: relative;
  height: 30px;
  width: 60px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  background: #38a7ff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff, inset 5px 5px 10px rgba(0, 0, 0, 0.1),
    inset -5px -5px 5px rgba(255, 255, 255, 0.25);
}
input.rangeValue:focus-visible,
input.rangeValue:active {
  outline: none;
}
</style>
<style scoped>
.slider {
  --sliderColor: #38a7ff;
  --borderRadius: 14px;
  --sliderButtonSize: 18px;
  cursor: pointer;
  appearance: none;
  outline: none;
  width: 100%;
  height: 14px;
  padding: 0 calc(var(--sliderButtonSize) / 2);
}
.slider .runway {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--borderRadius);
  background: #edf1f4;
}
.slider .runway .bar {
  pointer-events: none;
  position: absolute;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: var(--borderRadius);
  background: var(--sliderColor);
}
.slider .runway .surface {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--borderRadius);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff, inset 5px 5px 5px rgba(0, 0, 0, 0.1);
}
.slider .runway .button {
  cursor: grab;
  position: absolute;
  left: 0;
  width: var(--sliderButtonSize);
  height: var(--sliderButtonSize);
  transform: translateX(0px);
}
.slider .runway .button:active {
  cursor: grabbing;
}
.slider .runway .button::before {
  content: "";
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  border: 2px solid var(--sliderColor);
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);
  transition: 0.5s;
}
.slider .runway .button:hover::before {
  transform: translateX(-50%) scale(1.3);
}
</style>
