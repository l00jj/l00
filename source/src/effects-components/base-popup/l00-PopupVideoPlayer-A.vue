<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();

const video = ref<HTMLVideoElement>();
const isActive = ref(false);
const btnOnClick = () => {
  isActive.value = true;
  if (video.value) {
    video.value.play();
    video.value.currentTime = 0;
  }
};
const closeOnClick = () => {
  isActive.value = false;
  video.value?.pause();
};
</script>

<template>
  <section class="background">
    <div class="btn" :class="{ active: isActive }" @click="btnOnClick">
      <div class="play"></div>
      <p>Play Video</p>
    </div>
    <div class="clip" :class="{ active: isActive }">
      <video src="" controls ref="video"></video>
      <b class="close" @click="closeOnClick">Close</b>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
section.background {
  background: #fff;
}
.btn {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.btn .play {
  position: relative;
  width: 80px;
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f42e79;
  box-shadow: 0 15px 25px #f42e7966;
  transition: 0.5s;
}
.btn.active .play {
  box-shadow: 0 0 0 150vmax #f42e79;
}

.btn .play::before {
  content: "";
  position: absolute;
  border: 25px solid #fff;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 0px solid transparent;
  transform: translateX(4px);
}
.btn p {
  color: #888;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 4px;
}
.clip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: 0.5s;
}
.clip.active {
  transition-delay: 0.5s;
  transform: scale(1);
}
.clip video {
  outline: none;
  position: relative;
  width: 900px;
  border: 10px solid #fff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}
.clip .close {
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 2px;
}

@media (max-width: 991px) {
  .clip video {
    position: relative;
    width: 90%;
  }
}
</style>
