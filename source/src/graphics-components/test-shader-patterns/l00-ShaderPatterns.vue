<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted, onUnmounted } from "vue";
import { default as patternsList, CustomShader } from "./patternsList";

import View from "./View/index";
import updateMaterial from "./updateMaterial";
//
//const props = defineProps<{}>();

console.log(patternsList);
const toUpdateMaterial = (customShader: CustomShader) => {
  const { fragment, vertex } = customShader;
  const input: any = {};
  if (fragment) input.fragmentShader = fragment;
  if (vertex) input.vertexShader = vertex;
  updateMaterial(view, input);
};

const isCover = ref(false);
const currentCameraOption: any = {};
const stopWatch = watch(isCover, () => {
  const camera = view.camera;
  if (isCover.value) {
    // 复制现有参数
    if (camera.controls.enabled) {
      currentCameraOption.fov = camera.instance.fov;
      currentCameraOption.position = camera.instance.position.clone();
    }
    // 转为正面
    camera.controls.enabled = false;
    camera.controls.enableDamping = false;
    camera.instance.fov = 90;
    camera.instance.updateProjectionMatrix();
    window.requestAnimationFrame(() => {
      camera.instance.position.set(0, 0, 1);
      camera.instance.lookAt(0, 0, 0);
    });
  } else {
    camera.controls.enableDamping = true;
    camera.controls.enabled = true;
    camera.instance.fov = currentCameraOption.fov;
    camera.instance.position.copy(currentCameraOption.position);
    camera.instance.updateProjectionMatrix();
  }
});

/**
 * 截图功能
 */
class Capture {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
}
const capturesList: Set<Capture> = reactive(new Set());
const toCapture = () => {
  const canvasEl: HTMLCanvasElement = canvas.value as HTMLCanvasElement;
  view.renderer.coreRenderer.render();
  const url = canvasEl.toDataURL("image/png");
  const capture = new Capture(url);
  capturesList.add(capture);
};
const toDeleteCapture = async (capture: Capture) => {
  capturesList.delete(capture);
};

/**
 * 视图元素
 */
const canvas = ref();
const viewArea = ref();

/**
 * 入口
 */
let view: View;

/**
 *
 */
onMounted(async () => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const viewAreaEl: HTMLElement = viewArea.value as HTMLElement;
  view = new View(canvasEl, viewAreaEl);
  toUpdateMaterial(patternsList[0]);
  view.render();
});

onUnmounted(() => {
  view?.destroy();
  stopWatch();
});
</script>

<template>
  <div class="container" v-bind="$attrs">
    <section class="patterns">
      <div class="codepart" v-for="pattern in patternsList">
        <div class="header">
          <h1 class="title">Pattern {{ pattern.number }}</h1>
          <img class="preview" width="100" height="100" v-if="pattern.previewUrl" :src="pattern.previewUrl" />
        </div>
        <div class="code" v-if="pattern.vertex">
          <textarea rows="5" v-model="pattern.vertex"></textarea>
        </div>
        <div class="code" v-if="pattern.fragment">
          <textarea rows="30" v-model="pattern.fragment"></textarea>
        </div>
        <div class="updatecode" @click="toUpdateMaterial(pattern)">Use This Shader</div>
      </div>
    </section>

    <div class="right-panel">
      <div class="render">
        <section class="view" ref="viewArea">
          <div class="background"></div>
          <canvas class="" ref="canvas"></canvas>
        </section>
      </div>
      <div class="console">
        <ul class="controls">
          <li>
            <button @click="() => (isCover = !isCover)">{{ isCover ? "自由视角" : "正面查看" }}</button>
          </li>
          <li>
            <button @click="toCapture">截图</button>
          </li>
        </ul>
        <ul class="captures">
          <li v-for="capture in capturesList">
            <span class="delete" @click="toDeleteCapture(capture)"></span>
            <img width="100" height="100" :src="capture.url" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}
.patterns {
  --codepartWidth: 500px;
  --viewWidth: 650px;
  position: relative;
  width: calc(var(--codepartWidth) + var(--viewWidth));
  padding: 2em;
}

.patterns .header {
  position: relative;
  height: 6em;
  font-size: 22px;
  display: flex;
  align-items: center;
}
.patterns .header .title {
  margin: 0;
}
.patterns .header .preview {
  position: absolute;
  right: 0;
}

.patterns .codepart {
  position: relative;
  width: var(--codepartWidth);
  display: flex;
  flex-direction: column;
  margin: 4em 0;
}

.patterns .code textarea {
  position: relative;
  width: 100%;
}
.patterns .codepart .updatecode {
  cursor: pointer;
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #333;
  border: 1px solid #000;
  border-radius: 3px;
}

.right-panel {
  --panelWidth: 600px;
  position: fixed;
  left: 50%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
.right-panel .render {
  position: relative;
  width: var(--panelWidth);
  height: var(--panelWidth);
  overflow: hidden;
}
.right-panel .console {
  position: relative;
  width: var(--panelWidth);
}

.right-panel .console ul.controls {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 20px 0;
  list-style: none;
}
.right-panel .console ul.controls li:not(:first-child) {
  margin-left: 5em;
}

.right-panel .console ul.captures {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  padding: 0;
  margin: 20px 0;
  list-style: none;
  overflow: auto;
}

.right-panel .console ul.captures li {
  position: relative;
  margin: 10px;
}
.right-panel .console ul.captures li span.delete::before {
  cursor: pointer;
  content: "+";
  position: absolute;
  right: 0;
  top: 0;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  background-color: red;
  border-radius: 50%;
  border: 2px solid #fff;
  transform: rotate(45deg) translate(0%, -50%);
}

section.view {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  overflow: hidden;
}

section.view .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

section.view canvas {
  position: relative;
}
</style>
