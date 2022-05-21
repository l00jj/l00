<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
</script>

<template>
  <section class="container" style="">
    <div class="header">
      <h1><slot name="title"></slot></h1>
      <span><slot name="introduce"></slot></span>
    </div>
    <div class="content">
      <div class="preview">
        <slot name="preview"></slot>
      </div>
      <div class="console">
        <slot name="console"></slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 5em;
  background: #f5f5f7;
}
.header {
  position: relative;
  font-size: 16px;
  z-index: 1;
}
.header h1 {
  font-size: 4em;
  line-height: 1em;
  margin: 0.2em 0;
}

.content {
  --size: 500px;
  --shadow: calc(var(--size) * -0.03) calc(var(--size) * -0.03) calc(var(--size) * 0.06) hsla(0, 0%, 100%, 0.4),
    calc(var(--size) * -0.06) calc(var(--size) * -0.06) calc(var(--size) * 0.12) hsla(0, 0%, 100%, 0.8),
    calc(var(--size) * 0.03) calc(var(--size) * 0.03) calc(var(--size) * 0.06) hsla(219, 13%, 42%, 0.067),
    calc(var(--size) * 0.06) calc(var(--size) * 0.06) calc(var(--size) * 0.12) hsla(218, 13%, 42%, 0.288);
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
}
.preview {
  position: relative;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--size) / 15);
  background: #fff;
  box-shadow: var(--shadow);
}

.console {
  position: relative;
  width: calc(100% - 1.25 * var(--size));
  height: var(--size);
  box-sizing: border-box;
  padding: 2em;
  border-radius: calc(var(--size) / 15);
  background: transparent;
  transition: 1s;
}

.console:hover {
  background: #fff;
  box-shadow: var(--shadow);
}
</style>
