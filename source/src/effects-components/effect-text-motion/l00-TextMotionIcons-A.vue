<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
const parameter = reactive({
  iconSize: 80,
  iconMargin: 5,
  fontSize: 64,
});

const rowStyle = reactive({
  "--iconSize": `${parameter.iconSize}px`,
  "--iconMargin": `${parameter.iconMargin}px`,
  "--iconFontSize": `${parameter.fontSize}px`,
});

class Icon {
  icon: string;
  style = {
    "--icon": "",
  };
  constructor(iconCode: string) {
    this.icon = `"\\${iconCode}"`;
    this.style["--icon"] = this.icon;
  }
}
const rows = Array(20).fill(0);
const temp = [
  "f520",
  "f2cd",
  "f2cc",
  "f2c9",
  "f6ae",
  "f6b0",
  "f8f5",
  "f8f6",
  "f779",
  "f6d8",
  "f376",
  "f8f2",
  "f8f0",
  "f56b",
  "f6b5",
  "f71f",
  "f7d8",
  "f635",
  "f432",
  "e344",
];
const icons: any[] = reactive(
  Array(temp.length * 2)
    .fill(0)
    .map((val, index) => new Icon(temp[index % temp.length]))
);
console.log(icons);
// color: "#f44336"
// color: "#ffa117"
// color: "#0fc70f"
// color: "#2196f3"
// color: "#b145e9"
</script>

<template>
  <section class="background">
    <div class="row" v-for="row in rows" :style="rowStyle">
      <div class="list">
        <i v-for="icon in icons" class="icon" :style="icon.style" aria-hidden="true"></i>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome";
  src: url("@src/assets/icons/Font-Awesome/fa-light-300.woff2");
}

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
  background: #111;
}

.icon {
  position: relative;
  width: var(--iconSize);
  height: var(--iconSize);
  margin: var(--iconMargin);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  /* color: #fff; */
  font-style: normal;
  transition: 3s;
}

.icon::before {
  content: var(--icon);
  font-family: "Font_Awesome";
}
.icon:hover {
  color: #0f0;
  text-shadow: 0 0 120px #0f0;
  transition: 0s;
}
/* @keyframes color {
  0% {
    color: #f44336;
    text-shadow: 0 0 120px #f44336;
  }
  25% {
    color: #ffa117;
    text-shadow: 0 0 120px #ffa117;
  }
  50% {
    color: #0fc70f;
    text-shadow: 0 0 120px #0fc70f;
  }
  75% {
    color: #2196f3;
    text-shadow: 0 0 120px #2196f3;
  }
  100% {
    color: #b145e9;
    text-shadow: 0 0 120px #b145e9;
  }
} */

section .row {
  position: relative;
  width: 205px;
  display: flex;
  align-items: center;
  font-size: var(--iconFontSize);
  flex-direction: column;
  white-space: nowrap;
  transform: rotate(-30deg);
}

section .row .list {
  display: inline-flex;
}

section .row:nth-child(even) .list {
  animation: animatieEven 60s linear infinite;
}

@keyframes animatieEven {
  0% {
    transform: translateX(25%);
  }
  100% {
    transform: translateX(-25%);
  }
}

section .row:nth-child(odd) .list {
  animation: animatieOdd 60s linear infinite;
}

@keyframes animatieOdd {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}
</style>
