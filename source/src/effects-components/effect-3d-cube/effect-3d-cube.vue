<script setup lang="ts">
import { onMounted } from "vue";
import Cube3DA from "./l00-3DCube-A.vue";
import Cube3DB from "./l00-3DCube-B.vue";

/**
 * 根据载入url判断第一个显示的组件
 */
const componentList: any[] = [];
onMounted(() => {
  const toTopName = window.location.hash.slice(1);
  componentList.forEach((componentEl: HTMLElement) => {
    const componentName = componentEl.dataset.name;
    if (componentName && componentName === toTopName) componentEl.classList.add("top");
    else componentEl.classList.remove("top");
  });
});
</script>

<template>
  <div class="container">
    <div class="container-item" :ref="(el) => componentList.push(el)" data-name="effect-3d-cube-b">
      <Cube3DB></Cube3DB>
    </div>
    <div class="container-item" :ref="(el) => componentList.push(el)" data-name="effect-3d-cube-a">
      <Cube3DA></Cube3DA>
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
  display: flex;
  flex-direction: column;
}

.container .container-item {
  display: flex;
  height: 85vh;
  overflow: hidden;
}
.container .container-item.top {
  order: -1;
}
</style>
