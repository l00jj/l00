<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const inputValue= computed({
  get() {
    return props.modelValue;
  },
  set(value:boolean) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <section class="backround">
    <label class="inputbox">
      <input type="checkbox" v-model="inputValue" :checked="inputValue"  />
      <div class="input">
        <div class="longshadow"></div>
        <div class="appearance"><div class="icon search"></div></div>
      </div>
    </label>
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
.input {
  position: relative;
  width: 60px;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.input .appearance {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 3px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(#dbdae1, #a3aaba);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 15px 15px 15px rgba(0, 0, 0, 0.1), 20px 20px 15px rgba(0, 0, 0, 0.1),
    30px 30px 15px rgba(0, 0, 0, 0.1), inset 1px 1px 2px #fff;
}
.input .appearance::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  background: linear-gradient(#fff, #fff, #e3e3e3);
  filter: blur(1px);
}
.input .appearance::after {
  content: "";
  position: absolute;
  top: 0;
  right: -1px;
  width: 10px;
  height: 100%;
  background: #9d9d9d;
  filter: blur(1px);
}
.input .longshadow {
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
label.inputbox {
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
label.inputbox::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: #444;
  box-shadow: -1px -1px 1px rgb(255 255 255 / 50%), 1px 1px 1px rgb(255 255 255 / 50%);
}
label.inputbox input {
  position: absolute;
  appearance: inherit;
}
label.inputbox input ~ .input {
  transform: translateX(-50%);
}
label.inputbox input ~ .input .icon.search::before {
  color: #444;
  filter: none;
}
label.inputbox input:checked ~ .input {
  transform: translateX(50%);
}
label.inputbox input:checked ~ .input .icon.search::before {
  color: #00ffe2;
  filter: drop-shadow(0 0 5px #00ffe2) drop-shadow(0 0 15px #00ffe2);
}

.input .icon {
  position: absolute;
  width: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.input .icon::before {
  content: "";
  position: relative;
  font-family: "Font_Awesome";
  font-weight: 900;
}
.input .icon.search::before {
  content: "\f011";
  transition: 0.5s;
}
.input .icon.search::before {
  color: #00ffe2;
  filter: drop-shadow(0 0 5px #00ffe2) drop-shadow(0 0 15px #00ffe2);
}
</style>
