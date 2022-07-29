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
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1em 3em rgba(0, 0, 0, 0.1);
}
.preview::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  transition: 0.3s;
}
.preview:hover::before {
  border: 3px solid black;
}
</style>
