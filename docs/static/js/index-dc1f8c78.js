var v=Object.defineProperty;var _=(n,e,t)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>(_(n,typeof e!="symbol"?e+"":e,t),t);import{N as c,d as m,h as d,i as y,l as M,o as p,b as f,e as x,U as L,W as z,s as R}from"./vendor-263e2909.js";import{G as u,D as b,P as A,T,C as S,a as E,O as D,V as F,W as C,s as g,A as l,aa as k,N as H,c as P,R as W,d as j,e as I,M as r,f as O,g as U,h as V,i as N,j as G,k as B,S as $}from"./OrbitControls-f9727bec.js";import{F as q}from"./FontLoader-e4f92b51.js";import{_ as w}from"./plugin-vue_export-helper-46f75680.js";class Y{constructor(e){s(this,"main");s(this,"isActive",!1);s(this,"ui");this.main=e,window.location.hash.includes("debug")&&this.active()}active(){this.isActive=!0,this.ui=new c,this.fixGui(),this.toWindowTest()}fixGui(){var i;const e=this.main.viewArea,t=(i=this.ui)==null?void 0:i.domElement.parentElement;e.appendChild(t),t.style.position="absolute"}toWindowTest(){window.debugView=this.main}addFolder(e){if(!this.ui||!(this.ui instanceof c))return i=>{};const t=this.ui.addFolder(e);return i=>{i(t)}}destroy(){var e;(e=this.ui)==null||e.destroy(),delete window.debugView}}class J{constructor(e,t){s(this,"function");s(this,"isOnce");this.function=e,this.isOnce=t.isOnce?t.isOnce:!1}}class h{constructor(){s(this,"__emittersMap__",new WeakMap);s(this,"__emitters__",new Map)}on(e,t){if(typeof e!="string"||e===""||typeof t!="function")return!1;let i=this.__emitters__.get(e);if(i||(i=new Set,this.__emitters__.set(e,i)),this.__emittersMap__.has(t))return!1;{const a=new J(t,{isOnce:!1});this.__emittersMap__.set(t,a),i.add(a)}return!0}once(e,t){if(this.on(e,t)){const i=this.__emittersMap__.get(t);if(!i)return!1;i.isOnce=!0}else return!1;return!0}off(e,t){const i=this.__emitters__.get(e);if(!i)return!1;const a=this.__emittersMap__.get(t);return a?(this.__emittersMap__.delete(t),i.delete(a),i.size===0&&this.__emitters__.delete(e),!0):!1}offAll(e){const t=this.__emitters__.get(e);return t?(t.clear(),this.__emitters__.delete(e),!0):!1}clearEvents(){return this.__emitters__.clear(),!0}async emit(e,...t){const i=this.__emitters__.get(e);if(!!i)for(let a of i.values()){try{await a.function.apply(void 0,t)}catch(o){console.error(o)}a.isOnce&&this.off(e,a.function)}}}class X extends h{constructor(t){super();s(this,"viewArea");s(this,"width",0);s(this,"height",0);s(this,"pixelRatio",0);s(this,"onWindowResizeListener",()=>{this.updateSize(),this.emit("resize")});this.viewArea=t,this.updateSize(),this.setWindowResizeEmitter()}updateSize(){this.width=this.viewArea.offsetWidth,this.height=this.viewArea.offsetHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2)}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(t){return this.on("resize",t)}destroy(){return this.removeWindowResizeEmitter(),this.clearEvents()}}class Z extends h{constructor(){super();s(this,"start");s(this,"current");s(this,"elapsed");s(this,"delta");s(this,"onTickLoopFunction",()=>{const t=Date.now();this.delta=t-this.current,this.current=t,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});s(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(t){return this.on("tick",t)}destroy(){return this.currentTickLoopFunction=()=>{},this.clearEvents()}}class K extends h{constructor(t){super();s(this,"sources");s(this,"items");s(this,"toLoad");s(this,"loaded");s(this,"loaders",{gltfLoader:new u,gltfDracoLoader:new u().setDRACOLoader(new b().setDecoderPath(new A("/assets/draco/").url)),textureLoader:new T,cubeTextureLoader:new S,fontLoader:new q});s(this,"isReady",!1);this.sources=t,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){if(this.sources.length===0)return this.ready();for(const t of this.sources)if(t.type==="gltfModel")this.loaders.gltfLoader.load(t.path,i=>{this.sourceLoaded(t,i)});else if(t.type==="gltfDracoModel")this.loaders.gltfDracoLoader.load(t.path,i=>{this.sourceLoaded(t,i)});else if(t.type==="texture")this.loaders.textureLoader.load(t.path,i=>{this.sourceLoaded(t,i)});else if(t.type==="cubeTexture")this.loaders.cubeTextureLoader.load(t.path,i=>{this.sourceLoaded(t,i)});else if(t.type==="fontJSON")this.loaders.fontLoader.load(t.path,i=>{this.sourceLoaded(t,i)});else throw`Unknow source.type: ${t.type}`}sourceLoaded(t,i){this.items[t.name]=i,this.loaded++,this.loaded===this.toLoad&&this.ready()}ready(){this.isReady=!0,this.emit("ready")}onReady(t){return this.isReady?t():this.once("ready",t)}}class Q{constructor(e){s(this,"main");s(this,"sizes");s(this,"scene");s(this,"canvas");s(this,"instance");s(this,"controls");this.main=e,this.sizes=this.main.sizes,this.scene=this.main.scene,this.canvas=this.main.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new E(45,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(0,1.45,-1.5),this.instance.lookAt(0,1.45,0),this.scene.add(this.instance)}setOrbitControls(){this.controls=new D(this.instance,this.canvas),this.controls.target=new F(0,1.45,0),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class ee extends h{constructor(t){super();s(this,"main");s(this,"finalRender");s(this,"coreRenderer");this.main=t,this.coreRenderer=new te(this)}onDestroy(t){this.on("destroy",t)}destroy(){this.coreRenderer.instance.dispose(),this.emit("destroy")}onResize(t){this.on("resize",t)}resize(){this.emit("resize")}update(){this.finalRender()}}class te{constructor(e){s(this,"renderer");s(this,"main");s(this,"canvas");s(this,"sizes");s(this,"scene");s(this,"camera");s(this,"renderToneMappingDebug");s(this,"instance");s(this,"resize",()=>{this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)});s(this,"render",()=>{this.instance.render(this.scene,this.camera.instance)});this.renderer=e,this.main=this.renderer.main,this.canvas=this.main.canvas,this.sizes=this.main.sizes,this.scene=this.main.scene,this.camera=this.main.camera,this.renderToneMappingDebug=this.main.debug.addFolder("RenderToneMapping"),this.setInstance()}setInstance(){this.instance=new C({canvas:this.canvas,antialias:!0,alpha:!0}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=g,this.instance.toneMapping=l,this.instance.toneMappingExposure=1.5,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=k,this.instance.setClearColor(16777215,0),this.resize(),this.renderToneMappingDebug(e=>{e.add(this.instance,"toneMapping",{No:H,Linear:P,Reinhard:W,Cineon:j,ACESFilmic:l}).onFinishChange(()=>{this.instance.toneMapping=Number(this.instance.toneMapping)}),e.add(this.instance,"toneMappingExposure").min(0).max(10).step(.001)}),this.renderer.onResize(this.resize),this.renderer.finalRender=this.render}}class se{constructor(e){s(this,"main");s(this,"scene");s(this,"resources");s(this,"addDebug");s(this,"sunLight");s(this,"environmentMap");this.main=e,this.scene=this.main.scene,this.resources=this.main.resources,this.addDebug=this.main.debug.addFolder("environment"),this.setSunLight(),this.setEnvironmentMap()}setSunLight(){this.sunLight=new I("#ffffff",5),this.sunLight.castShadow=!0,this.sunLight.shadow.camera.far=20,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.normalBias=.05,this.sunLight.position.set(5,2,2),this.scene.add(this.sunLight),this.addDebug(e=>{e.add(this.sunLight,"intensity").name("sunLightIntensity").min(0).max(10).step(.001),e.add(this.sunLight.position,"x").name("sunLightX").min(-50).max(50).step(.001),e.add(this.sunLight.position,"y").name("sunLightY").min(-50).max(50).step(.001),e.add(this.sunLight.position,"z").name("sunLightZ").min(-50).max(50).step(.001)})}setEnvironmentMap(){this.environmentMap={},this.environmentMap.intensity=1.5,this.environmentMap.texture=this.resources.items.environmentMapTexture,this.environmentMap.texture.encoding=g,this.scene.environment=this.environmentMap.texture,this.environmentMap.updateMaterials=()=>{this.scene.traverse(e=>{e instanceof r&&e.material instanceof O&&(e.material.envMap=this.environmentMap.texture,e.material.envMapIntensity=this.environmentMap.intensity,e.material.needsUpdate=!0,e.castShadow=!0,e.receiveShadow=!0)})},this.environmentMap.updateMaterials(),this.addDebug(e=>{e.add(this.environmentMap,"intensity").name("envMapIntensity").min(0).max(4).step(.001).onChange(()=>{this.environmentMap.updateMaterials()})})}}class ie{constructor(e){s(this,"main");s(this,"scene");s(this,"addDebug");s(this,"isShowAxesHelper",!0);s(this,"axesHelper");this.main=e,this.scene=this.main.scene,this.addDebug=this.main.debug.addFolder("AxesHelper"),this.setAxesHelper()}setAxesHelper(){this.addDebug(e=>{this.axesHelper=new U(1),this.toggleAxesHelper(),e.open(),e.add(this,"isShowAxesHelper").onChange(t=>{this.toggleAxesHelper()})})}toggleAxesHelper(e){(typeof e=="boolean"?e:this.isShowAxesHelper)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)}}class ne{constructor(e){s(this,"main");s(this,"scene");s(this,"resources");s(this,"time");s(this,"addDebug");s(this,"resource");s(this,"model");s(this,"plane");s(this,"animation");this.main=e,this.scene=this.main.scene,this.resources=this.main.resources,this.time=this.main.time,this.addDebug=this.main.debug.addFolder("Model"),this.setModel(),this.setPlane()}setModel(){this.resource=this.main.resources.items["model-me"],this.model=this.resource.scene.children[0],this.model.rotation.y=Math.PI*1,console.log(this.resource),console.log(this.model),this.scene.add(this.model),this.model.traverse(e=>{e instanceof r&&(e.castShadow=!0)}),this.addDebug(e=>{e.add(this.model.rotation,"y").name("rotationY").min(-2*Math.PI).max(2*Math.PI).step(.001)})}setPlane(){const e=new V(50,10),t=new N({color:new G("rgba(255,255,255,0)"),transparent:!0,opacity:1}),i=new r(e,t);i.rotation.x=-Math.PI/2,i.position.x=0,i.position.z=-4,this.plane=i,this.scene.add(this.plane),this.model.traverse(a=>{a instanceof r&&(a.castShadow=!0)})}setAnimation(){this.animation={},this.animation.mixer=new B(this.model),this.animation.actions={},this.animation.actions.idle=this.animation.mixer.clipAction(this.resource.animations[0]),this.animation.actions.walking=this.animation.mixer.clipAction(this.resource.animations[1]),this.animation.actions.running=this.animation.mixer.clipAction(this.resource.animations[2]),this.animation.actions.current=this.animation.actions.idle,this.animation.actions.current.play(),this.animation.play=e=>{const t=this.animation.actions[e],i=this.animation.actions.current;t.reset(),t.play(),t.crossFadeFrom(i,1),this.animation.actions.current=t}}update(){}}class ae{constructor(e){s(this,"main");s(this,"scene");s(this,"environment");s(this,"resources");s(this,"axesHelper");s(this,"model");this.main=e,this.scene=this.main.scene,this.resources=this.main.resources,this.resources.onReady(()=>{this.model=new ne(this.main),this.environment=new se(this.main),this.axesHelper=new ie(this.main)})}resize(){}update(){var e;(e=this.model)==null||e.update()}}var re=[{name:"environmentMapTexture",type:"cubeTexture",path:[new URL("/l00/static/jpg/px-5f94a820.jpg?url",self.location).href,new URL("/l00/static/jpg/nx-17c6256f.jpg?url",self.location).href,new URL("/l00/static/jpg/py-eb6ff9ff.jpg?url",self.location).href,new URL("/l00/static/jpg/ny-bedb4db1.jpg?url",self.location).href,new URL("/l00/static/jpg/pz-4e8175e8.jpg?url",self.location).href,new URL("/l00/static/jpg/nz-ee7dfac2.jpg?url",self.location).href]},{name:"model-me",type:"gltfDracoModel",path:new URL("/l00/static/gltf/me-1d61ce68.gltf?url",self.location).href}];class oe{constructor(e,t){s(this,"canvas");s(this,"viewArea");s(this,"sizes");s(this,"time");s(this,"scene");s(this,"resources");s(this,"camera");s(this,"renderer");s(this,"world");s(this,"isPlayAnimation",!0);s(this,"debug");this.canvas=e,this.viewArea=t,this.debug=new Y(this),this.sizes=new X(t),this.time=new Z,this.scene=new $,this.resources=new K(re),this.camera=new Q(this),this.renderer=new ee(this),this.world=new ae(this),this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.world.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){this.sizes.destroy(),this.time.destroy(),this.renderer.destroy(),this.camera.controls.dispose(),this.debug.destroy(),this.scene.traverse(e=>{if(e instanceof r){e.geometry.dispose();for(const t in e.material){const i=e.material[t];i&&typeof i.dispose=="function"&&i.dispose()}}})}}const he=z('<div class="background" data-v-58feeaed></div><div class="text-container" data-v-58feeaed><div class="title" data-v-58feeaed><span data-v-58feeaed>He</span><span data-v-58feeaed>llo</span></div><div class="left" data-v-58feeaed><span data-v-58feeaed>Welcome to<br data-v-58feeaed>l00 Studio</span></div><div class="right" data-v-58feeaed><span data-v-58feeaed>\u6211\u53EB\u5C0F\u5218</span></div></div>',2),ce=m({name:"l00-Myself",props:{onMounted:{type:Function,required:!1}},setup(n){const e=d(),t=d();let i;return y(async()=>{const a=e.value,o=t.value;i=new oe(a,o),i.render()}),M(()=>{i==null||i.destroy()}),(a,o)=>(p(),f("section",L(a.$attrs,{ref_key:"viewArea",ref:t}),[he,x("canvas",{class:"",ref_key:"canvas",ref:e},null,512)],16))}});var de=w(ce,[["__scopeId","data-v-58feeaed"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/myself/l00-Myself.vue"]]);const ue=m({name:"index",setup(n){return(e,t)=>(p(),f("div",null,[R(de)]))}});var we=w(ue,[["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/myself/index.vue"]]);export{we as default};
