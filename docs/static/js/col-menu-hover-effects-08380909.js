import{d as v,i as m,q as c,j as q,o as l,c as a,a as d,n as f,u,F as h,s as A,A as I,t as C,r as x,g as $}from"./vendor-03f4c97d.js";import{_ as M}from"./plugin-vue_export-helper-4223c0cf.js";const W=["onMouseenter"],j=v({name:"l00-Magic-Menu-A",props:{color:{type:[String,Array],required:!1}},setup(S,{expose:r}){const n=m({neonColor:"hsl(317 100% 54%)",bgColor:"#333"});r({option:n});const s=c(()=>Object.entries({"--bgColor":`${n.bgColor}`}).reduce((i,o)=>`${i}${o[0]}:${o[1]};`,"")),_=c(()=>["Home","About Me","My Service","Portfolio","Contact"]),e=m({style:{top:0,width:100,height:0},cursor:{size:15,border:4}}),t=c(()=>{const i=(V,g)=>(g=10**g,Math.round(V*g)/g),o=Math.sin(Math.PI*.25),y=e.cursor.size+e.cursor.border,k=y/o,z=(y+k+e.cursor.size*1.2)*o/2,b=i(z,2),w=b,B=`--cursor-size:${e.cursor.size}px;--cursor-border: ${e.cursor.border}px solid #30a3ff;--cursor-translateX:${w}px;--cursor-translateY:${b}px;`,H=`top:${e.style.top}px;width:${e.style.width}px;height:${e.style.height}px;`;return B+H}),p=i=>{const o=i.target;e.style.top=o.offsetTop,e.style.width=o.offsetWidth,e.style.height=o.offsetHeight};return q(()=>{p({target:window.document.querySelector(".list > li")})}),(i,o)=>(l(),a("ul",{class:"list",style:f(u(s))},[d("span",{class:"marker",style:f(u(t))},null,4),(l(!0),a(h,null,A(u(_),y=>(l(),a("li",{onMouseenter:I(p,["self"])},[d("a",null,C(y),1)],40,W))),256))],4))}});var D=M(j,[["__scopeId","data-v-fd0316fe"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/col-menu-hover-effects/l00-Magic-Menu-A.vue"]]);const E=["data-text"],F=v({name:"l00-Spread-Menu-A",props:{color:{type:[String,Array],required:!1}},setup(S,{expose:r}){const n=m({neonColor:"hsl(317 100% 54%)",bgColor:"#222"});r({option:n});const s=c(()=>Object.entries({"--bgColor":`${n.bgColor}`}).reduce((e,t)=>`${e}${t[0]}:${t[1]};`,"")),_=c(()=>["Home","About Me","My Service","Portfolio","Contact"]);return(e,t)=>(l(),a("ul",{class:"list",style:f(u(s))},[(l(!0),a(h,null,A(u(_),p=>(l(),a("li",null,[d("a",{"data-text":p},C(p),9,E)]))),256))],4))}});var P=M(F,[["__scopeId","data-v-1773e80f"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/col-menu-hover-effects/l00-Spread-Menu-A.vue"]]);const N=v({name:"col-menu-hover-effects",setup(S){const r=x(),n=c(()=>{var e,t;return(t=(e=r==null?void 0:r.value)==null?void 0:e.option)==null?void 0:t.bgColor}),s=x(),_=c(()=>{var e,t;return(t=(e=s==null?void 0:s.value)==null?void 0:e.option)==null?void 0:t.bgColor});return(e,t)=>(l(),a(h,null,[d("section",{style:f({background:u(n)})},[$(D,{ref_key:"vMagicMenuA",ref:r},null,512)],4),d("section",{style:f({background:u(_)})},[$(P,{ref_key:"vSpreadMenuA",ref:s},null,512)],4)],64))}});var Y=M(N,[["__scopeId","data-v-892b4d86"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/col-menu-hover-effects/col-menu-hover-effects.vue"]]);export{Y as default};
