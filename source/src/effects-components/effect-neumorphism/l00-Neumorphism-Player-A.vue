<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted } from "vue";
import bgm1 from "@src/assets/bgm/After Rain.mp3?url";
import bgm2 from "@src/assets/bgm/And So It Begins.mp3?url";

class Media {
  name: string;
  src: string;
  constructor(name: string, src: string) {
    this.name = name;
    this.src = src;
  }
}

const bgms = [new Media("After Rain", bgm1), new Media("And So It Begins", bgm2)];
//

class Player {
  list: Media[] = bgms;
  current: Media = bgms[0];
  isPaused = true;
  element = {} as HTMLAudioElement;
  ratio = 0;
  isStop = false;
  progressStyle = {
    "--progress": "0%",
  };
  constructor() {}
  setElement(element: HTMLAudioElement) {
    this.element = element;
    //this.element.autoplay = true; // 正常不自动播放
    this.updateState();
  }
  updateState() {
    this.isPaused = this.element.paused;
  }
  playIndex(index: number) {
    const theClass = Object.getPrototypeOf(this.list.at(index));
    if (theClass.constructor === Media) {
      this.current = this.list.at(index) as Media;
    }
    this.play();
  }
  updateRatioID = 0;
  updateRatio() {
    this.updateState();
    if (this.isPaused || this.isStop) return;
    const total = this.element.duration;
    const currentTime = this.element.currentTime;
    this.ratio = !total || !currentTime ? 0 : currentTime / total;
    this.progressStyle["--progress"] = `${this.ratio * 100}%`;
    this.updateRatioID = window.setTimeout(() => this.updateRatio(), 500);
  }
  play() {
    this.element.play();
    this.updateRatio();
  }
  pause() {
    this.element.pause();
    this.updateRatio();
  }
  stop() {
    this.isStop = true;
    clearTimeout(this.updateRatioID);
  }
  toPrev() {
    const element = this.element;
    const index = this.list.indexOf(this.current);
    const nextIndex = (index - 1) % this.list.length;
    this.playIndex(nextIndex);
    element.autoplay = true;
  }
  toPlayPause() {
    const element = this.element;
    if (element.paused) this.play();
    else this.pause();
    this.updateState();
  }
  toNext() {
    const element = this.element;
    const index = this.list.indexOf(this.current);
    const nextIndex = (index + 1) % this.list.length;
    this.playIndex(nextIndex);
    element.autoplay = true;
  }
}
const player = reactive(new Player());
//
const audio = ref<HTMLAudioElement>();
onMounted(() => {
  player.setElement(audio.value as HTMLAudioElement);
});
onUnmounted(() => {
  player.stop();
});
</script>

<template>
  <section class="background">
    <div class="copyright">
      <p>
        Song: After Rain — Zackross | Free Background Music<br />
        Music promoted by Audio Library Release https://youtu.be/RW83XjwJkVA
      </p>
      <p>
        And So It Begins by Artificial.Music https://soundcloud.com/artificial-music<br />
        Creative Commons — Attribution 3.0 Unported— CC BY 3.0<br />
        Free Download / Stream: https://bit.ly/and-so-it-begins<br />
        Music promoted by Audio Library https://youtu.be/JpoEFiAJdxo
      </p>
    </div>
    <div class="music">
      <!-- Music Name -->
      <h2 class="title">{{ player.current.name }}</h2>
      <div class="player">
        <audio :src="player.current.src" ref="audio" @ended="player.toNext"></audio>
        <div class="buttonGroup">
          <span class="button icon prev" @click="player.toPrev"></span>
          <span
            class="button icon play"
            :class="`${player.isPaused ? 'play' : 'pause active'}`"
            @click="player.toPlayPause"
          ></span>
          <span class="button icon next" @click="player.toNext"></span>
        </div>
      </div>
      <div class="progress" :style="player.progressStyle">
        <div class="slider">
          <div class="passed"></div>
          <div class="appearance"></div>
          <div class="runway">
            <div class="bar"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: "Font_Awesome";
  src: url("@src/assets/icons/Font-Awesome/fa-light-300.woff2");
}

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
section.background {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f9f9f9;
}

.music {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.music .title {
  display: inline-flex;
  text-align: center;
  color: #38a7ff;
  font-size: 2em;
  font-weight: 400;
  margin-bottom: 20px;
}
</style>

<style scoped>
.music .progress {
  position: relative;
  width: 550px;
  padding: 20px 30px;
  margin-top: 30px;
}
.music .progress .slider {
  position: relative;
  width: 100%;
  height: 4px;
  background: #eee;
}
.music .progress .slider .passed {
  position: absolute;
  width: var(--progress);
  height: 100%;
  background: linear-gradient(to left, #38a5ff, #fff);
}
.music .progress .slider .appearance {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  box-shadow: -10px -10px 15px #fff, 10px 10px 15px rgb(0 0 0 / 10%), inset -1px -1px 1px #fff,
    inset 1px 1px 1px rgb(0 0 0 / 10%);
}

.music .progress .slider .runway {
  position: absolute;
  width: var(--progress);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.music .progress .slider .runway .bar {
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  /* background: radial-gradient(#fff, #38a7ff); */
  background: #38a7ff;
  box-shadow: 0 0 15px #38a7ff, 0 0 5px #38a7ff;
  filter: blur(1px);
  transform: translate(50%, 0);
}
</style>
<style scoped>
.music .player {
  position: relative;
  width: 550px;
  min-height: 100px;
  padding: 20px 30px;
  background: #fff;
  border-radius: 80px;
  border: 2px solid #fff;
  box-shadow: -10px -10px 15px #fff, 10px 10px 15px rgba(0, 0, 0, 0.1), inset -5px -5px 15px #fff,
    inset 5px 5px 15px rgba(0, 0, 0, 0.1);
}

.icon::before {
  font-family: "Font_Awesome";
}
.icon.prev::before {
  content: "\f04a";
}
.icon.play::before {
  content: "\f04b";
}
.icon.pause::before {
  content: "\f04c";
}
.icon.next::before {
  content: "\f04e";
}

.music .player .buttonGroup {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.music .player .buttonGroup .button {
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  background: #fff;
  box-shadow: inset 0 -5px 5px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);
}

.music .player .buttonGroup .button {
  font-size: 2em;
}
.music .player .buttonGroup .button.playPause {
  width: 100px;
  height: 100px;
  font-size: 2em;
}
.music .player .buttonGroup .button:active,
.music .player .buttonGroup .button.active {
  color: #ff669a;
  box-shadow: inset 0 -7px 5px rgba(0, 0, 0, 0.025), inset 0 5px 10px rgba(0, 0, 0, 0.15);
}
</style>

<style scoped>
.copyright {
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  gap: 1em;
  padding-top: 3em;
  color: #ccc;
  transform: translateY(300px);
}
</style>
