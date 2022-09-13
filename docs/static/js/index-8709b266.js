var P=Object.defineProperty;var S=(n,e,t)=>e in n?P(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>(S(n,typeof e!="symbol"?e+"":e,t),t);import{O as f,R,U as M,W as T,X as C,Y as F,a6 as k,aQ as E,a9 as w,aL as l,bg as H,bn as D,aX as W,ab as O,a4 as G,d as _,h as g,i as I,l as B,o as y,b as x,e as z,bq as V,p as j,g as $,s as q}from"./vendor-cabe9347.js";import{G as v,D as N,P as U,O as X}from"./OrbitControls-03b08d75.js";import{F as J}from"./FontLoader-3c03b433.js";import{_ as L}from"./plugin-vue_export-helper-4223c0cf.js";class Q{constructor(e){s(this,"main");s(this,"isActive",!1);s(this,"ui");this.main=e,window.location.hash.includes("debug")&&this.active()}active(){this.isActive=!0,this.ui=new f,this.fixGui(),this.toWindowTest()}fixGui(){var i;const e=this.main.viewArea,t=(i=this.ui)==null?void 0:i.domElement.parentElement;e.appendChild(t),t.style.position="absolute"}toWindowTest(){window.debugView=this.main}addFolder(e){if(!this.ui||!(this.ui instanceof f))return i=>{};const t=this.ui.addFolder(e);return i=>{i(t)}}destroy(){var e;(e=this.ui)==null||e.destroy(),delete window.debugView}}class Y{constructor(e,t){s(this,"function");s(this,"isOnce");this.function=e,this.isOnce=t.isOnce?t.isOnce:!1}}class m{constructor(){s(this,"__emittersMap__",new WeakMap);s(this,"__emitters__",new Map)}on(e,t){if(typeof e!="string"||e===""||typeof t!="function")return!1;let i=this.__emitters__.get(e);if(i||(i=new Set,this.__emitters__.set(e,i)),this.__emittersMap__.has(t))return!1;{const r=new Y(t,{isOnce:!1});this.__emittersMap__.set(t,r),i.add(r)}return!0}once(e,t){if(this.on(e,t)){const i=this.__emittersMap__.get(t);if(!i)return!1;i.isOnce=!0}else return!1;return!0}off(e,t){const i=this.__emitters__.get(e);if(!i)return!1;const r=this.__emittersMap__.get(t);return r?(this.__emittersMap__.delete(t),i.delete(r),i.size===0&&this.__emitters__.delete(e),!0):!1}offAll(e){const t=this.__emitters__.get(e);return t?(t.clear(),this.__emitters__.delete(e),!0):!1}clearEvents(){return this.__emitters__.clear(),!0}async emit(e,...t){const i=this.__emitters__.get(e);if(!!i)for(let r of i.values()){try{await r.function.apply(void 0,t)}catch(a){console.error(a)}r.isOnce&&this.off(e,r.function)}}}class K extends m{constructor(t){super();s(this,"viewArea");s(this,"width",0);s(this,"height",0);s(this,"pixelRatio",0);s(this,"onWindowResizeListener",()=>{this.updateSize(),this.emit("resize")});this.viewArea=t,this.updateSize(),this.setWindowResizeEmitter()}updateSize(){this.width=this.viewArea.offsetWidth,this.height=this.viewArea.offsetHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2)}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(t){return this.on("resize",t)}destroy(){return this.removeWindowResizeEmitter(),this.clearEvents()}}class Z extends m{constructor(){super();s(this,"start");s(this,"current");s(this,"elapsed");s(this,"delta");s(this,"onTickLoopFunction",()=>{const t=Date.now();this.delta=t-this.current,this.current=t,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});s(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(t){return this.on("tick",t)}destroy(){return this.currentTickLoopFunction=()=>{},this.clearEvents()}}class ee extends m{constructor(t){super();s(this,"sources");s(this,"items");s(this,"toLoad");s(this,"loaded");s(this,"loaders",{gltfLoader:new v,gltfDracoLoader:new v().setDRACOLoader(new N().setDecoderPath(new U("/assets/draco/").url)),textureLoader:new R,cubeTextureLoader:new M,fontLoader:new J});s(this,"isReady",!1);this.sources=t,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){if(this.sources.length===0)return this.ready();for(const t of this.sources)t.type==="gltfModel"?this.loaders.gltfLoader.load(t.path,i=>{this.sourceLoaded(t,i)}):t.type==="gltfDracoModel"?this.loaders.gltfDracoLoader.load(t.path,i=>{this.sourceLoaded(t,i)}):t.type==="texture"?this.loaders.textureLoader.load(t.path,i=>{this.sourceLoaded(t,i)}):t.type==="cubeTexture"?this.loaders.cubeTextureLoader.load(t.path,i=>{this.sourceLoaded(t,i)}):t.type==="fontJSON"&&this.loaders.fontLoader.load(t.path,i=>{this.sourceLoaded(t,i)})}sourceLoaded(t,i){this.items[t.name]=i,this.loaded++,this.loaded===this.toLoad&&this.ready()}ready(){this.isReady=!0,this.emit("ready")}onReady(t){return this.isReady?t():this.once("ready",t)}}class te{constructor(e){s(this,"main");s(this,"sizes");s(this,"scene");s(this,"canvas");s(this,"instance");s(this,"controls");this.main=e,this.sizes=this.main.sizes,this.scene=this.main.scene,this.canvas=this.main.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new T(75,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(3,3,3),this.instance.lookAt(0,0,0),this.scene.add(this.instance)}setOrbitControls(){this.controls=new X(this.instance,this.canvas),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class se{constructor(e){s(this,"main");s(this,"canvas");s(this,"sizes");s(this,"scene");s(this,"camera");s(this,"instance");this.main=e,this.canvas=this.main.canvas,this.sizes=this.main.sizes,this.scene=this.main.scene,this.camera=this.main.camera,this.setInstance()}setInstance(){this.instance=new C({canvas:this.canvas,antialias:!0,alpha:!1}),this.instance.outputEncoding=F,this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}resize(){this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)}update(){this.instance.render(this.scene,this.camera.instance)}}class ie{constructor(e){s(this,"main");s(this,"scene");s(this,"addDebug");s(this,"isShowAxesHelper",!0);s(this,"axesHelper");this.main=e,this.scene=this.main.scene,this.addDebug=this.main.debug.addFolder("AxesHelper"),this.setAxesHelper()}setAxesHelper(){this.addDebug(e=>{this.axesHelper=new k(1),this.toggleAxesHelper(),e.open(),e.add(this,"isShowAxesHelper").onChange(t=>{this.toggleAxesHelper()})})}toggleAxesHelper(e){(typeof e=="boolean"?e:this.isShowAxesHelper)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)}}var ne=`uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main()
{
  /**
   * Position
   */
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Spin
  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = length(modelPosition.xz);
  float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
  angle += angleOffset;
  modelPosition.x = cos(angle) * distanceToCenter;
  modelPosition.z = sin(angle) * distanceToCenter;

  // Randomness
  modelPosition.xyz += aRandomness;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  /**
   * Size
   */
   gl_PointSize = uSize * aScale;
   // \u6839\u636E\u955C\u5934\u8DDD\u79BB\u5927\u5C0F\u53D8\u5316
   gl_PointSize *= (1.0 / - viewPosition.z); 

   /**
    * Color
    */ 
    vColor = color;
}

     `,re=`varying vec3 vColor;

void main()
{
  // Light point
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 10.0);
  
  //  Final color
  vec3 color = mix(vec3(0.0), vColor, strength);

  gl_FragColor = vec4(color, 1.0);
}`;class ae{constructor(e){s(this,"main");s(this,"scene");s(this,"environment");s(this,"resources");s(this,"parameters",{count:5e5,radius:5,branches:3,randomnessPower:3});s(this,"geometry",new E);s(this,"material");s(this,"points");s(this,"playAnimationTime",-1);s(this,"animationDuration",2.5);s(this,"animationDelay",4);this.main=e,this.scene=this.main.scene,this.resources=this.main.resources,this.setGeometry(),this.setMaterial(),this.setPoints()}setGeometry(){const e=this.parameters,t=new Float32Array(e.count*3),i=new Float32Array(e.count*3),r=new Float32Array(e.count*1),a=new Float32Array(e.count*3),A=new w(16736304),b=new w(1784196);for(let c=0;c<e.count;c++){const o=c*3,h=Math.random()*e.radius,p=c%e.branches/e.branches*Math.PI*2;t[o+0]=Math.cos(p)*h,t[o+1]=0,t[o+2]=Math.sin(p)*h;const u=()=>Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*h*.6;a[o+0]=u(),a[o+1]=u(),a[o+2]=u();const d=A.clone();d.lerp(b,h/e.radius),i[o+0]=d.r,i[o+1]=d.g,i[o+2]=d.b,r[c]=Math.random()}this.geometry.setAttribute("position",new l(t,3)),this.geometry.setAttribute("color",new l(i,3)),this.geometry.setAttribute("aScale",new l(r,1)),this.geometry.setAttribute("aRandomness",new l(a,3))}setMaterial(){this.parameters,this.material=new H({depthWrite:!1,blending:D,vertexColors:!0,vertexShader:ne,fragmentShader:re,transparent:!0,uniforms:{uTime:{value:0},uSize:{value:30*this.main.renderer.instance.getPixelRatio()}}})}setPoints(){this.points=new W(this.geometry,this.material),this.scene.add(this.points)}playAnimation(){}animation(){this.animationDuration}update(){this.material.uniforms.uTime.value=this.main.time.elapsed/1e3}}class oe{constructor(e){s(this,"main");s(this,"scene");s(this,"environment");s(this,"resources");s(this,"axesHelper");s(this,"particles");this.main=e,this.scene=this.main.scene,this.resources=this.main.resources,this.resources.onReady(()=>{this.particles=new ae(this.main),this.axesHelper=new ie(this.main)})}resize(){}update(){var e;(e=this.particles)==null||e.update()}}var ce=[];class he{constructor(e,t){s(this,"canvas");s(this,"viewArea");s(this,"sizes");s(this,"time");s(this,"scene");s(this,"resources");s(this,"camera");s(this,"renderer");s(this,"world");s(this,"isPlayAnimation",!0);s(this,"debug");this.canvas=e,this.viewArea=t,this.debug=new Q(this),this.sizes=new K(t),this.time=new Z,this.scene=new O,this.resources=new ee(ce),this.camera=new te(this),this.renderer=new se(this),this.world=new oe(this),this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.world.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){this.sizes.destroy(),this.time.destroy(),this.camera.controls.dispose(),this.renderer.instance.dispose(),this.debug.destroy(),this.scene.traverse(e=>{if(e instanceof G){e.geometry.dispose();for(const t in e.material){const i=e.material[t];i&&typeof i.dispose=="function"&&i.dispose()}}})}}const de=n=>(j("data-v-435ce788"),n=n(),$(),n),le=de(()=>z("div",{class:"background"},null,-1)),ue=_({name:"l00-Galaxy",props:{onMounted:{type:Function,required:!1}},setup(n){const e=g(),t=g();let i;return I(async()=>{const r=e.value,a=t.value;i=new he(r,a),i.render()}),B(()=>{i==null||i.destroy()}),(r,a)=>(y(),x("section",V(r.$attrs,{ref_key:"viewArea",ref:t}),[le,z("canvas",{class:"",ref_key:"canvas",ref:e},null,512)],16))}});var me=L(ue,[["__scopeId","data-v-435ce788"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-galaxy/l00-Galaxy.vue"]]);const pe=_({name:"index",setup(n){return(e,t)=>(y(),x("div",null,[q(me)]))}});var ye=L(pe,[["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-galaxy/index.vue"]]);export{ye as default};
