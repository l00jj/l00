import{d as i,i as m,q as l,o as c,c as n,a as _,F as v,s as B,n as h,u,K as y,j as g,g as k}from"./vendor-9f0bb9fc.js";import{_ as b}from"./plugin-vue_export-helper-4223c0cf.js";const $={class:"bubbles"},x=i({name:"l00-BubblesRise-B",props:{color:{type:String,required:!1}},setup(d,{expose:a}){const s=m({bubblesNumber:64,backgroundColor:"#0c192c"});a({parameter:s});const t=(r,e)=>(e=10**e,Math.round(r*e)/e),o=l(()=>Object.entries({"background-color":s.backgroundColor}).reduce((r,e)=>`${r}${e[0]}:${e[1]};`,"")),f=l(()=>Array(s.bubblesNumber).fill(0).map(()=>`--duration:${t(125/(9+Math.random()*15),4)}s;`));return(r,e)=>(c(),n("section",y(r.$attrs,{style:u(o)}),[_("div",$,[(c(!0),n(v,null,B(u(f),p=>(c(),n("span",{style:h(p)},null,4))),256))])],16))}});var N=b(x,[["__scopeId","data-v-33eef0ae"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-bubbles-rise/l00-BubblesRise-B.vue"]]);const R={class:"container"},S=i({name:"effect-bubbles-rise",setup(d){const a=[];return g(()=>{const s=window.location.hash.slice(1);a.forEach(t=>{const o=t.dataset.name;o&&o===s?t.classList.add("top"):t.classList.remove("top")})}),(s,t)=>(c(),n("div",R,[_("div",{class:"container-item",ref:o=>a.push(o),"data-name":"effect-bubbles-rise-b"},[k(N)],512)]))}});var C=b(S,[["__scopeId","data-v-3dde85d6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-bubbles-rise/effect-bubbles-rise.vue"]]);export{C as default};