<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  plain?: boolean;
  placeholder?: string;
}>();

const placeholder = props.placeholder ? props.placeholder : "请输入内容";
const isPlain = computed(() => (props.plain ? "" : undefined));
const inputText = ref("");

const parameter = {
  duration: 1,
  backgroundColor: `#232c33`,
};

const mainStyle = {
  "--duration": `${parameter.duration}s`,
  backgroundColor: `${parameter.backgroundColor}`,
};

const navigationMenu: any[] = reactive([
  { icon: '"\\f015"', title: "Home", active: true },
  { icon: '"\\f007"', title: "Profile", active: false },
  { icon: '"\\f4b6"', title: "Messages", active: false },
  { icon: '"\\f013"', title: "Setting", active: false },
  { icon: '"\\3f"', title: "Help", active: false },
  { icon: '"\\f084"', title: "Password", active: false },
  { icon: '"\\f08b"', title: "Sign Out", active: false },
]);

const onClick = (activeEl: any) => {
  navigationMenu.forEach((item) => {
    item.active = activeEl === item;
  });
};
</script>

<template>
  <section :style="mainStyle">
    <div class="navigation">
      <ul>
        <li v-for="item in navigationMenu" :class="{ active: item.active }" @click="onClick(item)">
          <a>
            <span class="icon" :style="`--icon:${item.icon}`"></span>
            <span class="title">{{ item.title }}</span>
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
  overflow: hidden;
}

.navigation {
  position: relative;
  width: 60px;
  height: 500px;
  display: flex;
  padding-left: 15px;
  align-items: center;
  box-sizing: content-box;
  border-right: 10px solid #4187f6;
  background: #2b343b;
  overflow: hidden;
  transition: var(--duration);
}
.navigation:hover {
  width: 300px;
}

ul {
  position: relative;
  width: 100%;
}

ul li {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  list-style: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

ul li a {
  position: relative;
  display: flex;
  align-items: center;
}
ul li a .icon {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
}
ul li a .icon::before {
  font-family: "Font_Awesome";
  content: var(--icon);
  position: relative;
  color: #fff;
}
ul li a .title {
  flex: none;
  color: #fff;
  font-size: 1rem;
}

ul li.active {
  background: #4187f6;
}

ul li.active::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 15px 15px 0 #4187f6;
  transform: translate(0, -100%);
}
ul li.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 15px -15px 0 #4187f6;
  transform: translate(0, 100%);
}
</style>
