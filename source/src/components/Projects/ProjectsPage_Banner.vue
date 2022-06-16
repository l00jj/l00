<script setup lang="ts"></script>

<template>
  <div class="banner">
    <slot></slot>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.banner {
  position: relative;
  width: 100%;
  height: 80vh;
}

/*竖屏*/
@media all and (orientation: portrait) {
  .banner {
    height: 55vh;
  }
}
</style>
