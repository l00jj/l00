<script setup lang="ts">
import { ref } from "vue";

const list = Array(10).fill(0);
</script>

<template>
  <div class="container">
    <div class="example">
      <p>Hello, <a>World</a>!</p>
    </div>
    <div class="mix-blend-mode">
      <section class="test">
        <div class="content multiply">multiply</div>
      </section>
      <section class="test">
        <div class="content screen">screen</div>
      </section>
      <section class="test">
        <div class="content overlay">overlay</div>
      </section>
      <section class="test">
        <div class="content difference">difference</div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #000;
}
</style>
<style scoped>
.example {
  width: 100%;
  height: 100vh;
  margin: 0;
  display: grid;
  place-content: center;
  color: #ddd;
  font: italic clamp(1.25em, 15vw, 7em) / 1.25 marck script, purisa, segoe script, comic sans ms, cursive;
  text-align: center;
  background: #222;
}

.example p {
  isolation: isolate;
}

.example p a {
  position: relative;
  padding: 0 0.25em;
  color: gold;
  text-decoration: none;
}
.example p a::after {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform-origin: 0 100%;
  transform: scaley(0.05);
  background: currentColor;
  mix-blend-mode: difference;
  transition: transform 0.25s;
  content: "";
}

.example p a:focus {
  outline: none;
}
.example p a:focus::after,
.example p a:hover::after {
  transform: none;
}
</style>
<style scoped>
.multiply {
  mix-blend-mode: multiply;
}

.screen {
  mix-blend-mode: screen;
}

.overlay {
  mix-blend-mode: overlay;
}

.difference {
  mix-blend-mode: difference;
}

.mix-blend-mode {
  width: 100%;
  padding: 50vh 0;
  color: white;
  font-size: 15vmin;
  background-image: url('data:image/svg+xml,%3Csvg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z" fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E');
  background-color: #123;
}

.mix-blend-mode .test {
  min-height: 100vh;
}

/* .mix-blend-mode .test .hover-isolate:hover {
  isolation: isolate;
} */

/* .multiply, .screen, .overlay, .difference , */
.content {
  padding: 2rem 4rem;
  background: #234;
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  width: max-content;
  margin-inline: auto;
}
.content:hover {
  mix-blend-mode: normal;
}

::selection {
  background: blue;
  mix-blend-mode: overlay;
}
</style>
