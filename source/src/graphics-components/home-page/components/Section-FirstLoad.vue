<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  loaded: number;
  loadTotal: number;
  progress: number;
  isReady: boolean;
}>();

const progress = computed(() => `${props.progress * 100}%`);
</script>

<template>
  <Transition name="fade">
    <section class="loader" v-if="!isReady">
      <div class="container">
        <div class="text"><span>Hi，我来了，等等</span></div>
        <div class="progress" :style="{ width: progress }"></div>
        <div class="percentage">
          <span>{{ props.loaded }}/{{ props.loadTotal }}</span>
        </div>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #ffffffcc;
  backdrop-filter: blur(10px);
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.progress {
  --size: 0.25em;
  position: absolute;
  width: 30%;
  height: var(--size);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--size) / 2);
  background: radial-gradient(#ff7700 30%, #fff);
  transition: 1s;
}
.progress::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(#ff7700 30%, #fff);
  filter: blur(10px);
}
.text {
  position: absolute;
  color: #ff7700;
  font-size: 2em;
  transform: translateY(-1.2em);
}
.percentage {
  position: absolute;
  color: #ff7700;
  transform: translateY(1.8em);
}
</style>


<style scoped>
.fade-leave-active {
  opacity: 0;
  backdrop-filter: blur(0px);
  transition: all 1s;
}
/* 

.fade-enter-from,
.fade-reverse-leave-to {
  opacity: 0;
  filter: blur(5em);
  transform: translateY(30vh);
}

.fade-enter-to {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0vh);
}

.fade-leave-from,
.fade-reverse-leave-from {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0vh);
}

.fade-leave-to,
.fade-reverse-enter-from {
  opacity: 0;
  filter: blur(5em);
  transform: translateY(-30vh);
} */
</style>