<script setup lang="ts">
import { ref } from "vue";
import DazzleBorderA from "./l00-DazzleBorder-A.vue";
import DazzleBorderB from "./l00-DazzleBorder-B.vue";
import DazzleBorderBSMode from "./l00-DazzleBorder-B-SMode.vue";
</script>

<template>
  <section style="background: #0e1538">
    <div class="float" style="top: 10%; left: 5%">
      <DazzleBorderA></DazzleBorderA>
    </div>
    <div class="float" style="top: 20%; left: 90%">
      <DazzleBorderA></DazzleBorderA>
    </div>
    <div class="float" style="top: 90%; left: 10%">
      <DazzleBorderA></DazzleBorderA>
    </div>
    <div class="float" style="top: 95%; left: 80%">
      <DazzleBorderA></DazzleBorderA>
    </div>
    <DazzleBorderA>
      <h2 style="font-size: 3em; color: #fff">Dazzle</h2>
    </DazzleBorderA>
  </section>
  <section style="background: #0c002b">
    <div class="float" style="top: 10%; left: 5%">
      <DazzleBorderBSMode></DazzleBorderBSMode>
    </div>
    <div class="float" style="top: 20%; left: 90%">
      <DazzleBorderBSMode></DazzleBorderBSMode>
    </div>
    <div class="float" style="top: 90%; left: 10%">
      <DazzleBorderBSMode></DazzleBorderBSMode>
    </div>
    <div class="float" style="top: 95%; left: 80%">
      <DazzleBorderBSMode></DazzleBorderBSMode>
    </div>
    <DazzleBorderB>Dazzle</DazzleBorderB>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  position: relative;
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.float {
  position: absolute;
}

.float>* {
  transform: translateX(-50%) translateY(-50%);
}
</style>
