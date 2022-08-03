var at=Object.defineProperty;var rt=(d,t,e)=>t in d?at(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var i=(d,t,e)=>(rt(d,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-f26481d0.js";import{o as M,b as B,e as H,C as ct,d as O,h as Y,i as U,l as Q,M as f,s as P,w as q,f as it,F as lt,v as ht,H as dt}from"./vendor-3584b0a8.js";import{T as mt}from"./TopMenu-fbb84e29.js";import{_ as A}from"./plugin-vue_export-helper-46f75680.js";import{E as Z}from"./EventEmitter-80978bd8.js";import{S as J}from"./Stats-a58de827.js";import{D as K}from"./DatGui-ae8ae972.js";/* empty css              */const pt={},ut={class:"container"},ft={class:"preview"};function vt(d,t){return M(),B("div",ut,[H("div",ft,[ct(d.$slots,"default",{},void 0,!0)])])}var j=A(pt,[["render",vt],["__scopeId","data-v-19ae30b0"],["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/Preview.vue"]]);class wt{static adapt(t,e){Object.assign(t,e)}}const g=class{constructor(t,e){i(this,"main");i(this,"width",0);i(this,"height",0);i(this,"fit",g.Fit_None);this.main=t,this.update({fit:e!=null&&e.fit?e.fit:g.Fit_None}),g.resizeObserve(this)}static resizeObserve(t){const e=t.main;if(window.ResizeObserver){const s=new ResizeObserver(n=>t.update());s.observe(e.viewContainerDom),e.onDestroyed(()=>s.disconnect())}else{const s=()=>t.update();window.addEventListener("resize",s),e.onDestroyed(()=>window.removeEventListener("resize",s))}}update(t={}){let{width:e,height:s,fit:n}=t;const{viewContainerDom:h,canvasDom:o}=this.main;if(!h||!o)return;const a=(r,l)=>{this.width=r,this.height=l,o.width=r,o.height=l};this.fit===g.Fit_None?(e=e||this.main.viewContainerDom.offsetWidth,s=s||this.main.viewContainerDom.offsetHeight,a(e,s),o.style.width=e+"px",o.style.height=s+"px"):(this.width!==e||this.height!==s)&&e&&s&&(a(e,s),o.style.width="100%",o.style.height="100%"),n&&n!==this.fit&&g.fitMap.hasOwnProperty(n)&&(this.fit=n,o.style.objectFit=g.fitMap[this.fit]),this.main.emit(k.Event_Resize)}onResize(t){return this.main.on(k.Event_Resize,t)}};let F=g;i(F,"Fit_Contain",Symbol()),i(F,"Fit_Cover",Symbol()),i(F,"Fit_Fill",Symbol()),i(F,"Fit_None",Symbol()),i(F,"fitMap",{[g.Fit_Contain]:"contain",[g.Fit_Cover]:"cover",[g.Fit_Fill]:"fill",[g.Fit_None]:"none"});class gt{constructor(t){i(this,"main");i(this,"time");i(this,"start");i(this,"current");i(this,"elapsed");i(this,"delta");i(this,"requestAnimationFrameID",0);i(this,"onTickLoopFunction",t=>{this.current=Date.now();const e=performance.now();this.delta=e-this.time,this.time=e,this.elapsed+=this.delta,this.main.emit(k.Event_Tick),this.currentTickLoopFunction&&(this.requestAnimationFrameID=window.requestAnimationFrame(this.currentTickLoopFunction))});i(this,"currentTickLoopFunction");i(this,"isTicking",!1);this.main=t,this.start=Date.now(),this.current=this.start,this.time=performance.now(),this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction||(this.currentTickLoopFunction=this.main.params.helper.stats.enable?t=>{var e,s;(e=this.main.stats)==null||e.begin(),this.onTickLoopFunction(t),(s=this.main.stats)==null||s.end()}:this.onTickLoopFunction,this.isTicking||(this.isTicking=!0,this.time=performance.now()-1e3/60,this.currentTickLoopFunction(window.performance.now())))}paused(){this.isTicking&&(window.cancelAnimationFrame(this.requestAnimationFrameID),this.currentTickLoopFunction=void 0,this.isTicking=!1)}onTick(t){return this.main.on(k.Event_Tick,t)}}const S=class{constructor(t){i(this,"main");i(this,"target",{x:NaN,y:NaN});i(this,"clickControler",t=>{const e=t.layerX,s=t.layerY;this.main.emit(S.Event_Click,e,s)});this.main=t}onClick(t){if(!this.main.has(S.Event_Click)){const{canvasDom:e}=this.main;e.addEventListener("click",this.clickControler)}if(!this.main.has(S.Event_RemoveClickControlerOnDestroyed)){const{canvasDom:e}=this.main;this.main.on(S.Event_RemoveClickControlerOnDestroyed,()=>e.removeEventListener("click",this.clickControler))}return this.main.on(S.Event_Click,t)}offClick(){}};let T=S;i(T,"Event_Move",Symbol()),i(T,"Event_Click",Symbol()),i(T,"Event_RemoveClickControlerOnDestroyed",Symbol());class yt{constructor(t){i(this,"main");i(this,"datGui");this.main=t,this.datGui=new K,this.datGui.appendGuiTo(this.main.viewContainerDom),this.main.onDestroyed(()=>this.datGui.destroy()),Promise.resolve().then(()=>this.init())}init(){const t=this.main,e=this.datGui;this.main.params;const s=e.ui.addFolder("Renderer");s.open();const n={isRendering:!0};s.add(n,"isRendering").onFinishChange(r=>{r?t.render():t.paused()});const h=e.ui.addFolder("Particles");h.open(),h.add(t.params.particles.baseNumber,"value",200,5e3,1).name("Particles Base Numbers").onFinishChange(r=>{t.world.createBaseParticles()});const o=e.ui.addFolder("Background");o.open();const a={updateAndShowPointsRatio(){t.world.background.updatePointsRatio(),t.world.background.showPointsRatioMap(!0)},showPointsRatioMap(){t.world.background.showPointsRatioMap()},showPointsBrightnessMap(){t.world.background.showPointsBrightnessMap()},showPointsColorMap(){t.world.background.showPointsColorMap()}};o.add(t.world.background,"pointRatioConstant",.001,1,.001).name("Point Ratio Constant").onFinishChange(()=>a.updateAndShowPointsRatio()),o.add(t.world.background,"pointRatioPower",.1,4,.1).name("Point Ratio Power").onFinishChange(()=>a.updateAndShowPointsRatio()),o.add(a,"showPointsRatioMap").name("Show Points Ratio"),o.add(a,"showPointsBrightnessMap").name("Show Points Brightness"),o.add(a,"showPointsColorMap").name("Show Points Color")}}class _t{constructor(t,e){i(this,"Event_Destroy",Symbol());i(this,"main");i(this,"type","base");i(this,"x",NaN);i(this,"y",NaN);i(this,"xSpeed",0);i(this,"ySpeed",0);i(this,"xAccelerated",0);i(this,"yAccelerated",0);i(this,"size",NaN);i(this,"renderSize",NaN);i(this,"fillStyle","#fff");i(this,"strokeStyle");i(this,"lineWidth",0);i(this,"alpha",1);i(this,"color","#fff");i(this,"colorHSL",[1,1,1]);i(this,"angle",0);this.main=t,wt.adapt(this,e)}update(){var v,w;const t=this.main.sizes;this.main.params;const e=this.main.world;this.main.time;const{xSpeed:s,ySpeed:n,xAccelerated:h,yAccelerated:o}=this;let a;(w=(v=e.background.points)==null?void 0:v[Math.floor(this.y)])!=null&&w[Math.floor(this.x)]&&(a=e.background.points[Math.floor(this.y)][Math.floor(this.x)]);const r=a?a.ratio:0,l=a?a.brightness:0;this.fillStyle=a?a.color:"#000",this.angle+=l/100/20;const m=s+h,c=(255-l)/100+o,p=c+Math.cos(this.angle),u=c+Math.sin(this.angle);!Number.isNaN(p)&&!Number.isNaN(u)&&(this.x+=p,this.y+=u,this.xSpeed=m,this.ySpeed=c),this.y>t.height+this.size?(this.y=-this.size,this.ySpeed=0):this.y<-this.size&&(this.y=t.height+this.size,this.ySpeed=0),this.x>t.width+this.size?(this.x=-this.size,this.xSpeed=0):this.x<-this.size&&(this.x=t.width+this.size,this.xSpeed=0),this.render(r,l)}render(t,e){const{ctx:s,params:n}=this.main,h=Math.PI*2,{x:o,y:a,size:r}=this;s.beginPath(),s.arc(o,a,r,0,h),s.globalAlpha=.2+e/255*.5,this.fillStyle&&(s.fillStyle=this.fillStyle,s.fill())}destroy(){this.main.emit(this.Event_Destroy)}onDestroy(t){this.main.once(this.Event_Destroy,t)}}class kt{constructor(t){i(this,"image");i(this,"main");i(this,"points");i(this,"pointMinBrightness",1/0);i(this,"pointMaxBrightness",-1/0);i(this,"pointRatioConstant",.25);i(this,"pointRatioPower",.5);i(this,"pointsRatioMapBook",new WeakMap);i(this,"pointsBrightnessMapBook",new WeakMap);i(this,"pointsColorMapBook",new WeakMap);this.main=t}use(t){this.image=t,this.main.sizes.update({width:this.image.naturalWidth,height:this.image.naturalHeight}),this.updatePoints()}updatePoints(){if(!this.image)return;const t=this.image,e=window.document.createElement("canvas"),s=t.naturalWidth,n=t.naturalHeight;e.width=s,e.height=n;const h=e.getContext("2d");h.drawImage(t,0,0);const o=h.getImageData(0,0,s,n),a=this.points=[],r=(p,u,v)=>Math.sqrt(p*p*.299+u*u*.587+v*v*.114),l=(p,u,v)=>{const w=E=>(E<16?"0":"")+E.toString(16);return`#${w(p)}${w(u)}${w(v)}`};let m=1/0,c=-1/0;for(let p=0,u=o.data;p<n;p++){const v=[];for(let w=0;w<s;w++){const E=(p*s+w)*4,$=u[E],tt=u[E+1],et=u[E+2],V=r($,tt,et),ot=l($,tt,et);v.push({brightness:V,color:ot,ratio:0}),m=Math.min(V,m),c=Math.max(V,c)}a.push(v)}this.pointMinBrightness=m,this.pointMaxBrightness=c,this.updatePointsRatio()}updatePointsRatio(){if(!this.points)return;const t=this.points,e=this.pointMinBrightness,s=this.pointMaxBrightness,n=this.pointRatioConstant,h=this.pointRatioPower;for(let o of t)for(let a of o){let r=(a.brightness-e)/(s-e);r=n*r**h/(1-r),r=r>1?1:r,a.ratio=r}}showPointsRatioMap(t){const e=this.points,s=this.pointsRatioMapBook;if(!e)return;let n=s.get(e);if(t||!n){const h=e.length,o=e[0].length;n=this.main.ctx.createImageData(o,h);for(let a=0;a<h;a++){const r=e[a];for(let l=0;l<o;l++){const m=(a*o+l)*4,c=Math.floor(r[l].ratio*256);n.data[m+0]=c,n.data[m+1]=c,n.data[m+2]=c,n.data[m+3]=255}}s.set(e,n)}this.main.ctx.putImageData(n,0,0)}showPointsBrightnessMap(t){const e=this.points,s=this.pointsBrightnessMapBook;if(!e)return;let n=s.get(e);if(t||!n){const h=e.length,o=e[0].length;n=this.main.ctx.createImageData(o,h);for(let a=0;a<h;a++){const r=e[a];for(let l=0;l<o;l++){const m=(a*o+l)*4,c=Math.round(r[l].brightness);n.data[m+0]=c,n.data[m+1]=c,n.data[m+2]=c,n.data[m+3]=255}}s.set(e,n)}this.main.ctx.putImageData(n,0,0)}showPointsColorMap(t){const e=this.points,s=this.pointsColorMapBook;if(!e)return;let n=s.get(e);if(t||!n){const h=e.length,o=e[0].length;n=this.main.ctx.createImageData(o,h);for(let a=0;a<h;a++){const r=e[a];for(let l=0;l<o;l++){const m=(a*o+l)*4,c=r[l].color;n.data[m+0]=parseInt(c.slice(1,3),16),n.data[m+1]=parseInt(c.slice(3,5),16),n.data[m+2]=parseInt(c.slice(5,7),16),n.data[m+3]=255}}s.set(e,n)}this.main.ctx.putImageData(n,0,0)}}class bt{constructor(t){i(this,"main");i(this,"background");i(this,"controlerChenged",(t,e,s)=>{});i(this,"particlesList",new Set);this.main=t,this.background=new kt(this.main),this.createBaseParticles()}createBaseParticles(){for(let n of this.particlesList)n.type==="base"&&this.particlesList.delete(n);const{params:t,sizes:e}=this.main,s=t.particles.baseNumber.value*(t.particles.baseNumber.density.enable?Math.round(e.width*e.height/t.particles.baseNumber.density.value**2):1);console.log("\u5F53\u524D\u7C92\u5B50\u6570",s);for(let n=0;n<s;n++){const o=new _t(this.main,{size:1.5,x:Math.random()*e.width,y:-1.5,xSpeed:0,ySpeed:0,xAccelerated:0,yAccelerated:.1+Math.random()*.5,fillStyle:"#fff"});this.particlesList.add(o),o.onDestroy=()=>this.particlesList.delete(o)}}render(){for(let t of this.particlesList)t.update()}}class xt{constructor(t){i(this,"main");i(this,"render",()=>{const{ctx:t,sizes:e,world:s,params:n}=this.main;t.globalAlpha=1,t.fillStyle="rgba(0,0,0,0.05)",t.fillRect(0,0,e.width,e.height),t.globalAlpha=.2,s.render()});this.main=t,this.main.time.onTick(this.render)}}const I=class extends Z{constructor(e,s){super();i(this,"params",{helper:{stats:{enable:!0},gui:{enable:!0}},particles:{baseNumber:{value:500,density:{enable:!0,value:500}},emitterNumber:{value:2},vanish:{speed:7},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:5,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,outMode:"out",attract:{enable:!1,rotateX:600,rotateY:1200}}},renderer:{clearColor:"#fff",clearModes:{normal:{color:"#fff",use:()=>{this.params.renderer.clearColor=this.params.renderer.clearModes.normal.color}},afterimage:{color:"rgba(0,0,0,0.1)",use:()=>{this.params.renderer.clearColor=this.params.renderer.clearModes.afterimage.color}}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:100,duration:2,opacity:8,speed:3},repulse:{distance:200},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0,config_demo:{hide_card:!1,background_color:"#b61924",background_image:"",background_position:"50% 50%",background_repeat:"no-repeat",background_size:"cover"}});i(this,"time");i(this,"sizes");i(this,"renderer");i(this,"controler");i(this,"world");i(this,"viewContainerDom");i(this,"canvasDom",window.document.createElement("canvas"));i(this,"ctx",this.canvasDom.getContext("2d"));i(this,"stats");i(this,"guiHelper");this.viewContainerDom=e,this.viewContainerDom.appendChild(this.canvasDom),this.params.helper.stats.enable&&(this.stats=new J(e)),this.params.helper.gui.enable&&(this.guiHelper=new yt(this)),this.time=new gt(this),this.sizes=new F(this,{fit:F.Fit_Contain}),this.controler=new T(this),this.renderer=new xt(this),this.world=new bt(this),this.params.renderer.clearModes.afterimage.use()}render(){this.time.tick()}paused(){this.time.paused()}onDestroyed(e){return this.once(I.Event_Destroyed,e)}destroy(){this.emit(I.Event_Destroyed)}};let k=I;i(k,"Event_Tick",Symbol()),i(k,"Event_Resize",Symbol()),i(k,"Event_Destroyed",Symbol());var Ft="/l00/static/png/example-cfe3264e.png";const Dt={class:"background"},Ct=O({name:"View",setup(d){const t=Y();return U(()=>{var e=new Image;e.src=Ft,e.onload=()=>{s.world.background.use(e),s.render()};const s=new k(t.value);Q(()=>s.destroy)}),(e,s)=>(M(),B("section",Dt,[H("div",{class:"viewContainer",ref_key:"viewDom",ref:t},null,512)]))}});var Et=A(Ct,[["__scopeId","data-v-4e9c5bda"],["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/ParticlesRender220722/View.vue"]]);class Pt{static adapt(t,e){Object.assign(t,e)}}const y=class{constructor(t,e){i(this,"main");i(this,"width",0);i(this,"height",0);i(this,"fit",y.Fit_None);this.main=t,this.update({fit:e!=null&&e.fit?e.fit:y.Fit_None}),y.resizeObserve(this)}static resizeObserve(t){const e=t.main;if(window.ResizeObserver){const s=new ResizeObserver(n=>t.update());s.observe(e.viewContainerDom),e.onDestroyed(()=>s.disconnect())}else{const s=()=>t.update();window.addEventListener("resize",s),e.onDestroyed(()=>window.removeEventListener("resize",s))}}update(t={}){let{width:e,height:s,fit:n}=t;const{viewContainerDom:h,canvasDom:o}=this.main;if(!h||!o)return;const a=(r,l)=>{this.width=r,this.height=l,o.width=r,o.height=l};this.fit===y.Fit_None?(e=e||this.main.viewContainerDom.offsetWidth,s=s||this.main.viewContainerDom.offsetHeight,a(e,s),o.style.width=e+"px",o.style.height=s+"px"):(this.width!==e||this.height!==s)&&e&&s&&(a(e,s),o.style.width="100%",o.style.height="100%"),n&&n!==this.fit&&y.fitMap.hasOwnProperty(n)&&(this.fit=n,o.style.objectFit=y.fitMap[this.fit]),this.main.emit(b.Event_Resize)}onResize(t){return this.main.on(b.Event_Resize,t)}};let D=y;i(D,"Fit_Contain",Symbol()),i(D,"Fit_Cover",Symbol()),i(D,"Fit_Fill",Symbol()),i(D,"Fit_None",Symbol()),i(D,"fitMap",{[y.Fit_Contain]:"contain",[y.Fit_Cover]:"cover",[y.Fit_Fill]:"fill",[y.Fit_None]:"none"});class St{constructor(t){i(this,"main");i(this,"time");i(this,"start");i(this,"current");i(this,"elapsed");i(this,"delta");i(this,"requestAnimationFrameID",0);i(this,"onTickLoopFunction",t=>{this.current=Date.now();const e=performance.now();this.delta=e-this.time,this.time=e,this.elapsed+=this.delta,this.main.emit(b.Event_Tick),this.currentTickLoopFunction&&(this.requestAnimationFrameID=window.requestAnimationFrame(this.currentTickLoopFunction))});i(this,"currentTickLoopFunction");i(this,"isTicking",!1);this.main=t,this.start=Date.now(),this.current=this.start,this.time=performance.now(),this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction||(this.currentTickLoopFunction=this.main.params.helper.stats.enable?t=>{var e,s;(e=this.main.stats)==null||e.begin(),this.onTickLoopFunction(t),(s=this.main.stats)==null||s.end()}:this.onTickLoopFunction,this.isTicking||(this.isTicking=!0,this.time=performance.now()-1e3/60,this.currentTickLoopFunction(window.performance.now())))}paused(){this.isTicking&&(window.cancelAnimationFrame(this.requestAnimationFrameID),this.currentTickLoopFunction=void 0,this.isTicking=!1)}onTick(t){return this.main.on(b.Event_Tick,t)}}const R=class{constructor(t){i(this,"main");i(this,"target",{x:NaN,y:NaN});i(this,"clickControler",t=>{const e=t.layerX,s=t.layerY;this.main.emit(R.Event_Click,e,s)});this.main=t}onClick(t){if(!this.main.has(R.Event_Click)){const{canvasDom:e}=this.main;e.addEventListener("click",this.clickControler)}if(!this.main.has(R.Event_RemoveClickControlerOnDestroyed)){const{canvasDom:e}=this.main;this.main.on(R.Event_RemoveClickControlerOnDestroyed,()=>e.removeEventListener("click",this.clickControler))}return this.main.on(R.Event_Click,t)}offClick(){}};let z=R;i(z,"Event_Move",Symbol()),i(z,"Event_Click",Symbol()),i(z,"Event_RemoveClickControlerOnDestroyed",Symbol());class Rt{constructor(t){i(this,"main");i(this,"datGui");this.main=t,this.datGui=new K,this.datGui.appendGuiTo(this.main.viewContainerDom),this.main.onDestroyed(()=>this.datGui.destroy()),Promise.resolve().then(()=>this.init())}init(){const{particles:t}=this.main.params,e=this.datGui.ui.addFolder("Particles");e.open(),e.add(t.color,"randomIndex").name("RandomColorIndex")}}class Nt{constructor(t,e){i(this,"Event_Destroy",Symbol());i(this,"main");i(this,"type","base");i(this,"x",NaN);i(this,"y",NaN);i(this,"xSpeed",0);i(this,"ySpeed",0);i(this,"xAccelerated",0);i(this,"yAccelerated",0);i(this,"size",NaN);i(this,"renderSize",NaN);i(this,"fill");i(this,"stroke");i(this,"opacity",1);i(this,"color","#fff");i(this,"colorHSL",[1,1,1]);i(this,"move",{outMode:null});i(this,"animation");this.main=t,Pt.adapt(this,e)}animate(t){t.targets=this,t.autoplay=!1,t.complete=()=>this.destroy(),this.animation=f(t)}update(){this.animation&&this.animation.tick(this.main.time.elapsed),this.render()}render(){const{ctx:t,params:e}=this.main,s=Math.PI*2,{x:n,y:h,size:o}=this;t.globalAlpha!==this.opacity&&(t.globalAlpha=this.opacity),t.beginPath(),t.arc(n,h,o,0,s),this.stroke&&(t.strokeStyle=this.stroke.color,t.lineWidth=this.stroke.width,t.stroke()),this.fill&&(t.fillStyle=this.fill.color,t.fill())}destroy(){this.main.emit(this.Event_Destroy)}onDestroy(t){this.main.once(this.Event_Destroy,t)}}class X extends Nt{constructor(t,e){super(t,e),this.type="emit"}}class Tt extends Set{constructor(e){super();i(this,"main");this.main=e}add(e){return super.add(e),this.main.render(),this}delete(e){const s=super.delete(e);return this.size===0&&this.main.paused(),s}}class zt{constructor(t){i(this,"main");i(this,"emitClickEffect",(t,e)=>{this.createEmitterParticles(t,e)});i(this,"particlesList");this.main=t,this.particlesList=new Tt(this.main),this.main.controler.onClick(this.emitClickEffect)}createEmitterParticles(t,e){const s=(c,p,u,v)=>{const w=Math.max(c-0,u-c),E=Math.max(p-0,v-p);return Math.sqrt(Math.pow(w,2)+Math.pow(E,2))},n=this.main.sizes,h=this.main.params.particles.color,o=h.value,a=h.next(),r=s(t,e,n.width,n.height),l=Math.min(200,n.width*.4,n.height*.4);(()=>{const c=new X(this.main,{x:t,y:e,size:0,fill:{color:a}});return c.animate({size:r,duration:Math.max(r/2,750),easing:"easeOutQuart"}),c.onDestroy(()=>{h.backgroundFill=a,this.particlesList.delete(c)}),this.particlesList.add(c),c})(),(()=>{const c=new X(this.main,{x:t,y:e,size:0,fill:{color:o},stroke:{width:3,color:o},opacity:1});return c.animate({size:l,opacity:0,duration:900,easing:"easeOutExpo"}),c.onDestroy(()=>{this.particlesList.delete(c)}),this.particlesList.add(c),c})();for(var m=0;m<32;m++){const c=new X(this.main,{x:t,y:e,size:f.random(24,48),fill:{color:o}});c.animate({x:t+f.random(l,-l),y:e+f.random(l*1.15,-l*1.15),size:0,easing:"easeOutExpo",duration:f.random(1e3,1300)}),c.onDestroy(()=>{this.particlesList.delete(c)}),this.particlesList.add(c)}}render(){for(let t of this.particlesList)t.update()}}class Lt{constructor(t){i(this,"main");i(this,"render",()=>{const{ctx:t,sizes:e,world:s,params:n}=this.main;t.fillStyle=n.particles.color.backgroundFill,t.fillRect(0,0,e.width,e.height),s.render()});this.main=t,this.main.time.onTick(this.render)}}const W=class extends Z{constructor(e,s){super();i(this,"params",{helper:{stats:{enable:!0},gui:{enable:!0}},particles:{emitterNumber:{value:2},vanish:{speed:7},color:{backgroundFill:"#FF6138",value:"#FF6138",index:0,randomIndex:!1,list:["#FF6138","#FFBE53","#2980B9","#282741"],next(){const e=typeof this.index!="number"||Number.isNaN(this.index)?0:this.randomIndex?(s=>{do s=Math.floor(Math.random()*this.list.length);while(s===this.index);return s})(this.index):(this.index+1)%this.list.length;return this.index=e,this.value=this.list[e],this.value}},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}}}});i(this,"time");i(this,"sizes");i(this,"renderer");i(this,"controler");i(this,"world");i(this,"viewContainerDom");i(this,"canvasDom",window.document.createElement("canvas"));i(this,"ctx",this.canvasDom.getContext("2d"));i(this,"stats");i(this,"particleHelper");this.viewContainerDom=e,this.viewContainerDom.appendChild(this.canvasDom),this.params.helper.stats.enable&&(this.stats=new J(e)),this.params.helper.gui.enable&&(this.particleHelper=new Rt(this)),this.time=new St(this),this.sizes=new D(this,{fit:D.Fit_None}),this.controler=new z(this),this.renderer=new Lt(this),this.world=new zt(this)}render(){this.time.tick()}paused(){this.time.paused()}onDestroyed(e){return this.once(W.Event_Destroyed,e)}destroy(){this.emit(W.Event_Destroyed)}};let b=W;i(b,"Event_Tick",Symbol()),i(b,"Event_Resize",Symbol()),i(b,"Event_Destroyed",Symbol());const Mt={class:"background"},Bt=O({name:"View",setup(d){const t=Y();return U(()=>{const e=new b(t.value);e.world.createEmitterParticles(e.sizes.width/2,e.sizes.height/2),Q(()=>e.destroy)}),(e,s)=>(M(),B("section",Mt,[H("div",{class:"viewContainer",ref_key:"viewDom",ref:t},null,512)]))}});var At=A(Bt,[["__scopeId","data-v-3ec41f93"],["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/ParticlesRender220723-Boom-A/View.vue"]]);class Ot{static adapt(t,e){Object.assign(t,e)}}const _=class{constructor(t,e){i(this,"main");i(this,"width",0);i(this,"height",0);i(this,"fit",_.Fit_None);this.main=t,this.update({fit:e!=null&&e.fit?e.fit:_.Fit_None}),_.resizeObserve(this)}static resizeObserve(t){const e=t.main;if(window.ResizeObserver){const s=new ResizeObserver(n=>t.update());s.observe(e.viewContainerDom),e.onDestroyed(()=>s.disconnect())}else{const s=()=>t.update();window.addEventListener("resize",s),e.onDestroyed(()=>window.removeEventListener("resize",s))}}update(t={}){let{width:e,height:s,fit:n}=t;const{viewContainerDom:h,canvasDom:o}=this.main;if(!h||!o)return;const a=(r,l)=>{this.width=r,this.height=l,o.width=r,o.height=l};this.fit===_.Fit_None?(e=e||this.main.viewContainerDom.offsetWidth,s=s||this.main.viewContainerDom.offsetHeight,a(e,s),o.style.width=e+"px",o.style.height=s+"px"):(this.width!==e||this.height!==s)&&e&&s&&(a(e,s),o.style.width="100%",o.style.height="100%"),n&&n!==this.fit&&_.fitMap.hasOwnProperty(n)&&(this.fit=n,o.style.objectFit=_.fitMap[this.fit]),this.main.emit(x.Event_Resize)}onResize(t){return this.main.on(x.Event_Resize,t)}};let C=_;i(C,"Fit_Contain",Symbol()),i(C,"Fit_Cover",Symbol()),i(C,"Fit_Fill",Symbol()),i(C,"Fit_None",Symbol()),i(C,"fitMap",{[_.Fit_Contain]:"contain",[_.Fit_Cover]:"cover",[_.Fit_Fill]:"fill",[_.Fit_None]:"none"});class It{constructor(t){i(this,"main");i(this,"time");i(this,"start");i(this,"current");i(this,"elapsed");i(this,"delta");i(this,"requestAnimationFrameID",0);i(this,"onTickLoopFunction",t=>{this.current=Date.now();const e=performance.now();this.delta=e-this.time,this.time=e,this.elapsed+=this.delta,this.main.emit(x.Event_Tick),this.currentTickLoopFunction&&(this.requestAnimationFrameID=window.requestAnimationFrame(this.currentTickLoopFunction))});i(this,"currentTickLoopFunction");i(this,"isTicking",!1);this.main=t,this.start=Date.now(),this.current=this.start,this.time=performance.now(),this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction||(this.currentTickLoopFunction=this.main.params.helper.stats.enable?t=>{var e,s;(e=this.main.stats)==null||e.begin(),this.onTickLoopFunction(t),(s=this.main.stats)==null||s.end()}:this.onTickLoopFunction,this.isTicking||(this.isTicking=!0,this.time=performance.now()-1e3/60,this.currentTickLoopFunction(window.performance.now())))}paused(){this.isTicking&&(window.cancelAnimationFrame(this.requestAnimationFrameID),this.currentTickLoopFunction=void 0,this.isTicking=!1)}onTick(t){return this.main.on(x.Event_Tick,t)}}const N=class{constructor(t){i(this,"main");i(this,"target",{x:NaN,y:NaN});i(this,"clickControler",t=>{const e=t.layerX,s=t.layerY;this.main.emit(N.Event_Click,e,s)});this.main=t}onClick(t){if(!this.main.has(N.Event_Click)){const{canvasDom:e}=this.main;e.addEventListener("click",this.clickControler)}if(!this.main.has(N.Event_RemoveClickControlerOnDestroyed)){const{canvasDom:e}=this.main;this.main.on(N.Event_RemoveClickControlerOnDestroyed,()=>e.removeEventListener("click",this.clickControler))}return this.main.on(N.Event_Click,t)}offClick(){}};let L=N;i(L,"Event_Move",Symbol()),i(L,"Event_Click",Symbol()),i(L,"Event_RemoveClickControlerOnDestroyed",Symbol());class Wt{constructor(t){i(this,"main");i(this,"datGui");this.main=t,this.datGui=new K,this.datGui.appendGuiTo(this.main.viewContainerDom),this.main.onDestroyed(()=>this.datGui.destroy()),Promise.resolve().then(()=>this.init())}init(){this.main.params,this.datGui.ui.addFolder("Particles").open()}}class Gt{constructor(t,e){i(this,"Event_Destroy",Symbol());i(this,"main");i(this,"type","base");i(this,"x",NaN);i(this,"y",NaN);i(this,"xSpeed",0);i(this,"ySpeed",0);i(this,"xAccelerated",0);i(this,"yAccelerated",0);i(this,"size",NaN);i(this,"renderSize",NaN);i(this,"fillStyle");i(this,"strokeStyle");i(this,"lineWidth",0);i(this,"alpha",1);i(this,"color","#fff");i(this,"colorHSL",[1,1,1]);i(this,"move",{outMode:null});i(this,"animation");this.main=t,Ot.adapt(this,e)}animate(t){t.targets=this,t.autoplay=!1,t.complete=()=>{this.destroy()},this.animation=f(t)}update(){this.animation&&this.animation.tick(this.main.time.elapsed),this.render()}render(){const{ctx:t,params:e}=this.main,s=Math.PI*2,{x:n,y:h,size:o}=this;t.globalAlpha!==this.alpha&&(t.globalAlpha=this.alpha),t.beginPath(),t.arc(n,h,o,0,s),this.strokeStyle&&(t.strokeStyle=this.strokeStyle,t.lineWidth=this.lineWidth,t.stroke()),this.fillStyle&&(t.fillStyle=this.fillStyle,t.fill())}destroy(){this.main.emit(this.Event_Destroy)}onDestroy(t){this.main.once(this.Event_Destroy,t)}}class st extends Gt{constructor(t,e){super(t,e),this.type="emit"}}class Ht extends Set{constructor(e){super();i(this,"main");this.main=e}add(e){return super.add(e),this.main.render(),this}delete(e){const s=super.delete(e);return this.size===0&&this.main.paused(),s}}class Vt{constructor(t){i(this,"main");i(this,"emitClickEffect",(t,e)=>{this.createEmitterParticles(t,e)});i(this,"particlesList");this.main=t,this.particlesList=new Ht(this.main),this.main.controler.onClick(this.emitClickEffect)}createEmitterParticles(t,e){const s=this.main.sizes,n=this.main.params.particles.colors;Math.min(200,s.width*.4,s.height*.4);const h=()=>n.list[Math.floor(Math.random()*n.list.length)],o=(r,l)=>{var m=f.random(0,360)*Math.PI/180,c=f.random(50,180),p=[-1,1][f.random(0,1)]*c;return{x:r+p*Math.cos(m),y:l+p*Math.sin(m)}};(()=>{const r=new st(this.main,{x:t,y:e,size:0,strokeStyle:h(),lineWidth:12,alpha:.5});return r.animate({size:f.random(80,160),strokeStyle:"#fff",alpha:{value:0,easing:"linear"},lineWidth:.001,duration:f.random(600,800),easing:"easeOutExpo"}),r.onDestroy(()=>{this.particlesList.delete(r)}),this.particlesList.add(r),r})();for(var a=0;a<32;a++){const r=new st(this.main,{x:t,y:e,size:f.random(16,32),fillStyle:h()}),l=o(r.x,r.y);r.animate({x:l.x,y:l.y,size:0,easing:"easeOutExpo",duration:f.random(1e3,1300)}),r.onDestroy(()=>{this.particlesList.delete(r)}),this.particlesList.add(r)}}render(){for(let t of this.particlesList)t.update()}}class qt{constructor(t){i(this,"main");i(this,"render",()=>{const{ctx:t,sizes:e,world:s,params:n}=this.main;n.renderer.background.clear.enable?t.clearRect(0,0,e.width,e.height):(t.fillStyle=n.renderer.background.fill.color,t.fillRect(0,0,e.width,e.height)),s.render()});this.main=t,this.main.time.onTick(this.render)}}const G=class extends Z{constructor(e,s){super();i(this,"params",{helper:{stats:{enable:!0},gui:{enable:!0}},particles:{emitterNumber:{value:2},vanish:{speed:7},colors:{backgroundFill:"#FF6138",value:"#FF6138",index:0,randomIndex:!1,list:["#FF1461","#18FF92","#5A87FF","#FBF38C"],next(){const e=typeof this.index!="number"||Number.isNaN(this.index)?0:this.randomIndex?(s=>{do s=Math.floor(Math.random()*this.list.length);while(s===this.index);return s})(this.index):(this.index+1)%this.list.length;return this.index=e,this.value=this.list[e],this.value}},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}}},renderer:{background:{clear:{enable:!0},fill:{color:"rgba(0,0,0,0)"}}}});i(this,"time");i(this,"sizes");i(this,"renderer");i(this,"controler");i(this,"world");i(this,"viewContainerDom");i(this,"canvasDom",window.document.createElement("canvas"));i(this,"ctx",this.canvasDom.getContext("2d"));i(this,"stats");i(this,"particleHelper");this.viewContainerDom=e,this.viewContainerDom.appendChild(this.canvasDom),this.params.helper.stats.enable&&(this.stats=new J(e)),this.params.helper.gui.enable&&(this.particleHelper=new Wt(this)),this.time=new It(this),this.sizes=new C(this,{fit:C.Fit_None}),this.controler=new L(this),this.renderer=new qt(this),this.world=new Vt(this)}render(){this.time.tick()}paused(){this.time.paused()}onDestroyed(e){return this.once(G.Event_Destroyed,e)}destroy(){this.emit(G.Event_Destroyed)}};let x=G;i(x,"Event_Tick",Symbol()),i(x,"Event_Resize",Symbol()),i(x,"Event_Destroyed",Symbol());const jt={class:"background"},Xt=O({name:"View",setup(d){const t=Y();return U(()=>{const e=new x(t.value);e.world.createEmitterParticles(e.sizes.width/2,e.sizes.height/2),Q(()=>e.destroy)}),(e,s)=>(M(),B("section",jt,[H("div",{class:"viewContainer",ref_key:"viewDom",ref:t},null,512)]))}});var Yt=A(Xt,[["__scopeId","data-v-f891229a"],["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/ParticlesRender220724-Boom-B/View.vue"]]);const Ut={class:"main"},Qt=O({name:"PreviewsList",setup(d){return(t,e)=>(M(),B("div",Ut,[P(j,null,{default:q(()=>[P(Et)]),_:1}),P(j,null,{default:q(()=>[P(Yt)]),_:1}),P(j,null,{default:q(()=>[P(At)]),_:1}),it(` <Preview>
      <ParticlesRender220721></ParticlesRender220721>
    </Preview> `),it(` <Preview>
      <ParticlesRender220720></ParticlesRender220720>
    </Preview> `)]))}});var Zt=A(Qt,[["__scopeId","data-v-b9deca8e"],["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/PreviewsList.vue"]]);const Jt=O({name:"index",setup(d){return(t,e)=>(M(),B(lt,null,[P(mt),P(Zt)],64))}});var Kt=A(Jt,[["__file","/Volumes/Work/l00 Studio/l00/source/root/particles/index.vue"]]);const nt=ht(Kt);nt.use(dt);nt.mount("#app");
