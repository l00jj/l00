<script setup lang="ts">
import { onMounted } from "vue";
import EffectGlassmorphismA from "./l00-EffectGlassmorphism-A.vue";
import EffectGlassmorphismB_Group from "./l00-EffectGlassmorphismB-Group.vue";
import EffectGlassmorphismB_Item from "./l00-EffectGlassmorphismB-Item.vue";
import EffectGlassmorphismC from "./l00-EffectGlassmorphism-C.vue";

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
    <!--  -->
    <div
      class="container-item"
      :ref="(el) => componentList.push(el)"
      data-name="effect-glassmorphism-c"
      style="background: #350048; justify-content: center; align-items: center"
    >
      <EffectGlassmorphismC color="#ff1f71">Glass</EffectGlassmorphismC>
      <EffectGlassmorphismC color="#2bd2ff">Glass</EffectGlassmorphismC>
      <EffectGlassmorphismC color="#1eff45">Glass</EffectGlassmorphismC>
    </div>
    <!--  -->
    <div
      class="container-item"
      :ref="(el) => componentList.push(el)"
      data-name="effect-glassmorphism-b"
      style="background: #1e2759; justify-content: center; align-items: center"
    >
      <EffectGlassmorphismB_Group>
        <EffectGlassmorphismB_Item :active="true">
          <a><span>Home</span></a>
        </EffectGlassmorphismB_Item>
        <EffectGlassmorphismB_Item>
          <a><span>person</span></a>
        </EffectGlassmorphismB_Item>
        <EffectGlassmorphismB_Item>
          <a><span>+</span></a>
        </EffectGlassmorphismB_Item>
        <EffectGlassmorphismB_Item>
          <a><span>setting</span></a>
        </EffectGlassmorphismB_Item>
        <EffectGlassmorphismB_Item>
          <a><span>chat</span></a>
        </EffectGlassmorphismB_Item>
      </EffectGlassmorphismB_Group>
    </div>
    <!--  -->
    <div class="container-item" :ref="(el) => componentList.push(el)" data-name="effect-glassmorphism-a">
      <EffectGlassmorphismA></EffectGlassmorphismA>
    </div>
    <!--  -->
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
