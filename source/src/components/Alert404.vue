<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const props = defineProps<{
  unmount: () => {};
  msg?: string;
}>();

const msg = computed(() => (props.msg ? props.msg : window.location.href));

const isShow = ref(true);
const close = () => {
  isShow.value = false;
};

const onAfterLeave = () => {
  props.unmount();
};
</script>

<template>
  <Transition @after-leave="onAfterLeave">
    <div class="alert404" v-if="isShow" @click.self="close">
      <div class="content">
        <h1>404 - Sorry Not Find</h1>
        <span>{{ msg }}</span>
        <a @click="close"></a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}

.alert404 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffffee;
  z-index: 999;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  font-size: 16px;
  padding: 2em;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 60px #00000005, 0 0 30px #00000005, 0 0 15px #00000011;
}

.content h1 {
  position: relative;
  font-size: 3em;
  font-weight: 900;
  margin-top: 0;
}
.content::before {
  content: "404";
  position: absolute;
  font-size: 25em;
  font-weight: 900;
  right: 0;
  color: #00000003;
  transform: translate(10%, 10%);
}
.content span {
  position: relative;
  margin-bottom: 2em;
}

a {
  cursor: pointer;
  height: 30px;
}

a::before {
  content: "+";
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  transform: rotate(45deg);
  transition: 500ms;
}
a:hover::before {
  color: red;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
