import{d as i,r as b,o as r,c as _,a as e,l as y,F as g,s as k,n as S,u as x,t as l,K as h,p as A,e as B,b as $,m as D,w as d,g as u}from"./vendor-9f0bb9fc.js";import{V as m,a as w}from"./EffectsProjectView_Item-778de738.js";import{_ as f}from"./plugin-vue_export-helper-4223c0cf.js";const p=a=>(A("data-v-07103eba"),a=a(),B(),a),F=p(()=>e("div",{class:"plane top"},null,-1)),V=p(()=>e("h2",null,"77",-1)),I=p(()=>e("h2",{class:"shadow"},"77",-1)),E=[V,I],W=p(()=>e("div",{class:"plane light"},null,-1)),q={class:"control"},N=i({name:"l00-3DCube-A",props:{color:{type:[String,Array],required:!1}},setup(a){const c={backgroundColor:"#050505"},t=b(!0),s=Array(4).fill(0).map((o,v)=>v),n=()=>t.value=!t.value;return(o,v)=>(r(),_("section",h(o.$attrs,{style:c}),[e("div",{id:"cube",class:"view",onClick:n},[e("div",{id:"planes",class:y(["rotate-animate",{"paused-animation":!t.value}])},[F,(r(!0),_(g,null,k(x(s),C=>(r(),_("div",{class:"plane corral",style:S(`--i:${C}`)},E,4))),256)),W],2)]),e("div",q,[e("button",{onClick:n,style:{padding:"0.2em 1em"}},l(t.value?"\u5173\u95ED\u65CB\u8F6C":"\u5F00\u542F\u65CB\u8F6C"),1)])],16))}});var P=f(N,[["__scopeId","data-v-07103eba"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/l00-3DCube-A.vue"]]);const z={class:"container"},G={class:"view"},K=$("<span data-top data-v-06f40fb8></span><span data-front data-v-06f40fb8></span><span data-back data-v-06f40fb8></span><span data-left data-v-06f40fb8></span><span data-right data-v-06f40fb8></span><span data-shadow data-v-06f40fb8></span>",6),L=[K],j={class:"control"},H=i({name:"l00-3DCube-B",props:{color:{type:[String,Array],required:!1}},setup(a){const c={backgroundColor:"#fff"},t=b(),s=b(!0),n=()=>{s.value=!s.value,t.value.getAnimations().forEach(o=>s.value?o.play():o.pause())};return(o,v)=>(r(),_("section",h(o.$attrs,{style:c}),[e("div",z,[e("div",G,[e("div",{class:"cube",ref_key:"cube",ref:t},L,512)])]),e("div",j,[e("button",{onClick:n,style:{padding:"0.2em 1em"}},l(s.value?"\u5173\u95ED\u65CB\u8F6C":"\u5F00\u542F\u65CB\u8F6C"),1)])],16))}});var J=f(H,[["__scopeId","data-v-06f40fb8"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/l00-3DCube-B.vue"]]);const M={class:"cube"},O={class:"face front"},Q={class:"face back"},R={class:"face top"},T={class:"face bottom"},U=i({name:"l00-3DCubeButton-A",props:{text:{type:String,required:!0}},setup(a){const c=a,t={text:c.text?c.text:"",backgroundColor:"#fff"},s={backgroundColor:`${t.backgroundColor}`};return(n,o)=>(r(),_("section",h(n.$attrs,{style:s}),[e("div",M,[e("span",O,l(t.text),1),e("span",Q,l(t.text),1),e("span",R,l(t.text),1),e("span",T,l(t.text),1)])],16))}});var X=f(U,[["__scopeId","data-v-2aff5d96"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/l00-3DCubeButton-A.vue"]]);const Y=i({name:"effect-3d-cube",setup(a){return(c,t)=>(r(),D(w,null,{default:d(()=>[u(m,{style:{height:"80vh"},name:"effect-3d-cube-b"},{default:d(()=>[u(J)]),_:1}),u(m,{style:{height:"80vh"},name:"effect-3d-cube-a"},{default:d(()=>[u(P)]),_:1}),u(m,{style:{height:"80vh"},name:"effect-3d-cube-button-a"},{default:d(()=>[u(X,{text:"welcome"})]),_:1})]),_:1}))}});var ae=f(Y,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/effect-3d-cube.vue"]]);export{ae as default};
