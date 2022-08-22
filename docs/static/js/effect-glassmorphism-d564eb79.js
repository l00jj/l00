import{d as m,m as E,r as w,o as p,b as h,e,C as k,n as C,br as x,K as B,i as G,l as N,h as b,c as W,u as j,p as V,g as L,f as g,s as r,w as c,E as $}from"./vendor-ba83ea21.js";import{_ as v}from"./plugin-vue_export-helper-4223c0cf.js";const q=m({name:"l00-EffectGlassmorphismB-Group",props:{color:{type:[String,Array],required:!1}},setup(o){const l={backgroundColor:"#1e2759"};E("glassItems",new Set);const t=w({left:50,width:0});return E("glassMarker",t),(s,f)=>(p(),h("section",x(s.$attrs,{style:l}),[e("ul",null,[k(s.$slots,"default",{},void 0,!0),e("div",{id:"marker",style:C({left:`${t.left}px`,width:`${t.width}px`})},null,4)])],16))}});var A=v(q,[["__scopeId","data-v-2ba14931"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism/l00-EffectGlassmorphismB-Group.vue"]]);const T=["active"],z=m({name:"l00-EffectGlassmorphismB-Item",props:{active:{type:Boolean,required:!1}},setup(o){const l=o,a=B("glassItems"),t=B("glassMarker");G(()=>a.add(s)),N(()=>a.delete(s));const s=b(void 0),f=d=>{const{offsetLeft:I,offsetWidth:M}=d;t.left=I,t.width=M,a.forEach(S=>S.value=S===s?!0:void 0)},n=d=>{f(d.target)},i=b(void 0);return G(()=>{l.active===!0&&f(i.value)}),(d,I)=>(p(),h("li",{onMouseenter:n,active:s.value,ref_key:"elLi",ref:i},[k(d.$slots,"default",{},void 0,!0)],40,T))}});var u=v(z,[["__scopeId","data-v-39dd1951"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism/l00-EffectGlassmorphismB-Item.vue"]]);const H=o=>(V("data-v-bb76a2ae"),o=o(),L(),o),K=H(()=>e("div",{id:"panel"},[e("div",{id:"light"}),e("div",{id:"glass"})],-1)),O={id:"content"},P=m({name:"l00-EffectGlassmorphism-C",props:{color:{type:[String,Array],required:!1}},setup(o,{expose:l}){const a=o,t=w({backgroundColor:"#350048"});l({parameter:t});const s=W(()=>Object.entries({"background-color":t.backgroundColor}).reduce((n,i)=>`${n}${i[0]}:${i[1]};`,"")),f=b(a.color?a.color:"#ff1f71");return(n,i)=>(p(),h("section",x(n.$attrs,{style:j(s)}),[e("button",{style:C([`--color:${f.value}`])},[K,e("div",O,[k(n.$slots,"default",{},void 0,!0)])],4)],16))}});var y=v(P,[["__scopeId","data-v-bb76a2ae"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism/l00-EffectGlassmorphism-C.vue"]]);const _=o=>(V("data-v-b4493646"),o=o(),L(),o),U={class:"container"},D=$("Glass"),F=$("Glass"),J=$("Glass"),Q=_(()=>e("a",null,[e("span",null,"Home")],-1)),R=_(()=>e("a",null,[e("span",null,"person")],-1)),X=_(()=>e("a",null,[e("span",null,"+")],-1)),Y=_(()=>e("a",null,[e("span",null,"setting")],-1)),Z=_(()=>e("a",null,[e("span",null,"chat")],-1)),ee=m({name:"effect-glassmorphism",setup(o){const l=[];return G(()=>{const a=window.location.hash.slice(1);l.forEach(t=>{const s=t.dataset.name;s&&s===a?t.classList.add("top"):t.classList.remove("top")})}),(a,t)=>(p(),h("div",U,[g("  "),e("div",{class:"container-item",ref:s=>l.push(s),"data-name":"effect-glassmorphism-c",style:{background:"#350048","justify-content":"center","align-items":"center"}},[r(y,{color:"#ff1f71"},{default:c(()=>[D]),_:1}),r(y,{color:"#2bd2ff"},{default:c(()=>[F]),_:1}),r(y,{color:"#1eff45"},{default:c(()=>[J]),_:1})],512),g("  "),e("div",{class:"container-item",ref:s=>l.push(s),"data-name":"effect-glassmorphism-b",style:{background:"#1e2759","justify-content":"center","align-items":"center"}},[r(A,null,{default:c(()=>[r(u,{active:!0},{default:c(()=>[Q]),_:1}),r(u,null,{default:c(()=>[R]),_:1}),r(u,null,{default:c(()=>[X]),_:1}),r(u,null,{default:c(()=>[Y]),_:1}),r(u,null,{default:c(()=>[Z]),_:1})]),_:1})],512),g("  ")]))}});var oe=v(ee,[["__scopeId","data-v-b4493646"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism/effect-glassmorphism.vue"]]);export{oe as default};
