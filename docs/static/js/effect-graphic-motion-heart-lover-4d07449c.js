import{d as x,h as g,r as M,D as V,i as T,l as W,k as l,o,b as n,e as t,F as B,x as k,u as i,t as C,p as R,g as z,E,a as I,w,s as y}from"./vendor-263e2909.js";import{V as D,a as F}from"./EffectsProjectView_Item-a38eddb6.js";import{_ as b}from"./plugin-vue_export-helper-46f75680.js";const h=r=>(R("data-v-bcee395a"),r=r(),z(),r),N={class:"view"},G=h(()=>t("path",{d:"M2 0c-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0 .55.23 1.04.59 1.41l3.41 3.41 3.41-3.41c.36-.36.59-.85.59-1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59z",fill:"#e80202"},null,-1)),O=[G],U=h(()=>t("h2",{class:"title"},[t("span",null,"Distance makes the hearts grow fonder"),t("br"),E("Heart Lover")],-1)),X=h(()=>t("path",{d:"M2 0c-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0 .55.23 1.04.59 1.41l3.41 3.41 3.41-3.41c.36-.36.59-.85.59-1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59z",fill:"#e80202"},null,-1)),Y=[X],$=x({name:"l00-HeartLoverMotion-A",setup(r){const _=Array(50).fill(0).map(s=>Symbol()),v=Array(10).fill(0).map(s=>Symbol()),d=new Set,c=g(),e=M({dynamicSceneWidth:0,dynamicsceneHeight:0,computedSceneBorderLeft:0,computedSceneBorderRight:0,computedSceneBorderTop:0,computedSceneBorderBottom:0}),L=()=>{if(!c.value)return;const s=c.value;e.dynamicSceneWidth=s.offsetWidth,e.dynamicsceneHeight=s.offsetHeight},H=V(()=>{e.computedSceneBorderRight=e.dynamicSceneWidth/2,e.computedSceneBorderLeft=-e.computedSceneBorderRight,e.computedSceneBorderBottom=e.dynamicsceneHeight/2,e.computedSceneBorderTop=-e.computedSceneBorderBottom}),S=new ResizeObserver(L);T(()=>{c.value&&S.observe(c.value),setTimeout(()=>p())}),W(()=>{S.disconnect(),H()});let a=g(!0);const A=()=>{a.value=!a.value,a.value&&p()};let u=!1;const p=()=>{u||(u=!0,l.to([...d],{scale:l.utils.random(.2,1,!0),translateX:l.utils.random(e.computedSceneBorderLeft,e.computedSceneBorderRight,!0),translateY:l.utils.random(e.computedSceneBorderTop,e.computedSceneBorderBottom,!0),duration:2,ease:"elastic.out(1, 0.3)",stagger:.01,onComplete:()=>{u=!1,a.value&&setTimeout(()=>p(),1e3)}}))};return(s,J)=>(o(),n("section",{class:"background",ref_key:"scene",ref:c},[t("div",N,[(o(!0),n(B,null,k(i(_),m=>(o(),n("svg",{class:"block",ref_for:!0,ref:f=>i(d).add(f),key:m,width:"500",height:"500",viewBox:"0 0 8 8",filter:"drop-shadow(0px 0px 100px #0004)"},O))),128)),U,(o(!0),n(B,null,k(i(v),m=>(o(),n("svg",{class:"block",ref_for:!0,ref:f=>i(d).add(f),key:m,width:"500",height:"500",viewBox:"0 0 8 8",filter:"drop-shadow(0px 0px 100px #0004)"},Y))),128))]),t("div",{class:"console",onClick:A},[t("span",null,"Click To "+C(i(a)?"Stop":"Animate"),1)])],512))}});var j=b($,[["__scopeId","data-v-bcee395a"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion-heart-lover/l00-HeartLoverMotion-A.vue"]]);const q=x({name:"effect-graphic-motion-heart-lover",setup(r){return(_,v)=>(o(),I(F,null,{default:w(()=>[y(D,{style:{height:"100vh"},name:"effect-graphic-motion-heart-lover"},{default:w(()=>[y(j)]),_:1})]),_:1}))}});var Z=b(q,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion-heart-lover/effect-graphic-motion-heart-lover.vue"]]);export{Z as default};