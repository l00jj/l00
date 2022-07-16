var f=Object.defineProperty;var v=(r,e,s)=>e in r?f(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s;var t=(r,e,s)=>(v(r,typeof e!="symbol"?e+"":e,s),s);import{k as h,M as y,d as z,h as p,i as L,l as M,o as b,b as T,e as m,Q as A,p as G,g as S}from"./vendor-79ae1290.js";import{a as F,O as k,W as E,s as x,d as _,b as R,e as D,M as c,f as P,g as C,l as g,m as w,n as H,o as W,G as l,D as I,P as O,T as N,C as B,S as U}from"./OrbitControls-f9727bec.js";import{E as u}from"./EventEmitter-05980808.js";import{T as d,h as V}from"./helvetiker_regular.typeface-6970b3ef.js";import{F as $}from"./FontLoader-e4f92b51.js";import{_ as q}from"./plugin-vue_export-helper-4223c0cf.js";class J extends u{constructor(s){super();t(this,"viewArea");t(this,"width",0);t(this,"height",0);t(this,"pixelRatio",0);t(this,"onWindowResizeListener",()=>{this.updateSize(),this.emit("resize")});this.viewArea=s,this.updateSize(),this.setWindowResizeEmitter()}updateSize(){this.width=this.viewArea.offsetWidth,this.height=this.viewArea.offsetHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2)}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(s){return this.on("resize",s)}destroy(){return this.removeWindowResizeEmitter(),this.clearEvents()}}class j extends u{constructor(){super();t(this,"start");t(this,"current");t(this,"elapsed");t(this,"delta");t(this,"onTickLoopFunction",()=>{const s=Date.now();this.delta=s-this.current,this.current=s,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});t(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(s){return this.on("tick",s)}destroy(){return this.currentTickLoopFunction=()=>{},this.clearEvents()}}class Q{constructor(e){t(this,"experience");t(this,"sizes");t(this,"scene");t(this,"canvas");t(this,"instance");t(this,"controls");this.experience=e,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.canvas=this.experience.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new F(75,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(0,-1.5,4),this.instance.lookAt(0,0,0),this.scene.add(this.instance)}setOrbitControls(){this.controls=new k(this.instance,this.canvas),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class X{constructor(e){t(this,"experience");t(this,"canvas");t(this,"sizes");t(this,"scene");t(this,"camera");t(this,"instance");this.experience=e,this.canvas=this.experience.canvas,this.sizes=this.experience.sizes,this.scene=this.experience.scene,this.camera=this.experience.camera,this.setInstance()}setInstance(){this.instance=new E({canvas:this.canvas,antialias:!0,alpha:!0}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=x,this.instance.toneMapping=_,this.instance.toneMappingExposure=1.75,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=R,this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}class Y{constructor(e){t(this,"experience");t(this,"scene");t(this,"sunLight");t(this,"resources");t(this,"debug");t(this,"debugFolder");t(this,"environmentMap");var s;this.experience=e,this.scene=this.experience.scene,this.resources=this.experience.resources,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=(s=this.debug.ui)==null?void 0:s.addFolder("environment"))}setSunLight(){var e,s,i,n;this.sunLight=new D("#ffffff",4),this.sunLight.castShadow=!0,this.sunLight.shadow.camera.far=15,this.sunLight.shadow.mapSize.set(1024,1024),this.sunLight.shadow.normalBias=.05,this.sunLight.position.set(3.5,2,-1.25),this.scene.add(this.sunLight),this.debug.active&&((e=this.debugFolder)==null||e.add(this.sunLight,"intensity").name("sunLightIntensity").min(0).max(10).step(.001),(s=this.debugFolder)==null||s.add(this.sunLight.position,"x").name("sunLightX").min(-5).max(5).step(.001),(i=this.debugFolder)==null||i.add(this.sunLight.position,"y").name("sunLightY").min(-5).max(5).step(.001),(n=this.debugFolder)==null||n.add(this.sunLight.position,"z").name("sunLightZ").min(-5).max(5).step(.001))}setEnvironmentMap(){var e;this.environmentMap={},this.environmentMap.intensity=.4,this.environmentMap.texture=this.resources.items.environmentMapTexture,this.environmentMap.texture.encoding=x,this.scene.environment=this.environmentMap.texture,this.environmentMap.updateMaterials=()=>{this.scene.traverse(s=>{s instanceof c&&s.material instanceof P&&(s.material.envMap=this.environmentMap.texture,s.material.envMapIntensity=this.environmentMap.intensity,s.material.needsUpdate=!0)})},this.environmentMap.updateMaterials(),this.debug.active&&((e=this.debugFolder)==null||e.add(this.environmentMap,"intensity").name("envMapIntensity").min(0).max(4).step(.001).onChange(()=>{this.environmentMap.updateMaterials()}))}}class Z{constructor(e){t(this,"experience");t(this,"scene");t(this,"debug");t(this,"debugFolder");t(this,"isShowAxesHelper",!0);t(this,"axesHelper");var s,i;this.experience=e,this.scene=this.experience.scene,this.debug=this.experience.debug,this.debug.active&&(this.debugFolder=(s=this.debug.ui)==null?void 0:s.addFolder("AxesHelper"),(i=this.debugFolder)==null||i.open(),this.setAxesHelper())}setAxesHelper(){var e;this.axesHelper=new C(1),this.toggleAxesHelper(),(e=this.debugFolder)==null||e.add(this,"isShowAxesHelper").onChange(s=>{this.toggleAxesHelper()})}toggleAxesHelper(e){(typeof e=="boolean"?e:this.isShowAxesHelper)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)}}class K{constructor(e){t(this,"textGroup");t(this,"experience");t(this,"sizes");t(this,"scene");t(this,"environment");t(this,"resource");t(this,"debug");t(this,"debugFolder");t(this,"material");t(this,"aspect",NaN);this.textGroup=new g,this.experience=e,this.sizes=e.sizes,this.scene=this.experience.scene,this.debug=this.experience.debug,this.debug.active,this.resource=this.experience.resources.items.font,this.setMaterial(),this.setText(),this.scene.add(this.textGroup)}setMaterial(){this.material=new w}updateOrientation(){const e=this.sizes.width/this.sizes.height,s=e>1?1:-1,i=Number.isNaN(this.aspect)?NaN:this.aspect>1?1:-1;return s!==i?(this.aspect=e,!0):!1}setText(){if(!this.updateOrientation())return;const e=this.material,s={font:this.resource,size:.5,height:.2,curveSegments:5,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:4};if(this.textGroup.clear(),this.aspect>1){const i=new d("Welcome to l00 studio",s),n=new c(i,e);i.center(),this.textGroup.add(n)}else{const i=new d("Welcome To",s),n=new c(i,e);i.center(),i.translate(0,.4,0);const o=new d("l00 Studio",s),a=new c(o,e);o.center(),o.translate(0,-.4,0),this.textGroup.add(n,a)}}resize(){this.setText()}update(){}}class ee{constructor(e){t(this,"experience");t(this,"scene");t(this,"environment");t(this,"resources");t(this,"geometryRatio",27);t(this,"toruGeometry");t(this,"coneGeometry");t(this,"material");t(this,"mesh");t(this,"meshsGroup");t(this,"playAnimationTime",-1);t(this,"animationDuration",2.5);t(this,"animationDelay",4);this.experience=e,this.scene=this.experience.scene,this.resources=this.experience.resources,this.setGeometry(),this.setMaterial(),this.setMesh()}setGeometry(){this.toruGeometry=new H(.3,.2,20,45),this.coneGeometry=new W(.4,.6,3)}setMaterial(){this.material=new w}setMesh(){this.meshsGroup=new g,this.scene.add(this.meshsGroup),Array(300).fill(0).map((e,s)=>{const i=new c(this.toruGeometry,this.material),{position:n,rotation:o,scale:a}=this.random();i.position.set(n.x,n.y,n.z),i.rotation.set(o.x,o.y,o.z),i.scale.set(a,a,a),this.meshsGroup.add(i)}),Array(300).fill(0).map((e,s)=>{const i=new c(this.coneGeometry,this.material),{position:n,rotation:o,scale:a}=this.random();i.position.set(n.x,n.y,n.z),i.rotation.set(o.x,o.y,o.z),i.scale.set(a,a,a),this.meshsGroup.add(i)})}random(){const e=this.geometryRatio;return{position:{x:(Math.random()-.5)*e,y:(Math.random()-.3)*e,z:(Math.random()-.8)*e},rotation:{x:Math.random()*Math.PI,y:Math.random()*Math.PI,z:Math.random()*Math.PI},scale:Math.random()}}playAnimation(){if(this.experience.isPlayAnimation){const e=Math.floor(this.experience.time.elapsed/1e3/this.animationDelay);e>this.playAnimationTime&&(this.playAnimationTime=e,this.animation())}}animation(){const e=this.animationDuration;this.meshsGroup.traverseVisible(s=>{if(!(s instanceof c))return;const{position:i,rotation:n,scale:o}=this.random();h.to(s.position,{duration:e,x:i.x}),h.to(s.position,{duration:e,y:i.y}),h.to(s.position,{duration:e,z:i.z}),h.to(s.rotation,{duration:e,x:n.x}),h.to(s.rotation,{duration:e,y:n.y}),h.to(s.rotation,{duration:e,z:n.z}),h.to(s.scale,{duration:e,x:o}),h.to(s.scale,{duration:e,y:o}),h.to(s.scale,{duration:e,z:o})})}update(){this.experience.isPlayAnimation&&this.playAnimation()}}class te{constructor(e){t(this,"experience");t(this,"scene");t(this,"environment");t(this,"resources");t(this,"axesHelper");t(this,"text");t(this,"geometrys");this.experience=e,this.scene=this.experience.scene,this.resources=this.experience.resources,this.resources.on("ready",()=>{this.text=new K(this.experience),this.geometrys=new ee(this.experience),this.environment=new Y(this.experience),this.axesHelper=new Z(this.experience)})}resize(){var e;this.text&&((e=this.text)==null||e.resize())}update(){var e;(e=this.geometrys)==null||e.update()}}class se extends u{constructor(s){super();t(this,"sources");t(this,"items");t(this,"toLoad");t(this,"loaded");t(this,"loaders",{gltfLoader:new l,gltfDracoLoader:new l().setDRACOLoader(new I().setDecoderPath(new O("/assets/draco/").url)),textureLoader:new N,cubeTextureLoader:new B,fontLoader:new $});this.sources=s,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){for(const s of this.sources)s.type==="gltfModel"?this.loaders.gltfLoader.load(s.path,i=>{this.sourceLoaded(s,i)}):s.type==="gltfDracoModel"?this.loaders.gltfDracoLoader.load(s.path,i=>{this.sourceLoaded(s,i)}):s.type==="texture"?this.loaders.textureLoader.load(s.path,i=>{this.sourceLoaded(s,i)}):s.type==="cubeTexture"?this.loaders.cubeTextureLoader.load(s.path,i=>{this.sourceLoaded(s,i)}):s.type==="fontJSON"&&this.loaders.fontLoader.load(s.path,i=>{this.sourceLoaded(s,i)})}sourceLoaded(s,i){this.items[s.name]=i,this.loaded++,this.loaded===this.toLoad&&this.emit("ready")}}class ie{constructor(e){t(this,"experience");t(this,"active",!1);t(this,"ui");this.experience=e,window.location.hash.includes("debug")&&this.toActive()}toActive(){this.active=!0,this.ui=new y,this.fixGui()}fixGui(){var i;const e=this.experience.viewArea,s=(i=this.ui)==null?void 0:i.domElement.parentElement;e.appendChild(s),s.style.position="absolute"}toWindowTest(){window.testExperience=this.experience}destroy(){var e;(e=this.ui)==null||e.destroy(),delete window.testExperience}}var ne=[{name:"font",type:"fontJSON",path:V}];class re{constructor(e,s){t(this,"canvas");t(this,"viewArea");t(this,"sizes");t(this,"time");t(this,"scene");t(this,"resources");t(this,"camera");t(this,"renderer");t(this,"world");t(this,"isPlayAnimation",!0);t(this,"debug");this.canvas=e,this.viewArea=s,this.sizes=new J(s),this.time=new j,this.scene=new U,this.resources=new se(ne),this.camera=new Q(this),this.renderer=new X(this),this.world=new te(this),this.debug=new ie(this),this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.world.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){this.sizes.destroy(),this.time.destroy(),this.scene.traverse(e=>{if(e instanceof c){e.geometry.dispose();for(const s in e.material){const i=e.material[s];i&&typeof i.dispose=="function"&&i.dispose()}}}),this.camera.controls.dispose(),this.renderer.instance.dispose(),this.debug.destroy()}}const oe=r=>(G("data-v-7c0fcf8f"),r=r(),S(),r),ae=oe(()=>m("div",{class:"background"},null,-1)),he=z({name:"l00-Simple3DText",props:{onMounted:{type:Function,required:!1}},setup(r){const e=r,s=p(),i=p();let n;return L(async()=>{const o=s.value,a=i.value;n=new re(o,a),e.onMounted&&typeof e.onMounted=="function"&&await e.onMounted(n),n.render()}),M(()=>{n==null||n.destroy()}),(o,a)=>(b(),T("section",A(o.$attrs,{ref_key:"viewArea",ref:i}),[ae,m("canvas",{class:"",ref_key:"canvas",ref:s},null,512)],16))}});var ge=q(he,[["__scopeId","data-v-7c0fcf8f"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/simple-3d-text/l00-Simple3DText.vue"]]);export{ge as S};
