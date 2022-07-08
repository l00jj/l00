<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import View from "./View/index";

import Section1 from "./Section-1.vue";

//
const section1 = ref<HTMLElement>();
const section2 = ref();

const section1Scroll = ref(0);

const commander = () => {
  //window.document.documentElement
  /*  const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

  const section1El = section1.value as HTMLElement;
  if (scrollTop < section1El.offsetTop + section1El.offsetHeight) {
    section1Progress.value = (scrollTop - section1El.offsetTop) / section1El.offsetHeight;
  } else {
    section1Progress.value = 1;
  }
 */
  //window.document.body.offsetTop
  //window.document.documentElement.offsetTop
  //console.log(viewArea1.top, viewArea1.height);

  //window.document.documentElement.offsetTop

  const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  section1Scroll.value = scrollTop + clientHeight / 2;
};
commander();
//
const onScroll = () => {
  commander();
};
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <section ref="viewArea">
    <Section1 :scroll="section1Scroll"></Section1>
  
    <!--  <div class="section1" ref="section1">
      
    </div>
    <div class="section2" ref="section2">
      <Section2 ref="section2"></Section2>
    </div>

      <SectionMyself class="section-myself"></SectionMyself>
    <div style="  position: relative;width:100vw;height:50px;background: red;"></div> -->
  </section>
</template>

<style scoped>
section {
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
section {
  height: 500vh;
}

/* 
.section1 {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.section2 {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin-top: -20vh;
}
.section-myself {
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
} */
</style>
