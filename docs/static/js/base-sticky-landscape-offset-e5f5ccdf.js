import{d as b,h as _,i as k,l as w,o as c,b as a,e as r,F as p,x as v,u as h}from"./vendor-f8719ffa.js";import{l as x}from"./effectsList-cc9c759d.js";import{_ as S}from"./plugin-vue_export-helper-46f75680.js";import"./preload-helper-33ac5944.js";import"./ProjectInfo-7c1d079e.js";const L={class:"background"},R=["src"],B=b({name:"base-sticky-landscape-offset",setup(E){const s=Array(2).fill(0).map((l,n)=>({dom:{},list:x.slice(0+n*30/2,(n+1)*30/2)})),i=_(),d=_();return k(()=>{const l=()=>{const o=i.value;if(!o)return;const t=o.getBoundingClientRect(),e=document.documentElement.clientHeight;t.top<e&&t.bottom>0&&n(t,e)},n=(o,t)=>{const e=document.documentElement.clientWidth,u=d.value.getBoundingClientRect(),y=u.height+o.height+t/2,g=u.top-o.height/2-t,m=Math.abs(g/y),f=m*(s[0].dom.offsetWidth-e);s[0].dom.style.transform=`translateX(-${f}px)`,m*(s[1].dom.offsetWidth-e),s[1].dom.style.transform=`translateX(${f}px)`};window.document.addEventListener("scroll",l),w(()=>window.document.removeEventListener("scroll",l))}),(l,n)=>(c(),a("section",L,[r("div",{class:"container",ref_key:"container",ref:d},[r("div",{class:"view",ref_key:"view",ref:i},[(c(!0),a(p,null,v(h(s),(o,t)=>(c(),a("ul",{ref_for:!0,ref:e=>h(s)[t].dom=e},[(c(!0),a(p,null,v(o.list,e=>(c(),a("li",null,[r("img",{src:e.coverUrl,alt:""},null,8,R)]))),256))],512))),256))],512)],512)]))}});var U=S(B,[["__scopeId","data-v-95cbf3c6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/base-sticky-landscape-offset/base-sticky-landscape-offset.vue"]]);export{U as default};