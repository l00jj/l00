<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import Preview from "./Preview.vue";

const preview = reactive({
  test: true,
});

type HandleCustomTransformFunction = (a: number, b: number) => { top: number; left: number };
class Handle {
  el = window.document.createElement("i");
  top = 0;
  left = 0;
  sytle = "";
  transform: HandleCustomTransformFunction;
  constructor(transform: HandleCustomTransformFunction) {
    this.transform = transform;
    this.computedRandom();
  }
  static fix(n: number) {
    return n < 0 ? 0 : n > 100 ? 100 : Math.round(n);
  }
  onMove(x: number, y: number) {
    const target = this.el;
    const frameEl = frame.value as HTMLElement;
    const { top, left } = frameEl.getBoundingClientRect();
    const { clientWidth, clientHeight } = frameEl;
    const mix = (spot: number, bound: number, client: number) => (100 * (spot - bound)) / client;
    const theTop = Handle.fix(mix(y, top, clientHeight));
    const theLeft = Handle.fix(mix(x, left, clientWidth));
    //console.log("theTop",theTop, "theLeft",theLeft,"x", x, "y", y, "top", top, "left", left);
    this.toMove(theTop, theLeft);
  }
  computedRandom() {
    const random = () => 10 + Math.random() * 80;
    this.toMove(Handle.fix(random()), Handle.fix(random()));
  }
  toMove(top: number, left: number) {
    const transform = this.transform(top, left);
    this.top = transform.top;
    this.left = transform.left;
    this.computedSytle();
  }
  computedSytle() {
    this.sytle = `top:${this.top}%;left:${this.left}%;`;
  }
}

const handleList = reactive([
  new Handle((top: number, left: number) => ({ top: 0, left })),
  new Handle((top: number, left: number) => ({ top, left: 100 })),
  new Handle((top: number, left: number) => ({ top: 100, left })),
  new Handle((top: number, left: number) => ({ top, left: 0 })),
]);

let currentHandle: Handle | null;
let isDrag = false;
const frame = ref();
const blobParameter = reactive({ a1: 0, a2: 0, a3: 0, a4: 0, b1: 0, b2: 0, b3: 0, b4: 0 });

watchEffect(() => {
  if ((handleList.length = 4)) {
    blobParameter.a1 = handleList[0].left;
    blobParameter.a2 = 100 - handleList[0].left;
    blobParameter.a3 = 100 - handleList[2].left;
    blobParameter.a4 = handleList[2].left;
    blobParameter.b1 = handleList[3].top;
    blobParameter.b2 = handleList[1].top;
    blobParameter.b3 = 100 - handleList[1].top;
    blobParameter.b4 = 100 - handleList[3].top;
  }
});

const blobBorderRadius = computed(() => {
  const { a1, a2, a3, a4, b1, b2, b3, b4 } = blobParameter;
  return `${a1}% ${a2}% ${a3}% ${a4}% / ${b1}% ${b2}% ${b3}% ${b4}%`;
});

const blobBorderRadiusStyle = computed(() => `border-radius: ${blobBorderRadius.value};`);

const handlesRandom = () => handleList.forEach((handle) => handle.computedRandom());

/**
 * 控制环节
 */
const onDown = (handle: Handle) => {
  isDrag = true;
  currentHandle = handle;
  window.document.body.addEventListener("mousemove", onMove);
};

const onUp = (e: MouseEvent) => {
  if (!isDrag) return;
  isDrag = false;
  currentHandle = null;
  window.document.body.removeEventListener("mousemove", onMove);
};

const onMove = (e: MouseEvent) => {
  if (currentHandle && isDrag) currentHandle.onMove(e.clientX, e.clientY);
  window.getSelection()!.empty(); //取消文字选择
};

/**
 * 安装监听
 */
onMounted(() => {
  window.document.body.addEventListener("mouseup", onUp);
});

/**
 * 移除监听
 */
onUnmounted(() => {
  window.document.body.removeEventListener("mouseup", onUp);
  window.document.body.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <Preview>
    <template #title>CSS Blob 生成器</template>

    <template #introduce>
      采用CSS的 border-radius 样式进行形状生成。公式（单位%）： a1 a2 a3 a4 / b1 b2 b3 b4
    </template>

    <template #preview>
      <div class="frame" ref="frame">
        <div class="blob" :style="{ 'border-radius': blobBorderRadius }"></div>
        <span
          class="handle"
          v-for="handle in handleList"
          :style="handle.sytle"
          :ref="(el)=>handle.el = (el as HTMLElement)"
          @mousedown="onDown(handle)"
        ></span>

        <div class="test">
          <div class="content" style="top: -2em; left: 0; width: 100%">
            <span :style="{ width: `${blobParameter.a1}%` }">a1</span>
            <span :style="{ width: `${blobParameter.a2}%` }">a2</span>
          </div>
          <div class="content" style="top: 0; right: -2em; height: 100%; flex-direction: column">
            <span :style="{ height: `${blobParameter.b2}%` }">b2</span>
            <span :style="{ height: `${blobParameter.b3}%` }">b3</span>
          </div>
          <div class="content" style="bottom: -2em; left: 0; width: 100%">
            <span :style="{ width: `${blobParameter.a4}%` }">a4</span>
            <span :style="{ width: `${blobParameter.a3}%` }">a3</span>
          </div>
          <div class="content" style="top: 0; left: -2em; height: 100%; flex-direction: column">
            <span :style="{ height: `${blobParameter.b1}%` }">b1</span>
            <span :style="{ height: `${blobParameter.b4}%` }">b4</span>
          </div>
        </div>
      </div>
    </template>

    <template #console>
      <div class="handles">
        <div class="handle-item">
          <el-button plain style="width: 100%; height: 3em; background: transparent" @click="handlesRandom"
            >随机新生成</el-button
          >
        </div>

        <div class="handle-item">
          <span class="label">Result</span>
          <el-input
            v-model="blobBorderRadiusStyle"
            input-style="background: transparent"
            :rows="2"
            :readonly="true"
            type="textarea"
            resize="none"
            placeholder="Please input"
          />
        </div>
      </div>
    </template>
  </Preview>
</template>

<style scoped>
.frame {
  --size: 420px;
  --handleSize: 12px;
  position: relative;
  width: var(--size);
  height: var(--size);
  border: 2px dashed #ddd;
}
.frame .handle {
  position: absolute;
  width: var(--handleSize);
  height: var(--handleSize);
  background: #fff;
  cursor: pointer;
  border: calc(var(--handleSize) / 3) solid #000;
  transform: translate(-50%, -50%);
  transition: border 500ms, opacity 500ms;
  opacity: 0.2;
}

.frame .handle:hover,
.frame .handle:active {
  border-width: calc(var(--handleSize) / 2);
}
.frame .handle:active {
  opacity: 1;
  background: transparent;
}

.frame .blob {
  width: var(--size);
  height: var(--size);
  border-radius: 29% 71% 46% 54% / 75% 52% 48% 25%;
  background: linear-gradient(rgb(254, 0, 242), rgb(251, 2, 128));
}

.handles {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}
.handle-item {
  position: relative;
  display: flex;
  /*  align-items: center; */
}
.handle-item:not(:last-child) {
  margin-bottom: 2em;
}

.handle-item .label {
  width: 20em;
  line-height: 1.8em;
}

/**
*
*
*
*
*
*
 */
.test .content {
  position: absolute;
  display: flex;
}
.test .content span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
  white-space: nowrap;
  transition: color 500ms;
}
.test .content span:hover {
  color: #333;
}
</style>
