<script setup lang="ts">
import { ref } from "vue";

const list = Array(10).fill(0);
</script>

<template>
  <div class="container">
    <div class="main">
      <section v-for="item in list">
        <div class="title">CSS Sticky Position Title</div>
        <div class="content">
          <p>
            In the world ,soccer of football is the most popular sport. This is because many countries have wonderful
            teams for the World Cup. The World Cup is held every four years.<br />
            <br />
            To remember 2002 FIFA World Cup ,children from different countries and more than 60 children from Japanese
            schools came together and spent three weekends drawing a big picture called “Dream(梦幻) World Cups ”in
            Japan .The children drew animals, flowers and people playing soccer under a bule bright sky. They wished
            each football team good luck by drawing the flags(旗帜)of all the countries that will take part in the World
            Cup in Japan and South Korea.The picture was put up in a park near a playground in Yokohama .Some football
            teams will have games there.<br />
            <br />
            Are you a football fan(迷)?The World Cup makeds more and more people interested in football
            Teenagers(青少年)like playing and watching football .Many of them love some football stars so much that they
            get the pictures of their favourite players on the walls of their rooms. That is the way to show their love
            for the World Cup as children in Japan.<br />
            <br />
          </p>
        </div>
      </section>
      <div class="tools">Tools</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-top: 100vh;
  padding-bottom: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #111;
}
.container .main {
  position: relative;
  width: 60%;
}
.container section {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: unset;
}

.container section .title {
  position: sticky;
  top: 1em;
  color: #fff;
  font-size: 2em;
  background: #ff1f6b;
}

.container .tools {
  position: sticky;
  bottom: 0%;
  color: #fff;
  font-size: 2em;
  background-color: thistle;
}

.container section .content {
  color: #888;
}
</style>
