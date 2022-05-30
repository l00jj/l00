import{d as c,i as _,q as u,o as d,c as l,L as h,u as $,p as f,e as v,a as t,j as x,g as m}from"./vendor-3967ae7f.js";import{_ as p}from"./plugin-vue_export-helper-4223c0cf.js";const g=o=>(f("data-v-aa9d3d32"),o=o(),v(),o),z=g(()=>t("div",{class:"loader"},[t("span"),t("span"),t("span")],-1)),y=[z],b=c({name:"l00-LoaderGlassmorphism-A",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:n}){const e=_({size:150,scale:.4,time:4,backgroundColor:"#1a191d"});n({parameter:e});const r=(a,s)=>(s=10**s,Math.round(a*s)/s),i=u(()=>Object.entries({"--size":`${e.size}px`,"--scale":`${e.scale}`,"--blur":`${e.size/10}px`,"--animationTime":`${e.time}s`,"--translate_1":`translate(${-e.size}px,${r(e.size/3,2)}px)`,"--translate_2":`translate(${e.size}px,${-r(e.size/3,2)}px)`,"background-color":e.backgroundColor}).reduce((a,s)=>`${a}${s[0]}:${s[1]};`,""));return(a,s)=>(d(),l("section",h(a.$attrs,{style:$(i)}),y,16))}});var L=p(b,[["__scopeId","data-v-aa9d3d32"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loader-glassmorphism/l00-LoaderGlassmorphism-A.vue"]]);const S=o=>(f("data-v-aa810e30"),o=o(),v(),o),k=S(()=>t("div",{class:"loader"},[t("span"),t("span")],-1)),G=[k],w=c({name:"l00-LoaderGlassmorphism-B",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:n}){const e=_({size:150,animationTime:2,backgroundColor:"#eafdff"});n({parameter:e});const r=(a,s)=>(s=10**s,Math.round(a*s)/s),i=u(()=>Object.entries({"--size":`${e.size}px`,"--blur":`${r(e.size/15,2)}px`,"--shadowBottom":`${-r(e.size*2/3,2)}px`,"--shadowWidth":`${e.size*1.4}px`,"--shadowHeight":`${e.size*.25}px`,"--animationTranslateX_1":`${e.size*.55}px`,"--animationTranslateX_2":`${e.size*-.55}px`,"--animationTime":`${e.animationTime}s`,"--animationDelay":`${r(e.animationTime/-2,2)}s`,"background-color":e.backgroundColor}).reduce((a,s)=>`${a}${s[0]}:${s[1]};`,""));return(a,s)=>(d(),l("section",h(a.$attrs,{style:$(i)}),G,16))}});var C=p(w,[["__scopeId","data-v-aa810e30"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loader-glassmorphism/l00-LoaderGlassmorphism-B.vue"]]);const T=o=>(f("data-v-aa64df2e"),o=o(),v(),o),B=T(()=>t("div",{class:"loader"},[t("div",{class:"rotate"},[t("span")]),t("span")],-1)),I=[B],A=c({name:"l00-LoaderGlassmorphism-C",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:n}){const e=_({size:150,animationTime:2,backgroundColor:"#eafdff"});n({parameter:e});const r=(a,s)=>(s=10**s,Math.round(a*s)/s),i=u(()=>Object.entries({"--size":`${e.size}px`,"--outerSize":`${r(e.size*(1+2/15),0)}px`,"--blur":`${r(e.size/15,2)}px`,"--shadowBottom":`${-r(e.size*2/3,2)}px`,"--shadowWidth":`${e.size*1.4}px`,"--shadowHeight":`${e.size*.25}px`,"--animationTime":`${e.animationTime}s`,"background-color":e.backgroundColor}).reduce((a,s)=>`${a}${s[0]}:${s[1]};`,""));return(a,s)=>(d(),l("section",h(a.$attrs,{style:$(i)}),I,16))}});var V=p(A,[["__scopeId","data-v-aa64df2e"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loader-glassmorphism/l00-LoaderGlassmorphism-C.vue"]]);const W={class:"container"},j=c({name:"loader-glassmorphism",setup(o){const n=[];return x(()=>{const e=window.location.hash.slice(1);n.forEach(r=>{const i=r.dataset.name;i&&i===e?r.classList.add("top"):r.classList.remove("top")})}),(e,r)=>(d(),l("div",W,[t("div",{class:"container-item",ref:i=>n.push(i),"data-name":"loader-glassmorphism-a"},[m(L)],512),t("div",{class:"container-item",ref:i=>n.push(i),"data-name":"loader-glassmorphism-bc"},[m(C),m(V)],512)]))}});var N=p(j,[["__scopeId","data-v-ab29cbc6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loader-glassmorphism/loader-glassmorphism.vue"]]);export{N as default};
