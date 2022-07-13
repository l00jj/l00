<script setup lang="ts">
import { reactive, ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";
//
const props = defineProps<{
  scrollMidline: number;
  progress: number;
}>();
const emit = defineEmits(["update:progress"]);

const progress = computed({
  get() {
    return props.progress;
  },
  set(value) {
    emit("update:progress", value);
  },
});

/* 
卡bug
window.document.documentElement.scrollTop
908 
*/
class ViewArea {
  static lastScroll = props.scrollMidline;
  static isReverse = false;
  el = {} as HTMLElement;
  top = 0;
  bottom = 0;
  height = 0;
  effect = {
    blurMax: 50, //100px
    translateYMax: 25, //一半视距 25vh
  };
  isShow = false;
  transitionName = "fade";
  contentStyle = {
    filter: "",
    transform: "",
    opacity: 1,
  };
  currentProgress = 0;
  lastProgress = -Infinity;
  index: number;
  constructor(index: number) {
    this.index = index;
  }
  // 输入当前屏幕中线在整个文档中的位置计算效果进程
  computedProgress(scroll: number) {
    //判断是否在区域
    if (this.top >= scroll) {
      this.changeShowState(false);
    } else if (this.bottom < scroll) {
      this.changeShowState(false);
    } else {
      this.changeShowState(true);
    }
  }

  changeShowState(state: boolean) {
    if (state) {
      const currentProgress = (props.scrollMidline - this.top) / this.height;
      progress.value = this.index + currentProgress;
    }
    // 如果状态一致，不比更新
    if (this.isShow === state) return;
    this.transitionName = ViewArea.isReverse ? "fade-reverse" : "fade";
    //this.transitionName = ViewArea.isReverse ? "fade" : "fade";
    this.isShow = state;
  }
}

const viewAreaList = (() => {
  const viewAreaList = reactive([new ViewArea(0), new ViewArea(2)]);

  const onResize = () => {
    viewAreaList.forEach((viewArea,index) => {
      viewArea.top = 0;
      for (let item = viewArea.el; item; item = item.offsetParent as HTMLElement) {
        viewArea.top += item.offsetTop;
      }
      viewArea.height = viewArea.el.offsetHeight;
      viewArea.bottom = viewArea.top + viewArea.el.offsetHeight;
      if(index+1===viewAreaList.length)viewArea.bottom=Infinity
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

const onScroll = (scrollMidline: number) => {
  ViewArea.isReverse = ViewArea.lastScroll - scrollMidline > 0;
  ViewArea.lastScroll = scrollMidline;
  for (let viewArea of viewAreaList) {
    viewArea.computedProgress(scrollMidline);
  }
};
onMounted(() => {
  onScroll(props.scrollMidline);
  onUnmounted(watch(() => props.scrollMidline, onScroll));
});
//window.viewAreaList=viewAreaList
</script>

<template>
  <div class="section section1" :ref="(el) =>viewAreaList[0].el = (el as HTMLElement)">
    <Transition :name="viewAreaList[0].transitionName">
      <div class="viewarea" v-show="viewAreaList[0].isShow">
        <div class="content">
          <div class="title"><span>He</span><span>llo</span></div>
          <div class="left">
            <span>Welcome to<br />l00 Studio</span>
          </div>
          <div class="right"><span>我叫小刘</span></div>
        </div>
      </div>
    </Transition>
  </div>
  <div class="section section2" :ref="(el) =>viewAreaList[1].el = (el as HTMLElement)">
    <Transition :name="viewAreaList[1].transitionName">
      <div class="viewarea" v-show="viewAreaList[1].isShow">
        <div class="content">
          <div class="title"><span>野</span><span>码</span></div>
          <div class="top"><span>// 好学的一枚[野生]JS[码农]</span></div>
          <div class="bottom">
            <span>&#60 Es6 Vue Threejs</span>
            <span>C4d Blender AE/></span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.section {
  position: relative;
  width: 100vw;
  height: 150vh;
}
.section.debug {
  border: 1px solid red;
}
.section.debug:nth-child(odd) {
  border: 1px solid green;
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
  will-change: display;
}
.section .viewarea .content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888888FF;
  will-change: opacity, transform, filter;
  transition:  1s;
}
</style>

<style scoped>
.section1 {
  height: 150vh;
}
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
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  transform: translate(-325px, -190px);
}
.section1 .left::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: inline-block;
  box-sizing: content-box;
  border: 0.4em solid transparent;
  border-right: 0.4em solid #888888;
  border-bottom: 0.4em solid #888888;
  transform: translate(-1.5em, 0em);
}
.section1 .right {
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  transform: translate(355px, 190px);
}
.section1 .right::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  display: inline-block;
  box-sizing: content-box;
  border: 0.4em solid transparent;
  border-left: 0.4em solid #888888;
  border-top: 0.4em solid #888888;
  transform: translate(0.7em, 0em);
}
</style>

<style scoped>
.section2 {
  height: 250vh;
}
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
  transform: translate(245px, -200px);
}

.section2 .bottom {
  position: absolute;
  display: inline-flex;
    flex-direction: row;
    align-items: center;
  font-size: 30px;
  font-weight: 900;
  line-height: 30px;
  white-space: nowrap;
  transform: translate(0px,200px);
}
.section2 .bottom span {
  display: flex;
  align-items: center;
}

.section2 .bottom span:nth-child(2) {
  margin-left: 150px;
}
</style>

<style scoped>
.fade-enter-active {
  transition: all 1s;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-reverse-enter-active {
  transition: all 1s;
}
.fade-reverse-leave-active {
  transition: all 1s;
}

.fade-enter-from,
.fade-reverse-leave-to {
  opacity: 0;
  filter: blur(5em);
  transform: translateY(30vh);
}

.fade-enter-to {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0vh);
}

.fade-leave-from,
.fade-reverse-leave-from {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0vh);
}

