var k=Object.defineProperty;var E=(o,t,e)=>t in o?k(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(E(o,typeof t!="symbol"?t+"":t,e),e);import{_ as z}from"./plugin-vue_export-helper-4223c0cf.js";import{d as M,i as P,j as L,w as S,q as l,o as p,m as h,a as v,n as f,u as _,k as B,H as T,r as V,v as A,x as U,c as C,y as w,F,h as D}from"./vendor-03f4c97d.js";import{T as R}from"./TopMenu-76abb55c.js";import{_ as x}from"./preload-helper-33ac5944.js";import{A as W}from"./Alert404-5eef6cbc.js";import"./logo-52bb2a61.js";const X=M({name:"FloatMenu",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:t}){const e=P({size:38,top:57,left:57,bgColor:"#222"});t({parameter:e});const i=()=>{const{clientWidth:n,clientHeight:s}=document.documentElement;n/s>1?e.top=e.left=e.size*1.5:(e.top=s-e.size*1.5,e.left=n/2)};i(),L(()=>window.addEventListener("resize",i)),S(()=>window.removeEventListener("resize",i));const d=l(()=>Object.entries({"--size":`${e.size}px`}).reduce((n,s)=>`${n}${s[0]}:${s[1]};`,"")),m=l(()=>{const{top:n,left:s}=e;return`top:${n}px;left:${s}px;--top:${n}px;--left:${s}px;`}),r=l(()=>{const{size:n}=e,u=n*.3,b=u*.5,O=Math.cos(Math.PI/4)*u,j=(Math.cos(Math.PI/4)*(u+b)-O)/2;return`--iconSize:${u}px;--iconBorder:${b}px;--iconOffsetX:${j}px`}),c=()=>{window.history.back()};return(n,s)=>(p(),h(T,{to:"body"},[v("div",{style:f(_(d))},[v("div",{class:"back",style:f(_(m)),onClick:c},[v("a",{style:f(_(r))},null,4)],4)],4),B(` <nav class="" >
      
      <div id="logo">
        <a :href="\`\${host}/\`"><img src="@src/assets/logo/logo.svg" alt="l00" /></a>
      </div>
    </nav> `)]))}});var I=z(X,[["__scopeId","data-v-b42766c4"],["__file","/Volumes/Work/l00 Studio/l00/source/src/components/FloatMenu.vue"]]),H={coverUrl:void 0,title:"",tags:[""],date:"2022.05.07 07:00:00",vue:()=>x(()=>import("./index-c203f9c8.js"),["static/js/index-c203f9c8.js","static/css/index-83285363.css","static/js/vendor-03f4c97d.js","static/js/preload-helper-33ac5944.js","static/js/dat.gui.module-a176db7f.js","static/js/index-5ec6505b.js","static/js/plugin-vue_export-helper-4223c0cf.js","static/js/TopMenu-76abb55c.js","static/css/TopMenu-c80ebc82.css","static/js/logo-52bb2a61.js","static/js/Alert404-5eef6cbc.js","static/css/Alert404-f88eda5f.css"])},q=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"})),N="/l00/static/jpg/index-eee48097.jpg",G={coverUrl:N,title:"",tags:[""],date:"2022.05.25 07:00:00",vue:()=>x(()=>import("./l00-view-b0a60c6d.js"),["static/js/l00-view-b0a60c6d.js","static/css/l00-view-371ac168.css","static/js/vendor-03f4c97d.js","static/js/preload-helper-33ac5944.js","static/js/dat.gui.module-a176db7f.js","static/js/plugin-vue_export-helper-4223c0cf.js"])},J=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"})),K="/l00/static/jpg/index-db6fae69.jpg",Q={coverUrl:K,title:"",tags:[""],date:"2022.05.19 07:00:00",vue:()=>x(()=>import("./simple-3d-text-23175f83.js"),["static/js/simple-3d-text-23175f83.js","static/css/simple-3d-text-4e73e2a3.css","static/js/vendor-03f4c97d.js","static/js/preload-helper-33ac5944.js","static/js/dat.gui.module-a176db7f.js","static/js/index-5ec6505b.js","static/js/plugin-vue_export-helper-4223c0cf.js"])},Y=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));class Z{constructor(t,e){a(this,"id");a(this,"title");a(this,"date");a(this,"time");a(this,"coverUrl");a(this,"vue");const i=t.split("/"),d=i[i.length-2];this.id=d,this.title=e.title,this.date=e.date,this.time=new Date(e.date).valueOf(),this.coverUrl=e.coverUrl,this.vue=e.vue}}const ee={"../graphics-components/index/index.ts":q,"../graphics-components/l00-view/index.ts":J,"../graphics-components/simple-3d-text/index.ts":Y},te="index",y=[];let g=null;for(let[o,t]of Object.entries(ee)){const e=new Z(o,t.default);!g&&e.id===te?g=e:y.push(e)}y.sort((o,t)=>t.time-o.time);var $=[g,...y];const oe={id:"main"},ne=M({name:"index",setup(o){const t=V(window.location.hash),e=()=>t.value=window.location.hash;A(()=>window.addEventListener("hashchange",e)),S(()=>window.removeEventListener("hashchange",e));const i=l(()=>{const r=t.value.slice(1);let c=$.find(n=>n.id===r);return c||(c=$[0],r!==""&&W()),c}),d=l(()=>{var r;return U((r=i==null?void 0:i.value)==null?void 0:r.vue)}),m=l(()=>i.value.id==="index"?R:I);return(r,c)=>(p(),C(F,null,[(p(),h(w(_(m)))),v("div",oe,[(p(),h(w(_(d))))])],64))}});var ie=z(ne,[["__file","/Volumes/Work/l00 Studio/l00/source/root/metaverse/index.vue"]]);const se=D(ie);se.mount("#app");export{$ as p};