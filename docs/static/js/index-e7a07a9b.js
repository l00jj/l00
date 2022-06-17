var F=Object.defineProperty;var O=(i,t,e)=>t in i?F(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var s=(i,t,e)=>(O(i,typeof t!="symbol"?t+"":t,e),e);import{d as R,r as S,P as k,i as E,j as D,C as H,o as g,c as m,a,F as P,s as M,t as z,k as b,M as U,N as L,u as W,K as $,p as I,e as B,m as G}from"./vendor-9f0bb9fc.js";import{j as V,e as C,f as N,g as q,h as J,i as K,P as Q,O as X,W as Y,s as Z,a3 as T,a as ee,a4 as te,a5 as se,C as ne,Q as ie,A as re,r as ae,H as oe,a6 as ce,M as j,S as le}from"./dat.gui.module-3ed960a2.js";import{F as de}from"./FontLoader-446c44a8.js";import{_ as A}from"./plugin-vue_export-helper-4223c0cf.js";var he="/l00/static/png/preview-a41a70df.png",ve=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"})),ue="/l00/static/png/preview-146796a3.png",pe=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"})),ge="/l00/static/png/preview-be06b34f.png",me=Object.freeze(Object.defineProperty({__proto__:null,default:ge},Symbol.toStringTag,{value:"Module"})),_e="/l00/static/png/preview-84704776.png",fe=Object.freeze(Object.defineProperty({__proto__:null,default:_e},Symbol.toStringTag,{value:"Module"})),we="/l00/static/png/preview-f2cd1957.png",ye=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"})),xe="/l00/static/png/preview-af52b28b.png",Se=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"})),be="/l00/static/png/preview-45f27d3d.png",Pe=Object.freeze(Object.defineProperty({__proto__:null,default:be},Symbol.toStringTag,{value:"Module"})),Me="/l00/static/png/preview-d77217fd.png",ze=Object.freeze(Object.defineProperty({__proto__:null,default:Me},Symbol.toStringTag,{value:"Module"})),Ue="/l00/static/png/preview-f2a414dd.png",Le=Object.freeze(Object.defineProperty({__proto__:null,default:Ue},Symbol.toStringTag,{value:"Module"}));class Ve{constructor(){s(this,"number",0);s(this,"previewUrl",null);s(this,"fragment",null);s(this,"vertex",null)}}const Ce={"./View/core/Shaders/Pattern 1/fragment.glsl":`varying vec2 vUv;

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
}`,"./View/core/Shaders/Pattern 2/fragment.glsl":`varying vec2 vUv;

void main()
{
  gl_FragColor = vec4(vUv, 0.0, 1.0); // \u8C03\u8282 Blue \u6709\u4E0D\u540C\u7684\u6548\u679C
}`,"./View/core/Shaders/Pattern 2/vertex.glsl":`varying vec2 vUv;

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
}`},Te={"./View/core/Shaders/Pattern 1/preview.png":ve,"./View/core/Shaders/Pattern 2/preview.png":pe,"./View/core/Shaders/Pattern 3/preview.png":me,"./View/core/Shaders/Pattern 4/preview.png":fe,"./View/core/Shaders/Pattern 5/preview.png":ye,"./View/core/Shaders/Pattern 6/preview.png":Se,"./View/core/Shaders/Pattern 7/preview.png":Pe,"./View/core/Shaders/Pattern 8/preview.png":ze,"./View/core/Shaders/Pattern 9/preview.png":Le},y=(()=>{const i={};Object.entries(Ce).forEach(([e,n])=>{var h;const l=e.toString().split("/"),d=(h=l.pop())==null?void 0:h.split(".")[0],u=l.pop(),w=u in i,_=w?i[u]:new Ve,f=n.toString();w||(i[u]=_),d==="fragment"?_.fragment=f:d==="vertex"&&(_.vertex=f)}),Object.entries(Te).forEach(([e,n])=>{const l=e.toString().split("/");l.pop();const d=l.pop(),u=n.default.toString();d in i&&(i[d].previewUrl=u)});const t=[];return Object.entries(i).forEach(([e,n])=>{const c=n,l=e.match(/\d+/),d=l?parseInt(l[0]):0,u=d-1;c.number=d,t[u]=c}),t})();y.sort((i,t)=>t.number-i.number);class Re{constructor(t){s(this,"main");s(this,"isActive",!1);s(this,"ui");this.main=t,window.location.hash.includes("debug")&&this.active()}active(){this.isActive=!0,this.ui=new V,this.fixGui(),this.toWindowTest()}fixGui(){var n;const t=this.main.viewArea,e=(n=this.ui)==null?void 0:n.domElement.parentElement;t.appendChild(e),e.style.position="absolute"}toWindowTest(){window.debugView=this.main}addFolder(t){if(!this.ui||!(this.ui instanceof V))return n=>{};const e=this.ui.addFolder(t);return n=>{n(e)}}destroy(){var t;(t=this.ui)==null||t.destroy(),delete window.debugView}}class je{constructor(t,e){s(this,"function");s(this,"isOnce");this.function=t,this.isOnce=e.isOnce?e.isOnce:!1}}class x{constructor(){s(this,"__emittersMap__",new WeakMap);s(this,"__emitters__",new Map)}on(t,e){if(typeof t!="string"||t===""||typeof e!="function")return!1;let n=this.__emitters__.get(t);if(n||(n=new Set,this.__emitters__.set(t,n)),this.__emittersMap__.has(e))return!1;{const c=new je(e,{isOnce:!1});this.__emittersMap__.set(e,c),n.add(c)}return!0}once(t,e){if(this.on(t,e)){const n=this.__emittersMap__.get(e);if(!n)return!1;n.isOnce=!0}else return!1;return!0}off(t,e){const n=this.__emitters__.get(t);if(!n)return!1;const c=this.__emittersMap__.get(e);return c?(this.__emittersMap__.delete(e),n.delete(c),n.size===0&&this.__emitters__.delete(t),!0):!1}offAll(t){const e=this.__emitters__.get(t);return e?(e.clear(),this.__emitters__.delete(t),!0):!1}clearEvents(){return this.__emitters__.clear(),!0}async emit(t,...e){const n=this.__emitters__.get(t);if(!!n)for(let c of n.values()){try{await c.function.apply(void 0,e)}catch(l){console.error(l)}c.isOnce&&this.off(t,c.function)}}}class Ae extends x{constructor(e){super();s(this,"viewArea");s(this,"width",0);s(this,"height",0);s(this,"pixelRatio",0);s(this,"onWindowResizeListener",()=>{this.updateSize(),this.emit("resize")});this.viewArea=e,this.updateSize(),this.setWindowResizeEmitter()}updateSize(){this.width=this.viewArea.offsetWidth,this.height=this.viewArea.offsetHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2)}setWindowResizeEmitter(){window.addEventListener("resize",this.onWindowResizeListener)}removeWindowResizeEmitter(){window.removeEventListener("resize",this.onWindowResizeListener)}onResize(e){return this.on("resize",e)}destroy(){return this.removeWindowResizeEmitter(),this.clearEvents()}}class Fe extends x{constructor(){super();s(this,"start");s(this,"current");s(this,"elapsed");s(this,"delta");s(this,"onTickLoopFunction",()=>{const e=Date.now();this.delta=e-this.current,this.current=e,this.elapsed=this.current-this.start,this.emit("tick"),window.requestAnimationFrame(this.currentTickLoopFunction)});s(this,"currentTickLoopFunction",()=>{});this.start=Date.now(),this.current=this.start,this.elapsed=0,this.delta=16}tick(){this.currentTickLoopFunction!==this.onTickLoopFunction&&(this.currentTickLoopFunction=this.onTickLoopFunction,this.currentTickLoopFunction())}onTick(e){return this.on("tick",e)}destroy(){return this.currentTickLoopFunction=()=>{},this.clearEvents()}}class Oe extends x{constructor(e){super();s(this,"sources");s(this,"items");s(this,"toLoad");s(this,"loaded");s(this,"loaders",{gltfLoader:new C,gltfDracoLoader:new C().setDRACOLoader(new N().setDecoderPath(new q("/assets/draco/").url)),textureLoader:new J,cubeTextureLoader:new K,fontLoader:new de});s(this,"isReady",!1);this.sources=e,this.items={},this.toLoad=this.sources.length,this.loaded=0,this.startLoading()}startLoading(){if(this.sources.length===0)return this.ready();for(const e of this.sources)if(e.type==="gltfModel")this.loaders.gltfLoader.load(e.path,n=>{this.sourceLoaded(e,n)});else if(e.type==="gltfDracoModel")this.loaders.gltfDracoLoader.load(e.path,n=>{this.sourceLoaded(e,n)});else if(e.type==="texture")this.loaders.textureLoader.load(e.path,n=>{this.sourceLoaded(e,n)});else if(e.type==="cubeTexture")this.loaders.cubeTextureLoader.load(e.path,n=>{this.sourceLoaded(e,n)});else if(e.type==="fontJSON")this.loaders.fontLoader.load(e.path,n=>{this.sourceLoaded(e,n)});else throw`Unknow source.type: ${e.type}`}sourceLoaded(e,n){this.items[e.name]=n,this.loaded++,this.loaded===this.toLoad&&this.ready()}ready(){this.isReady=!0,this.emit("ready")}onReady(e){return this.isReady?e():this.once("ready",e)}}class ke{constructor(t){s(this,"main");s(this,"sizes");s(this,"scene");s(this,"canvas");s(this,"instance");s(this,"controls");this.main=t,this.sizes=this.main.sizes,this.scene=this.main.scene,this.canvas=this.main.canvas,this.setInstance(),this.setOrbitControls()}setInstance(){this.instance=new Q(75,this.sizes.width/this.sizes.height,.1,100),this.instance.position.set(1,-.5,2),this.instance.lookAt(0,0,0),this.scene.add(this.instance)}setOrbitControls(){this.controls=new X(this.instance,this.canvas),this.controls.enableDamping=!0}resize(){this.instance.aspect=this.sizes.width/this.sizes.height,this.instance.updateProjectionMatrix()}update(){this.controls.update()}}class Ee extends x{constructor(e){super();s(this,"main");s(this,"finalRender");s(this,"coreRenderer");this.main=e,this.coreRenderer=new De(this)}onDestroy(e){this.on("destroy",e)}destroy(){this.coreRenderer.instance.dispose(),this.emit("destroy")}onResize(e){this.on("resize",e)}resize(){this.emit("resize")}update(){this.finalRender()}}class De{constructor(t){s(this,"renderer");s(this,"main");s(this,"canvas");s(this,"sizes");s(this,"scene");s(this,"camera");s(this,"renderToneMappingDebug");s(this,"instance");s(this,"resize",()=>{this.instance.setSize(this.sizes.width,this.sizes.height),this.instance.setPixelRatio(this.sizes.pixelRatio)});s(this,"render",()=>{this.instance.render(this.scene,this.camera.instance)});this.renderer=t,this.main=this.renderer.main,this.canvas=this.main.canvas,this.sizes=this.main.sizes,this.scene=this.main.scene,this.camera=this.main.camera,this.renderToneMappingDebug=this.main.debug.addFolder("RenderToneMapping"),this.setInstance()}setInstance(){this.instance=new Y({canvas:this.canvas,antialias:!0,alpha:!1}),this.instance.physicallyCorrectLights=!0,this.instance.outputEncoding=Z,this.instance.toneMapping=T,this.instance.toneMappingExposure=1.5,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=ee,this.resize(),this.renderToneMappingDebug(t=>{t.add(this.instance,"toneMapping",{No:te,Linear:se,Reinhard:T,Cineon:ne,ACESFilmic:ie}).onFinishChange(()=>{this.instance.toneMapping=Number(this.instance.toneMapping)}),t.add(this.instance,"toneMappingExposure").min(0).max(10).step(.001)}),this.renderer.onResize(this.resize),this.renderer.finalRender=this.render}}class He{constructor(t){s(this,"main");s(this,"scene");s(this,"addDebug");s(this,"isShowAxesHelper",!0);s(this,"axesHelper");this.main=t,this.scene=this.main.scene,this.addDebug=this.main.debug.addFolder("AxesHelper"),this.setAxesHelper()}setAxesHelper(){this.addDebug(t=>{this.axesHelper=new re(1),this.toggleAxesHelper(),t.open(),t.add(this,"isShowAxesHelper").onChange(e=>{this.toggleAxesHelper()})})}toggleAxesHelper(t){(typeof t=="boolean"?t:this.isShowAxesHelper)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)}}class We{constructor(t){s(this,"main");s(this,"scene");s(this,"resources");s(this,"time");s(this,"patternPlane");s(this,"animation");this.main=t,this.scene=this.main.scene,this.resources=this.main.resources,this.time=this.main.time,this.setPatternPlane()}setPatternPlane(){const t=new ae(2,2,32,32),e=new oe({vertexShader:`
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,fragmentShader:`
void main()
{
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}`,side:ce});this.patternPlane=new j(t,e),this.scene.add(this.patternPlane)}setAnimation(){}update(){}}class $e{constructor(t){s(this,"main");s(this,"scene");s(this,"environment");s(this,"resources");s(this,"axesHelper");s(this,"patternPlane");this.main=t,this.scene=this.main.scene,this.resources=this.main.resources,this.resources.onReady(()=>{this.axesHelper=new He(this.main),this.patternPlane=new We(this.main)})}resize(){}update(){var t;(t=this.patternPlane)==null||t.update()}}var Ie=[];class Be{constructor(t,e){s(this,"canvas");s(this,"viewArea");s(this,"sizes");s(this,"time");s(this,"scene");s(this,"resources");s(this,"camera");s(this,"renderer");s(this,"world");s(this,"isPlayAnimation",!0);s(this,"debug");this.canvas=t,this.viewArea=e,this.debug=new Re(this),this.sizes=new Ae(e),this.time=new Fe,this.scene=new le,this.resources=new Oe(Ie),this.camera=new ke(this),this.renderer=new Ee(this),this.world=new $e(this),this.sizes.onResize(()=>this.resize()),this.time.onTick(()=>this.update())}resize(){this.camera.resize(),this.world.resize(),this.renderer.resize()}update(){this.camera.update(),this.world.update(),this.renderer.update()}render(){this.time.tick()}destroy(){this.sizes.destroy(),this.time.destroy(),this.renderer.destroy(),this.camera.controls.dispose(),this.debug.destroy(),this.scene.traverse(t=>{if(t instanceof j){t.geometry.dispose();for(const e in t.material){const n=t.material[e];n&&typeof n.dispose=="function"&&n.dispose()}}})}}var Ge=(i,t)=>{var n;if(!i)return;const e=(n=i.world.patternPlane)==null?void 0:n.patternPlane.material;t.fragmentShader&&(e.fragmentShader=t.fragmentShader),t.vertexShader&&(e.vertexShader=t.vertexShader),e.needsUpdate=!0};const Ne=i=>(I("data-v-493f0785"),i=i(),B(),i),qe={class:"patterns"},Je={class:"codepart"},Ke={class:"header"},Qe={class:"title"},Xe=["src"],Ye={key:0,class:"code"},Ze=["onUpdate:modelValue"],et={key:1,class:"code"},tt=["onUpdate:modelValue"],st=["onClick"],nt={class:"right-panel"},it={class:"render"},rt=Ne(()=>a("div",{class:"background"},null,-1)),at={class:"console"},ot={class:"controls"},ct={class:"captures"},lt=["onClick"],dt=["src"],ht=R({name:"l00-ShaderPatterns",setup(i){console.log(y);const t=r=>{const{fragment:v,vertex:o}=r,p={};v&&(p.fragmentShader=v),o&&(p.vertexShader=o),Ge(h,p)},e=S(!1),n={},c=k(e,()=>{const r=h.camera;e.value?(r.controls.enabled&&(n.fov=r.instance.fov,n.position=r.instance.position.clone()),r.controls.enabled=!1,r.controls.enableDamping=!1,r.instance.fov=90,r.instance.updateProjectionMatrix(),window.requestAnimationFrame(()=>{r.instance.position.set(0,0,1),r.instance.lookAt(0,0,0)})):(r.controls.enableDamping=!0,r.controls.enabled=!0,r.instance.fov=n.fov,r.instance.position.copy(n.position),r.instance.updateProjectionMatrix())});class l{constructor(v){s(this,"url");this.url=v}}const d=E(new Set),u=()=>{const r=_.value;h.renderer.coreRenderer.render();const v=r.toDataURL("image/png"),o=new l(v);d.add(o)},w=async r=>{d.delete(r)},_=S(),f=S();let h;return D(async()=>{const r=_.value,v=f.value;h=new Be(r,v),t(y[0]),h.render()}),H(()=>{h==null||h.destroy(),c()}),(r,v)=>(g(),m("div",$({class:"container"},r.$attrs),[a("section",qe,[(g(!0),m(P,null,M(W(y),o=>(g(),m("div",Je,[a("div",Ke,[a("h1",Qe,"Pattern "+z(o.number),1),o.previewUrl?(g(),m("img",{key:0,class:"preview",width:"100",height:"100",src:o.previewUrl},null,8,Xe)):b("v-if",!0)]),o.vertex?(g(),m("div",Ye,[U(a("textarea",{rows:"5","onUpdate:modelValue":p=>o.vertex=p},null,8,Ze),[[L,o.vertex]])])):b("v-if",!0),o.fragment?(g(),m("div",et,[U(a("textarea",{rows:"30","onUpdate:modelValue":p=>o.fragment=p},null,8,tt),[[L,o.fragment]])])):b("v-if",!0),a("div",{class:"updatecode",onClick:p=>t(o)},"Use This Shader",8,st)]))),256))]),a("div",nt,[a("div",it,[a("section",{class:"view",ref_key:"viewArea",ref:f},[rt,a("canvas",{class:"",ref_key:"canvas",ref:_},null,512)],512)]),a("div",at,[a("ul",ot,[a("li",null,[a("button",{onClick:v[0]||(v[0]=()=>e.value=!e.value)},z(e.value?"\u81EA\u7531\u89C6\u89D2":"\u6B63\u9762\u67E5\u770B"),1)]),a("li",null,[a("button",{onClick:u},"\u622A\u56FE")])]),a("ul",ct,[(g(!0),m(P,null,M(d,o=>(g(),m("li",null,[a("span",{class:"delete",onClick:p=>w(o)},null,8,lt),a("img",{width:"100",height:"100",src:o.url},null,8,dt)]))),256))])])])],16))}});var vt=A(ht,[["__scopeId","data-v-493f0785"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-shader-patterns/l00-ShaderPatterns.vue"]]);const ut=R({name:"index",setup(i){return(t,e)=>(g(),G(vt))}});var wt=A(ut,[["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/test-shader-patterns/index.vue"]]);export{wt as default};
