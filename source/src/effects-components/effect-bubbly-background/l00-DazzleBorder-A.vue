<script setup lang="ts">
import { ref, reactive, onMounted, provide } from "vue";

const props = defineProps<{
  color?: string
}>()

const color = ref(props.color ? props.color : "#ff1f71")

</script>

<template>
  <div id="panel">
    <div id="effect"></div>
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#panel {
  --width: 300px;
  --height: 400px;
  --size-min: min(var(--width), var(--height));
  --border-width: 2px;
  --border-radius: calc(var(--size-min)*0.06);
  --dur: 0.5s;
  position: relative;
  width: var(--width);
  height: var(--height);
}

#panel>#effect {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--border-radius);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

#panel>#effect::after {
  content: '';
  position: absolute;
  inset: var(--border-width);
  border-radius: calc(var(--border-radius) - var(--border-width));
  background: #0c1538;
}

#panel>#effect::before {
  content: '';
  position: absolute;
  width: calc(var(--size-min)/2);
  height: calc(var(--size-min)*2);
  background: linear-gradient(#00ccff, #d400d4);
  animation: animate 2s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
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
