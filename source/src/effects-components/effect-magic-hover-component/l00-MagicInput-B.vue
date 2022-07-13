<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const inputText = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <section class="backround">
    <div class="inputBox">
      <div class="shadow"></div>
      <div class="appearance"><div class="icon search"></div></div>
      <input type="text" placeholder="请输入搜索内容" v-model="inputText" />
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
section.backround {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #cfd1e1;
}
.inputBox {
  position: relative;
  width: 65px;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.inputBox:hover {
  width: 400px;
}
.inputBox .appearance {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(#dbdae1, #a3aaba);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 15px 15px 15px rgba(0, 0, 0, 0.1), 20px 20px 15px rgba(0, 0, 0, 0.1),
    30px 30px 15px rgba(0, 0, 0, 0.1), inset 1px 1px 2px #fff;
}
.inputBox .appearance::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  background: linear-gradient(#fff, #fff, #e3e3e3);
  filter: blur(1px);
}
.inputBox .appearance::after {
  content: "";
  position: absolute;
  top: 0;
  right: -1px;
  width: 10px;
  height: 100%;
  background: #9d9d9d;
  filter: blur(1px);
}
.inputBox .shadow {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: -50px;
  width: calc(100% + 50px);
  height: 300px;
  clip-path: polygon(0px 50px, 50px 0px, 100% 0, 100% 100%, 0% 104%);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), transparent);
  transform-origin: top;
  transform: skew(45deg);
}
.inputBox input {
  outline: none;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 25px;
  border: none;
  color: #555;
  background: none;
  font-size: 1.1em;
}
.inputBox input::placeholder,
.inputBox input {
  color: transparent;
  transition: 0.5s;
}
.inputBox:hover input::placeholder,
.inputBox:hover input {
  color: inherit;
}
.inputBox .icon {
  position: absolute;
  width: 65px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.inputBox .icon::before {
  content: "";
  position: relative;
  font-family: "Font_Awesome";
}
.inputBox .icon.search::before {
  content: "\f002";
}
</style>
