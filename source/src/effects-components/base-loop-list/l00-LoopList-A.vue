<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

//const props = defineProps<{}>();

import list from "@src/stores/effectsList";

const all = 5;

const queue = list.slice(0, all).map((item, index) => ({
  index: index + 1,
  coverUrl: item.coverUrl,
}));
queue.push(queue[0]);

console.log(queue);
const params = reactive({
  width: 500,
  steps: queue.length,
  speed: 1.5,
});

const width = computed(() => `${params.width}px`);
const steps = computed(() => `${params.steps - 1}`);
const speed = computed(() => `${params.speed}s`);
</script>

<template>
  <section class="background">
    <div class="container">
      <ul>
        <li v-for="item in queue">
          <img :src="item.coverUrl" alt="" />
          <h2>{{ item.index }}</h2>
        </li>
      </ul>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: #fff;
}
.container {
  width: v-bind(width);
  height: auto;
  overflow: hidden;
  border-radius: 0.5em;
  box-shadow: 0 0 1em rgb(0 0 0 / 20%);
}
ul {
  width: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  animation: move calc(v-bind(steps) * v-bind(speed)) steps(v-bind(steps)) infinite;
  animation-delay: v-bind(speed);
}
ul li {
  list-style: none;
  position: relative;
  width: v-bind(width);
  padding: 0;
  margin: 0;
  line-height: 0;
  animation: liMove v-bind(speed) infinite;
  animation-delay: v-bind(speed);
}

@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(v-bind(width) * v-bind(steps) * -1), 0);
  }
}
@keyframes liMove {
  0% {
    transform: translate(0, 0);
  }
  80%,
  100% {
    transform: translate(calc(v-bind(width) * -1), 0);
  }
}
</style>

<style scoped>
ul li img {
  width: 100%;
}
ul li h2 {
  position: absolute;
  left: 50%;
  bottom: 1em;
  padding: 0.2em;
  line-height: 1;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  background: #ddd;
  transform: translateX(-50%);
}
</style>
