<script setup lang="ts"></script>

<template>
  <section class="clock">
    <div class="dial">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}
section.clock {
  pointer-events: none;
  padding: 10%;
}
.dial {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dial span {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.dial span::before,
.dial span::after {
  position: absolute;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 0;
}

.dial span:nth-child(2)::before,
.dial span:nth-child(2)::after,
.dial span:nth-child(3)::before,
.dial span:nth-child(3)::after,
.dial span:nth-child(5)::before,
.dial span:nth-child(5)::after,
.dial span:nth-child(6)::before,
.dial span:nth-child(6)::after {
  position: absolute;
  width: 1rem;
  height: 2px;
  background: #fff;
  transform: translateX(-50%);
}
.dial span:nth-child(2)::before,
.dial span:nth-child(3)::before,
.dial span:nth-child(5)::before,
.dial span:nth-child(6)::before {
  left: 0;
  content: "";
}
.dial span:nth-child(2)::after,
.dial span:nth-child(3)::after,
.dial span:nth-child(5)::after,
.dial span:nth-child(6)::after {
  left: 100%;
  content: "";
}
.dial span:nth-child(2) {
  transform: rotate(30deg);
}
.dial span:nth-child(3) {
  transform: rotate(60deg);
}
.dial span:nth-child(5) {
  transform: rotate(120deg);
}
.dial span:nth-child(6) {
  transform: rotate(150deg);
}

.dial span:nth-child(4) {
  flex-direction: row;
}
.dial span:nth-child(4)::before {
  left: 0;
  content: "9";
}
.dial span:nth-child(4)::after {
  right: 0;
  content: "3";
}

.dial span:nth-child(1) {
  flex-direction: column;
}
.dial span:nth-child(1)::before {
  top: 0;
  content: "12";
}
.dial span:nth-child(1)::after {
  bottom: 0;
  content: "6";
}
</style>
