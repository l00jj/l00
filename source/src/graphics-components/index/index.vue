<script setup lang="ts">
import { ref, reactive, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import Banner from "./components/Banner.vue";
import list from "@src/stores/graphicsList";

const pageList = list.slice(1);
const href = computed(() => window.location.href);
</script>

<template>
  <div class="banner">
    <Banner></Banner>
  </div>
  <ul class="list">
    <li v-for="page in pageList">
      <a :href="`${href}#${page?.id}`"><img :src="page?.coverUrl" :alt="page?.id" loading="lazy" /></a>
    </li>
  </ul>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
ul {
  position: relative;
  width: 100%;
  display:flex;
  margin: 0;
  padding: 6em 10%;
  background: #333;
}
ul li {
  position: relative;
  width: 480px;
  height: 270px;
  margin: 0 3em 3em;;
  border-radius: 10px;
  overflow: hidden;
  list-style: none;
  box-shadow: 0 10px 60px #00000033,0 10px 30px #00000033,0 5px 10px #00000033;
  transition: 380ms;
  filter: grayscale(100%);
}
ul li:hover {
  filter: grayscale(0%);
  transform: scale(110%, 110%);
}
img {
  width: 100%;
}
</style>
