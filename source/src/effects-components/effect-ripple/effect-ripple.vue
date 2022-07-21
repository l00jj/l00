<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import RippleHoverA from "./l00-RippleHover-A.vue";
import RippleCikckA from "./l00-RippleClick-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh; background: #040d15" name="effect-ripple-click-a">
      <div class="demo">
        <RippleCikckA><h2>RippleCikckA</h2></RippleCikckA>
        <RippleCikckA :color="['#755bea', '#ff72c0']"><h2>RippleCikckA</h2></RippleCikckA>
      </div>
    </ViewItem>

    <ViewItem style="height: 90vh; background: #222" name="effect-ripple-hover-a">
      <div class="demo">
        <RippleHoverA><h2>RippleHoverA</h2></RippleHoverA>
        <RippleHoverA color="#755bea"><h2>RippleHoverA</h2></RippleHoverA>
      </div>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped>
.demo {
  display: flex;
}
.demo h2 {
  margin: 0;
}
.demo > * {
  margin: 3em;
}
</style>
