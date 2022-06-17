<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import DazzleBorderA from "./l00-DazzleEdge-A.vue";
import DazzleBorderASMode from "./l00-DazzleEdge-A-SMode.vue";
import DazzleBorderD from "./l00-DazzleEdge-D.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh; background: #0e1538" name="effect-dazzle-edge-d">
      <div class="float" style="position: absolute; top: 10%; left: 5%">
        <DazzleBorderD></DazzleBorderD>
      </div>
      <div class="float" style="position: absolute; top: 20%; left: 90%">
        <DazzleBorderD></DazzleBorderD>
      </div>
      <div class="float" style="position: absolute; top: 90%; left: 10%">
        <DazzleBorderD></DazzleBorderD>
      </div>
      <div class="float" style="position: absolute; top: 95%; left: 80%">
        <DazzleBorderD></DazzleBorderD>
      </div>
      <DazzleBorderD>
        <h2 style="font-size: 3em; color: #fff">Dazzle</h2>
      </DazzleBorderD>
    </ViewItem>
    <ViewItem style="height: 90vh; background: #0c002b" name="effect-dazzle-edge-a">
      <div class="float" style="position: absolute; top: 10%; left: 5%">
        <DazzleBorderASMode></DazzleBorderASMode>
      </div>
      <div class="float" style="position: absolute; top: 20%; left: 90%">
        <DazzleBorderASMode></DazzleBorderASMode>
      </div>
      <div class="float" style="position: absolute; top: 90%; left: 10%">
        <DazzleBorderASMode></DazzleBorderASMode>
      </div>
      <div class="float" style="position: absolute; top: 95%; left: 80%">
        <DazzleBorderASMode></DazzleBorderASMode>
      </div>
      <DazzleBorderA>Dazzle</DazzleBorderA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
