<script setup lang="ts">
import { reactive, ref, watchEffect, onMounted, onUnmounted } from "vue";
import Experience from "@src/graphics-components/simple-3d-text/Experience/Experience";
import Simple3DText from "@src/graphics-components/simple-3d-text/l00-Simple3DText.vue";
//
//const props = defineProps<{viewArea?: HTMLElement;}>();
const componentOnMounted = (experience: Experience) => {
  // 暂停动画
  experience.isPlayAnimation = false;
  // 设定可视角度
  const orbitControl = experience.camera.controls;
  orbitControl.enableDamping = true; //开启阻尼滑动
  orbitControl.minPolarAngle = Math.PI * 0.3; //限定上视觉
  orbitControl.maxPolarAngle = Math.PI * 0.7; //限定下视觉
  orbitControl.minAzimuthAngle = -Math.PI * 0.3; //限定左视觉
  orbitControl.maxAzimuthAngle = Math.PI * 0.3; //限定右视觉
  orbitControl.enablePan = false; //禁止拖动物体
  orbitControl.enableZoom = false; //禁止缩放

  const onceEvnt = () => {
    experience.isPlayAnimation = true;
    window.removeEventListener("scroll", onceEvnt);
  };
  window.addEventListener("scroll", onceEvnt);
};
</script>

<template>
  <Simple3DText class="container" :onMounted="componentOnMounted"></Simple3DText>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
