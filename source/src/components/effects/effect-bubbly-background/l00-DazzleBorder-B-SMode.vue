<script setup lang="ts">
import { ref } from "vue";
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
  padding: 120px 120px;
  font-size: 30px;
  color: #fff;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0;
  background: none;
  /* cursor:pointer; */
}

button>#panel>#glass {
  position: absolute;
  inset: var(--light-width);
  overflow: hidden;
}

button>#panel>#light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

button>#panel>#light>* {
  animation: animateOpacity var(--dur) linear infinite;
}

@keyframes animateOpacity {
  0% {
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  85% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

button>#panel>#light>#top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--light-width);
  background: linear-gradient(to right, #1779ff00, #1779ffff);
  animation: animateTop var(--dur) linear infinite,
    animateOpacity var(--dur) linear infinite;
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
  animation: animateRight var(--dur) linear infinite,
    animateOpacity var(--dur) linear infinite;
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
  animation: animateBottom var(--dur) linear infinite,
    animateOpacity var(--dur) linear infinite;
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
  animation: animateLeft var(--dur) linear infinite,
    animateOpacity var(--dur) linear infinite;
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
