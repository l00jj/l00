var g=Object.defineProperty;var y=(o,e,r)=>e in o?g(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var i=(o,e,r)=>(y(o,typeof e!="symbol"?e+"":e,r),r);import{d as b,r as v,c as _,o as n,b as u,F as S,x as h,n as p,u as d,p as k,g as x,e as B,h as F,s as L}from"./vendor-79ae1290.js";import{_ as f}from"./plugin-vue_export-helper-4223c0cf.js";const A=o=>(k("data-v-ba328336"),o=o(),x(),o),I=A(()=>B("span",null,"Loading...",-1)),$=b({name:"l00-BlobFigure-Loader-A",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:e}){const r=v({size:200,bgColor:"#111"});e({option:r});const t=_(()=>Object.entries({"--size":`${r.size}px`}).reduce((l,s)=>`${l}${s[0]}:${s[1]};`,""));class a{constructor(s,c){i(this,"id",Symbol());i(this,"style",{display:"block","--i":0,"--parameter":""});this.style["--i"]=s,this.style["--parameter"]=c}}const m=_(()=>["84% 16% 71% 29% / 33% 74% 26% 67%","32% 68% 30% 70% / 70% 74% 26% 30%","71% 29% 30% 70% / 70% 50% 50% 30%"].map((l,s)=>new a(s,l)));return(l,s)=>(n(),u("div",{class:"loader",style:p(d(t))},[I,(n(!0),u(S,null,h(d(m),c=>(n(),u("div",{class:"blob",key:c.id,style:p(c.style)},null,4))),128))],4))}});var z=f($,[["__scopeId","data-v-ba328336"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/blob-figure/l00-BlobFigure-Loader-A.vue"]]);const C=b({name:"blob-figure",setup(o){const e=F(),r=_(()=>{var t,a;return(a=(t=e==null?void 0:e.value)==null?void 0:t.option)==null?void 0:a.bgColor});return(t,a)=>(n(),u("section",{style:p({background:d(r)})},[L(z,{ref_key:"vBlobFigureLoaderA",ref:e},null,512)],4))}});var W=f(C,[["__scopeId","data-v-2b74bf32"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/blob-figure/blob-figure.vue"]]);export{W as default};