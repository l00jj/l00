<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import ProjectInfo from "@src/stores/ProjectInfo";
import allEffectsList from "@src/stores/effectsList";
import allGraphicsList from "@src/stores/graphicsList";
import ExamplesList from "./Section-2-ExamplesList.vue";
import BannerEffects from "./Section-2-1-Banner-Css3DText.vue";
import BannerGraphics from "./Section-2-2-Banner-RenderView-Text.vue";

const effectsList: ProjectInfo[] = allEffectsList.slice(0, 10);
const graphicsList: ProjectInfo[] = allGraphicsList.slice(0, 10);
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="banner">
        <BannerEffects> </BannerEffects>
      </div>
      <ExamplesList :list="effectsList" base="effects" style="background: #333333"></ExamplesList>
    </div>
    <div class="container">
      <div class="banner">
        <BannerGraphics></BannerGraphics>
      </div>
      <ExamplesList :list="graphicsList" base="metaverse" style="background: #f4f4f4"></ExamplesList>
    </div>
  </section>
</template>

<style scoped>
section.section {
  position: relative;
  box-shadow: 0px 0px 50px rgb(0 0 0 / 50%);
}
.container {
}
.container .banner {
  position: relative;
  width: 100vw;
  height: 70vh;
}
</style>
