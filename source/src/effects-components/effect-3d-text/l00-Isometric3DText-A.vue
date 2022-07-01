<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { vLongshadow } from "../effect-longshadow/vLongshadow";

const props = defineProps<{
  text: string;
}>();

const viewStyle = reactive({
  "--shadowTransform": "",
  "--textShadow": "",
});

const createTextshadow = (length: number, step: number) => {
  const textshadow = [];
  for (let offset = step, len = length; offset <= len; offset += step) {
    textshadow.push(`-${offset}px ${offset}px 0 #d9d9d9`);
  }
  return textshadow.join(",");
};

const shadowLength = 30;
viewStyle["--shadowTransform"] = `translate(-${shadowLength}px, ${shadowLength}px)`;
viewStyle["--textShadow"] = createTextshadow(shadowLength, 0.5);
</script>

<template>
  <section class="background">
    <div class="view" :style="viewStyle">
      <span class="shadow">{{ props.text }}</span>
      <span class="text">{{ props.text }}</span>
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
.background {
  background: #f1f1f1;
}
.view {
  position: relative;
  width: 800px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-28deg) skew(25deg);
}
.view span {
  position: relative;
  color: #fff;
  font-size: 12em;
  font-weight: 700;
  line-height: 0.9em;
  letter-spacing: 2px;
  text-align: center;
  vertical-align: bottom;
  text-shadow: var(--textShadow);
}
.view span.shadow {
  position: absolute;
  color: rgba(0, 0, 0, 0.3);
  transform: var(--shadowTransform);
  filter: blur(8px);
}
</style>
