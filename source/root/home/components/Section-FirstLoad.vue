<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  loaded: number;
  loadTotal: number;
  progress: number;
  isLoading: boolean;
}>();
defineEmits(["onAfterLeave"]);
const progress = computed(() => `${props.progress * 100}%`);
</script>

<template>
  <Transition name="fade" @after-leave="$emit('onAfterLeave', $event)">
    <section class="loader" v-if="isLoading">
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
  --progresHeight: 0.25em;
  --color: #ff7700;
  --color: #777;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
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
  position: absolute;
  width: 20%;
  height: var(--progresHeight);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--size) / 2);
  background: radial-gradient(var(--color) 30%, #ffffff00);
  transition: 1s;
}
.progress::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(var(--color) 30%, #ffffff00);
  filter: blur(10px);
}
.text {
  position: absolute;
  color: var(--color);
  font-size: 2em;
  transform: translateY(-1.2em);
}
.percentage {
  position: absolute;
  color: var(--color);
  transform: translateY(1.8em);
}
</style>

<style scoped>
.fade-leave-active {
  opacity: 0;
  backdrop-filter: blur(0px);
  transition: all 1.5s;
}
</style>
