<script setup lang="ts">
import { reactive, ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";
//
const props = defineProps<{
  scroll: number;
}>();

class ViewArea {
  el = {} as HTMLElement;
  top = 0;
  bottom = 0;
  height = 0;
  effect = {
    blurMax: 50, //100px
    translateYMax: 25, //一半视距 25vh
  };
  isShow = false;
  contentStyle = {
    filter: "",
    transform: "",
    opacity: 1,
  };
  currentProgress = 0;
  lastProgress = -Infinity;
  constructor() {}
  // 输入当前屏幕中线在整个文档中的位置计算效果进程
  computedProgress(scroll: number) {
    //判断是否在区域
    if (this.top > scroll) {
      this.setProgress(-Infinity);
    } else if (this.bottom < scroll) {
      this.setProgress(Infinity);
    } else {
      this.setProgress((scroll - this.top) / this.height);
    }
  }
  setProgress(progress: number) {
    if (progress === this.lastProgress) return;
    this.lastProgress = progress;
    // 判断是否不在区域或超出区域
    if (progress === -Infinity) {
      this.isShow = false;
      progress = 0;
    } else if (progress === Infinity) {
      this.isShow = false;
      progress = 1;
    } else {
      this.isShow = true;
    }
    // 计算效果
    this.currentProgress = progress;
    console.log(this, progress);
    const getRatio = (min: number, max: number, input: number) => {
      return (input - min) / (max - min);
    };
    let opacity = 1,
      blur = 0,
      translateY = 0;
    if (progress < 0.2) {
      const ratio = 1 - Math.pow(getRatio(0, 0.2, progress), 3);
      opacity = 1 - ratio;
      blur = this.effect.blurMax * ratio;
      translateY = this.effect.translateYMax * ratio;
    } else if (progress > 0.8) {
      const ratio = Math.pow(getRatio(0.8, 1, progress), 2);
      opacity = 1 - ratio;
      blur = this.effect.blurMax * ratio;
      translateY = -this.effect.translateYMax * ratio;
    }
    this.contentStyle.filter = `blur(${blur}px)`;
    this.contentStyle.transform = `translateY(${translateY}vh)`;
    this.contentStyle.opacity = opacity;
  }
}

const viewAreaList = (() => {
  const viewAreaList = Array(2)
    .fill(0)
    .map((i) => reactive(new ViewArea()));

  const onResize = () => {
    viewAreaList.forEach((viewArea) => {
      viewArea.top = 0;
      for (let item = viewArea.el; item; item = item.offsetParent as HTMLElement) {
        viewArea.top += item.offsetTop;
      }
      viewArea.height = viewArea.el.offsetHeight;
      viewArea.bottom = viewArea.top + viewArea.el.offsetHeight;
    });
  };

  // 装载与卸载监听
  let resizeObserver: ResizeObserver;
  const setResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver = new ResizeObserver((entries) => onResize());
    } else {
      window.addEventListener("resize", onResize);
    }
    onResize();
  };
  const removeResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener("resize", onResize);
    }
  };
  onMounted(() => setResizeObserver());
  onUnmounted(() => removeResizeObserver());

  return viewAreaList;
})();

const containerStyle = computed(() => {
  /* const scroll = props.scroll > 1 ? 1 : props.scroll;
  //if(scroll===-1)
  const blur = parameter.blur * Math.pow(scroll, 3);
  const translateY = -viewArea.height * (scroll > 0.5 ? scroll - 0.5 : 0);
  const opacity = 1 - Math.pow((scroll > 0.5 ? scroll - 0.5 : 0) * 2, 3);
  return {
    "--blur": `${blur}px`,
    "--opacity": `${opacity}`,
    "--translateY": `${translateY}px`,
  }; */
});

const onScroll = (scroll: number) => {
  for (let viewArea of viewAreaList) {
    viewArea.computedProgress(scroll);
  }
};
onMounted(() => {
  onScroll(props.scroll);
  onUnmounted(watch(() => props.scroll, onScroll));
});
</script>

