<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, WatchStopHandle, defineExpose } from "vue";
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const value = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input type="checkbox" v-model="value" />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input[type="checkbox"],
input[type="checkbox"]::before {
  transition: 0.5s;
}
input[type="checkbox"] {
  appearance: none;
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-image: linear-gradient(90deg, #03a9f4 50%, #c6c6c6 50%);
  background-size: 160px 40px;
  background-position: -60px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
input:checked[type="checkbox"] {
  background-position: -20px;
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 23px;
  border: 20px solid #fff;
  background: #c6c6c6;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transform: translate(-20px, 0px);
}
input:checked[type="checkbox"]::before {
  background: #03a9f4;
  transform: translate(20px, 0px);
}
</style>
