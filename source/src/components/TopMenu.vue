<script setup lang="ts">
import { reactive } from "vue";
import sitePages from "@stores/sitePages";

const option = reactive({
  size: 80,
  bgColor: "#222",
});
defineExpose({ option });

const host = import.meta.env.MODE === "UiExample" ? "/UiExample" : "";
</script>

<template>
  <nav id="top-menu" class="">
    <div id="logo">
      <a :href="`${host}/`"><img src="@assets/logo.svg" alt="l00" /></a>
    </div>
    <div id="actions">
      <div class="goto" v-for="page in sitePages">
        <a :href="page.href">{{ page.name }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}

#top-menu {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333333;
  color: #f5f5f7;
  /* box-shadow: 0 0 35px rgba(0, 0, 0, 0.25); */
  font-size: 16px;
}

#top-menu > #logo {
  padding: 0 2em;
  font-size: 2em;
  font-weight: 900;
}
#top-menu > #logo a {
  display: flex;
}
#top-menu > #logo img {
  height: 0.8em;
}

#top-menu > #actions {
  display: flex;
  overflow: auto;
  padding: 0 2em;
  height: 100%;
  align-items: center;
  align-self: "flex-end";
}

#top-menu > #actions > .goto {
  position: relative;
  margin: 0 2em;
}

#top-menu > #actions > .goto * {
  white-space: nowrap;
}

#top-menu > #actions > .goto::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10px;
  height: 3px;
  width: 0%;
  transform: translateX(-50%);
  border-radius: 3px;
  background: #fff;
  transition: 1s;
}

#top-menu > #actions > .goto:hover::before {
  width: 80%;
}

@media all and (orientation: portrait) {
  #top-menu > #logo {
    padding: 0 1em;
    font-size: 2em;
    font-weight: 900;
  }

  #top-menu > #actions > .goto {
    margin: 0 1em;
  }
}
</style>
