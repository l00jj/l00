var x=Object.defineProperty;var B=(o,l,t)=>l in o?x(o,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[l]=t;var p=(o,l,t)=>(B(o,typeof l!="symbol"?l+"":l,t),t);import{d as h,i as y,q as c,o as i,c as n,F as S,s as g,n as _,u as d,a as e,p as w,e as z,C as L,B as k,g as f,z as I,f as M}from"./vendor-3967ae7f.js";import{_ as v}from"./plugin-vue_export-helper-4223c0cf.js";const $=o=>(w("data-v-e826c54e"),o=o(),z(),o),A=$(()=>e("div",{class:"ball"},null,-1)),D=[A],V=$(()=>e("div",{class:"ball-wrap"},[e("div",{class:"ball w"})],-1)),j={id:"blurMe"},C=["stdDeviation"],G=["values"],N=h({name:"l00-SmoothLoding-A",setup(o){const l=y({size:"30px",color:"hsl(60deg 100% 50%)",diam:"140px",dur:"15s",times:3,followers:5,blur:7}),t=c(()=>Object.entries(l).map(r=>`--${r[0]}:${r[1]}`).join(";")),u=c(()=>Array(l.followers).fill(.4*parseInt(l.dur.slice(0,-1))/l.times).map((r,a)=>{const s=r*a/l.followers,m=(a-1)*360/l.followers;return{style:`--delay:${s}s;--hueRotate:${m}deg`}})),b=c(()=>`1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 ${l.blur*2} -${l.blur}`);return(r,a)=>(i(),n("div",{id:"circle",style:_(d(t))},[(i(!0),n(S,null,g(d(u),s=>(i(),n("div",{class:"ball-wrap follower",style:_(s.style)},D,4))),256)),V,(i(),n("svg",null,[e("filter",j,[e("feGaussianBlur",{in:"SourceGraphic",stdDeviation:l.blur},null,8,C),e("feColorMatrix",{type:"matrix",values:d(b)},null,8,G)])]))],4))}});var W=v(N,[["__scopeId","data-v-e826c54e"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loding-smooth-blob-ball/l00-SmoothLoding-A.vue"]]);const E={class:"loader"},F={class:"content"},O={id:"blurMe"},R=["stdDeviation"],q=["values"],T=h({name:"l00-SmoothLoding-B",setup(o){const l=y({ballBumber:8,ballSize:100,ballMiniScale:.4,ballDelay:.15,loaderSize:300,dur:3,ballSmootScale:.1,ballSmooth:0});L(()=>{l.ballSmooth=l.ballSize*l.ballSmootScale});const t=c(()=>{const a={"--ball-size":`${l.ballSize}px`,"--ball-rotate":`${360/l.ballBumber}deg`,"--ball-translateX":`${(l.loaderSize-l.ballSize*l.ballMiniScale)/2}px`,"--ball-miniScale":l.ballMiniScale,"--ball-delay":`${l.ballDelay}s`,"--ball-smooth ":`${l.ballSmooth}px`,"--loader-size":`${l.loaderSize}px`};return Object.entries(a).map(s=>s.join(":")).join(";")});class u{constructor(s){p(this,"id",Symbol());p(this,"style",{display:"block","--i":0});this.style["--i"]=s}}const b=c(()=>Array(l.ballBumber).fill(0).map((a,s)=>new u(s))),r=c(()=>`1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 ${l.ballSmooth*2} -${l.ballSmooth}`);return(a,s)=>(i(),n("div",{class:"container",style:_(d(t))},[e("div",E,[(i(!0),n(S,null,g(d(b),m=>(i(),n("div",{class:"ball",style:_(m.style)},null,4))),256))]),e("div",F,[k(a.$slots,"default",{},void 0,!0)]),(i(),n("svg",null,[e("filter",O,[e("feGaussianBlur",{in:"SourceGraphic",stdDeviation:l.ballSmooth},null,8,R),e("feColorMatrix",{type:"matrix",values:d(r),result:"matrix"},null,8,q)])]))],4))}});var X=v(T,[["__scopeId","data-v-e80a964c"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loding-smooth-blob-ball/l00-SmoothLoding-B.vue"]]);const H={style:{background:"linear-gradient(45deg, #006bc6, #1ecafc)"}},J=M("l00"),K={style:{background:"#0ca0cc"}},P=h({name:"loding-smooth-blob-ball",setup(o){return(l,t)=>(i(),n(S,null,[e("section",H,[f(X,null,{default:I(()=>[J]),_:1})]),e("section",K,[f(W)])],64))}});var Z=v(P,[["__scopeId","data-v-a0392e12"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/loding-smooth-blob-ball/loding-smooth-blob-ball.vue"]]);export{Z as default};