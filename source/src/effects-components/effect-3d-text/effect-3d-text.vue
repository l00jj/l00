<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import Text3D from "./l00-Text3D-A.vue";
import Circle3DTextA from "./l00-Circle3DText-A.vue";
import Isometric3DTextA from "./l00-Isometric3DText-A.vue";
import Wheel3DTextA from "./l00-Wheel3DText-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh; background: #222" name="effect-3d-text-a">
      <Text3D ref="vText3D">
        <span style="font-size: 3.5rem"><i style="color: #ff246f">l00</i>web<i style="color: #12b5ff">w</i>elcome</span>
      </Text3D>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-3d-text-wheel-a">
      <Wheel3DTextA text="WELCOME"></Wheel3DTextA>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-3d-text-circle-a">
      <Circle3DTextA text="Welcome to l00 - 3D Circle Text Effects"></Circle3DTextA>
    </ViewItem>

    <ViewItem style="height: 100vh" name="effect-3d-text-isometric-a">
      <Isometric3DTextA text="CSS 3D Isometric Text"></Isometric3DTextA>
    </ViewItem>
  </ViewGroup>
</template>
<style scoped></style>
