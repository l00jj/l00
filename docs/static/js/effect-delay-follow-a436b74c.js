import{d as h,h as x,i as C,o as a,b as r,e as c,F,x as $,u as D,U as V,p as A,g as B,k as y,n as z,E,a as W,w,s as p}from"./vendor-3584b0a8.js";import{V as b,a as X}from"./EffectsProjectView_Item-47fedb92.js";import{_ as v}from"./plugin-vue_export-helper-46f75680.js";const Y=o=>(A("data-v-0a8b833d"),o=o(),B(),o),N=Y(()=>c("h1",null,"Let Move Mouse",-1)),G=h({name:"l00-DelayFollow-A",setup(o){const S={"--size":`${100}px`,backgroundColor:"#000"},m=Array(30).fill(0),f=[],n=x(),_=t=>{i=()=>{};const e=()=>{const s=n.value;s.style.display="inherit",i=l=>{y.to(f,{x:l.offsetX,y:l.offsetY,stagger:-.05})}};y.to(f,{x:t.offsetX,y:t.offsetY,duration:0,onComplete:e})};let i=t=>{_(t)};const u=t=>{i(t)};return C(()=>{}),(t,e)=>(a(),r("section",V(t.$attrs,{style:S,onMousemove:u}),[N,c("div",{class:"container",ref_key:"container",ref:n,style:{display:"none"}},[(a(!0),r(F,null,$(D(m),s=>(a(),r("span",{class:"follower",ref_for:!0,ref:l=>f.push(l)},null,512))),256))],512)],16))}});var P=v(G,[["__scopeId","data-v-0a8b833d"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-delay-follow/l00-DelayFollow-A.vue"]]);const I=o=>(A("data-v-0a999abe"),o=o(),B(),o),T=I(()=>c("h1",null,"Let Move Mouse",-1)),U=E("wel"),j=I(()=>c("span",null,"co",-1)),q=E("me"),H=[U,j,q],J=h({name:"l00-DelayFollow-B",setup(o){const m={backgroundColor:"#000"},f=Array(50).fill(-15/(50-1)).map((e,s)=>({style:`--i:${s};--rotate:${10+e*(50-1-s)}deg;`})),n=[],_=x(),i=e=>{u=()=>{};const s=()=>{const l=_.value;l.style.display="inherit",u=d=>{y.to(n,{x:d.offsetX,y:d.offsetY,stagger:-.01})}};y.to(n,{x:e.offsetX,y:e.offsetY,duration:0,onComplete:s})};let u=e=>{i(e)};const t=e=>{u(e)};return C(()=>{}),(e,s)=>(a(),r("section",V(e.$attrs,{style:m,onMousemove:t}),[T,c("div",{class:"container",ref_key:"container",ref:_,style:{display:"none"}},[(a(!0),r(F,null,$(D(f),l=>(a(),r("div",{class:"follower",ref_for:!0,ref:d=>n.push(d)},[c("p",{style:z(l.style)},H,4)],512))),256))],512)],16))}});var K=v(J,[["__scopeId","data-v-0a999abe"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-delay-follow/l00-DelayFollow-B.vue"]]);const O=h({name:"effect-delay-follow",setup(o){return(g,k)=>(a(),W(X,null,{default:w(()=>[p(b,{style:{height:"90vh"},name:"effect-delay-follow-b"},{default:w(()=>[p(K)]),_:1}),p(b,{style:{height:"90vh"},name:"effect-delay-follow-a"},{default:w(()=>[p(P)]),_:1})]),_:1}))}});var ee=v(O,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-delay-follow/effect-delay-follow.vue"]]);export{ee as default};