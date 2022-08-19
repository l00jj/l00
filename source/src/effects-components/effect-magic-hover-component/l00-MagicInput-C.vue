<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  placeholder?: string;
}>();

const placeholder = props.placeholder ? props.placeholder : "请输入内容";
const inputText = ref("");

const params = {
  backgroundColor: `#222`,
};
</script>

<template>
  <div class="inputBox">
    <input type="text" required v-model="inputText" />
    <span>{{ placeholder }}</span>
    <div class="loader"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.inputBox {
  position: relative;
}

.inputBox input {
  position: relative;
  width: 250px;
  padding: 10px 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  border: none;
  background: none;
  transition: 0.5s;
}

.inputBox span {
  pointer-events: none;
  position: absolute;
  left: 0;
  padding: 0.65rem 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.55);
  transition: 0.5s;
}

.inputBox input:focus ~ span,
.inputBox input:valid ~ span {
  padding: 0;
  color: #62cbff;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: unset;
  transform: translate(0px, -0.65rem);
}

.inputBox .loader {
  position: relative;
  width: 100%;
  height: 2px;
  background: #fff;
}

.inputBox .loader::before,
.inputBox .loader::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #fb0094, #ffff00, #2196f3, #00ff00, #fb0094, #00ff00, #2196f3, #ffff00, #fb0094);
  background-size: 500%;
}

.inputBox .loader::before {
  background: #fff;
}

.inputBox .loader::after {
  width: 0%;
  transition: 2s;
}

.inputBox input:focus ~ .loader::after,
.inputBox input:valid ~ .loader::after {
  width: 100%;
  animation: animate 20s linear infinite;
}
@keyframes animate {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -500% 0;
  }
}
</style>
