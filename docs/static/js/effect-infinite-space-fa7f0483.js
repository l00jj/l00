import{d as u,r as S,c as U,h as k,l as y,i as H,o as b,b as L,e as T,j as X,n as Y,u as A,W as O,a as V,w as _,s as h}from"./vendor-263e2909.js";import{V as Z,a as w}from"./EffectsProjectView_Item-a38eddb6.js";import{_ as D}from"./plugin-vue_export-helper-46f75680.js";var R="/l00/static/jpg/image-9cecfb30.jpg";const j=O('<div class="target" data-v-d6f9e7e6><div class="top paper" data-v-d6f9e7e6></div><div class="bottom paper" data-v-d6f9e7e6></div><div class="left paper" data-v-d6f9e7e6></div><div class="right paper" data-v-d6f9e7e6></div><div class="front" data-v-d6f9e7e6><span data-v-d6f9e7e6>BRANDSLOGAN</span><span data-v-d6f9e7e6>BRANDSLOGO</span><span data-v-d6f9e7e6>[ Infinite Space ]</span></div></div>',1),B=[j],N=u({name:"l00-InfiniteSpace-A",setup(M){const e=S({isTest:!1,perspective:1e3,backgroundImageUrl:"",imageWidth:0,imageHeight:0,targetWidth:0,targetHeight:0,targetLength:4e3,speed:50,targetleftTranslateZ:0,targetbottomTranslateZ:0,targetImageWidth:0,targetImageMoveDuration:0,targettopImageCentreDeviateY:0,targettopImageMoveEnd:0,targetbottomImageCentreDeviateY:0,targetbottomImageMoveEnd:0,targetleftImageCentreDeviateX:0,targetleftImageMoveEnd:0,targetrightImageCentreDeviateX:0,targetrightImageMoveEnd:0}),c=U(()=>({"--perspective":`${e.perspective}px`,"--backgroundImageUrl":`url(${e.backgroundImageUrl})`,"--targetLength":`${e.targetLength}px`,"--targetleftTranslateZ":`${e.targetleftTranslateZ}px`,"--targetbottomTranslateZ":`${e.targetbottomTranslateZ}px`,"--targetImageWidth":`${e.targetImageWidth}px`,"--targetImageMoveDuration":`${e.targetImageMoveDuration}s`,"--targettopImageCentreDeviateY":`${e.targettopImageCentreDeviateY}px`,"--targettopImageMoveEnd":`${e.targettopImageMoveEnd}px`,"--targetbottomImageCentreDeviateY":`${e.targetbottomImageCentreDeviateY}px`,"--targetbottomImageMoveEnd":`${e.targetbottomImageMoveEnd}px`,"--targetleftImageCentreDeviateX":`${e.targetleftImageCentreDeviateX}px`,"--targetleftImageMoveEnd":`${e.targetleftImageMoveEnd}px`,"--targetrightImageCentreDeviateX":`${e.targetrightImageCentreDeviateX}px`,"--targetrightImageMoveEnd":`${e.targetrightImageMoveEnd}px`}));let g="";const o=new Image,C=t=>{fetch(t).then(a=>a.blob()).then(a=>{URL.revokeObjectURL(g),g=URL.createObjectURL(a),o.src=g,e.backgroundImageUrl=g})};o.onload=t=>m();const m=()=>{const{naturalWidth:t,naturalHeight:a}=o;e.imageWidth=t,e.imageHeight=a;const{targetWidth:r,targetHeight:E,targetLength:W,speed:q}=e,i=Math.trunc(Math.min(r,E)/5),v=i*a/t;e.targetImageWidth=i;const n=i*v,$=n/e.speed;e.targetImageMoveDuration=$;const p=0;e.targettopImageCentreDeviateY=p,e.targettopImageMoveEnd=p-n;const l=W%v;e.targetbottomImageCentreDeviateY=l,e.targetbottomImageMoveEnd=l+n;const f=0;e.targetleftImageCentreDeviateX=f,e.targetleftImageMoveEnd=f-n;const I=r%i;e.targetrightImageCentreDeviateX=I,e.targetrightImageMoveEnd=I+n},s=k(),x=()=>{const t=s.value;if(!t)return;const a=t.offsetWidth,r=t.offsetHeight;e.targetWidth=a,e.targetHeight=r,e.targetleftTranslateZ=-a/2,e.targetbottomTranslateZ=-r/2},d=new ResizeObserver(t=>{x(),m()});return y(()=>{d.disconnect()}),H(()=>{d.observe(s.value),C(R)}),(t,a)=>(b(),L("section",{ref_key:"scene",ref:s,style:Y(A(c))},[T("div",{class:X(["view",{test:e.isTest}])},B,2)],4))}});var z=D(N,[["__scopeId","data-v-d6f9e7e6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-infinite-space/l00-InfiniteSpace-A.vue"]]);const G=u({name:"effect-infinite-space",setup(M){return(e,c)=>(b(),V(w,null,{default:_(()=>[h(Z,{style:{height:"100vh"},name:"effect-infinite-space-a"},{default:_(()=>[h(z)]),_:1})]),_:1}))}});var Q=D(G,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-infinite-space/effect-infinite-space.vue"]]);export{Q as default};