.fade-leave-to,
.fade-reverse-enter-from {
  opacity: 0;
  filter: blur(5em);
  transform: translateY(-30vh);
}
</style>

<style scoped>
@media all and (max-width: 1024px) {
  /* .section .viewarea .content {
    color: red;
  } */
  .section1 .content {
    transform: translateY(-15vh);
  }
  .section1 .content .title {
    position: absolute;
    font-size: 35vw;
    font-weight: 900;
    white-space: nowrap;
  }
  .section1 .content .title span:nth-child(2) {
    margin-left: 10vw;
  }
  .section1 .content .left {
    font-size: 5vw;
    font-weight: 900;
    transform: translate(-4em, -4.5em);
  }
  .section1 .content .right {
    font-size: 5vw;
    transform: translate(5.5em, 4em);
  }

  .section2 .content {
    transform: translateY(-18vh);
  }
  .section2 .content .title {
    position: absolute;
    font-size: 42vw;
    font-weight: 900;
    white-space: nowrap;
  }
  .section2 .content .title span:nth-child(2) {
    margin-left: 15vw;
  }
  .section2 .content .top {
    font-size: 5vw;
    font-weight: 900;
    transform: translate(1em, -5.5em);
  }
  .section2 .content .bottom {
    font-size: 5vw;
    transform: translate(-5.5em, 4em);
  }
  .section2 .content .bottom {
    font-size: 4vw;
    transform: translate(0em, 7em);
  }
    .section2 .content .bottom span:nth-child(2) {
    margin-left: 24vw;
  }
}
</style>

<!-- 
<style scoped>
.section1 .content {
  /* animation: fakeTopOut 2s ease-out infinite; */
}
@keyframes fakeTopOut {
  0% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0vh);
  }
  100% {
    opacity: 0;
    filter: blur(100px);
    transform: translateY(-50vh);
  }
}
.section2 .content {
  /* animation: fakeBottomin 2s infinite; */
  /* opacity: 0;
  animation-delay: 0.5s; */
}
@keyframes fakeBottomin {
  0% {
    opacity: 0;
    filter: blur(100px);
    transform: translateY(50vh);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0vh);
  }
}
</style>

<style scoped>
.fade-enter-active {
  animation: fade-in 2s;
}
.fade-leave-active {
  animation: fade-out 2s;
}
.fade-reverse-enter-active {
  animation: fade-out 2s reverse;
}
.fade-reverse-leave-active {
  animation: fade-in 2s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    filter: blur(100px);
    transform: translateY(50vh);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0vh);
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0vh);
  }
  100% {
    opacity: 0;
    filter: blur(100px);
    transform: translateY(-50vh);
  }
} 
</style>
-->
