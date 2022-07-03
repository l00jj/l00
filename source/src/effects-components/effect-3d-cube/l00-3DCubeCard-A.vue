<script setup lang="ts">
import { ref, reactive, watchEffect, WatchStopHandle, computed, onMounted, onUnmounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import imgDesignSrc from "./l00-3DCubeCard-A/design.png?url";
import imgCodeSrc from "./l00-3DCubeCard-A/code.png?url";
import imgLaunchSrc from "./l00-3DCubeCard-A/launch.png?url";
const content =
  "time goes by so fast, people go in and out of your life. you must never miss the opportunity to tell these people how much they mean to you.";
const list = [
  { style: "", title: "Design", imgSrc: imgDesignSrc, content },
  { style: "", title: "Code", imgSrc: imgCodeSrc, content },
  { style: "", title: "Launch", imgSrc: imgLaunchSrc, content },
]
  .map((item, index) => {
    item.style = `--order:${index + 1}`;
    return item;
  })
  .reverse();
</script>

<template>
  <section class="background">
    <div class="container">
      <!--  -->
      <div class="card" v-for="item in list" :style="item.style">
        <div class="imgBx">
          <img :src="item.imgSrc" alt="" />
          <h3>{{ item.title }}</h3>
        </div>
        <div class="content">
          <p>{{ item.content }}</p>
        </div>
      </div>
      <!--  -->
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
}
section.background {
  background: #f3f3f3;
}

.container {
  position: relative;
  min-width: 1050px;
  display: flex;
  justify-content: space-between;
  transform: skewY(-10deg);
}
.card {
  position: relative;
  width: 300px;
  height: 400px;
  transition: 0.5s;
}
.card {
  order: var(--order);
}
.card .imgBx::before {
  content: "";
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 15px;
  background: #00c0f6;
  transform-origin: bottom;
  transform: skewX(45deg);
}

.card::after {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  width: 15px;
  height: 50%;
  background: #00c0f6;
  transform-origin: left;
  transform: skewY(45deg);
  border-bottom: 200px solid #d9d9d9;
}
.card:hover {
  transform: translateY(-40px);
}

.card .imgBx {
  position: relative;
  width: 300px;
  height: 200px;
  background: #00c7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card .imgBx img {
  max-width: 100px;
}
.card .imgBx h3 {
  position: relative;
  color: #fff;
  margin-top: 10px;
}
.card .content {
  position: relative;
  width: 100%;
  height: 200px;
  padding: 20px;
  color: #777;
  text-align: center;
  background: #fff;
}
.card::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.1));
  transform-origin: bottom;
  transform: skewX(45deg);
  transition: 0.5s;
  pointer-events: none;
}

.card:hover::before {
  transform: translateY(40px) skewX(45deg);
  filter: blur(5px);
  opacity: 0.5;
}
</style>
