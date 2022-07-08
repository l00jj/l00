<script setup lang="ts">
import { reactive } from "vue";

class Li {
  active = false;
  color: string;
  title: string;
  icon: string;
  style = {
    "--icon": "",
  };
  constructor(input: any) {
    this.title = input.title;
    this.icon = input.icon;
    this.color = input.color;
    this.active = !!input.active;
    this.style["--icon"] = `"\\${this.icon}"`;
  }
}

const list = reactive(
  [
    {
      title: "Home",
      icon: "f015",
      color: "#f53b57",
      active: true,
    },
    {
      title: "Profile",
      icon: "f007",
      color: "#3c40c6",
    },
    {
      title: "Message",
      icon: "f27a",
      color: "#05c46b",
    },
    {
      title: "Help",
      icon: "f059",
      color: "#0fbcf9",
    },
    {
      title: "Settings",
      icon: "f013",
      color: "#ffa801",
    },
  ].map((item) => new Li(item)) as Li[]
);

const onHover = (inputList: Li) => {
  let target!: Li;
  for (let item of list) {
    if (item === inputList) {
      item.active = true;
      target = item;
    } else item.active = false;
  }
  navigationStyle["--indicatorColor"] = target.color;
  navigationStyle["--indicatorIndex"] = list.indexOf(target);
};

const navigationStyle = reactive({
  "--indicatorIndex": 0,
  "--indicatorColor": "#333",
});
</script>

<template>
  <section class="backround" :style="navigationStyle">
    <div class="navigation">
      <ul>
        <div class="indicator"></div>
        <li v-for="item in list" :class="{ active: item.active }" :style="item.style" @mouseenter="onHover(item)">
          <div class="button">
            <span class="icon"></span>
            <span class="title">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome";
  src: url("@src/assets/icons/Font-Awesome/fa-solid-900.woff2");
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
.backround {
  background: var(--indicatorColor);
  transition: background 0.5s;
}
.navigation {
  position: relative;
  width: 70px;
  height: 350px;
  border-radius: 35px;
  background: #fff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
}
.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.navigation ul li {
  list-style: none;
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigation ul li .button {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.navigation ul li .button .icon::before {
  content: var(--icon);
  position: relative;
  color: #333;
  font-family: "Font_Awesome";
  font-size: 24px;
  vertical-align: bottom;
  transition: 0.5s;
}
.navigation ul li.active .button .icon::before {
  color: #fff;
}
.navigation ul li .button .title {
  position: absolute;
  left: 110px;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333;
  font-weight: 500;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}
.navigation ul li .button .title::before {
  content: "";
  position: absolute;
  left: 0;
  width: 10px;
  height: 10px;
  background: #fff;
  transform: translateX(-50%) rotate(45deg);
}
.navigation ul li:hover .button .title {
  opacity: 1;
  visibility: visible;
  transform: translateX(-25px);
}

.navigation ul .indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  transform: translateY(calc(var(--indicatorIndex) * 70px));
}
.navigation ul .indicator::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--indicatorColor);
  transition: 0.5s;
}
</style>
