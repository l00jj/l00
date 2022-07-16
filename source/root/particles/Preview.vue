<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="preview">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  margin: 3em;
  display: flex;
  justify-content: center;
}
.preview {
  position: relative;
  width: 80vw;
  height: 60vh;
  border: 3px solid transparent;
  box-shadow: 0 1em 3em rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}
.preview:hover {
  border: 3px solid red;
}
</style>
