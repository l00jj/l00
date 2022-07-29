<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import MirrorTextA from "./MirrorText-A.vue";
//const props = defineProps<{}>();

const params = reactive({
  text: "l00",
  fontSize: 500,
  fontSizeUnit: "px",
  preset: "none",
});

const isActive = ref(false);
const changeFontSizeUnit = () => {
  isActive.value = !isActive.value;
  params.fontSizeUnit = isActive.value ? "px" : "vmin";
};

const changePreset = (input: string) => {
  params.preset = input;
};

const isShowMenu = ref(true);
const changeShowMenu = () => {
  isShowMenu.value = !isShowMenu.value;
};
</script>

<template>
  <div class="container">
    <MirrorTextA :text="params.text" :fontSize="params.fontSize" :preset="params.preset"></MirrorTextA>
    <div class="gui"     @click.self="changeShowMenu">
      <div class="menu" v-if="isShowMenu">
        <div class="item">
          <input class="textinput" type="text" maxlength="17" v-model="params.text" placeholder="edit this..." />
        </div>
        <div class="item">
          <p class="title">Text Size {{ params.fontSize }}</p>
          <input v-model.number="params.fontSize" type="range" id="" max="1200" min="200" />
          <div style="margin-top: 0.5em; display: inline-flex">
            px
            <button
              class="mode_button"
              :class="{ active: isActive }"
              style="font-size: 14px"
              @click="changeFontSizeUnit"
            ></button>
            vmin
          </div>
        </div>
        <div class="item">
          <p class="title">Preset {{ params.preset }}</p>
          <div style="display: inline-flex; gap: 0.5em">
            <input type="button" @click="changePreset('')" value="None" />
            <input type="button" @click="changePreset('preset1')" value="Preset1" />
          </div>
        </div>
        <button
          class="close_button"
          style="position: absolute; top: 0.5em; right: 0.5em; font-size: 20px"
          @click="changeShowMenu"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gui {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
}
.gui .menu {
  position: absolute;
  padding: 2em;
  margin: 2em 0;
  border-radius: 1em;
  box-sizing: border-box;
  box-shadow: 0px 0px 22px 0 rgb(0 0 0 / 10%);
  background-color: rgba(255, 255, 255, 0.95);
}
.gui .item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gui .item:not(:last-child) {
  margin-bottom: 1em;
}
.gui .item .title {
  margin-bottom: 0.5em;
}
.gui input {
  width: 100%;
}
.gui .textinput {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  font-family: serif;
  padding: 0.5em;
  border: 2px dotted #ddd;
  margin: 1em 0;
  color: #000;
  border-radius: 2em;
  background: rgba(255, 255, 255, 0);
}
input:focus {
  outline: none;
}
</style>

<style scoped>
button.close_button {
  cursor: pointer;
  position: relative;
  width: 1em;
  height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
}
button.close_button::before,
button.close_button::after {
  content: "";
  position: absolute;
  width: 1em;
  height: 0.15em;
  display: block;
  border-radius: 1em;
  background: #555;
  transform: rotate(45deg);
  transition: 0.5s;
}
button.close_button::after {
  transform: rotate(-45deg);
}
button.close_button:hover:before,
button.close_button:hover::after {
  background: red;
}
</style>

<style scoped>
button.mode_button {
  cursor: pointer;
  position: relative;
  margin: 0 0.5em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
}
button.mode_button::before {
  content: "";
  position: relative;
  top: 0;
  left: 0;
  width: 2em;
  height: 1em;
  border-radius: 1em;
  background-color: #cfd0d4d6;
  box-shadow: inset 0.065em 0.065em 0.2em 0px rgb(0 0 0 / 40%);
  transition: 0.3s;
}
button.mode_button::after {
  content: "";
  position: absolute;
  width: 0.7em;
  height: 0.7em;
  border-radius: 50%;
  background-color: #eee;
  background-color: #303235;
  background-color: #fff;
  box-shadow: 0.065em 0.065em 0.2em 0px rgb(0 0 0 / 40%);
  transition: 0.3s;
  transform: translateX(calc((2em - 1em) / -2));
}
button.mode_button.active::before {
  background-color: #fff;
}
button.mode_button.active::after {
  background-color: #303235;
  transform: translateX(calc((2em - 1em) / 2));
}
</style>
