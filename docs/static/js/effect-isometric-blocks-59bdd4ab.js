var I=Object.defineProperty;var S=(r,o,e)=>o in r?I(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e;var f=(r,o,e)=>(S(r,typeof o!="symbol"?o+"":o,e),e);import{d as b,i as m,q as p,o as i,c as u,a as _,F as g,s as $,n as x,I as B,u as h,t as A,j as D,g as k}from"./vendor-fb9bd65b.js";import{_ as v}from"./plugin-vue_export-helper-4223c0cf.js";const L={class:"loader",style:{"--block-size":"200px","--block-height":"40px","--block-color":"hsl(232, 6%, 26%)","--block-hover-color":"hsl(204, 85%, 57%)","--block-l-color":"hsl(204, 5%, 19%)","--block-l-hover-color":"hsl(205, 59%, 30%)","--block-t-color":"hsl(218, 7%, 22%)","--block-t-hover-color":"hsl(203, 64%, 44%)"}},N=b({name:"l00-IsometricBlocks-A",props:{color:{type:[String,Array],required:!1}},setup(r,{expose:o}){const e=m({blocksNumber:10,backgroundColor:"#434750"});o({parameter:e});const s=p(()=>Object.entries({"background-color":e.backgroundColor}).reduce((l,t)=>`${l}${t[0]}:${t[1]};`,""));class c{constructor(t){f(this,"id",Symbol());f(this,"style");this.style=[["z-index",t],["--delay",`-${t}s`]].reduce((n,a)=>`${n}${a[0]}:${a[1]};`,"")}}const d=m(Array(e.blocksNumber).fill(0).map((l,t)=>new c(e.blocksNumber-t)));return(l,t)=>(i(),u("section",B(l.$attrs,{style:h(s)}),[_("div",L,[(i(!0),u(g,null,$(d,n=>(i(),u("div",{key:n.id,class:"block",style:x(n.style)},null,4))),128))])],16))}});var z=v(N,[["__scopeId","data-v-784eeea7"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-isometric-blocks/l00-IsometricBlocks-A.vue"]]);const C={class:"menu",style:{"--color":"#999","--hover-color":"#fff","--block-color":"hsl(232, 6%, 26%)","--block-hover-color":"hsl(204, 85%, 57%)","--block-l-color":"hsl(204, 5%, 19%)","--block-l-hover-color":"hsl(205, 59%, 30%)","--block-t-color":"hsl(218, 7%, 22%)","--block-t-hover-color":"hsl(203, 64%, 44%)"}},W=b({name:"l00-IsometricBlocks-B",props:{hoverDirection:{type:String,required:!1}},setup(r,{expose:o}){const e=r,s=m({fontSize:16,blockWidth:200,blockLength:40,hoverDirection:"left",backgroundColor:"#434750"});o({parameter:s});const c=p(()=>{const t=e.hoverDirection?e.hoverDirection:s.hoverDirection;return Object.entries({"--fontSize":`${s.fontSize}px`,"--blockWidth":`${s.blockWidth}px`,"--blockLength":`${s.blockLength}px`,"--hoverTranslateX":`${t==="left"?"-":""}2.5em`,"background-color":s.backgroundColor}).reduce((n,a)=>`${n}${a[0]}:${a[1]};`,"")}),d=m(["Home","About Me","My Service","Portfolio","Contact"]),l=p(()=>d.map(t=>({title:t})).reverse());return(t,n)=>(i(),u("section",B(t.$attrs,{style:h(c)}),[_("ul",C,[(i(!0),u(g,null,$(h(l),a=>(i(),u("li",null,[_("a",null,A(a.title),1)]))),256))])],16))}});var y=v(W,[["__scopeId","data-v-785d0628"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-isometric-blocks/l00-IsometricBlocks-B.vue"]]);const V={class:"container"},j=b({name:"effect-isometric-blocks",setup(r){const o=[];return D(()=>{const e=window.location.hash.slice(1);o.forEach(s=>{const c=s.dataset.name;c&&c===e?s.classList.add("top"):s.classList.remove("top")})}),(e,s)=>(i(),u("div",V,[_("div",{class:"container-item",ref:c=>o.push(c),"data-name":"effect-isometric-blocks-a"},[k(z)],512),_("div",{class:"container-item",ref:c=>o.push(c),"data-name":"effect-isometric-blocks-b"},[k(y),k(y,{hoverDirection:"right"})],512)]))}});var T=v(j,[["__scopeId","data-v-48f559f3"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-isometric-blocks/effect-isometric-blocks.vue"]]);export{T as default};
