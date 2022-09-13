<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import imgUrl from "@src/graphics-components/myself/index.jpg?url";
//import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
const password = ref("");

const isPassword = ref(true);
const onTogglePassword = () => (isPassword.value = !isPassword.value);

const isHadLower = ref(false);
const isHadUpper = ref(false);
const isHadNumber = ref(false);
const isHadSpecial = ref(false);
const isHadLength = ref(false);
const onChange = () => {
  const text = password.value;
  isHadLower.value = /(?=.*[a-z])/.test(text);
  isHadUpper.value = /(?=.*[A-Z])/.test(text);
  isHadNumber.value = /(?=.*[0-9])/.test(text);
  isHadSpecial.value = /(?=.*[\!\@\#\$\%\^\&\*])/.test(text);
  isHadLength.value = /^.{8,16}$/.test(text);
};
</script>

<template>
  <section class="background">
    <div class="container">
      <div class="inputbox">
        <input
          :type="isPassword ? 'password' : 'text'"
          autocomplete="off"
          placeholder="Password"
          v-model="password"
          @input="onChange"
        />
        <span class="togglebtn" :class="{ password: isPassword }" @click="onTogglePassword"></span>
      </div>
      <div class="validation">
        <ul>
          <li :class="{ valid: isHadLower }">At least one lowercase character</li>
          <li :class="{ valid: isHadUpper }">At least one uppercase character</li>
          <li :class="{ valid: isHadNumber }">At least one number</li>
          <li :class="{ valid: isHadSpecial }">At least one special character</li>
          <li :class="{ valid: isHadLength }">At least 8 and no more than 16 characters</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome";
  src: url("@src/assets/icons/Font-Awesome/fa-regular-400.woff2");
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: #8cccff;
}
.container {
  width: 300px;
}
.container .inputbox {
  position: relative;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
}
.container .inputbox input {
  position: relative;
  width: 100%;
  padding: 10px 5px;
  outline: none;
  border: none;
}
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
.container .inputbox .togglebtn {
  cursor: pointer;
  position: absolute;
  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Font_Awesome";
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
}
.container .inputbox .togglebtn::before {
  content: "\f06e";
}
.container .inputbox .togglebtn.password::before {
  content: "\f070";
}

.container .validation {
  margin-top: 30px;
  border-radius: 8px;
  padding: 10px;
  background: #376488;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
}
.container .validation ul {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.container .validation ul li {
  position: relative;
  list-style: none;
  color: #fff;
  font-size: 0.85em;
  transition: 0.5s;
}
.container .validation ul li::before {
  content: "\e119";
  width: 20px;
  height: 10px;
  font-family: "Font_Awesome";
  display: inline-flex;
}
.container .validation ul li.valid::before {
  content: "\f058";
  color: #0f0;
}
.container .validation ul li.valid {
  color: rgba(255, 255, 255, 0.5);
}
</style>
