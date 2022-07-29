<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  text?: string;
  fontSize?: number;
  fontSizeUnit?: "px" | "vmin";
  preset?: string; // ''|'preset1'
}>();

const params = reactive({
  fontSize: {
    value: "",
    number: 0,
    unit: "px", // "px" | "vmin"
  },
  demo: "",
});

// fontSize
watchEffect(() => {
  const number = props.fontSize ? props.fontSize : 10;
  const unit = props.fontSizeUnit === "vmin" ? "vmin" : "px";
  params.fontSize.number = number;
  params.fontSize.unit = unit;
  params.fontSize.value = `${number}${unit}`;
});

//
const tiles = ref<HTMLElement>();
watchEffect(() => {
  const tilesDom = tiles.value as HTMLElement;
  if (tilesDom) {
    tilesDom.style.fontSize = params.fontSize.value;
  }
});
</script>

<template>
  <section class="background" ref="tiles">
    <div class="tiles" :class="[props.preset]">
      <div class="tile">
        <div class="animation">{{ props.text === "" ? "l00" : props.text }}</div>
      </div>
      <div class="tile fliph">
        <div class="animation">{{ props.text === "" ? "l00" : props.text }}</div>
      </div>
      <div class="tile flipv">
        <div class="animation">{{ props.text === "" ? "l00" : props.text }}</div>
      </div>
      <div class="tile fliph flipv2">
        <div class="animation">{{ props.text === "" ? "l00" : props.text }}</div>
      </div>
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
}

.tiles {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}

.tile {
  float: left;
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  /* font-size: 400px; */
  font-weight: bold;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-family: serif;
}

.fliph {
  transform: scaleX(-1); /* Standard */
}

.flipv {
  transform: scaleY(-1); /* Standard */
}

.flipv2 {
  transform: scaleY(-1); /* Standard */
  transform: rotate(180deg); /* IE 6/7/8 */
}

.fliphv {
  transform: rotate(90deg);
}

.animation {
  animation: animate 20s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<style scoped>
.tiles.preset1 {
  animation: preset1 20s ease-in infinite;
}
@keyframes preset1 {
  0%,
  100% {
    font-size: 25vh;
  }
  20%,
  80% {
    font-size: 100vh;
  }
}
.tiles.preset1 .animation {
  animation: animate 20s linear infinite;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
