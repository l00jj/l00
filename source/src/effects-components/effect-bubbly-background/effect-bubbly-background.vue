<script setup lang="ts">
import { ref, computed } from "vue";

/* const bgUrl = new URL(`./bg.jpg`, import.meta.url).href */
const quantity = ref(400)
const list = computed(() => Array(quantity.value).fill(0))

</script>

<template>
  <section style="background: #0e1538">
    <div id="panel">
      <div v-for="item in list" id="item"></div>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#panel {
  position: absolute;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#panel>#item {
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

}

#panel>#item::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(./bg.jpg);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  border-radius: 50%;
  opacity: 0;
  transition: 4s;
}

#panel>#item:hover::before {
  width: 500%;
  height: 500%;
  opacity: 1;
  transition: 0s;
}
</style>
