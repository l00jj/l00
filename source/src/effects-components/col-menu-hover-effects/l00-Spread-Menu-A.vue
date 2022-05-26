<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  color?: string | [string, string];
}>();

const option = reactive({
  neonColor: `hsl(317 100% 54%)`, //
  bgColor: `#222`, //
});

defineExpose({ option });

const mainStyle = computed(() => {
  return Object.entries({
    "--bgColor": `${option.bgColor}`,
  }).reduce((v, i) => `${v}${i[0]}:${i[1]};`, "");
});

const list = computed(() => ["Home", "About Me", "My Service", "Portfolio", "Contact"]);
</script>

<template>
  <ul class="list" :style="mainStyle">
    <li v-for="item in list">
      <a :data-text="item">{{ item }}</a>
    </li>
  </ul>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  --describe-color: #3bffe8;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

ul li {
  list-style: none;
}

ul li a {
  position: relative;
  display: inline-block;
  margin: 0.25em 0;
  font-size: 4em;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  transition: 500ms;
  transition-delay: 0.5s;
  cursor: pointer;
}

ul li a:hover {
  color: rgba(255, 255, 255, 0.1);
  transform: translateY(-0.3em);
  transition-delay: 0s;
}

ul li a::before {
  content: attr(data-text);
  pointer-events: none;
  position: absolute;
  bottom: -0.35em;
  font-size: 0.35em;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: 3em;
  color: var(--describe-color);
  opacity: 0;
  transition: 500ms;
  text-shadow: 0 0 0.15625em var(--describe-color), 0 0 0.46875em var(--describe-color),
    0 0 1.25em var(--describe-color);
  transition-delay: 0.25s;
}
ul li a:hover:before {
  letter-spacing: 0.35em;
  opacity: 1;
}
</style>
