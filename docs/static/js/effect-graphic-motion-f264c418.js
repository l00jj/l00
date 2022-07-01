import{d as w,r as g,i as W,B as x,j as C,C as R,o as d,c as u,a as o,F as G,s as L,u as h,t as M,p as H,e as z,f as E,l as I,m as V,w as b,g as S}from"./vendor-9f0bb9fc.js";import{V as A,a as $}from"./EffectsProjectView_Item-778de738.js";import{g as r}from"./index-6d58611a.js";import{_ as T}from"./plugin-vue_export-helper-4223c0cf.js";const O=s=>(H("data-v-48fc40a7"),s=s(),z(),s),J={class:"view"},Y={class:"blocks"},D=O(()=>o("h2",{class:"title"},[o("span",null,"Graphic Motion Example"),o("br"),E("AnimeJS | GSAP")],-1)),X=w({name:"l00-GraphicMotion-A",setup(s){const v=Array(100).fill(0).map(t=>Symbol()),m=new Set,n=g(),e=W({dynamicSceneWidth:0,dynamicsceneHeight:0,computedSceneBorderLeft:0,computedSceneBorderRight:0,computedSceneBorderTop:0,computedSceneBorderBottom:0}),c=()=>{if(!n.value)return;const t=n.value;e.dynamicSceneWidth=t.offsetWidth,e.dynamicsceneHeight=t.offsetHeight},B=x(()=>{e.computedSceneBorderRight=e.dynamicSceneWidth/2,e.computedSceneBorderLeft=-e.computedSceneBorderRight,e.computedSceneBorderBottom=e.dynamicsceneHeight/2,e.computedSceneBorderTop=-e.computedSceneBorderBottom}),f=new ResizeObserver(c);C(()=>{n.value&&f.observe(n.value),setTimeout(()=>l())}),R(()=>{f.disconnect(),B()});let a=g(!0);const y=()=>{a.value=!a.value,a.value&&l()};let i=!1;const l=()=>{i||(i=!0,r.to([...m],{scale:r.utils.random(1,5,!0),translateX:r.utils.random(e.computedSceneBorderLeft,e.computedSceneBorderRight,!0),translateY:r.utils.random(e.computedSceneBorderTop,e.computedSceneBorderBottom,!0),duration:2,ease:"elastic.out(1, 0.3)",stagger:.01,onComplete:()=>{i=!1,a.value&&setTimeout(()=>l(),1e3)}}))};return(t,k)=>(d(),u("section",{class:"background",ref_key:"scene",ref:n},[o("div",J,[o("div",Y,[(d(!0),u(G,null,L(h(v),p=>(d(),u("div",{class:"block",ref_for:!0,ref:_=>h(m).add(_),key:p}))),128))]),D]),o("div",{class:"console",onClick:y},[o("span",null,"Click To "+M(h(a)?"Stop":"Animate"),1)])],512))}});var N=T(X,[["__scopeId","data-v-48fc40a7"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion/l00-GraphicMotion-A.vue"]]);const P=s=>(H("data-v-490a5828"),s=s(),z(),s),j={class:"view"},K={class:"blocks"},U=P(()=>o("h2",{class:"title"},[o("span",null,"Graphic Motion Example"),o("br"),E("AnimeJS | GSAP")],-1)),q=w({name:"l00-GraphicMotion-B",setup(s){const v=Array(100).fill(0).map(t=>Symbol()),m=new Set,n=g(),e=W({dynamicSceneWidth:0,dynamicsceneHeight:0,computedSceneBorderLeft:0,computedSceneBorderRight:0,computedSceneBorderTop:0,computedSceneBorderBottom:0}),c=()=>{if(!n.value)return;const t=n.value;e.dynamicSceneWidth=t.offsetWidth,e.dynamicsceneHeight=t.offsetHeight},B=x(()=>{e.computedSceneBorderRight=e.dynamicSceneWidth/2,e.computedSceneBorderLeft=-e.computedSceneBorderRight,e.computedSceneBorderBottom=e.dynamicsceneHeight/2,e.computedSceneBorderTop=-e.computedSceneBorderBottom}),f=new ResizeObserver(c);C(()=>{n.value&&f.observe(n.value),setTimeout(()=>l())}),R(()=>{f.disconnect(),B()});let a=g(!0);const y=()=>{a.value=!a.value,a.value&&l()};let i=!1;const l=()=>{i||(i=!0,r.to([...m],{scale:r.utils.random(1,5,!0),translateX:r.utils.random(e.computedSceneBorderLeft,e.computedSceneBorderRight,!0),translateY:r.utils.random(e.computedSceneBorderTop,e.computedSceneBorderBottom,!0),duration:2,ease:"elastic.out(1, 0.3)",stagger:.01,onComplete:()=>{i=!1,a.value&&setTimeout(()=>l(),1e3)}}))};return(t,k)=>(d(),u("section",{class:"background",ref_key:"scene",ref:n},[o("div",j,[o("div",K,[(d(!0),u(G,null,L(h(v),p=>(d(),u("div",{class:"block",ref_for:!0,ref:_=>h(m).add(_),key:p}))),128))]),U]),o("div",{class:"console",onClick:y},[o("span",null,"Click To "+M(h(a)?"Stop":"Animate"),1)])],512))}});var Q=T(q,[["__scopeId","data-v-490a5828"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion/l00-GraphicMotion-B.vue"]]);const Z={class:"view"},ee={class:"text"},te=w({name:"l00-GraphicMotionFlyingText-A",setup(s){const m="In the world, soccer of football is the most popular sport. This is because many countries have wonderful teams for the World Cup. The World Cup is held every four years. To remember 2002 FIFA World Cup, children from different countries and more than 60 children from Japanese schools came together and spent three weekends drawing a big picture called \u201CDream(\u68A6\u5E7B) World Cups\u201D in Japan. The children drew animals, flowers and people playing soccer under a bule bright sky. They wished each football team good luck by drawing the flags(\u65D7\u5E1C) of all the countries that will take part in the World Cup in Japan and South Korea. The picture was put up in a park near a playground in Yokohama. Some football teams will have games there. Are you a football fan(\u8FF7)? The World Cup makeds more and more people interested in football Teenagers(\u9752\u5C11\u5E74) like playing and watching football. Many of them love some football stars so much that they get the pictures of their favourite players on the walls of their rooms. That is the way to show their love for the World Cup as children in Japan.".split(""),n=new Set,e=g(),c=W({dynamicSceneWidth:0,dynamicsceneHeight:0,computedSceneBorderLeft:0,computedSceneBorderRight:0,computedSceneBorderTop:0,computedSceneBorderBottom:0}),B=()=>{if(!e.value)return;const t=e.value;c.dynamicSceneWidth=t.offsetWidth,c.dynamicsceneHeight=t.offsetHeight},f=x(()=>{c.computedSceneBorderRight=c.dynamicSceneWidth/2,c.computedSceneBorderLeft=-c.computedSceneBorderRight,c.computedSceneBorderBottom=c.dynamicsceneHeight/2,c.computedSceneBorderTop=-c.computedSceneBorderBottom}),a=new ResizeObserver(B);C(()=>{e.value&&a.observe(e.value),setTimeout(()=>l())}),R(()=>{a.disconnect(),f()});let y=g(!0),i=!1;const l=()=>{if(i)return;i=!0;const t=r.timeline({defaults:{duration:5,ease:"circ.inOut",stagger:.02},onComplete:()=>{i=!1,y.value&&setTimeout(()=>l(),1e3)}}),{computedSceneBorderLeft:k,computedSceneBorderRight:p,computedSceneBorderTop:_,computedSceneBorderBottom:F}=c;t.to([...n],{"--rotate":r.utils.unitize(r.utils.random(-360,360,!0),"deg"),"--translateX":r.utils.unitize(r.utils.random(k,p,!0),"px"),"--translateY":r.utils.unitize(r.utils.random(_,F,!0),"px")}),t.to([...n],{"--rotate":0,"--translateX":0,"--translateY":0})};return(t,k)=>(d(),u("section",{class:"background",ref_key:"scene",ref:e},[o("div",Z,[o("p",ee,[(d(!0),u(G,null,L(h(m),p=>(d(),u("span",{ref_for:!0,ref:_=>h(n).add(_),class:I({char:p!==" "})},M(p),3))),256))])])],512))}});var oe=T(te,[["__scopeId","data-v-4fa48663"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion/l00-GraphicMotionFlyingText-A.vue"]]);const ne=w({name:"effect-graphic-motion",setup(s){return(v,m)=>(d(),V($,null,{default:b(()=>[S(A,{style:{height:"100vh"},name:"effect-graphic-motion-a"},{default:b(()=>[S(N)]),_:1}),S(A,{style:{height:"100vh"},name:"effect-graphic-motion-b"},{default:b(()=>[S(Q)]),_:1}),S(A,{style:{height:"100vh"},name:"effect-graphic-motion-flying-text-a"},{default:b(()=>[S(oe)]),_:1})]),_:1}))}});var ie=T(ne,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-graphic-motion/effect-graphic-motion.vue"]]);export{ie as default};
