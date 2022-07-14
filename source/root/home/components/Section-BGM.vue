<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import bgmUrl from "@src/assets/bgm/And So It Begins - Brief.mp3?url";

const props = defineProps<{
  isReady: boolean;
}>();

const bgm = reactive({
  url: computed(() => (props.isReady ? bgmUrl : "")),
  isPlay: false,
  isCanplay: false,
});
const audio = ref<HTMLAudioElement>();

(window as any).testaudio = audio;
(window as any).testbgm = bgm;

const playBGM = () => {
  gsap.fromTo(audio.value!, { volume: 0 }, { volume: 0.5, duration: 4, ease: "sine.out" });
  audio.value?.play();
  bgm.isPlay = true;
};

const pauseBGM = () => {
  audio.value?.pause();
  bgm.isPlay = false;
};

const changePlayerState = () => {
  if (bgm.isPlay) pauseBGM();
  else playBGM();
};

const setOnceEvent = () => {
  const onceEvent = () => {
    if (bgm.isCanplay) {
      playBGM();
      window.removeEventListener("click", onceEvent);
      //window.removeEventListener("touchstart", onceEvent);
    }
  };
  window.addEventListener("click", onceEvent);
  //window.addEventListener("touchstart", onceEvent);
};

onMounted(() => setOnceEvent());
</script>

<template>
  <section class="container">
    <div class="player" :class="{ play: bgm.isPlay }" @click="changePlayerState">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
    </div>
    <audio :src="bgm.url" ref="audio" loop="true" @canplay="bgm.isCanplay = true"></audio>
  </section>
</template>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  right: 0;
  mix-blend-mode: difference;
}
.player {
  cursor: pointer;
  position: absolute;
  bottom: 1em;
  right: 1em;
  width: 1.5em;
  height: 1.5em;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  /* background: red; */
}

.player span {
  position: relative;
  width: 25%;
  height: 30%;
  display: block;
  background: #fff;
}

.player.play span {
  animation: animate 2s ease-in-out infinite;
  animation-delay: calc(-1.5s * var(--i));
}

@keyframes animate {
  0%,
  100% {
    height: 30%;
  }
  50% {
    height: 100%;
  }
}

/*竖屏*/
@media (orientation: portrait) {
  .player {
    width: 1.2em;
    height: 1.2em;
  }
}
</style>
