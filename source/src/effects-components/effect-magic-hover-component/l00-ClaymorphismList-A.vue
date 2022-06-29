<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, WatchStopHandle, defineExpose } from "vue";

const list = computed(() => [
  {
    name: "Serven H",
    title: "Digital Artist",
  },
  {
    name: "l00",
    title: "UX/UI Designer",
  },
  {
    name: "Jones",
    title: "Backend Developer",
  },
  {
    name: "Devls",
    title: "Illustrator Designer",
  },
  {
    name: "Anderson",
    title: "Food Vloggers",
  },
  {
    name: "Karine",
    title: "Food Vloggers",
  },
  {
    name: "Sunny Liu",
    title: "Photoshop Expert",
  },
]);
</script>

<template>
  <section class="background">
    <div class="container">
      <h3>Popular Creator List</h3>
      <div class="list" v-for="(item, key) in list">
        <div class="rank">
          <span>{{ key + 1 }}</span>
        </div>
        <div class="creator">
          <h4>{{ item.name }}</h4>
          <p>{{ item.title }}</p>
        </div>
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

.background {
  background: #2f363e;
}
.container {
  width: 350px;
  min-height: 500px;
  padding: 50px;
  background: #2f363e;
  border-radius: 30px;
  box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.25), 10px 10px 70px rgba(0, 0, 0, 0.25),
    inset 5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 20px rgba(255, 255, 255, 0.2),
    inset -5px -5px 15px rgba(0, 0, 0, 0.75);
}
.container h3 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.container .list {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
}

.container .list::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background: #1f83f2;
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.25), inset 2px 2px 5px rgba(255, 255, 255, 0.25),
    inset -3px -3px 5px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.container .list:hover::before {
  width: 100%;
}

.container .list .rank {
  position: relative;
  min-width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;
}

.container .list .rank::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #2f363e;
  transform: scale(0);
  transition: 0.5s;
}
.container .list:hover .rank::before {
  transform: scale(1);
}
.container .list:hover .rank span {
  position: relative;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.5s;
}

.container .list .creator {
  position: relative;
  line-height: 1.15rem;
}
.container .list .creator h4 {
  color: #bcbcc0;
  font-weight: 600;
  transition: 0.5s;
}
.container .list .creator p {
  color: #95999d;
  font-size: 0.85rem;
  font-weight: 400;
  transition: 0.5s;
}

.container .list:hover .creator h4,
.container .list:hover .creator p {
  color: #fff;
}
</style>
