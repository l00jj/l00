<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import Cube3DCageA from "./l00-3DCube-Cage-A.vue";
import Cube3DA from "./l00-3DCube-A.vue";
import Cube3DB from "./l00-3DCube-B.vue";
import Cube3DButtonA from "./l00-3DCubeButton-A.vue";
import Cube3DButtonB from "./l00-3DCubeButton-B.vue";
import Cube3DCardA from "./l00-3DCubeCard-A.vue";
import Cube3DCardC from "./l00-3DCube-C.vue";
import Cube3DD from "./l00-3DCube-D.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 80vh" name="effect-3d-cube-d">
      <Cube3DD></Cube3DD>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-b">
      <Cube3DB></Cube3DB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-a">
      <Cube3DA></Cube3DA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-c">
      <Cube3DCardC></Cube3DCardC>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-button-b">
      <Cube3DButtonB></Cube3DButtonB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-card-a">
      <Cube3DCardA></Cube3DCardA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-button-a">
      <Cube3DButtonA text="welcome"></Cube3DButtonA>
    </ViewItem>

    <ViewItem style="height: 95vh" name="effect-3d-cube-cage-a">
      <Cube3DCageA></Cube3DCageA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
