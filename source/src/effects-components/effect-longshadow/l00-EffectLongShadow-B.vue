<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";
import { vLongshadow } from "./vLongshadow";

const props = defineProps<{
  color?: string | [string, string];
  //style?: string;
}>();

const parameter = reactive({
  background: "linear-gradient(135deg, #24ff72,#2196f3);", //#f403d1, #64b5f6; //#ffec61,#f321d7);
});
defineExpose({ parameter });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    //原生 style
    background: parameter.background,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const longshadow = reactive({
  color: "rgba(255, 255, 255,0.01)",
  //color: "#31bcc7",
  angle: 45,
  length: 750,
});

const changeColor = (val: number) => {};

const textStyle = computed(() => (longshadow.color.length > 7 ? `mix-blend-mode: hard-light;` : ""));
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="console">
      <input type="range" v-model="longshadow.angle" :max="360" :min="0" :step="1" />
      <form>
        <label class="w3-text-blue">
          <input type="radio" name="color" v-model="longshadow.color" :value="'#31bcc7'" />
          正常颜色
        </label>
        <label class="w3-text-blue">
          <!-- <input type="radio" name="color" v-model="longshadow.color" :value="'rgba(0, 0, 0,0.01)'" /> -->
          <input type="radio" name="color" v-model="longshadow.color" :value="'rgba(255, 255, 255,0.01)'" />
          射影颜色
        </label>
      </form>
    </div>

    <div class="container" :style="textStyle">
      <div class="text" contenteditable="true" v-longshadow:text="longshadow">WELCOME</div>
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
.console {
  position: relative;
  z-index: 1;
}
.container {
  position: relative;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  --size: 200px;
  --shapeColor: rgb(5, 54, 57);
}

.text {
  color: #fff;
  font-size: 10em;
  font-weight: 900;
  outline: none;
}
.container span {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: block;
  background: var(--shapeColor);
  background: linear-gradient();
}

.container span:not(:first-child) {
  margin-left: calc(var(--size) * 0.8);
}

.container span[shape="circular"] {
  border-radius: 50%;
}
.container span[shape="triangle"] {
  background: transparent;
  border-top: calc(var(--size) / 2) solid transparent;
  border-bottom: calc(var(--size) / 2) solid var(--shapeColor);
  border-left: calc(var(--size) / 2) solid transparent;
  border-right: calc(var(--size) / 2) solid var(--shapeColor);
}
</style>
