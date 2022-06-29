<script setup lang="ts">
import { reactive } from "vue";

class Li {
  color: string;
  title: string;
  style = {
    "--color": "",
    "--title": "",
  };
  constructor(input: any) {
    this.color = input.color;
    this.title = input.title;
    this.style["--color"] = this.color;
    this.style["--title"] = `"${this.title}"`;
  }
}

const list = reactive(
  [
    {
      color: "#00ade1",
      title: "Home",
    },
    {
      color: "#ff6493",
      title: "About",
    },
    {
      color: "#ffdd1c",
      title: "Serviced",
    },
    {
      color: "#00dc82",
      title: "Tram",
    },
    {
      color: "#dc00d4",
      title: "Contact",
    },
  ].map((item) => new Li(item)) as Li[]
);
</script>

<template>
  <section class="backround">
    <ul class="list">
      <li v-for="item in list" :style="item.style">
        <a><span></span></a>
      </li>
    </ul>
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

.backround {
  background: #252839;
}

ul {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 30px;
}

ul li {
  position: relative;
  list-style: none;
}

ul li a {
  position: relative;
  display: inline-flex;
  font-size: 4em;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
}

ul li a::before {
  /* content: attr(data-text); */
  content: var(--title);
  position: relative;
}

ul li a span {
  position: absolute;
  left: 0;
  width: 0%;
  border-right: 9px solid var(--color);
  overflow: hidden;
  transition: 1s;
}

ul li a:hover span {
  width: 100%;
  filter: drop-shadow(0 0 25px var(--color));
}

ul li a span::before {
  /* content: attr(data-text); */
  content: var(--title);
  position: relative;
  color: var(--color);
  -webkit-text-stroke: 1px var(--color);
}

ul li a::before,
ul li a span::before {
  padding: 0 1em;
}
</style>
