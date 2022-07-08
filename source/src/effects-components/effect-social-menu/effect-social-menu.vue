<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import SocialMenuFlatA from "./l00-SocialMenuFlat-A.vue";
import SocialMenuCubeA from "./l00-SocialMenuCube-A.vue";
import SocialMenuCubeB from "./l00-SocialMenuCube-B.vue";
import SocialMenuCubeC from "./l00-SocialMenuCube-C.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh" name="effect-social-menu-cube-c">
      <SocialMenuCubeC direction="left"></SocialMenuCubeC>
      <SocialMenuCubeC direction="right"></SocialMenuCubeC>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-social-menu-flat-a">
      <SocialMenuFlatA></SocialMenuFlatA>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-social-menu-cube-b">
      <SocialMenuCubeB></SocialMenuCubeB>
    </ViewItem>

    <ViewItem style="height: 90vh" name="effect-social-menu-cube-a">
      <SocialMenuCubeA></SocialMenuCubeA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
