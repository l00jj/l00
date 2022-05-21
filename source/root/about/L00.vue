<script setup lang="ts">
import { resolve } from "path";
import { ref, reactive, computed, watchEffect, defineAsyncComponent, onBeforeMount, onMounted, onUnmounted } from "vue";
import l00list from "./looList";

const onWheel = (e: UIEvent) => {
  console.log(e);
  const elBg = bg.value;
  console.log(elBg.offsetTop, elBg.scrollHeight);
};

/* //视频方案延时较大
const video = ref();
const bg = ref();
const time = ref(0);
(window as any).time = time;
const test = () => {
  video.value.play();
  console.log(video);
};

watchEffect(() => {
  console.log(time.value);
  if (video.value) video.value.currentTime = time.value;
});
const onScroll = (e: UIEvent) => {
  //console.log(e);
  const elBg = bg.value;
  const elVideo = video.value;
  console.log();
  const height = elBg.scrollHeight - elBg.offsetHeight;
  const speed = elBg.scrollTop / height;

  video.value.currentTime = elVideo.duration * speed;

  console.log("onScroll", speed, elBg.scrollTop, height, elBg.scrollHeight);
};

onMounted(() => {
  console.dir(video.value);
});
 */

const isLoading = ref(true);
const isEnd = ref(false);
const progress = reactive({
  all: l00list.length,
  ok: 0,
});
let jpglist: Array<HTMLImageElement> = [];

//console.log(l00list);
Promise.all(
  l00list.map(async (url) => {
    var image = new Image();
    image.src = url;
    await new Promise((resolve) => (image.onload = resolve));
    progress.ok++;
    return image;
  })
).then((arr) => {
  //console.log(arr)
  jpglist = arr;
  isLoading.value = false;
  if (ctx) onScroll();
});

const canvas = ref();
const canvasBg = ref();
const size = ref(640);
let ctx: CanvasRenderingContext2D;
let ctxBg: CanvasRenderingContext2D;

onMounted(() => {
  ctx = (canvas.value as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
  ctxBg = (canvasBg.value as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
  if (jpglist.length) onScroll();
});

const topColor = ref("#000");
const bottomColor = ref("#000");
const bg = ref();
const onScroll = (e?: UIEvent) => {
  //console.log(e);
  if (!ctx || jpglist.length === 0) return;
  const elBg = bg.value;
  const { scrollHeight, offsetHeight, scrollTop } = elBg;
  const height = scrollHeight - offsetHeight;
  const speed = scrollTop / height;
  const index = Math.floor((jpglist.length - 1) * speed);
  ctx.drawImage(jpglist[index], 0, 0);
  //ctxBg.drawImage(jpglist[index], 0, 0);
  //
  isEnd.value = height - scrollTop <= Math.ceil(offsetHeight / 5);
  //
  const min = 3;
  const meanColor = (data: Uint8ClampedArray) =>
    Math.ceil((data.reduce((pre, cur) => pre + cur) - min ** 2 * 255) / min ** 2 / 3);
  const top = ctx.getImageData(0, 0, min, min);
  const bottom = ctx.getImageData(size.value - min, size.value - min, min, min);
  const topColorValue = "#".padEnd(7, meanColor(top.data).toString(16));
  const bottomColorValue = "#".padEnd(7, meanColor(bottom.data).toString(16));
  //console.log("top", top, meanColor(top.data));
  //console.log("bottom", bottom, meanColor(bottom.data));
  topColor.value = topColorValue;
  bottomColor.value = bottomColorValue;
  //
};
</script>

<template>
  <!-- <video ref="video">
    <source src="./l00.mp4" />
  </video> -->

  <div id="panel" :style="`--top-color:${topColor};--bottom-color:${bottomColor};`">
    <div id="bg-top" class="bg"></div>
    <div id="bg-bottom" class="bg"></div>
    <!-- <canvas id="canvasBg" ref="canvasBg" width="640" height="640" style="display: block"></canvas> -->
    <canvas ref="canvas" width="640" height="640" style="display: block"></canvas>
  </div>

  <div id="bg" ref="bg" :class="isLoading ? 'loading' : ''" @scroll="onScroll"></div>

  <div id="info">
    <div id="loading" v-if="isLoading">等等我很快 {{ progress.ok }}/{{ progress.all }}</div>
    <div id="tips" v-else-if="!isEnd">请慢慢向上滑动</div>
    <div id="go" v-else-if="isEnd"><a href="../">进入个人小站</a></div>
  </div>
  <!-- <div id="bg" ref="bg" @mousewheel="onWheel"></div> -->
</template>

<style>
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

#bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 1000vh;
}

#bg.loading {
  overflow: hidden;
}

video {
  position: fixed;
  width: 600px;
}

#panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #000;
  justify-content: center;
  align-items: center;
}

#panel>canvas {
  position: absolute;
  width: 100vw;
}

#panel>canvas#canvasBg {
  width: auto;
  height: 100vh;
  filter: blur(30px);
}

#panel>.bg {
  position: absolute;
  width: 100vw;
  height: 50vh;
}

#panel>#bg-top.bg {
  top: 0;
  background: var(--top-color);
}

#panel>#bg-bottom.bg {
  bottom: 0;
  background: var(--bottom-color);
}

#info {
  position: absolute;
  left: 50%;
  bottom: 3em;
  transform: translateX(-50%);
  animation: animation 5s linear infinite;
}

@keyframes animation {
  0% {
    color: black;
  }

  50% {
    color: white;
  }

  100% {
    color: black;
  }
}

#info>#go {
  padding: 0.3em 3em;
  border: #fff 1px solid;
  border-radius: 0.3em;
  color: #fff;
}

@media all and (orientation: landscape) {

  #panel>.bg,
  #panel>canvas {
    width: auto;
    height: 100vh;
  }

  #panel>canvas#canvasBg {
    width: 100vw;
    height: auto;
  }
}
</style>
