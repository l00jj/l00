var y=Object.defineProperty;var p=(e,a,o)=>a in e?y(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o;var r=(e,a,o)=>(p(e,typeof a!="symbol"?a+"":a,o),o);import{d as c,r as m,o as n,b as l,e as d,F as f,x as v,n as h,p as S,g as k,s as x}from"./vendor-7f61e06f.js";import{_}from"./plugin-vue_export-helper-4223c0cf.js";const C=e=>(S("data-v-23470032"),e=e(),k(),e),g=C(()=>d("div",{class:"cloud"},null,-1)),A={class:"rain"},R=c({name:"l00-RainyCloud-A",props:{color:{type:[String,Array],required:!1}},setup(e){class a{constructor(){r(this,"id",Symbol());r(this,"style",{display:"block","--delay":"0s"});this.randomStyleDelay()}randomStyleDelay(){const s=`${Math.floor(Math.random()*30+3)/10}s`;return this.style["--delay"]=s,s}}const o=m(Array(20).fill(0).map((t,i)=>new a)),u=()=>o.forEach(t=>t.randomStyleDelay());return(t,i)=>(n(),l("div",{class:"sky",style:{"--sky-height":"400px","--drip-size":"10px"},onClick:u},[g,d("div",A,[(n(!0),l(f,null,v(o,s=>(n(),l("div",{key:s.id,class:"drip",style:h(s.style)},null,4))),128))])]))}});var b=_(R,[["__scopeId","data-v-23470032"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/animation-rainy-cloud/l00-RainyCloud-A.vue"]]);const I={style:{background:"#181c1f"}},D=c({name:"animation-rainy-cloud",setup(e){return(a,o)=>(n(),l("section",I,[x(b)]))}});var w=_(D,[["__scopeId","data-v-04bf0f07"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/animation-rainy-cloud/animation-rainy-cloud.vue"]]);export{w as default};