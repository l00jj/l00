<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";
import Cube3DButton from "./l00-3DCubeButton-B-ElasticCube.vue";
import Cube3DGSAPButton from "./l00-3DCubeButton-B-ElasticCube-GSAP.vue";

const scenes = [
  { text: "Are You Happy?", component: Cube3DButton },
  { text: "Are You Hunger?", component: Cube3DGSAPButton },
].map(({ text, component }, index) => {
  const cubeBg = reactive({
    width: 400,
    height: 200,
    length: 50,
  });

  const cubeBtnA = reactive({
    width: 200,
    height: 150,
    length: 25,
    color: [] as string[],
    uvu: 0,
    isActive: false,
  });
  const cubeOnClick = (input?: boolean) => {
    cubeBtnA.isActive = typeof input === "boolean" ? input : !cubeBtnA.isActive;
    if (cubeBtnA.isActive) {
      cubeBtnA.length = 50;
      cubeBtnA.uvu = 200;
      cubeBtnA.color = ["#ea69ae", "#d12f82", "#c31a70"];
    } else {
      cubeBtnA.length = 25;
      cubeBtnA.uvu = 0;
      cubeBtnA.color = [];
    }
  };
  if (index === 0) cubeOnClick(true);
  return { text, component, cubeBg, cubeBtnA, cubeOnClick };
});
</script>

<template>
  <section class="background">
    <div class="scenes">
      <div class="scene" v-for="scene in scenes">
        <span class="title">{{ scene.text }}</span>
        <Cube3DButton
          :height="scene.cubeBg.height"
          :width="scene.cubeBg.width"
          :length="scene.cubeBg.length"
        ></Cube3DButton>
        <component
          :is="scene.component"
          style="transform: translate(-20px, -60px)"
          :height="scene.cubeBtnA.height"
          :width="scene.cubeBtnA.width"
          :length="scene.cubeBtnA.length"
          :color="scene.cubeBtnA.color"
          :uvu="scene.cubeBtnA.uvu"
          @click="() => scene.cubeOnClick()"
        ></component>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: #393b5b;
}

.scenes {
  position: absolute;
  left: 10%;
  display: flex;
}
.scene {
  position: relative;
  margin-top: 60px;
}
.scene:not(:first-of-type) {
  margin-left: 250px;
}
.scene .title {
  position: absolute;
  top: 0;
  color: #fff;
  font-size: 3em;
  font-weight: 700;
  transform: skew(0deg, -15deg) translate(0px, -70px);
}
</style>
