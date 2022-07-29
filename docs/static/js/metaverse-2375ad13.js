import"./modulepreload-polyfill-f26481d0.js";import{_ as k}from"./preload-helper-33ac5944.js";import{d as f,r as b,i as M,l as w,c,o as u,a as x,e as p,n as l,u as a,f as S,I as B,J as C,K as P,y as j,b as F,L as E,s as I,F as L,v as V}from"./vendor-263e2909.js";import{T as N}from"./TopMenu-f381164f.js";import{_ as y}from"./plugin-vue_export-helper-46f75680.js";import{l as W}from"./graphicsList-70d5aedd.js";import{P as X}from"./ProjectsRouter-ba4e3b11.js";import"./index-50deada7.js";import"./ProjectInfo-7c1d079e.js";import"./EventEmitter-80978bd8.js";const O=f({name:"FloatMenu",props:{color:{type:[String,Array],required:!1}},setup(h,{expose:n}){const e=b({size:38,top:57,left:57,bgColor:"#222"});n({parameter:e});const s=()=>{const{clientWidth:o,clientHeight:t}=document.documentElement;o/t>1?e.top=e.left=e.size*1.5:(e.top=t-e.size*1.5,e.left=o/2)};s(),M(()=>window.addEventListener("resize",s)),w(()=>window.removeEventListener("resize",s));const _=c(()=>Object.entries({"--size":`${e.size}px`}).reduce((o,t)=>`${o}${t[0]}:${t[1]};`,"")),d=c(()=>{const{top:o,left:t}=e;return`top:${o}px;left:${t}px;--top:${o}px;--left:${t}px;`}),i=c(()=>{const{size:o}=e,r=o*.3,v=r*.5,z=Math.cos(Math.PI/4)*r,R=(Math.cos(Math.PI/4)*(r+v)-z)/2;return`--iconSize:${r}px;--iconBorder:${v}px;--iconOffsetX:${R}px`}),$=()=>{window.history.back()};return(o,t)=>(u(),x(B,{to:"body"},[p("div",{style:l(a(_))},[p("div",{class:"back",style:l(a(d)),onClick:$},[p("a",{style:l(a(i))},null,4)],4)],4),S(` <nav class="" >
      
      <div id="logo">
        <a :href="\`\${host}/\`"><img src="@src/assets/logo/logo.svg" alt="l00" /></a>
      </div>
    </nav> `)]))}});var T=y(O,[["__scopeId","data-v-b42766c4"],["__file","/Volumes/Work/l00 Studio/l00/source/src/components/FloatMenu.vue"]]);const A=f({name:"index",setup(h){const n=C(),e=P("projectsRouter"),s=c(()=>!n.name||n.name===e.indexPageRouteName||n.name===e._404PageRouteName?N:T);return(_,d)=>{const i=j("router-view");return u(),F(L,null,[(u(),x(E(a(s)))),I(i)],64)}}});var D=y(A,[["__file","/Volumes/Work/l00 Studio/l00/source/root/metaverse/index.vue"]]);const m=V(D),g=new X(W,()=>k(()=>import("./IndexPage-0c4805ee.js"),["static/js/IndexPage-0c4805ee.js","static/css/IndexPage-9cad09f7.css","static/js/vendor-263e2909.js","static/js/ProjectsPage-34325d16.js","static/css/ProjectsPage-9a721764.css","static/js/plugin-vue_export-helper-46f75680.js","static/js/l00-Simple3DText-eae1c478.js","static/css/l00-Simple3DText-37b5226c.css","static/js/OrbitControls-f9727bec.js","static/js/EventEmitter-80978bd8.js","static/js/helvetiker_regular.typeface-6970b3ef.js","static/js/FontLoader-e4f92b51.js"]));m.use(g.router);m.provide("projectsRouter",g);m.mount("#app");
