import{d,I as k,i as b,o as i,c as f,B as h,a as e,n as $,J as A,j as S,w as M,r as m,p as x,e as B,g as o,z as l,F as W,f as g}from"./vendor-3967ae7f.js";import{_ as p}from"./plugin-vue_export-helper-4223c0cf.js";const H=d({name:"l00-GlassRowGroup-A",setup(s){k("glassItems",new Set);const t=b({left:50,width:0});return k("glassMarker",t),(r,c)=>(i(),f("ul",null,[h(r.$slots,"default",{},void 0,!0),e("div",{id:"marker",style:$({left:`${t.left}px`,width:`${t.width}px`})},null,4)]))}});var L=p(H,[["__scopeId","data-v-7c5d0011"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism-hover/l00-GlassRowGroup-A.vue"]]);const N=["active"],j=d({name:"l00-GlassRowGroupItem-A",props:{active:{type:Boolean,required:!1}},setup(s){const a=s,t=A("glassItems"),r=A("glassMarker");S(()=>t.add(c)),M(()=>t.delete(c));const c=m(void 0),G=n=>{const{offsetLeft:w,offsetWidth:V}=n;r.left=w,r.width=V,t.forEach(y=>y.value=y===c?!0:void 0)},R=n=>{G(n.target)},I=m(void 0);return S(()=>{a.active===!0&&G(I.value)}),(n,w)=>(i(),f("li",{onMouseenter:R,active:c.value,ref_key:"elLi",ref:I},[h(n.$slots,"default",{},void 0,!0)],40,N))}});var _=p(j,[["__scopeId","data-v-40fe1284"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism-hover/l00-GlassRowGroupItem-A.vue"]]);const q=s=>(x("data-v-61aeacbe"),s=s(),B(),s),z=q(()=>e("div",{id:"panel"},[e("div",{id:"light"}),e("div",{id:"glass"})],-1)),C={id:"content"},E=d({name:"l00-GlassButton-A",props:{color:{type:String,required:!1}},setup(s){const a=s,t=m(a.color?a.color:"#ff1f71");return(r,c)=>(i(),f("button",{style:$([`--color:${t.value}`])},[z,e("div",C,[h(r.$slots,"default",{},void 0,!0)])],4))}});var v=p(E,[["__scopeId","data-v-61aeacbe"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism-hover/l00-GlassButton-A.vue"]]);const u=s=>(x("data-v-6fc9e77d"),s=s(),B(),s),F={style:{background:"#350048"}},J=g("Glass"),T=g("Glass"),U=g("Glass"),D={style:{background:"#1e2759"}},K=u(()=>e("a",null,[e("span",null,"Home")],-1)),O=u(()=>e("a",null,[e("span",null,"person")],-1)),P=u(()=>e("a",null,[e("span",null,"+")],-1)),Q=u(()=>e("a",null,[e("span",null,"setting")],-1)),X=u(()=>e("a",null,[e("span",null,"chat")],-1)),Y=d({name:"effect-glassmorphism-hover",setup(s){return(a,t)=>(i(),f(W,null,[e("section",F,[o(v,{color:"#ff1f71"},{default:l(()=>[J]),_:1}),o(v,{color:"#2bd2ff"},{default:l(()=>[T]),_:1}),o(v,{color:"#1eff45"},{default:l(()=>[U]),_:1})]),e("section",D,[o(L,null,{default:l(()=>[o(_,{active:!0},{default:l(()=>[K]),_:1}),o(_,null,{default:l(()=>[O]),_:1}),o(_,null,{default:l(()=>[P]),_:1}),o(_,null,{default:l(()=>[Q]),_:1}),o(_,null,{default:l(()=>[X]),_:1})]),_:1})])],64))}});var se=p(Y,[["__scopeId","data-v-6fc9e77d"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-glassmorphism-hover/effect-glassmorphism-hover.vue"]]);export{se as default};