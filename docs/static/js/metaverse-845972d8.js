import{_ as f}from"./plugin-vue_export-helper-4223c0cf.js";import{_ as k}from"./preload-helper-33ac5944.js";import{d as x,r as b,i as M,l as w,c,o as u,a as y,e as l,n as p,u as a,f as S,I as B,J as C,K as P,y as j,b as F,L as E,s as I,F as L,v as V}from"./vendor-6699f66f.js";import{T as N}from"./TopMenu-78c0f1fb.js";import{l as W}from"./graphicsList-2d6a2bae.js";import{P as X}from"./ProjectsRouter-097e02cd.js";import"./index-50deada7.js";import"./ProjectInfo-7c1d079e.js";import"./EventEmitter-05980808.js";const O=x({name:"FloatMenu",props:{color:{type:[String,Array],required:!1}},setup(h,{expose:n}){const e=b({size:38,top:57,left:57,bgColor:"#222"});n({parameter:e});const s=()=>{const{clientWidth:o,clientHeight:t}=document.documentElement;o/t>1?e.top=e.left=e.size*1.5:(e.top=t-e.size*1.5,e.left=o/2)};s(),M(()=>window.addEventListener("resize",s)),w(()=>window.removeEventListener("resize",s));const _=c(()=>Object.entries({"--size":`${e.size}px`}).reduce((o,t)=>`${o}${t[0]}:${t[1]};`,"")),d=c(()=>{const{top:o,left:t}=e;return`top:${o}px;left:${t}px;--top:${o}px;--left:${t}px;`}),i=c(()=>{const{size:o}=e,r=o*.3,v=r*.5,z=Math.cos(Math.PI/4)*r,R=(Math.cos(Math.PI/4)*(r+v)-z)/2;return`--iconSize:${r}px;--iconBorder:${v}px;--iconOffsetX:${R}px`}),$=()=>{window.history.back()};return(o,t)=>(u(),y(B,{to:"body"},[l("div",{style:p(a(_))},[l("div",{class:"back",style:p(a(d)),onClick:$},[l("a",{style:p(a(i))},null,4)],4)],4),S(` <nav class="" >
      
      <div id="logo">
        <a :href="\`\${host}/\`"><img src="@src/assets/logo/logo.svg" alt="l00" /></a>
      </div>
    </nav> `)]))}});var T=f(O,[["__scopeId","data-v-b42766c4"],["__file","/Volumes/Work/l00 Studio/l00/source/src/components/FloatMenu.vue"]]);const A=x({name:"index",setup(h){const n=C(),e=P("projectsRouter"),s=c(()=>!n.name||n.name===e.indexPageRouteName||n.name===e._404PageRouteName?N:T);return(_,d)=>{const i=j("router-view");return u(),F(L,null,[(u(),y(E(a(s)))),I(i)],64)}}});var D=f(A,[["__file","/Volumes/Work/l00 Studio/l00/source/root/metaverse/index.vue"]]);const m=V(D),g=new X(W,()=>k(()=>import("./IndexPage-b324c76f.js"),["static/js/IndexPage-b324c76f.js","static/css/IndexPage-9cad09f7.css","static/js/vendor-6699f66f.js","static/js/ProjectsPage-2089a8fd.js","static/css/ProjectsPage-b5e6d652.css","static/js/plugin-vue_export-helper-4223c0cf.js","static/js/l00-Simple3DText-64334f26.js","static/css/l00-Simple3DText-37b5226c.css","static/js/OrbitControls-2adf22e8.js","static/js/EventEmitter-05980808.js","static/js/helvetiker_regular.typeface-2c35b67c.js","static/js/FontLoader-0c8d66fa.js"]));m.use(g.router);m.provide("projectsRouter",g);m.mount("#app");
