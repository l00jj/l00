<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import NeonBoxA from "./l00-NeonBox-A.vue";
import NeonButtonA from "./l00-NeonButton-A.vue";
import NeonButtonB from "./l00-NeonButton-B.vue";
import NeonTextA from "./l00-NeonText-A.vue";
import NeonTextB from "./l00-NeonText-B.vue";
import NeonTextC from "./l00-NeonText-C.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="effect-neon-button-b">
      <NeonButtonB></NeonButtonB>
    </ViewItem>

    <ViewItem style="height: 80vh; background-color: #000" name="effect-neon-button-a">
      <div style="display: flex">
        <div>
          <NeonBoxA :neonSize="40" neonPadding="100px"></NeonBoxA>
        </div>
        <div style="display: flex; margin-left: 10%; align-items: center">
          <NeonButtonA neonColor="#5bfd40">welcome</NeonButtonA>
          <NeonButtonA neonColor="#33bfeb">welcome</NeonButtonA>
          <NeonButtonA neonColor="#f276f8">welcome</NeonButtonA>
        </div>
      </div>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-c">
      <NeonTextC text="Happy Weekend"></NeonTextC>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-b">
      <NeonTextB text="Loading"></NeonTextB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-neon-text-a">
      <NeonTextA text="Happy Weekend"></NeonTextA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
