<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
import { createID } from "@src/utils/Tools";

const props = defineProps<{
  markerFill?: string;
  pathStroke?: string;
}>();

const markerFill = computed(() => (props.markerFill ? props.markerFill : "#fff"));
const pathStroke = computed(() => (props.pathStroke ? props.pathStroke : "#fff"));

const uuid = createID();

const markerID = `marker_${uuid}`;
const marker = {
  id: markerID,
  uesID: `url(#${markerID})`,
};

const pathDText =
  "M90.19,70.12 L30.58,107.63 42.47,186.86 21.98,216.17 53.21,250.19 58.71,284.58 108.93,332.63 150,343.4 199.23,326.2 246,277 246,249.34 276.79,224.18 256.31,186.24 271.3,115.97 214.41,77.11 176.82,49.85" +
  "M176.82,49.85 L107.46,100.88 271.3,115.97 217.21,151.21 256.31,186.24 235.38,206.58 276.79,224.18" +
  "M90.19,70.12 L150,70.12 30.58,107.63 50.14,129.3 107.46,100.88 217.21,151.21 66.22,154.7 42.47,186.86 76.92,174.84 90.19,196.62 76.92,221.11" +
  "M50.14,129.3 L93.48,123.25 76.92,154.45 76.92,221.11 21.98,216.17" +
  "M53.21,250.19 L74.84,239.52 150,249.34 214.41,180.01" +
  "M108.93,332.63 L209.83,294.51 235.38,206.58 192.13,151.79 90.19,196.62 58.71,284.58" +
  "M129.13,179.5 L150,249.34 199.23,326.2 209.83,294.51 246,249.34 230.27,224.18" +
  "M190.65,205.59 L137.23,206.58 74.84,239.52 82.28,307.14 150,249.34";
</script>

<template>
  <svg viewBox="0 0 300 400">
    <defs>
      <marker
        :id="marker.id"
        viewBox="0 0 30 30"
        refX="15"
        refY="15"
        markerWidth="22"
        markerHeight="22"
        markerUnits="userSpaceOnUse"
      >
        <circle cx="15" cy="15" r="10" :fill="markerFill" stroke-width="0" />
      </marker>
    </defs>
    <path
      :d="pathDText"
      :marker-start="marker.uesID"
      :marker-mid="marker.uesID"
      fill="none"
      :stroke="pathStroke"
      stroke-width="4"
    />
  </svg>
</template>

<style scoped></style>
