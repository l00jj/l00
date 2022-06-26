<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import Text3D from "./l00-Text3D-A.vue";
import CircleText3DA from "./l00-CircleText3D-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh; background: #222" name="effect-3d-text-a">
      <Text3D ref="vText3D">
        <span style="font-size: 3.5rem"><i style="color: #ff246f">l00</i>web<i style="color: #12b5ff">w</i>elcome</span>
      </Text3D>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-3d-text-circle-a">
      <CircleText3DA text="Welcome to l00 - 3D Circle Text Effects"></CircleText3DA>
    </ViewItem>
  </ViewGroup>
</template>
<style scoped></style>
