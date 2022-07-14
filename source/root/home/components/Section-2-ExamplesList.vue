<script setup lang="ts">
import ProjectInfo from "@src/stores/ProjectInfo";

const props = defineProps<{
  list: ProjectInfo[];
  base: string;
}>();

const projects: ProjectInfo[] = props.list;
//console.log(projects);

// 转化链接
class GetHref {
  static origin = new URL(import.meta.env.BASE_URL, location.origin).href;
  static from = (id: string) => {
    return new URL(`./${props.base}/#/${id}`, this.origin).href;
  };
}
</script>

<template>
  <ul>
    <li v-for="project in projects">
      <a :href="GetHref.from(project.id)" target="blank">
        <div class="card">
          <img :src="project.coverUrl" :alt="project.id" loading="lazy" />
        </div>
      </a>
    </li>
    <a :href="GetHref.from('')" target="blank"><div class="more">查看更多</div></a>
  </ul>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

a,
a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
}

ul {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 6em 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3em 2em;
  background: none;
}
ul li {
  list-style: none;
  position: relative;
  display: inline-flex;
}

.card {
  position: relative;
  width: 352px;
  /* height: 198px; */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
  transition: 380ms;
  filter: grayscale(100%);
}
.card img {
  pointer-events: none;
  display: block;
  width: 100%;
}

.card:hover {
  filter: grayscale(0%);
  transform: scale(110%, 110%);
}

.more {
  position: relative;
  width: 70vw;
  height: 3.5em;
  margin-top: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  background: linear-gradient(135deg, #f48fff, #57a3ff);
  box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
  filter: grayscale(100%);
  transition: 380ms;
}
.more:hover {
  filter: grayscale(0%);
  transform: scale(110%, 110%);
}

/*竖屏*/
@media all and (orientation: portrait) {
  ul {
    padding: 3em 4vw;
    gap: 5vw 4vw;
  }
  .card {
    width: 44vw;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
    transition: 380ms;
    filter: grayscale(100%);
  }
}

/* 兼容iphone6+ */
@media (orientation: portrait) and (max-device-height: 844px) and (-webkit-min-device-pixel-ratio: 2) {
  ul {
    padding: 3em 2vw;
    gap: unset;
  }
  .card {
    width: 44vw;
    height: auto;
    margin: 0 2vw 5vw;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 60px #00000033, 0 10px 30px #00000033, 0 5px 10px #00000033;
    transition: 380ms;
    filter: grayscale(100%);
  }
}
</style>
