<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import LoopClimbA from "./l00-LoopClimb-A.vue";
import LoopClimbB from "./l00-LoopClimb-B.vue";
import LoopClimbC from "./l00-LoopClimb-C.vue";
import LoopClimbCircleA from "./l00-LoopClimb-Circle-A.vue";
import LoopClimbCircleB from "./l00-LoopClimb-Circle-B.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-loop-climb-circle-c">
      <LoopClimbC></LoopClimbC>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-loop-climb-circle-b">
      <LoopClimbCircleB></LoopClimbCircleB>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-loop-climb-circle-a">
      <LoopClimbCircleA></LoopClimbCircleA>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-loop-climb-b">
      <LoopClimbB></LoopClimbB>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-loop-climb-a">
      <LoopClimbA></LoopClimbA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
