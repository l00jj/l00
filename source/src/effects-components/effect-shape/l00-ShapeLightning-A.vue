<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import { DatGui } from "@src/utils/DatGui";
const viewArea = ref();

onMounted(() => {
  const viewAreaEl = viewArea.value as HTMLElement;
  const datGui = new DatGui(viewAreaEl);
  onUnmounted(() => datGui.destroy());
});

const params = reactive({
  backgroundColor: "#222",
  mainColor: "#5ff436",
});
</script>

<template>
  <section class="background" ref="viewArea">
    <div class="thunderbolt">
      <div class="shape1"></div>
      <div class="shape2"></div>
      <div class="shape3"></div>
      <div class="shape4"></div>
    </div>
  </section>
</template>

<style scoped>
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
  background: v-bind("params.backgroundColor");
}
.thunderbolt {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 75px;
}
/* .thunderbolt .shape1 {
  position: relative;
  width: 0;
  height: 0;
  border-bottom: 60px solid v-bind("params.mainColor");
  border-left: 30px solid transparent;
  transform: skew(-25deg);
}
.thunderbolt .shape1::before {
  content: "";
  position: absolute;
  bottom: -110px;
  right: -20px;
  width: 0;
  height: 0;
  border-top: 60px solid v-bind("params.mainColor");
  border-right: 30px solid transparent;
} */
.thunderbolt .shape1 {
  position: relative;
  width: 0;
  height: 0;
  transform: skew(-25deg);
}
.thunderbolt .shape1::before {
  content: "";
  position: absolute;
  top: -55px;
  left: -25px;
  width: 0;
  height: 0;
  border-bottom: 60px solid v-bind("params.mainColor");
  border-left: 30px solid transparent;
}
.thunderbolt .shape1::after {
  content: "";
  position: absolute;
  bottom: -55px;
  right: -25px;
  width: 0;
  height: 0;
  border-top: 60px solid v-bind("params.mainColor");
  border-right: 30px solid transparent;
}

.thunderbolt .shape2 {
  position: relative;
  width: 25px;
  height: 50px;
  background: v-bind("params.mainColor");
  transform: skew(-30deg);
}
.thunderbolt .shape2::before {
  content: "";
  position: absolute;
  top: -50px;
  left: -20px;
  width: 0;
  height: 0;
  border-bottom: 60px solid v-bind("params.mainColor");
  border-left: 30px solid transparent;
}
.thunderbolt .shape2::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: -20px;
  width: 0;
  height: 0;
  border-top: 60px solid v-bind("params.mainColor");
  border-right: 30px solid transparent;
}

.thunderbolt .shape3 {
  position: relative;
  width: 25px;
  height: 50px;
  background: v-bind("params.mainColor");
  transform: skew(-30deg);
}
.thunderbolt .shape3::before {
  content: "";
  position: absolute;
  top: -50px;
  left: -20px;
  width: 0;
  height: 0;
  border-bottom: 60px solid v-bind("params.mainColor");
  border-left: 30px solid v-bind("params.mainColor");
}
.thunderbolt .shape3::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: -20px;
  width: 0;
  height: 0;
  border-top: 60px solid v-bind("params.mainColor");
  border-right: 30px solid transparent;
}

.thunderbolt .shape4 {
  position: relative;
  width: 0;
  height: 0;
  background: v-bind("params.mainColor");
  transform: skew(-25deg);
}
.thunderbolt .shape4::before {
  content: "";
  position: absolute;
  top: -55px;
  left: -25px;
  width: 0;
  height: 0;
  border-bottom: 60px solid v-bind("params.mainColor");
  border-left: 30px solid v-bind("params.mainColor");
}
.thunderbolt .shape4::after {
  content: "";
  position: absolute;
  bottom: -55px;
  right: -25px;
  width: 0;
  height: 0;
  border-top: 60px solid v-bind("params.mainColor");
  border-right: 30px solid transparent;
}
</style>
