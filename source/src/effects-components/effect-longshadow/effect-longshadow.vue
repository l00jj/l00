<script setup lang="ts">
import { onMounted } from "vue";
import EffectLongShadowA from "./l00-EffectLongShadow-A.vue";
import EffectLongShadowB from "./l00-EffectLongShadow-B.vue";

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
    <div class="container-item" :ref="(el) => componentList.push(el)" data-name="effect-longshadow-b">
      <EffectLongShadowB></EffectLongShadowB>
    </div>
    <div class="container-item" :ref="(el) => componentList.push(el)" data-name="effect-longshadow-a">
      <EffectLongShadowA></EffectLongShadowA>
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
}
.container .container-item.top {
  order: -1;
}
</style>
