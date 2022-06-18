var R=Object.defineProperty;var A=(i,t,e)=>t in i?R(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var n=(i,t,e)=>(A(i,typeof t!="symbol"?t+"":t,e),e);import{d as T,r as x,P as k,i as E,j as $,C as D,o as u,c as m,a,F as P,s as U,t as M,k as S,M as V,N as j,u as H,K as W,p as I,e as B,m as G}from"./vendor-9f0bb9fc.js";import{j as z,e as C,f as N,g as q,h as X,i as Y,P as J,O as K,W as Q,s as Z,a3 as O,a as ee,a4 as te,a5 as ne,C as re,Q as ie,A as se,r as ae,H as oe,a6 as ve,M as L,S as le}from"./dat.gui.module-3ed960a2.js";import{F as ce}from"./FontLoader-446c44a8.js";import{_ as F}from"./plugin-vue_export-helper-4223c0cf.js";var de="/l00/static/png/preview-a41a70df.png",ge=Object.freeze(Object.defineProperty({__proto__:null,default:de},Symbol.toStringTag,{value:"Module"})),he="/l00/static/png/preview-938103bb.png",pe=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"})),ue="/l00/static/png/preview-ae398a05.png",me=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"})),_e="/l00/static/png/preview-22f5f4c8.png",fe=Object.freeze(Object.defineProperty({__proto__:null,default:_e},Symbol.toStringTag,{value:"Module"})),we="/l00/static/png/preview-e9609db9.png",be=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"})),ye="/l00/static/png/preview-79ce70a6.png",xe=Object.freeze(Object.defineProperty({__proto__:null,default:ye},Symbol.toStringTag,{value:"Module"})),Se="/l00/static/png/preview-ef67a364.png",Pe=Object.freeze(Object.defineProperty({__proto__:null,default:Se},Symbol.toStringTag,{value:"Module"})),Ue="/l00/static/png/preview-3f3ba25e.png",Me=Object.freeze(Object.defineProperty({__proto__:null,default:Ue},Symbol.toStringTag,{value:"Module"})),Ve="/l00/static/png/preview-b00e79b5.png",je=Object.freeze(Object.defineProperty({__proto__:null,default:Ve},Symbol.toStringTag,{value:"Module"})),ze="/l00/static/png/preview-c1530189.png",Ce=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"})),Oe="/l00/static/png/preview-d774423d.png",Te=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"})),Le="/l00/static/png/preview-146796a3.png",Fe=Object.freeze(Object.defineProperty({__proto__:null,default:Le},Symbol.toStringTag,{value:"Module"})),Re="/l00/static/png/preview-a5567c84.png",Ae=Object.freeze(Object.defineProperty({__proto__:null,default:Re},Symbol.toStringTag,{value:"Module"})),ke="/l00/static/png/preview-b800d948.png",Ee=Object.freeze(Object.defineProperty({__proto__:null,default:ke},Symbol.toStringTag,{value:"Module"})),$e="/l00/static/png/preview-74556e15.png",De=Object.freeze(Object.defineProperty({__proto__:null,default:$e},Symbol.toStringTag,{value:"Module"})),He="/l00/static/png/preview-be06b34f.png",We=Object.freeze(Object.defineProperty({__proto__:null,default:He},Symbol.toStringTag,{value:"Module"})),Ie="/l00/static/png/preview-84704776.png",Be=Object.freeze(Object.defineProperty({__proto__:null,default:Ie},Symbol.toStringTag,{value:"Module"})),Ge="/l00/static/png/preview-f2cd1957.png",Ne=Object.freeze(Object.defineProperty({__proto__:null,default:Ge},Symbol.toStringTag,{value:"Module"})),qe="/l00/static/png/preview-af52b28b.png",Xe=Object.freeze(Object.defineProperty({__proto__:null,default:qe},Symbol.toStringTag,{value:"Module"})),Ye="/l00/static/png/preview-45f27d3d.png",Je=Object.freeze(Object.defineProperty({__proto__:null,default:Ye},Symbol.toStringTag,{value:"Module"})),Ke="/l00/static/png/preview-d77217fd.png",Qe=Object.freeze(Object.defineProperty({__proto__:null,default:Ke},Symbol.toStringTag,{value:"Module"})),Ze="/l00/static/png/preview-f2a414dd.png",et=Object.freeze(Object.defineProperty({__proto__:null,default:Ze},Symbol.toStringTag,{value:"Module"}));class tt{constructor(){n(this,"number",0);n(this,"previewUrl",null);n(this,"fragment",null);n(this,"vertex",null)}}const nt={"./View/core/Shaders/Pattern 1/fragment.glsl":`varying vec2 vUv;

