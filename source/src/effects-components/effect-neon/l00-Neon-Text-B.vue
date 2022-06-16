<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  text: string;
}>();

const parameter = {
  backgroundColor: `#111`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};

class Character {
  id = Symbol();
  value: string;
  isSpace = false;
  style = "";
  constructor(value: string) {
    this.value = value;
  }
  updateStyle(index: number) {
    const space = this.isSpace ? `margin-left: 0.3em;` : ``;
    this.style = `--i:${index};${space}`;
  }
}

const list = computed(() => {
  const result: Character[] = [];
  props.text &&
    props.text.split(/\s+/).forEach((word, index) => {
      const characters = word.split("").map((character) => new Character(character));
      if (index) characters[0].isSpace = true;
      result.push(...characters);
    });

  result.forEach((item, index) => item.updateStyle(index));

  return result;
});
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <h1>
      <span v-for="item in list" :key="item.id" :style="item.style">
        <i>{{ item.value }}</i>
      </span>
    </h1>
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

h1 {
  display: flex;
  align-items: flex-end;
  margin: 0;
  color: transparent;
  transform: translateY(-35px);
}

h1 span {
  position: relative;
  width: 20px;
  height: calc(20px * (var(--i) + 1));
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 15px;
  background: transparent;
  animation: shapeAnimate 2s linear infinite;
  animation-delay: calc(0.25s * var(--i));
}

@keyframes shapeAnimate {
  0%,
  100% {
    background: #ffffffff;
    filter: blur(2px);
    box-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 80px #00b3ff, 0 0 120px #00b3ff,
      0 0 200px #00b3ff, 0 0 300px #00b3ff, 0 0 400px #00b3ff;
  }
  25%,
  75% {
    background: #ffffff07;
    filter: blur(0px);
    box-shadow: none;
  }
}

h1 span i {
  position: absolute;
  color: transparent;
  font-size: 50px;
  font-weight: bold;
  font-style: normal;
  transform: translateY(70px);
  animation: fontAnimate 2s linear infinite;
  animation-delay: calc(0.25s * var(--i));
}

@keyframes fontAnimate {
  0%,
  100% {
    color: #ffffffff;
    filter: blur(2px);
    text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 80px #00b3ff, 0 0 120px #00b3ff,
      0 0 200px #00b3ff, 0 0 300px #00b3ff, 0 0 400px #00b3ff;
  }
  25%,
  75% {
    color: #ffffff07;
    filter: blur(0px);
    text-shadow: none;
  }
}
</style>
