<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import imgUrl from "@src/graphics-components/myself/index.jpg?url";
//import { froundFix } from "@src/utils/Tools";

//const props = defineProps<{}>();
</script>

<template>
  <section class="background">
    <div class="card">
      <div class="imgBx">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="content">
        <div class="details">
          <h2>l00 <br /><span>Senior UX/UI Designer</span></h2>
          <div class="data">
            <h3>342<br /><span>Posts</span></h3>
            <h3>120k<br /><span>Followers</span></h3>
            <h3>256<br /><span>Following</span></h3>
          </div>
          <div class="actionBtn">
            <button>Follow</button>
            <button>Message</button>
          </div>
        </div>
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
  background: linear-gradient(45deg, #fbda61, #ff5acd);
}
.card {
  position: relative;
  width: 350px;
  height: 190px;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}
.card:hover {
  height: 450px;
}
.card .imgBx {
  position: absolute;
  top: -50px;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  transition: 0.5s;
}
.card:hover .imgBx {
  width: 250px;
  height: 250px;
}
.card .imgBx img {
  position: absolute;
  height: 100%;
  object-fit: cover;
}
.card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: flex-end;
}
.card .content .details {
  width: 100%;
  padding: 40px;
  text-align: center;
  transform: translateY(150px);
  transition: 0.5s;
}
.card:hover .content .details {
  transform: translateY(0px);
}
.card .content .details h2 {
  color: #555;
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.2em;
}
.card .content .details h2 span {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}
.card .content .details .data {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  margin: 20px 0;
}
.card .content .details .data h3 {
  color: #555;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.2em;
}
.card .content .details .data h3 span {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}
.card .content .details .actionBtn {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}
.card .content .details .actionBtn button {
  cursor: pointer;
  outline: none;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: 500;
  background: #ff5f95;
}
.card .content .details .actionBtn button:nth-child(2) {
  border: 1px solid #999;
  color: #999;
  background: #fff;
}
</style>
