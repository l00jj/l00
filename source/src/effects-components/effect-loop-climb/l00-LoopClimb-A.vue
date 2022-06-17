<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const parameter = {
  backgroundColor: `#000`,
};

const mainStyle = {
  backgroundColor: `${parameter.backgroundColor}`,
};
</script>

<template>
  <section v-bind="$attrs" :style="mainStyle">
    <div class="container">
      <div class="cube"></div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* box-sizing: content-box; */
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

.container {
  --size: 200px;

  position: relative;
  width: calc(var(--size) * 4);
  transform: rotate(-35deg);
}

.cube {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0004);
  animation: animateSurface 1s ease-in-out infinite;
}

@keyframes animateSurface {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(calc(-1 * var(--size)));
  }
}

.cube::before {
  content: "";
  position: relative;
  width: var(--size);
  height: var(--size);
  background: #03e9f4;
  box-shadow: 0 0 5px rgba(3, 233, 244, 1), 0 0 25px rgba(3, 233, 244, 1), 0 0 50px rgba(3, 233, 244, 1),
    0 0 100px rgba(3, 233, 244, 1), 0 0 200px rgba(3, 233, 244, 0.5), 0 0 300px rgba(3, 233, 244, 0.5);
  transform-origin: bottom right;
  animation: animate 1s ease-in-out infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(90deg);
  }
  65% {
    transform: rotate(85deg);
  }
  70% {
    transform: rotate(90deg);
  }
  75% {
    transform: rotate(87.5deg);
  }
  80%,
  100% {
    transform: rotate(90deg);
  }
}
</style>
