var x=Object.defineProperty;var f=(r,i,t)=>i in r?x(r,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[i]=t;var e=(r,i,t)=>(f(r,typeof i!="symbol"?i+"":i,t),t);import{W as w,X as v,Y as d,a2 as L,_ as b,a3 as y,a4 as h,a5 as g,bv as z,aF as o,aa as M,R,U as T,O as F,ab as k,d as _,h as c,l as j,i as C,o as E,b as W,e as p}from"./vendor-cabe9347.js";import{E as u}from"./EventEmitter-80978bd8.js";import{O as S,G as m,D as A,P as D}from"./OrbitControls-03b08d75.js";import{_ as U}from"./plugin-vue_export-helper-4223c0cf.js";class I extends u{constructor(){super();e(this,"width",window.innerWidth);e(this,"height",window.innerHeight);e(this,"pixelRatio",Math.min(window.devicePixelRatio,2));e(this,"onWindowResizeListener",()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.emit("resize")});this.setWindowResizeEmitter()}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(t){return this.on("resize",t)}offResize(){return this.removeWindowResizeEmitter(),this.offAll("resize")}}class P extends u{constructor(){super();e(this,"start");e(this,"current");e(this,"elapsed");e(this,"delta");e(this,"onTickLoopFunction",()=>{const t=Date.now();this.delta=t-this.current,this.current=t,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});e(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(t){return this.on("tick",t)}offTick(){return this.currentTickLoopFunction=()=>{},this.offAll("tick")}}class G{constructor(i){e(this,"experience");e(this,"sizes");e(this,"scene");e(this,"canvas");e(this,"instance");e(this,"controls");this.experience=i,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.canvas=this.experience.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new w(35,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(6,4,8),this.scene.add(this.instance)}setOrbitControls(){this.controls=new S(this.instance,this.canvas),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class O{constructor(i){e(this,"experience");e(this,"canvas");e(this,"sizes");e(this,"scene");e(this,"camera");e(this,"instance");this.experience=i,this.canvas=this.experience.canvas,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.camera=this.experience.camera,this.setInstance()}setInstance(){this.instance=new v({canvas:this.canvas,antialias:!0}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=d,this.instance.toneMapping=L,this.instance.toneMappingExposure=1.75,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=b,this.instance.setClearColor("#211d20"),this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}class B{constructor(i){e(this,"experience");e(this,"scene");e(this,"sunLight");e(this,"resources");e(this,"debug");e(this,"debugFolder");e(this,"environmentMap");var t;this.experience=i,this.scene=this.experience.scene,this.resources=this.experience.resources,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=(t=this.debug.ui)==null?void 0:t.addFolder("environment")),this.setSunLight(),this.setEnvironmentMap()}setSunLight(){var i,t,s,n;this.sunLight=new y("#ffffff",4),this.sunLight.castShadow=!0,this.sunLight.shadow.camera.far=15,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.normalBias=.05,this.sunLight.position.set(3.5,2,-1.25),this.scene.add(this.sunLight),this.debug.active&&((i=this.debugFolder)==null||i.add(this.sunLight,"intensity").name("sunLightIntensity").min(0).max(10).step(.001),(t=this.debugFolder)==null||t.add(this.sunLight.position,"x").name("sunLightX").min(-5).max(5).step(.001),(s=this.debugFolder)==null||s.add(this.sunLight.position,"y").name("sunLightY").min(-5).max(5).step(.001),(n=this.debugFolder)==null||n.add(this.sunLight.position,"z").name("sunLightZ").min(-5).max(5).step(.001))}setEnvironmentMap(){var i;this.environmentMap={},this.environmentMap.intensity=.4,this.environmentMap.texture=this.resources.items.environmentMapTexture,this.environmentMap.texture.encoding=d,this.scene.environment=this.environmentMap.texture,this.environmentMap.updateMaterials=()=>{this.scene.traverse(t=>{t instanceof h&&t.material instanceof g&&(t.material.envMap=this.environmentMap.texture,t.material.envMapIntensity=this.environmentMap.intensity,t.material.needsUpdate=!0)})},this.environmentMap.updateMaterials(),this.debug.active&&((i=this.debugFolder)==null||i.add(this.environmentMap,"intensity").name("envMapIntensity").min(0).max(4).step(.001).onChange(()=>{this.environmentMap.updateMaterials()}))}}class N{constructor(i){e(this,"experience");e(this,"scene");e(this,"environment");e(this,"resources");e(this,"geometry");e(this,"texture");e(this,"material");e(this,"mesh");this.experience=i,this.scene=this.experience.scene,this.resources=this.experience.resources,this.setGeometry(),this.setTexture(),this.setMaterial(),this.setMesh()}setGeometry(){this.geometry=new z(5,64)}setTexture(){this.texture={},this.texture.color=this.resources.items.grassColorTexture,this.texture.color.encoding=d,this.texture.color.repeat.set(1.5,1.5),this.texture.color.wrapS=o,this.texture.color.wrapT=o,this.texture.normal=this.resources.items.grassNormalTexture,this.texture.normal.repeat.set(1.5,1.5),this.texture.normal.wrapS=o,this.texture.normal.wrapT=o}setMaterial(){this.material=new g({map:this.texture.color,normalMap:this.texture.normal})}setMesh(){this.mesh=new h(this.geometry,this.material),this.mesh.rotation.x=-Math.PI*.5,this.mesh.receiveShadow=!0,this.scene.add(this.mesh)}}class H{constructor(i){e(this,"experience");e(this,"scene");e(this,"environment");e(this,"resources");e(this,"time");e(this,"resource");e(this,"debug");e(this,"debugFolder");e(this,"model");e(this,"animation");var t;this.experience=i,this.scene=this.experience.scene,this.resources=this.experience.resources,this.time=this.experience.time,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=(t=this.debug.ui)==null?void 0:t.addFolder("fox")),this.resource=this.experience.resources.items.foxModel,this.setModel(),this.setAnimation()}setModel(){this.model=this.resource.scene,this.model.scale.set(.02,.02,.02),this.scene.add(this.model),this.model.traverse(i=>{i instanceof h&&(i.castShadow=!0)})}setAnimation(){var i,t,s;if(this.animation={},this.animation.mixer=new M(this.model),this.animation.actions={},this.animation.actions.idle=this.animation.mixer.clipAction(this.resource.animations[0]),this.animation.actions.walking=this.animation.mixer.clipAction(this.resource.animations[1]),this.animation.actions.running=this.animation.mixer.clipAction(this.resource.animations[2]),this.animation.actions.current=this.animation.actions.idle,this.animation.actions.current.play(),this.animation.play=n=>{const a=this.animation.actions[n],l=this.animation.actions.current;a.reset(),a.play(),a.crossFadeFrom(l,1),this.animation.actions.current=a},this.debug.active){const n={playIdle:()=>{this.animation.play("idle")},playWalking:()=>{this.animation.play("walking")},playRunning:()=>{this.animation.play("running")}};(i=this.debugFolder)==null||i.add(n,"playIdle"),(t=this.debugFolder)==null||t.add(n,"playWalking"),(s=this.debugFolder)==null||s.add(n,"playRunning")}}update(){this.animation.mixer.update(this.time.delta*.001)}}class V{constructor(i){e(this,"experience");e(this,"scene");e(this,"environment");e(this,"resources");e(this,"floor");e(this,"fox");this.experience=i,this.scene=this.experience.scene,this.resources=this.experience.resources,this.resources.on("ready",()=>{this.floor=new N(this.experience),this.fox=new H(this.experience),this.environment=new B(this.experience)})}update(){this.fox&&this.fox.update()}}class X extends u{constructor(t){super();e(this,"sources");e(this,"items");e(this,"toLoad");e(this,"loaded");e(this,"loaders",{gltfLoader:new m,gltfDracoLoader:new m().setDRACOLoader(new A().setDecoderPath(new D("/assets/draco/").url)),textureLoader:new R,cubeTextureLoader:new T});this.sources=t,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){for(const t of this.sources)t.type==="gltfModel"?this.loaders.gltfLoader.load(t.path,s=>{this.sourceLoaded(t,s)}):t.type==="gltfDracoModel"?this.loaders.gltfDracoLoader.load(t.path,s=>{this.sourceLoaded(t,s)}):t.type==="texture"?this.loaders.textureLoader.load(t.path,s=>{this.sourceLoaded(t,s)}):t.type==="cubeTexture"&&this.loaders.cubeTextureLoader.load(t.path,s=>{this.sourceLoaded(t,s)})}sourceLoaded(t,s){this.items[t.name]=s,this.loaded++,this.loaded===this.toLoad&&this.emit("ready")}}class Y{constructor(){e(this,"active");e(this,"ui");this.active=window.location.hash.includes("debug"),this.active&&(this.ui=new F)}}var q=[{name:"environmentMapTexture",type:"cubeTexture",path:[new URL("/l00/static/jpg/px-a0e41bf9.jpg?url",self.location).href,new URL("/l00/static/jpg/nx-57f73ba7.jpg?url",self.location).href,new URL("/l00/static/jpg/py-7322f97e.jpg?url",self.location).href,new URL("/l00/static/jpg/ny-d209a134.jpg?url",self.location).href,new URL("/l00/static/jpg/pz-b0eb9498.jpg?url",self.location).href,new URL("/l00/static/jpg/nz-fc946930.jpg?url",self.location).href]},{name:"grassColorTexture",type:"texture",path:new URL("/l00/static/jpg/color-d1d3ccf3.jpg?url",self.location).href},{name:"grassNormalTexture",type:"texture",path:new URL("/l00/static/jpg/normal-44eeb462.jpg?url",self.location).href},{name:"foxModel",type:"gltfDracoModel",path:new URL("/l00/static/gltf/Fox-9721c474.gltf?url",self.location).href}];class Z{constructor(i){e(this,"canvas");e(this,"sizes");e(this,"time");e(this,"scene");e(this,"resources");e(this,"camera");e(this,"renderer");e(this,"world");e(this,"debug");this.canvas=i,this.sizes=new I,this.time=new P,this.scene=new k,this.resources=new X(q),this.camera=new G(this),this.renderer=new O(this),this.world=new V(this),this.debug=new Y,this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){var i;this.sizes.offResize(),this.time.offTick(),this.scene.traverse(t=>{if(t instanceof h){t.geometry.dispose();for(const s in t.material){const n=t.material[s];n&&typeof n.dispose=="function"&&n.dispose()}}}),this.camera.controls.dispose(),this.renderer.instance.dispose(),this.debug.active&&((i=this.debug.ui)==null||i.destroy())}}const $=_({name:"index",setup(r){const i=c(),t=c(),s=c();let n;return j(()=>{n==null||n.destroy()}),C(()=>{const a=i.value;s.value,n=new Z(a),n.render()}),(a,l)=>(E(),W("div",{class:"viewraper",ref_key:"viewraper",ref:s},[p("canvas",{ref_key:"canvas",ref:i},null,512),p("div",{guiwrap:"",ref_key:"guiwrap",ref:t},null,512)],512))}});var ie=U($,[["__scopeId","data-v-4d8520e6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/code-structuring-brunosimon/index.vue"]]);export{ie as default};
