<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onUnmounted } from "vue";

const props = defineProps<{
  name: string;
}>();

const route = useRoute();
const routeName = computed(() => route.name);
const isTop = computed(() => routeName.value === props.name);
</script>
<template>
  <div class="effectsProjectView-item" :class="{ top: isTop }" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style scoped>
.effectsProjectView-item {
  display: flex;
  height: 100vh;
}

.effectsProjectView-item.top {
  order: -1;
}
</style>