<template>
  <section class="container">
    <div class="section section1" :ref="(el) =>viewAreaList[0].el = (el as HTMLElement)">
      <div class="viewarea" :style="{ visibility: viewAreaList[0].isShow ? 'visible' : 'hidden' }">
        <div class="content" :style="viewAreaList[0].contentStyle">
          <div class="title"><span>He</span><span>llo</span></div>
          <div class="left">
            <span>Welcome to<br />l00 Studio</span>
          </div>
          <div class="right"><span>我叫小刘</span></div>
        </div>
      </div>
    </div>
    <div class="section section2" :ref="(el) =>viewAreaList[1].el = (el as HTMLElement)">
      <div class="viewarea" :style="{ visibility: viewAreaList[1].isShow ? 'visible' : 'hidden' }">
        <div class="content" :style="viewAreaList[1].contentStyle">
          <div class="title"><span>野</span><span>码</span></div>
          <div class="top"><span>// 一枚[野生]JS[码农]</span></div>
          <div class="bottom left">
            <span>全局API import { JS: <i class="icon js"></i>,</span>
            <span>Vue: <i class="icon vue"></i>, Threejs: <i class="icon threejs"></i> }</span>
          </div>
          <div class="bottom right">
            <span>const 核心组件 = { C4d: <i class="icon c4d"></i>,</span>
            <span>Blender: <i class="icon blender"></i>, PS: <i class="icon ps"></i> }</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section.container {
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: #dedede;
}
.section {
  position: relative;
  width: 100vw;
  height: 250vh;
  border: 1px solid red;
}
.section:not(:first-of-type) {
  border: 1px solid green;
  margin-top: -70vh;
}
.section .viewarea {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section .viewarea .content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888888;
  will-change: opacity,transform,filter;
}
</style>

<style scoped>
.section1 .title {
  position: absolute;
  font-size: 350px;
  font-weight: 900;
  white-space: nowrap;
}
.section1 .title span:nth-child(2) {
  margin-left: 150px;
}

.section1 .left {
  position: absolute;
  color: #888888;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  white-space: nowrap;
  transform: translate(-315px, -200px);
}
.section1 .left::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-right: 20px solid #888888;
  border-bottom: 20px solid #888888;
  transform: translate(-80px, -10px);
}
.section1 .right {
  position: absolute;
  color: #888888;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  white-space: nowrap;
  transform: translate(355px, 190px);
}
.section1 .right::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: block;
  box-sizing: content-box;
  border: 20px solid transparent;
  border-left: 20px solid #888888;
  border-top: 20px solid #888888;
  transform: translate(145px, -10px);
}
</style>

<style scoped>
/* .section2 .content {
  transform: translate(0px, -190px);
} */
.section2 .title {
  position: absolute;
  font-size: 350px;
  font-weight: 900;
  white-space: nowrap;
}

.section2 .title span:nth-child(2) {
  margin-left: 150px;
}

.section2 .top {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  white-space: nowrap;
  transform: translate(275px, -190px);
}

.section2 .bottom {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  font-size: 24px;
  font-weight: 900;
  line-height: 30px;
  white-space: nowrap;
}
.section2 .bottom span {
  display: flex;
  align-items: center;
}
.section2 .bottom i.icon {
  --size: 45px;
  width: var(--size);
  height: var(--size);
  display: inline-block;
  background-size: 100%;
  margin: 0 10px;
}
.section2 .bottom i.icon.js {
  background-image: url(./assets/images/js.jpg);
}
.section2 .bottom i.icon.vue {
  background-image: url(./assets/images/vue.jpg);
}
.section2 .bottom i.icon.threejs {
  background-image: url(./assets/images/threejs.jpg);
}
.section2 .bottom i.icon.c4d {
  background-image: url(./assets/images/c4d.jpg);
}
.section2 .bottom i.icon.blender {
  background-image: url(./assets/images/blender.jpg);
}
.section2 .bottom i.icon.ps {
  background-image: url(./assets/images/ps.jpg);
}
.section2 .bottom.left {
  align-items: flex-end;
  transform: translate(-275px, 220px);
}
.section2 .bottom.right {
  align-items: flex-start;
  transform: translate(254px, 220px);
}
</style>
