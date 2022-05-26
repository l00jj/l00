var j=Object.defineProperty;var E=(a,i,n)=>i in a?j(a,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[i]=n;var o=(a,i,n)=>(E(a,typeof i!="symbol"?i+"":i,n),n);import{d as S,r as y,j as O,A as k,v as z,o as C,c as A,a as G,p as P,e as H,i as I,g as V}from"./vendor-fdd97580.js";import{G as W,C as R,M as F,A as D,a as L,S as N,P as q,W as B,T as U,b as u,c as $,d as J,O as K}from"./PublicPath-aeb58d02.js";import{F as Q,T as x,g as w}from"./index-73b3845c.js";import{_ as T}from"./plugin-vue_export-helper-4223c0cf.js";const X=a=>(P("data-v-79f299fc"),a=a(),H(),a),Y=X(()=>G("div",{class:"background"},null,-1)),Z=S({name:"l00-3DViews-A",props:{width:{type:Number,required:!0},height:{type:Number,required:!0}},setup(a){const i=a,n=y(),f=y();class _{constructor(t,e,c){o(this,"canvasEl");o(this,"size",{width:800,height:600});o(this,"gui",new W({closed:!0}));o(this,"guiHandle",{isShowAxesHelper:!1});o(this,"clock",new R);o(this,"mainScene");o(this,"mainCamera");o(this,"mainRenderer");o(this,"mainFont");o(this,"sceneObjects",{mainMaterial:new F,axesHelper:new D(1),fontGroup:new L,decorationArray:[]});this.canvasEl=t,this.size.width=e,this.size.height=c,this.mainScene=new N,this.mainCamera=new q(75),this.mainRenderer=new B({canvas:this.canvasEl,alpha:!0})}start(){this.fixGui(),this.resize(this.size.width,this.size.height);const t=this.sceneObjects.mainMaterial,e=27,c=new U(.3,.2,20,45);Array(300).fill(0).map((d,b)=>{const s=new u(c,t);s.position.x=(Math.random()-.5)*e,s.position.y=(Math.random()-.3)*e,s.position.z=(Math.random()-.8)*e,s.rotation.x=Math.random()*Math.PI,s.rotation.y=Math.random()*Math.PI;const l=Math.random();s.scale.set(l,l,l),this.sceneObjects.decorationArray.push(s),this.mainScene.add(s)});const h=new $(.4,.6,3);Array(300).fill(0).map((d,b)=>{const s=new u(h,t);s.position.x=(Math.random()-.5)*e,s.position.y=(Math.random()-.3)*e,s.position.z=(Math.random()-.8)*e,s.rotation.x=Math.random()*Math.PI,s.rotation.y=Math.random()*Math.PI;const l=Math.random();s.scale.set(l,l,l),this.sceneObjects.decorationArray.push(s),this.mainScene.add(s)}),setTimeout(()=>this.confusion(e),37);const m=new Q,p=new J("/assets/fonts/helvetiker/helvetiker_regular.typeface.json").url;m.load(p,d=>{this.mainFont=d,this.addTextToScene()}),this.mainScene.add(this.sceneObjects.fontGroup),this.mainCamera.position.z=4,this.mainCamera.position.x=0,this.mainCamera.position.y=-1.5,this.mainCamera.lookAt(0,0,0),this.mainScene.add(this.mainCamera);const g=d=>{(typeof d=="boolean"?d:this.guiHandle.isShowAxesHelper)?this.mainScene.add(this.sceneObjects.axesHelper):this.mainScene.remove(this.sceneObjects.axesHelper)};g(),this.gui.add(this.guiHandle,"isShowAxesHelper").onChange(d=>{g()});const M=new K(this.mainCamera,this.canvasEl);M.enableDamping=!0,this.sceneObjects.orbitControl=M,this.mainRenderer.setClearColor(16777215,0)}addTextToScene(){const t=this.sceneObjects.fontGroup,e=this.sceneObjects.mainMaterial,c={font:this.mainFont,size:.5,height:.2,curveSegments:5,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:4};if(t.clear(),this.size.width/this.size.height>1){const h=new x("Welcome to l00 studio",c),m=new u(h,e);h.center(),t.add(m)}else{const h=new x("Welcome To",c),m=new u(h,e);h.center(),h.translate(0,.4,0);const p=new x("l00 Studio",c),g=new u(p,e);p.center(),p.translate(0,-.4,0),t.add(m,g)}}confusion(t){this.sceneObjects.decorationArray.forEach(e=>{w.to(e.position,{duration:2.5,x:(Math.random()-.5)*t}),w.to(e.position,{duration:2.5,y:(Math.random()-.3)*t}),w.to(e.position,{duration:2.5,z:(Math.random()-.8)*t}),w.to(e.rotation,{duration:2.5,x:Math.random()*Math.PI}),w.to(e.rotation,{duration:2.5,y:Math.random()*Math.PI})}),setTimeout(()=>this.confusion(t),3700)}fixGui(){const t=f.value,e=this.gui.domElement.parentElement;t.appendChild(e),e.style.position="absolute"}resize(t,e){this.size.width=t,this.size.height=e,this.mainCamera.aspect=t/e,this.mainCamera.updateProjectionMatrix(),this.mainRenderer.setSize(this.size.width,this.size.height),this.mainRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}render(){var t;(t=this.sceneObjects.orbitControl)==null||t.update(),this.mainRenderer.render(this.mainScene,this.mainCamera),window.requestAnimationFrame(()=>this.render())}}let r;return O(()=>{const v=n.value;r=new _(v,i.width,i.height),r.start(),r.render(),k(()=>{const t=r.size.width/r.size.height>1,e=i.width/i.height>1;r.resize(i.width,i.height),t!==e&&r.addTextToScene()})}),z(()=>{r.gui.destroy()}),(v,t)=>(C(),A("div",{class:"gui-wrap",ref_key:"guiWrap",ref:f},[Y,G("canvas",{class:"",ref_key:"canvas",ref:n},null,512)],512))}});var ee=T(Z,[["__scopeId","data-v-79f299fc"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/simple-3d-text/l00-3DViews-A.vue"]]);const te={id:"main"},ie=S({name:"simple-3d-text",setup(a){const i=I({width:0,height:0}),n=()=>{i.width=window.innerWidth,i.height=window.innerHeight};return n(),window.addEventListener("resize",n),z(()=>{window.removeEventListener("resize",n)}),(f,_)=>(C(),A("div",te,[V(ee,{width:i.width,height:i.height},null,8,["width","height"])]))}});var ce=T(ie,[["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/simple-3d-text/simple-3d-text.vue"]]);export{ce as default};
