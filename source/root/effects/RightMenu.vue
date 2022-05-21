<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import effectsList from "@stores/effectsList";

//const props = defineProps<{}>();

</script>

<template>
  <div class="container">
    <div class="trigger material">:</div>
    <div class="menu material">
      <div class="menu-item" v-for="item in effectsList" :key="item.id">
        <a :href="`#${item.id}`">
          <img :src="item.coverUrl" loading="lazy" />
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
  </div>
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

.container {
  --menuWidth: 150px;
  --shadow: 0 0 25px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 5%;
  right: 0;
  height: 90%;
  z-index: 9999;
  transform: translateX(var(--menuWidth));
  transition: 0.25s;
}
.container:hover {
  transform: translateX(0px);
}

.material {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(30px);
  box-shadow: var(--shadow);
}

.trigger {
  --triggerWdith: 25px;
  position: absolute;
  top: 50%;
  left: calc(var(--triggerWdith) * -1);
  width: var(--triggerWdith);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
  font-size: 30px;
  font-weight: 900;
  border-radius: 5px 0 0 5px;
}
.preview {
  padding: 0;
}
.menu {
  position: relative;
  top: 0;
  right: 0;
  width: var(--menuWidth);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0);
  border-radius: 5px 0 0 5px;
  transition: 0.25s;
}
.container:hover .menu {
  box-shadow: var(--shadow);
}

.menu .menu-item {
  box-sizing: border-box;
  width: 120px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  color: #222;
  font-size: 14px;
}

.menu .menu-item:hover {
  color: black;
}

.menu .menu-item a {
  text-align: center;
}

.menu .menu-item img {
  object-fit: cover;
  width: 100%;
}

.menu .menu-item span {
  text-align: center;
}
</style>
