<script setup lang="ts">
import { ref, reactive, computed } from "vue";

const values = reactive({
  size: "30px",
  color: "hsl(60deg 100% 50%)",
  diam: "140px",
  dur: "15s",
  times: 3,
  followers: 5,
  blur: 7,
});

const valuesStyle = computed(() =>
  Object.entries(values)
    .map((item) => `--${item[0]}:${item[1]}`)
    .join(";")
);

const followers = computed(() =>
  Array(values.followers)
    //按40%的耗时
    .fill((0.4 * parseInt(values.dur.slice(0, -1))) / values.times)
    .map((v, i) => {
      const delay = (v * i) / values.followers;
      /* const hueRotate = (i + 1) * 360 / (values.followers + 1) */
      const hueRotate = ((i - 1) * 360) / values.followers;
      return { style: `--delay:${delay}s;--hueRotate:${hueRotate}deg` };
    })
);

const matrix = computed(() => `1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 ${values.blur * 2} -${values.blur}`);
//const matrix = computed(() => `1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 1 0`);
</script>

<template>
  <section class="background">
    <div id="circle" :style="valuesStyle">
      <template v-for="follower in followers">
        <div class="ball-wrap follower" :style="follower.style">
          <div class="ball"></div>
        </div>
      </template>

      <div class="ball-wrap">
        <div class="ball w"></div>
      </div>

      <svg>
        <filter id="blurMe888888">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="values.blur" />
          <feColorMatrix type="matrix" :values="matrix" />
        </filter>
      </svg>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0ca0cc;
}
#circle {
  position: relative;
  width: var(--diam);
  height: var(--diam);
  filter: url("#blurMe888888");
}

#circle .ball-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  animation: wrapRotate var(--dur) linear infinite;
}

@keyframes wrapRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#circle .ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#circle .ball::before {
  content: "";
  width: var(--size);
  height: var(--size);
  background: var(--color);
}

#circle .ball.w::before {
  background: #fff;
}

#circle .ball-wrap.follower .ball::before {
  filter: hue-rotate(var(--hueRotate));
}

#circle .ball-wrap.follower .ball {
  animation: followerRotate calc(var(--dur) / 3) cubic-bezier(0.6, 0, 0.4, 1) infinite;
  animation-delay: var(--delay);
}

@keyframes followerRotate {
  0% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(0deg);
  }

  80% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

svg {
  display: none;
}
</style>
