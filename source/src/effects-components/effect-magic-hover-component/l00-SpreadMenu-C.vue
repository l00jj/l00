<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const navigationMenu: any[] = reactive([
  { icon: '"\\f015"', title: "Home", color: "#f44336", active: true },
  { icon: '"\\f007"', title: "About", color: "#ffa117", active: false },
  { icon: '"\\f4b6"', title: "Messages", color: "#0fc70f", active: false },
  { icon: '"\\f030"', title: "Photos", color: "#2196f3", active: false },
  { icon: '"\\f013"', title: "Settings", color: "#b145e9", active: false },
]);

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
    <div class="navigation" :class="{ spread: isSpreadMenu }">
      <div class="menuToggle" @click="menuToggleOnClick"></div>
      <ul>
        <li v-for="item in navigationMenu" :class="{ active: item.active }" @click="itemOnClick(item)">
          <a :style="`--icon:${item.icon};--color:${item.color}`">
            <span class="icon"></span>
            <span class="text">{{ item.title }}</span>
          </a>
        </li>
      </ul>
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
  background: #3d4152;
}
.navigation {
  position: absolute;
  width: 75px;
  inset: 20px 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  transition: 0.5s;
}

.navigation.spread {
  width: 250px;
}

.navigation .menuToggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 23px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.navigation .menuToggle::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 2px;
  background: #333;
  transform: translateY(-8px);
  transition: 0.5s;
}

.navigation.spread .menuToggle::before {
  transform: translateY(0px) rotate(45deg);
}

.navigation .menuToggle::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 2px;
  background: #333;
  box-shadow: 0 -8px 0 #333;
  transform: translateY(8px);
  transition: 0.5s;
}

.navigation.spread .menuToggle::after {
  box-shadow: 0 0 0 #333;
  transform: translateY(0px) rotate(-45deg);
}

.navigation ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.navigation ul li {
  list-style: none;
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
}
.navigation ul li.active {
  transform: translateX(30px);
}
.navigation.spread ul li.active {
  transform: translateX(10px);
}
.navigation ul li a {
  position: relative;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  text-decoration: none;
}
.navigation ul li a .icon {
  position: relative;
  min-width: 55px;
  height: 55px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
  font-size: 1.2em;
  transition: 0.5s;
}
.navigation ul li a .icon::after {
  content: var(--icon);
  position: relative;
  font-family: "Font_Awesome";
}

.navigation ul li.active a .icon {
  color: #fff;
  background: var(--color);
}

.navigation ul li a .icon::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color);
  filter: blur(8px);
  opacity: 0;
  will-change: opacity;
  transition: 0.5s;
}
.navigation ul li.active a .icon::before {
  opacity: 0.5;
}

.navigation ul li a .text {
  position: relative;
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #333;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}

.navigation.spread ul li a .text {
  opacity: 1;
  visibility: visible;
}

.navigation ul li.active a .text {
  color: var(--color);
}
</style>
