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
  backgroundColor: `#1d2b3a`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};
</script>

<template>
  <div class="inputBox">
    <input type="text" required v-model="inputText" />
    <span :plain="isPlain">{{ placeholder }}</span>
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
  padding: 10px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  background: #1d2b3a;
  transition: 0.5s;
}

.inputBox span {
  pointer-events: none;
  position: absolute;
  left: 0;
  padding: 10px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.25);
  transition: 0.5s;
}

.inputBox input:focus ~ span,
.inputBox input:valid ~ span {
  padding: 0 10px;
  color: #00dfc4;
  font-size: 0.65rem;
  letter-spacing: 0.2rem;
  transform: translate(10px, -7px);
}

.inputBox input:focus,
.inputBox input:valid {
  border-color: #00dfc4;
}

.inputBox input:focus ~ span,
.inputBox input:valid ~ span {
  color: #fff;
  border-radius: 2px;
  background: #00dfc4;
}

.inputBox input:focus ~ span[plain],
.inputBox input:valid ~ span[plain] {
  color: #00dfc4;
  border-radius: 0px;
  border-left: 1px solid #00dfc4;
  border-right: 1px solid #00dfc4;
  background: #1d2b3a;
}
</style>
