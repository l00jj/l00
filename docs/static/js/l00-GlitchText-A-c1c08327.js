import{d as l,i as p,w as _,o as u,c as d,a as s,t as o,n as x,u as m}from"./vendor-fe1a04dd.js";import{_ as f}from"./plugin-vue_export-helper-4223c0cf.js";const h={class:"debris"},y={class:"debris"},v=l({name:"l00-GlitchText-A",props:{color:{type:[String,Array],required:!1},text:{type:String,required:!0}},setup(c,{expose:n}){const e=c,r=p({size:80,bgColor:"#222"});n({option:r});const i=_(()=>Object.entries({"--fontSize":`${r.size}px`}).reduce((a,t)=>`${a}${t[0]}:${t[1]};`,""));return(a,t)=>(u(),d("div",{class:"glitch",style:x(m(i))},[s("span",null,o(e.text),1),s("span",h,o(e.text),1),s("span",y,o(e.text),1)],4))}});var b=f(v,[["__scopeId","data-v-4208b60a"],["__file","/Volumes/Work/l00 Studio/l00/source/src/components/effects/glitch-text/l00-GlitchText-A.vue"]]);export{b as default};
