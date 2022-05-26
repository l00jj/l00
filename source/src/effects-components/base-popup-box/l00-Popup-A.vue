<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const container = ref();

const onClick = () => {
  container.value?.classList.toggle("active");
};

const option = reactive({
  bgColor: "#1a242a",
});
defineExpose({ option });

const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数

const mainStyle = computed(() => {
  return Object.entries({
    "--bgColor": `${option.bgColor}`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});
</script>

<template>
  <div class="container" ref="container" :style="mainStyle">
    <div class="content">
      <h2>孤勇者</h2>
      <span
        >去吗 配吗 这褴褛的披风，战吗 战啊 以最卑微的梦，致那黑夜中的呜咽与怒吼，谁说站在光里的才算英雄，他们说
        要戒了你的狂，就像擦掉了污垢，他们说 要顺台阶而上，而代价是低头，那就让我 不可 乘风，你一样骄傲着 那种孤勇
      </span>
    </div>
    <div class="toggleButton" @click.self="onClick"></div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  --containerBgColor: #37444b;
  --transitionTime: 500ms;
  --transitionDelay: 500ms;
  position: relative;
  width: 0;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: var(--containerBgColor);
  transition: var(--transitionTime);
}

.container.active {
  width: 400px;
  height: 400px;
  transition-delay: var(--transitionDelay);
}

.container::before {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 0px;
  height: 0px;
  border-radius: 5px;
  background: var(--containerBgColor);
  transform: rotate(45deg);
  transition: var(--transitionTime);
}
.container.active::before {
  bottom: -15px;
  width: 40px;
  height: 40px;
  transition-delay: var(--transitionDelay);
}

.container .content {
  min-width: 400px;
  padding: 40px;
  color: #fff;
  opacity: 0;
  transition: var(--transitionTime);
  transform: scale(0);
}

.container.active .content {
  opacity: 1;
  transition-delay: var(--transitionDelay);
  transform: scale(1);
}

.toggleButton {
  position: absolute;
  bottom: -20px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #0bcf9c;
  cursor: pointer;
  transition: 500ms;
}
.toggleButton::before {
  content: "+";
  color: #fff;
  font-size: 45px;
  font-weight: 300;
}
.container.active .toggleButton {
  bottom: -90px;
  background: #ff5a57;
  transform: rotate(135deg);
}
</style>
