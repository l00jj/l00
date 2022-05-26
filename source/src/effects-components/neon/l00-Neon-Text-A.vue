<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  text: string;
}>();

const option = reactive({
  bgColor: `#111`, //
  neonColor: `hsl(317 100% 54%)`, //
});

defineExpose({ option });

const mainStyle = computed(() => {
  return Object.entries({
    "--bgColor": `${option.bgColor}`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

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
  <h1 :style="mainStyle">
    <span v-for="item in list" :key="item.id" :style="item.style">{{ item.value }}</span>
  </h1>
</template>

<style scoped>
@font-face {
  font-family: "custom_font";
  src: url("/assets/fonts/Bad_Script/BadScript-Regular.ttf");
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
  animation: animateColor 3s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes animateColor {
  0% {
    color: #fff;
    filter: blur(2px) hue-rotate(0deg);
    text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 120px #00b3ff, 0 0 200px #00b3ff,
      0 0 300px #00b3ff, 0 0 400px #00b3ff;
  }
  30%,
  70% {
    color: #fff;
    filter: blur(2px) hue-rotate(360deg);
    text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 120px #00b3ff, 0 0 200px #00b3ff;
  }
  100% {
    color: transparent;
    box-shadow: none;
    filter: blur(2px) hue-rotate(0deg);
  }
}
</style>
