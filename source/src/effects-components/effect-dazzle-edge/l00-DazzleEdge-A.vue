<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";

const props = defineProps<{
  dazzle?: boolean;
}>();
</script>

<template>
  <button>
    <div id="panel">
      <div id="glass"></div>
      <div id="light">
        <div id="top"></div>
        <div id="right" class="delay"></div>
        <div id="bottom"></div>
        <div id="left" class="delay"></div>
      </div>
    </div>
    <div id="content">
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  --light-width: 2px;
  --dur: 2s;
  position: relative;
  display: flex;
  padding: 30px 60px;
  font-size: 30px;
  color: #1670f0;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0;
  /* cursor:pointer; */
  background: #0c002b;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

button>#panel>#glass {
  position: absolute;
  inset: var(--light-width);
  overflow: hidden;
}

button>#panel>#glass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
  transform: skewX(45deg) translateX(-50%);
}

button>#panel>#light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

button>#panel>#light>#top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--light-width);
  background: linear-gradient(to right, #1779ff00, #1779ffff);
  animation: animateTop var(--dur) linear infinite;
}

@keyframes animateTop {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

button>#panel>#light>#right {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--light-width);
  height: 100%;
  background: linear-gradient(to bottom, #1779ff00, #1779ffff);
  animation: animateRight var(--dur) linear infinite;
}

button>#panel>#light>#right.delay {
  animation-delay: calc(-1*var(--dur)/2);
}

@keyframes animateRight {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100%);
  }
}

button>#panel>#light>#bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--light-width);
  background: linear-gradient(to left, #1779ff00, #1779ffff);
  animation: animateBottom var(--dur) linear infinite;
}

@keyframes animateBottom {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

button>#panel>#light>#left {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--light-width);
  height: 100%;
  background: linear-gradient(to top, #1779ff00, #1779ffff);
  animation: animateLeft var(--dur) linear infinite;
}

button>#panel>#light>#left.delay {
  animation-delay: calc(-1*var(--dur)/2);
}

@keyframes animateLeft {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(-100%);
  }
}

#panel #content {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
