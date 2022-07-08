<script setup lang="ts">
import { reactive, ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";
import Text from "./Section-1-Text.vue";
//
const props = defineProps<{
  scroll: number;
}>();
</script>

<template>
  <Text :scroll="props.scroll"></Text>
</template>

<style scoped>
</style>
