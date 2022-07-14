<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import PopupVideoPlayerA from "./l00-PopupVideoPlayer-A.vue";
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 100vh" name="base-popup-video-player-a">
      <PopupVideoPlayerA></PopupVideoPlayerA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