void main()
{
  gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
}`,"./View/core/Shaders/Pattern 1/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 10/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = mod(vUv.x * 10.0, 1.0);
  strength = step(0.8, strength);

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 10/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 11/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  strength += step(0.8, mod(vUv.y * 10.0, 1.0));

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 11/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 12/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 12/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 13/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
  strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 13/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 14/fragment.glsl":`varying vec2 vUv;

void main()
{
  float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
  barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

  float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
  barY *= step(0.8, mod(vUv.x * 10.0, 1.0));

  float strength = barX + barY;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 14/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 15/fragment.glsl":`varying vec2 vUv;

void main()
{
  float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0));
  barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

  float barY = step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
  barY *= step(0.8, mod(vUv.x * 10.0, 1.0));

  float strength = barX + barY;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 15/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 16/fragment.glsl":`varying vec2 vUv;

void main()
{
  // float strength = 1.0 - vUv.x - 0.5;
  // strength = max(strength, vUv.x - 0.5);

  float strength = abs(vUv.x - 0.5);

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 16/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 17/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 17/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 18/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 18/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 19/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 19/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 2/fragment.glsl":`varying vec2 vUv;

void main()
{
  gl_FragColor = vec4(vUv, 0.0, 1.0); // \u8C03\u8282 Blue \u6709\u4E0D\u540C\u7684\u6548\u679C
}`,"./View/core/Shaders/Pattern 2/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 20/fragment.glsl":`varying vec2 vUv;

void main()
{
  //float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  //strength *= step(max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)), 0.1);
  
  float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  float strength = square1 * square2;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 20/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 21/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = floor(vUv.x * 10.0) / 10.0;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 21/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 22/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = floor(vUv.x * 10.0) / 10.0;
  strength *= floor(vUv.y * 10.0) / 10.0;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 22/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 23/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = floor(vUv.x * 10.0) / 10.0;
  strength *= floor(vUv.y * 10.0) / 10.0;

  gl_FragColor = vec4(strength, strength, strength, 1.0); // 
}`,"./View/core/Shaders/Pattern 23/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 3/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = vUv.x;

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 3/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 4/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = vUv.y;

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 4/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 5/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = 1.0 - vUv.y;

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 5/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 6/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = vUv.y * 10.0;

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 6/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 7/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = mod(vUv.y * 10.0, 1.0);

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 7/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 8/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = mod(vUv.y * 10.0, 1.0);
  strength = step(strength, 0.5);

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 8/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`,"./View/core/Shaders/Pattern 9/fragment.glsl":`varying vec2 vUv;

void main()
{
  float strength = mod(vUv.y * 10.0, 1.0);
  strength = step(0.8, strength);

  gl_FragColor = vec4(vec3(strength), 1.0); // 
}`,"./View/core/Shaders/Pattern 9/vertex.glsl":`varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}`},rt={"./View/core/Shaders/Pattern 1/preview.png":ge,"./View/core/Shaders/Pattern 10/preview.png":pe,"./View/core/Shaders/Pattern 11/preview.png":me,"./View/core/Shaders/Pattern 12/preview.png":fe,"./View/core/Shaders/Pattern 13/preview.png":be,"./View/core/Shaders/Pattern 14/preview.png":xe,"./View/core/Shaders/Pattern 15/preview.png":Pe,"./View/core/Shaders/Pattern 16/preview.png":Me,"./View/core/Shaders/Pattern 17/preview.png":je,"./View/core/Shaders/Pattern 18/preview.png":Ce,"./View/core/Shaders/Pattern 19/preview.png":Te,"./View/core/Shaders/Pattern 2/preview.png":Fe,"./View/core/Shaders/Pattern 20/preview.png":Ae,"./View/core/Shaders/Pattern 21/preview.png":Ee,"./View/core/Shaders/Pattern 22/preview.png":De,"./View/core/Shaders/Pattern 3/preview.png":We,"./View/core/Shaders/Pattern 4/preview.png":Be,"./View/core/Shaders/Pattern 5/preview.png":Ne,"./View/core/Shaders/Pattern 6/preview.png":Xe,"./View/core/Shaders/Pattern 7/preview.png":Je,"./View/core/Shaders/Pattern 8/preview.png":Qe,"./View/core/Shaders/Pattern 9/preview.png":et},b=(()=>{const i={};Object.entries(nt).forEach(([e,r])=>{var d;const l=e.toString().split("/"),c=(d=l.pop())==null?void 0:d.split(".")[0],h=l.pop(),w=h in i,_=w?i[h]:new tt,f=r.toString();w||(i[h]=_),c==="fragment"?_.fragment=f:c==="vertex"&&(_.vertex=f)}),Object.entries(rt).forEach(([e,r])=>{const l=e.toString().split("/");l.pop();const c=l.pop(),h=r.default.toString();c in i&&(i[c].previewUrl=h)});const t=[];return Object.entries(i).forEach(([e,r])=>{const v=r,l=e.match(/\d+/),c=l?parseInt(l[0]):0,h=c-1;v.number=c,t[h]=v}),t})();b.sort((i,t)=>t.number-i.number);class it{constructor(t){n(this,"main");n(this,"isActive",!1);n(this,"ui");this.main=t,window.location.hash.includes("debug")&&this.active()}active(){this.isActive=!0,this.ui=new z,this.fixGui(),this.toWindowTest()}fixGui(){var r;const t=this.main.viewArea,e=(r=this.ui)==null?void 0:r.domElement.parentElement;t.appendChild(e),e.style.position="absolute"}toWindowTest(){window.debugView=this.main}addFolder(t){if(!this.ui||!(this.ui instanceof z))return r=>{};const e=this.ui.addFolder(t);return r=>{r(e)}}destroy(){var t;(t=this.ui)==null||t.destroy(),delete window.debugView}}class st{constructor(t,e){n(this,"function");n(this,"isOnce");this.function=t,this.isOnce=e.isOnce?e.isOnce:!1}}class y{constructor(){n(this,"__emittersMap__",new WeakMap);n(this,"__emitters__",new Map)}on(t,e){if(typeof t!="string"||t===""||typeof e!="function")return!1;let r=this.__emitters__.get(t);if(r||(r=new Set,this.__emitters__.set(t,r)),this.__emittersMap__.has(e))return!1;{const v=new st(e,{isOnce:!1});this.__emittersMap__.set(e,v),r.add(v)}return!0}once(t,e){if(this.on(t,e)){const r=this.__emittersMap__.get(e);if(!r)return!1;r.isOnce=!0}else return!1;return!0}off(t,e){const r=this.__emitters__.get(t);if(!r)return!1;const v=this.__emittersMap__.get(e);return v?(this.__emittersMap__.delete(e),r.delete(v),r.size===0&&this.__emitters__.delete(t),!0):!1}offAll(t){const e=this.__emitters__.get(t);return e?(e.clear(),this.__emitters__.delete(t),!0):!1}clearEvents(){return this.__emitters__.clear(),!0}async emit(t,...e){const r=this.__emitters__.get(t);if(!!r)for(let v of r.values()){try{await v.function.apply(void 0,e)}catch(l){console.error(l)}v.isOnce&&this.off(t,v.function)}}}class at extends y{constructor(e){super();n(this,"viewArea");n(this,"width",0);n(this,"height",0);n(this,"pixelRatio",0);n(this,"onWindowResizeListener",()=>{this.updateSize(),this.emit("resize")});this.viewArea=e,this.updateSize(),this.setWindowResizeEmitter()}updateSize(){this.width=this.viewArea.offsetWidth,this.height=this.viewArea.offsetHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2)}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(e){return this.on("resize",e)}destroy(){return this.removeWindowResizeEmitter(),this.clearEvents()}}class ot extends y{constructor(){super();n(this,"start");n(this,"current");n(this,"elapsed");n(this,"delta");n(this,"onTickLoopFunction",()=>{const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});n(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(e){return this.on("tick",e)}destroy(){return this.currentTickLoopFunction=()=>{},this.clearEvents()}}class vt extends y{constructor(e){super();n(this,"sources");n(this,"items");n(this,"toLoad");n(this,"loaded");n(this,"loaders",{gltfLoader:new C,gltfDracoLoader:new C().setDRACOLoader(new N().setDecoderPath(new q("/assets/draco/").url)),textureLoader:new X,cubeTextureLoader:new Y,fontLoader:new ce});n(this,"isReady",!1);this.sources=e,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){if(this.sources.length===0)return this.ready();for(const e of this.sources)if(e.type==="gltfModel")this.loaders.gltfLoader.load(e.path,r=>{this.sourceLoaded(e,r)});else if(e.type==="gltfDracoModel")this.loaders.gltfDracoLoader.load(e.path,r=>{this.sourceLoaded(e,r)});else if(e.type==="texture")this.loaders.textureLoader.load(e.path,r=>{this.sourceLoaded(e,r)});else if(e.type==="cubeTexture")this.loaders.cubeTextureLoader.load(e.path,r=>{this.sourceLoaded(e,r)});else if(e.type==="fontJSON")this.loaders.fontLoader.load(e.path,r=>{this.sourceLoaded(e,r)});else throw`Unknow source.type: ${e.type}`}sourceLoaded(e,r){this.items[e.name]=r,this.loaded++,this.loaded===this.toLoad&&this.ready()}ready(){this.isReady=!0,this.emit("ready")}onReady(e){return this.isReady?e():this.once("ready",e)}}class lt{constructor(t){n(this,"main");n(this,"sizes");n(this,"scene");n(this,"canvas");n(this,"instance");n(this,"controls");this.main=t,this.sizes=this.main.sizes,this.scene=this.main.scene,this.canvas=this.main.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new J(75,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(1,-.5,2),this.instance.lookAt(0,0,0),this.scene.add(this.instance)}setOrbitControls(){this.controls=new K(this.instance,this.canvas),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class ct extends y{constructor(e){super();n(this,"main");n(this,"finalRender");n(this,"coreRenderer");this.main=e,this.coreRenderer=new dt(this)}onDestroy(e){this.on("destroy",e)}destroy(){this.coreRenderer.instance.dispose(),this.emit("destroy")}onResize(e){this.on("resize",e)}resize(){this.emit("resize")}update(){this.finalRender()}}class dt{constructor(t){n(this,"renderer");n(this,"main");n(this,"canvas");n(this,"sizes");n(this,"scene");n(this,"camera");n(this,"renderToneMappingDebug");n(this,"instance");n(this,"resize",()=>{this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)});n(this,"render",()=>{this.instance.render(this.scene,this.camera.instance)});this.renderer=t,this.main=this.renderer.main,this.canvas=this.main.canvas,this.sizes=this.main.sizes,this.scene=this.main.scene,this.camera=this.main.camera,this.renderToneMappingDebug=this.main.debug.addFolder("RenderToneMapping"),this.setInstance()}setInstance(){this.instance=new Q({canvas:this.canvas,antialias:!0,alpha:!1}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=Z,this.instance.toneMapping=O,this.instance.toneMappingExposure=1.5,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=ee,this.resize(),this.renderToneMappingDebug(t=>{t.add(this.instance,"toneMapping",{No:te,Linear:ne,Reinhard:O,Cineon:re,ACESFilmic:ie}).onFinishChange(()=>{this.instance.toneMapping=Number(this.instance.toneMapping)}),t.add(this.instance,"toneMappingExposure").min(0).max(10).step(.001)}),this.renderer.onResize(this.resize),this.renderer.finalRender=this.render}}class gt{constructor(t){n(this,"main");n(this,"scene");n(this,"addDebug");n(this,"isShowAxesHelper",!0);n(this,"axesHelper");this.main=t,this.scene=this.main.scene,this.addDebug=this.main.debug.addFolder("AxesHelper"),this.setAxesHelper()}setAxesHelper(){this.addDebug(t=>{this.axesHelper=new se(1),this.toggleAxesHelper(),t.open(),t.add(this,"isShowAxesHelper").onChange(e=>{this.toggleAxesHelper()})})}toggleAxesHelper(t){(typeof t=="boolean"?t:this.isShowAxesHelper)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)}}class ht{constructor(t){n(this,"main");n(this,"scene");n(this,"resources");n(this,"time");n(this,"patternPlane");n(this,"animation");this.main=t,this.scene=this.main.scene,this.resources=this.main.resources,this.time=this.main.time,this.setPatternPlane()}setPatternPlane(){const t=new ae(2,2,32,32),e=new oe({vertexShader:`
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,fragmentShader:`
void main()
{
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}`,side:ve});this.patternPlane=new L(t,e),this.scene.add(this.patternPlane)}setAnimation(){}update(){}}class pt{constructor(t){n(this,"main");n(this,"scene");n(this,"environment");n(this,"resources");n(this,"axesHelper");n(this,"patternPlane");this.main=t,this.scene=this.main.scene,this.resources=this.main.resources,this.resources.onReady(()=>{this.axesHelper=new gt(this.main),this.patternPlane=new ht(this.main)})}resize(){}update(){var t;(t=this.patternPlane)==null||t.update()}}var ut=[];class mt{constructor(t,e){n(this,"canvas");n(this,"viewArea");n(this,"sizes");n(this,"time");n(this,"scene");n(this,"resources");n(this,"camera");n(this,"renderer");n(this,"world");n(this,"isPlayAnimation",!0);n(this,"debug");this.canvas=t,this.viewArea=e,this.debug=new it(this),this.sizes=new at(e),this.time=new ot,this.scene=new le,this.resources=new vt(ut),this.camera=new lt(this),this.renderer=new ct(this),this.world=new pt(this),this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.world.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){this.sizes.destroy(),this.time.destroy(),this.renderer.destroy(),this.camera.controls.dispose(),this.debug.destroy(),this.scene.traverse(t=>{if(t instanceof L){t.geometry.dispose();for(const e in t.material){const r=t.material[e];r&&typeof r.dispose=="function"&&r.dispose()}}})}}var _t=(i,t)=>{var r;if(!i)return;const e=(r=i.world.patternPlane)==null?void 0:r.patternPlane.material;t.fragmentShader&&(e.fragmentShader=t.fragmentShader),t.vertexShader&&(e.vertexShader=t.vertexShader),e.needsUpdate=!0};const ft=i=>(I("data-v-493f0785"),i=i(),B(),i),wt={class:"patterns"},bt={class:"codepart"},yt={class:"header"},xt={class:"title"},St=["src"],Pt={key:0,class:"code"},Ut=["onUpdate:modelValue"],Mt={key:1,class:"code"},Vt=["onUpdate:modelValue"],jt=["onClick"],zt={class:"right-panel"},Ct={class:"render"},Ot=ft(()=>a("div",{class:"background"},null,-1)),Tt={class:"console"},Lt={class:"controls"},Ft={class:"captures"},Rt=["onClick"],At=["src"],kt=T({name:"l00-ShaderPatterns",setup(i){console.log(b);const t=s=>{const{fragment:g,vertex:o}=s,p={};g&&(p.fragmentShader=g),o&&(p.vertexShader=o),_t(d,p)},e=x(!1),r={},v=k(e,()=>{const s=d.camera;e.value?(s.controls.enabled&&(r.fov=s.instance.fov,r.position=s.instance.position.clone()),s.controls.enabled=!1,s.controls.enableDamping=!1,s.instance.fov=90,s.instance.updateProjectionMatrix(),window.requestAnimationFrame(()=>{s.instance.position.set(0,0,1),s.instance.lookAt(0,0,0)})):(s.controls.enableDamping=!0,s.controls.enabled=!0,s.instance.fov=r.fov,s.instance.position.copy(r.position),s.instance.updateProjectionMatrix())});class l{constructor(g){n(this,"url");this.url=g}}const c=E(new Set),h=()=>{const s=_.value;d.renderer.coreRenderer.render();const g=s.toDataURL("image/png"),o=new l(g);c.add(o)},w=async s=>{c.delete(s)},_=x(),f=x();let d;return $(async()=>{const s=_.value,g=f.value;d=new mt(s,g),t(b[0]),d.render()}),D(()=>{d==null||d.destroy(),v()}),(s,g)=>(u(),m("div",W({class:"container"},s.$attrs),[a("section",wt,[(u(!0),m(P,null,U(H(b),o=>(u(),m("div",bt,[a("div",yt,[a("h1",xt,"Pattern "+M(o.number),1),o.previewUrl?(u(),m("img",{key:0,class:"preview",width:"100",height:"100",src:o.previewUrl},null,8,St)):S("v-if",!0)]),o.vertex?(u(),m("div",Pt,[V(a("textarea",{rows:"5","onUpdate:modelValue":p=>o.vertex=p},null,8,Ut),[[j,o.vertex]])])):S("v-if",!0),o.fragment?(u(),m("div",Mt,[V(a("textarea",{rows:"30","onUpdate:modelValue":p=>o.fragment=p},null,8,Vt),[[j,o.fragment]])])):S("v-if",!0),a("div",{class:"updatecode",onClick:p=>t(o)},"Use This Shader",8,jt)]))),256))]),a("div",zt,[a("div",Ct,[a("section",{class:"view",ref_key:"viewArea",ref:f},[Ot,a("canvas",{class:"",ref_key:"canvas",ref:_},null,512)],512)]),a("div",Tt,[a("ul",Lt,[a("li",null,[a("button",{onClick:g[0]||(g[0]=()=>e.value=!e.value)},M(e.value?"\u81EA\u7531\u89C6\u89D2":"\u6B63\u9762\u67E5\u770B"),1)]),a("li",null,[a("button",{onClick:h},"\u622A\u56FE")])]),a("ul",Ft,[(u(!0),m(P,null,U(c,o=>(u(),m("li",null,[a("span",{class:"delete",onClick:p=>w(o)},null,8,Rt),a("img",{width:"100",height:"100",src:o.url},null,8,At)]))),256))])])])],16))}});var Et=F(kt,[["__scopeId","data-v-493f0785"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-shader-patterns/l00-ShaderPatterns.vue"]]);const $t=T({name:"index",setup(i){return(t,e)=>(u(),G(Et))}});var Gt=F($t,[["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-shader-patterns/index.vue"]]);export{Gt as default};
