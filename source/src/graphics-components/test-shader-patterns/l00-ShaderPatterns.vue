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
    currentCameraOption.fov = camera.instance.fov;
    currentCameraOption.position = camera.instance.position.clone();
    // 转为正面
    camera.controls.enabled = false;
    camera.instance.fov = 90;
    camera.instance.position.set(0, 0, 1);
    camera.instance.lookAt(0, 0, 0);
    camera.instance.updateProjectionMatrix();
  } else {
    camera.controls.enabled = true;
    camera.instance.fov = currentCameraOption.fov;
    camera.instance.position.copy(currentCameraOption.position);
    camera.instance.updateProjectionMatrix();
  }
});

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
        <div class="title">Pattern {{ pattern.number }}</div>
        <div class="code" v-if="pattern.vertex">
          <textarea rows="5" v-model="pattern.vertex"></textarea>
        </div>
        <div class="code" v-if="pattern.fragment">
          <textarea rows="30" v-model="pattern.fragment"></textarea>
        </div>
        <div
          style="width: 100px; height: 100px; display: block; cursor: pointer; background: red; align-self: flex-end"
          @click="toUpdateMaterial(pattern)"
        ></div>
      </div>
    </section>

    <div class="render">
      <section class="view" ref="viewArea">
        <div class="background"></div>
        <canvas class="" ref="canvas"></canvas>
      </section>
      <div class="" style="margin: 20px 0">
        <button @click="() => (isCover = !isCover)">{{ isCover ? "自由视角" : "正面查看" }}</button>
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
.patterns .title {
  font-size: 2em;
}

.patterns .codepart {
  position: relative;
  width: var(--codepartWidth);
  display: flex;
  flex-direction: column;
  margin: 3em 0;
}

.patterns .code textarea {
  position: relative;
  width: 100%;
}

.render {
  position: fixed;
  left: 50%;
  width: 50%;
  height: 100%;
  display: flex;
  padding: 20px;
  justify-content: center;
  flex-direction: column;
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
