<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import baseGradientDropShadow from "../base-gradient-drop-shadow";

class Menu {
  index: string;
  name: string;
  title: string;
  content: string;
  gradient: string[];
  style = {
    "--background": "",
  };
  constructor(input: any, index: number) {
    this.name = `acc${index}`;
    this.index = `${(index < 10 ? "0" : "") + index}`;
    this.title = input.title;
    this.content = input.content;
    this.gradient = input.gradient;
    this.style["--background"] = `linear-gradient(135deg,${this.gradient.join(",")})`;
  }
}

const navigationMenu: any[] = reactive(
  [
    {
      title: "How do I apply?",
      content:
        "In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream World Cups” in Japan.",
      gradient: ["#70f570", "#49c628"],
    },
    {
      title: "Lost or forgotten your password",
      content:
        "In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream World Cups” in Japan.",
      gradient: ["#3c8ce7", "#00eaff"],
    },
    {
      title: "How can I make a change to my application?",
      content:
        "In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream World Cups” in Japan.",
      gradient: ["#ff96f9", "#c32bac"],
    },
    {
      title: "How can I update my name?",
      content:
        "In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called “Dream World Cups” in Japan.",
      gradient: ["#fd6e6a", "#ffc600"],
    },
  ].map((item, index) => new Menu(item, index + 1))
);

const itemOnClick = (activeEl: any) => {
  navigationMenu.forEach((item) => {
    item.active = activeEl === item;
  });
};

let isSpreadMenu = ref(false);
const menuToggleOnClick = () => {
  isSpreadMenu.value = !isSpreadMenu.value;
};
</script>

<template>
  <section class="background">
    <div class="container">
      <h1>Frequently asked questions?</h1>
      <div class="tab" v-for="item in navigationMenu" :style="item.style">
        <input type="radio" name="acc" :id="item.name" />
        <label :for="item.name">
          <h2>{{ item.index }}</h2>
          <h3>{{ item.title }}</h3>
        </label>
        <div class="content">
          <p>{{ item.content }}</p>
        </div>
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
}
section.background {
  background: #f5f8ff;
}

.container {
  max-width: 600px;
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.container h1 {
  color: #333;
}
.container .tab {
  position: relative;
  padding: 0 20px 20px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.05);
}
.container .tab input {
  appearance: none;
}
.container .tab label {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.container .tab label::after {
  content: "+";
  position: absolute;
  right: 20px;
  color: rgba(0, 0, 0, 0.1);
  font-size: 2em;
  transition: transform 1s;
}
.container .tab:hover label::after {
  color: #333;
}
.container .tab input:checked ~ label::after {
  color: #fff;
  transform: rotate(135deg);
}
.container .tab label h2 {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5em;
  border-radius: 1.25em;
  border-radius: 5px;
  background: var(--background);
}
.container .tab input:checked ~ label h2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.2);
  font-size: 8em;
}
.container .tab label h3 {
  position: relative;
  font-weight: 500;
  color: #333;
  /* z-index:10; */
}
.container .tab input:checked ~ label h3 {
  color: #333;
  padding: 2px 10px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.container .tab .content {
  max-height: 0;
  transition: 1s;
  overflow: hidden;
}
.container .tab input:checked ~ .content {
  max-height: 100vh;
}
.container .tab .content p {
  position: relative;
  padding: 10px 0;
  color: #333;
  /* z-index:10; */
}
.container .tab input:checked ~ .content p {
  color: #fff;
}
</style>
