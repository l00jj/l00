var y=Object.defineProperty;var p=(e,a,s)=>a in e?y(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s;var t=(e,a,s)=>(p(e,typeof a!="symbol"?a+"":a,s),s);import{d as _,i as u,o as r,c as n,a as d,F as m,q as f,p as v,e as h,n as S}from"./vendor-fe1a04dd.js";import{_ as k}from"./plugin-vue_export-helper-4223c0cf.js";const C=e=>(v("data-v-19adc0ea"),e=e(),h(),e),x=C(()=>d("div",{class:"cloud"},null,-1)),A={class:"rain"},g=_({name:"l00-RainyCloud-A",props:{color:{type:[String,Array],required:!1}},setup(e){class a{constructor(){t(this,"id",Symbol());t(this,"style",{display:"block","--delay":"0s"});this.randomStyleDelay()}randomStyleDelay(){const o=`${Math.floor(Math.random()*30+3)/10}s`;return this.style["--delay"]=o,o}}const s=u(Array(20).fill(0).map((l,c)=>new a)),i=()=>s.forEach(l=>l.randomStyleDelay());return(l,c)=>(r(),n("div",{class:"sky",style:{"--sky-height":"400px","--drip-size":"10px"},onClick:i},[x,d("div",A,[(r(!0),n(m,null,f(s,o=>(r(),n("div",{key:o.id,class:"drip",style:S(o.style)},null,4))),128))])]))}});var B=k(g,[["__scopeId","data-v-19adc0ea"],["__file","/Volumes/Work/l00/l00/source/src/components/effects/animation-rainy-cloud/l00-RainyCloud-A.vue"]]);export{B as default};
