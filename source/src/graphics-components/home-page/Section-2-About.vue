<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import View from "./View/index";
//
//const props = defineProps<{}>();
</script>

<template>
  <section class="container">
    <div class="text">
      <div class="title"><span>野</span><span>码</span></div>
      <div class="left">
        <span></span>
      </div>
      <div class="right"><span>我叫小刘</span></div>
    </div>
  </section>
</template>

<style scoped>
section.container {
  position: fixed;
width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: #dedede;
}

.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: #888888;
  justify-content: center;
  align-items: center;
  filter: blur(5px);
}
.title {
  position: absolute;
  font-size: 350px;
  font-weight: 900;
}
.title span:nth-child(2) {
  margin-left: 150px;
}

.left {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  color: #888888;
  transform: translate(-315px, -200px);
}
.left::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-right: 20px solid #888888;
  border-bottom: 20px solid #888888;
  transform: translate(-80px, -10px);
}
.right {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  color: #888888;
  transform: translate(355px, 190px);
}
.right::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-left: 20px solid #888888;
  border-top: 20px solid #888888;
  transform: translate(145px, -10px);
}
</style>
