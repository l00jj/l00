<script setup lang="ts">
import { inject } from "vue";
import ProjectsRouter from "./ProjectsRouter";

const projectsRouter = inject("projectsRouter") as ProjectsRouter;
const projects = projectsRouter.projects;
</script>

<template>
  <ul>
    <li v-for="project in projects">
      <router-link :to="project.href"><img :src="project.coverUrl" :alt="project.id" loading="lazy" /></router-link>
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
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

ul li a {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
  filter: grayscale(100%);
  transition: 380ms;
}
ul li:hover a {
  filter: grayscale(0%);
  transform: scale(110%, 110%);
}
img {
  display: block;
  width: 100%;
}

/*竖屏*/
@media all and (orientation: portrait) {
  ul {
    padding: 3em 2.5%;
  }
  ul li {
    width: 45%;
    margin: 0 2.5% 8%;
  }
}
</style>
