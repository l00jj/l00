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
      <span v-for="item in list" :key="item.id" :style="item.style">{{ item.value }}</span>
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

@font-face {
  font-family: "custom_font";
  src: url("@src/assets/fonts/Bad_Script/BadScript-Regular.ttf");
  /* src: url("@src/assets/fonts/Courgette/Courgette-Regular.ttf"); */
  /* src: url("@src/assets/fonts/Yellowtail/Yellowtail-Regular.ttf"); */
  /* src: url("@src/assets/fonts/Gloria_Hallelujah/GloriaHallelujah-Regular.ttf"); */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1 {
  display: flex;
  margin: 0;
  color: transparent;
  font-size: 120px;
  font-family: "custom_font";
}
h1 span {
  animation: animateColor 2s linear infinite;
  animation-delay: calc(0.12s * var(--i));
}

@keyframes animateColor {
  0%,
  100% {
    color: #ffffffff;
    filter: blur(2px);
    text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 120px #00b3ff, 0 0 200px #00b3ff,
      0 0 300px #00b3ff, 0 0 400px #00b3ff;
  }

  5%,
  95% {
    color: #ffffff11;
    filter: blur(2px);
    text-shadow: none;
  }
}
</style>
