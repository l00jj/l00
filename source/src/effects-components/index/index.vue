<script setup lang="ts">
import { computed, inject } from "vue";
import Banner from "./components/Banner.vue";
import pageList from "@src/stores/effectsList";

const list = computed(() => pageList.slice(1));

const href = computed(() => new URL(window.location.pathname, window.location.origin).href);
</script>

<template>
  <div class="banner">
    <Banner></Banner>
  </div>
  <ul class="list">
    <li v-for="page in list">
      <a :href="`${href}#${page?.id}`"><img :src="page?.coverUrl" :alt="page?.id" loading="lazy" /></a>
    </li>
  </ul>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.banner {
  position: relative;
  width: 100%;
  height: 80vh;
}

ul {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 6em 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #333;
}
ul li {
  position: relative;
  width: 360px;
  margin: 0 1.5em 3em;
  border-radius: 10px;
  overflow: hidden;
  list-style: none;
  box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
  transition: 380ms;
  filter: grayscale(100%);
}
ul li:hover {
  filter: grayscale(0%);
  transform: scale(110%, 110%);
}
ul li a {
  display: block;
}
img {
  display: block;
  width: 100%;
}

/*竖屏*/
@media all and (orientation: portrait) {
  .banner {
    height: 55vh;
  }
  ul {
    padding: 3em 2.5%;
  }
  ul li {
    width: 45%;
    margin: 0 2.5% 8%;
    border-radius: 10px;
    overflow: hidden;
    list-style: none;
    box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
    transition: 380ms;
    filter: grayscale(100%);
  }
}
</style>
