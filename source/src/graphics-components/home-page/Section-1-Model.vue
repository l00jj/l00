<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import View from "./View/index";
//
const props = defineProps<{
  progress: number;
}>();

const parameter = {
  blur: 100,
};

const containerStyle = computed(() => {
  const progress = props.progress >1 ?1:props.progress;
  //if(progress===-1)
  const blur = parameter.blur * Math.pow(progress, 3);
  const translateY = -viewArea.height * (progress > 0.5 ? progress - 0.5 : 0);
  const opacity = 1 - Math.pow((progress > 0.5 ? progress - 0.5 : 0) * 2, 3);
  return {
    "--blur": `${blur}px`,
    "--opacity": `${opacity}`,
    "--translateY": `${translateY}px`,
  };
});

const viewArea = (() => {
  const viewArea = reactive({
    el: {} as HTMLElement,
    top: 0,
    height: 0,
  });

  const onResize = () => {
    const viewAreaEl = viewArea.el;
    viewArea.top = viewAreaEl.offsetTop;
    viewArea.height = viewAreaEl.offsetHeight;
  };

  // 装载与卸载监听
  let resizeObserver: ResizeObserver;
  const setResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => onResize());
    } else {
      window.addEventListener("resize", onResize);
    }
    onResize();
  };
  const removeResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener("resize", onResize);
    }
  };
  onMounted(() => setResizeObserver());
  onUnmounted(() => removeResizeObserver());

  return viewArea;
})();

defineExpose({ viewArea });
</script>

<template>
  <section class="container" :ref="(el) => (viewArea.el = el as HTMLElement)">
    <div class="text" :style="containerStyle">
      <div class="title"><span>He</span><span>llo</span></div>
      <div class="left">
        <span>Welcome to<br />l00 Studio</span>
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

.text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: #888888;
  justify-content: center;
  align-items: center;
  opacity: var(--opacity);
  filter: blur(var(--blur));
  transform: translateY(var(--translateY));
  transition: 0.1s;
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
