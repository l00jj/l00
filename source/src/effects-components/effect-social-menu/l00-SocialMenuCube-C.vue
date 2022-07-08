<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  direction?: string;
}>();

const list = computed(() =>
  [
    {
      icon: "f09a",
      text: "Facebook",
      color: "#1877f2",
    },
    {
      icon: "f232",
      text: "Whatsapp",
      color: "#25d366",
    },
    {
      icon: "f099",
      text: "Twitter",
      color: "#1da1f2",
    },
    {
      icon: "f16d",
      text: "Instagram",
      color: "#c32aa3",
    },
    {
      icon: "f167",
      text: "Youtube",
      color: "#ff0000",
    },
    {
      icon: "f08c",
      text: "Linkedin",
      color: "#0a66c2",
    },
  ]
    .map((item) => {
      const icon = `"\\${item.icon}"`;
      return {
        icon,
        text: item.text,
        style: {
          "--content": icon,
          "--color": `${item.color}`,
        },
      };
    })
    .reverse()
);

const ulStyle = reactive({
  "--transition": "0.5s",
  "--direction": props.direction === "right" ? "50px" : "-50px",
  "--currentIcon": `"?"`,
});

const changeIcon = (icon: string) => (ulStyle["--currentIcon"] = icon);
</script>

<template>
  <section class="background">
    <ul :style="ulStyle">
      <li
        v-for="item in list"
        :style="item.style"
        @mouseenter="changeIcon(item.icon)"
        @touchstart="changeIcon(item.icon)"
      >
        {{ item.text }}
      </li>
    </ul>
    <!-- <h1 class="title">3D Cube Social Menu</h1> -->
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome_Brands";
  src: url("@src/assets/icons/Font-Awesome/Font Awesome 6 Brands-Regular-400.otf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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

section.background {
  background: #434750;
}

.title {
  position: absolute;
  color: #6b6b6b;
  font-size: 5em;
  font-weight: 900;
  transform: translateY(-3em);
}

ul {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transform: skewY(-15deg);
}

ul li {
  list-style: none;
  position: relative;
  width: 120px;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #3e3f46;
  transition: var(--transition);
}

ul li {
  text-decoration: none;
  color: #999;
  letter-spacing: 0.05em;
  transition: var(--transition);
}

ul li:hover {
  background: var(--color);
  color: #fff;
  transform: translateX(var(--direction));
}

ul li::before {
  content: var(--content);
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Font_Awesome_Brands";
  font-size: 1.25em;
  background: #3e3f46;
  filter: brightness(0.7);
  transform-origin: left;
  transform: skewY(45deg) translateX(-100%);
  transition: var(--transition);
}

ul li:hover::before {
  background: var(--color);
}

ul li::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #3e3f46;
  filter: brightness(0.9);
  transform-origin: top;
  transform: skewX(45deg) translateY(-100%);
  transition: var(--transition);
}

ul li:hover::after {
  background: var(--color);
}

ul li:first-child:after {
  box-shadow: -120px 120px 20px rgba(0, 0, 0, 0.25);
}

ul::before {
  content: var(--currentIcon);
  position: absolute;
  font-family: sans-serif, "Font_Awesome_Brands";
  font-size: 20em;
  color: rgba(255, 255, 255, 0.05);
  filter: blur(5px);
  transform: translateX(50%);
}
</style>
