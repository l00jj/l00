var y=Object.defineProperty;var C=(a,n,t)=>n in a?y(a,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[n]=t;var e=(a,n,t)=>(C(a,typeof n!="symbol"?n+"":n,t),t);import{M as z,d as P,h as g,l as S,i as W,o as E,b as _,e as f}from"./vendor-612724a7.js";import{D as M,G as B,P as b,I as L,V as F,h as q,M as T,H as I,q as k,j as p,a as H,O as G,g as R,S as O,W as D}from"./OrbitControls-f9727bec.js";import{S as A}from"./SVGLoader-75ba3533.js";import{E as x}from"./EventEmitter-05980808.js";import{_ as j}from"./plugin-vue_export-helper-4223c0cf.js";var N=`uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

varying float vElevation;

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Elevation
  float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * 
                    sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) * 
                    uBigWavesElevation;

  for(float i = 1.0; i <=uSmallWavesIterations; i++)
  {
    elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
  }
  
  modelPosition.y += elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // Varying
  vElevation = elevation;
}

     `,U=`uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main()
{
  float minStrength = (vElevation + uColorOffset) * uColorMultiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, minStrength);
   
  gl_FragColor = vec4(color,1.0);
}`;class V{constructor(){e(this,"camera",new H);e(this,"orbitControl");this.camera.fov=75}init(){}setOrbitControl(n){const t=new G(this.camera,n);t.enableDamping=!0,this.orbitControl=t}}class Z{constructor(){e(this,"axesHelper",new R(1));e(this,"scene",new O);e(this,"setAxesHelper",(n=!0)=>{(typeof n=="boolean"?n:!1)?this.scene.add(this.axesHelper):this.scene.remove(this.axesHelper)})}}class X{constructor(n){e(this,"renderer");this.renderer=new D({canvas:n.canvasEl,alpha:!1}),n.on("unmounted",()=>this.renderer.dispose())}init(){}}class Y{constructor(n,t){e(this,"view");e(this,"guiwraperEl");e(this,"gui",new z({closed:!1}));this.view=n,this.guiwraperEl=t||this.view.viewraperEl,this.fixGui();const o=()=>{this.gui.destroy()};this.view.on("unmounted",o);const i=()=>{this.setParameterController()};console.warn("\u505Aonce"),this.view.worldController.on("inited",i),this.setParameterController().catch(r=>console.error(r))}fixGui(){const n=this.gui.domElement.parentElement;this.guiwraperEl.appendChild(n)}async setParameterController(){const{waterMaterialController:n,testLight:t,cameraController:o,animationController:i}=this.view.worldController,{material:r,parameter:s}=n;this.gui.add(r.uniforms.uBigWavesElevation,"value").min(0).max(1).step(.001).name("uBigWavesElevation"),this.gui.add(r.uniforms.uBigWavesFrequency.value,"x").min(0).max(10).step(.001).name("uBigWavesFrequencyX"),this.gui.add(r.uniforms.uBigWavesFrequency.value,"y").min(0).max(10).step(.001).name("uBigWavesFrequencyY"),this.gui.add(r.uniforms.uBigWavesSpeed,"value").min(0).max(4).step(.001).name("uBigWavesSpeed"),this.gui.add(r.uniforms.uBigWavesSpeed,"value").min(0).max(4).step(.001).name("uBigWavesSpeed"),this.gui.add(r.uniforms.uSmallWavesElevation,"value").min(0).max(1).step(.001).name("uSmallWavesElevation"),this.gui.add(r.uniforms.uSmallWavesFrequency,"value").min(0).max(30).step(.001).name("uSmallWavesFrequency"),this.gui.add(r.uniforms.uSmallWavesSpeed,"value").min(0).max(4).step(.001).name("uSmallWavesSpeed"),this.gui.add(r.uniforms.uSmallWavesIterations,"value").min(0).max(8).step(1).name("uSmallWavesIterations"),this.gui.addColor(s,"depthColor").name("depthColor").onChange(()=>{r.uniforms.uDepthColor.value.set(s.depthColor)}),this.gui.addColor(s,"surfaceColor").name("surfaceColor").onChange(()=>{r.uniforms.uSurfaceColor.value.set(s.surfaceColor)}),this.gui.add(r.uniforms.uColorOffset,"value").min(0).max(1).step(.001).name("uColorOffset"),this.gui.add(r.uniforms.uColorMultiplier,"value").min(0).max(10).step(.001).name("uColorMultiplier")}}class ${constructor(n){e(this,"clock");e(this,"worldController");e(this,"isStop",!1);e(this,"privateTime",0);e(this,"isScroll",!0);e(this,"scrollProgress",0);e(this,"onScroll",()=>{const n=document.documentElement.scrollTop||document.body.scrollTop,t=document.documentElement.clientHeight,o=document.documentElement.offsetHeight,i=n/(o-t);this.scrollProgress=i});this.worldController=n,this.clock=n.clock}update(){if(this.isStop)return;const n=this.clock.getElapsedTime(),t=n-this.privateTime;this.privateTime=n;const o=[-100,75],i=[0,80],r=this.worldController.testLight;let m=r.position.z+t*30;m=m+(m>o[1]?o[0]-o[1]:0),r.position.z=m;const v=(m-o[0])/(o[1]-o[0]),d=.7,h=.58;if(v>d){const l=i[0]+(i[1]-i[0])*(1-(v-d)/(1-d));r.intensity=l}else if(v<h){const l=i[0]+(i[1]-i[0])*(v/(1-h));r.intensity=l}else v<.7&&(r.intensity=i[0]);if(this.isScroll){const l=[-192,37],w=l[0]+(l[1]-l[0])*this.scrollProgress;this.worldController.cameraController.camera.position.z=w}}}class J extends x{constructor(t){super();e(this,"view");e(this,"clock",new L);e(this,"cameraController",new V);e(this,"sceneController",new Z);e(this,"animationController",new $(this));e(this,"renderManager");e(this,"testLight");e(this,"waterMaterialController",new K);this.view=t,this.renderManager=new X(t),this.view.on("mounted",()=>this.mounted()),this.view.on("unmounted",()=>this.unmounted())}async init(){this.sceneController.setAxesHelper(!1),this.cameraController.init(),this.cameraController.setOrbitControl(this.view.canvasEl),this.sceneController.scene.add(this.cameraController.camera),this.cameraController.camera.position.add(new F(1,2,3)),this.cameraController.camera.lookAt(0,0,0),this.renderManager.init();const t=new q(5,5,512,512),o=new T(t,this.waterMaterialController.material);o.rotation.x=-Math.PI*.5,this.sceneController.scene.add(o),this.emit("inited")}resize(t,o){this.cameraController.camera.aspect=t/o,this.cameraController.camera.updateProjectionMatrix(),this.renderManager.renderer.setSize(t,o),this.renderManager.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}render(){var o;const t=this.clock.getElapsedTime();this.waterMaterialController.update(t),(o=this.cameraController.orbitControl)==null||o.update(),this.renderManager.renderer.render(this.sceneController.scene,this.cameraController.camera)}mounted(){this.emit("mounted")}unmounted(){this.emit("unmounted")}}const u=class extends x{constructor(t,o){super();e(this,"canvasEl");e(this,"viewraperEl");e(this,"size",new u.Size);e(this,"worldController");e(this,"guiController");e(this,"resize",()=>{this.size.width/this.size.height>1;const t=this.viewraperEl?this.viewraperEl.offsetWidth:0,o=this.viewraperEl?this.viewraperEl.offsetHeight:0;this.size.width=t,this.size.height=o,this.worldController.resize(t,o)});e(this,"isRender",!0);e(this,"render",()=>{this.isRender&&(this.worldController.render(),window.requestAnimationFrame(this.render))});this.canvasEl=t,this.viewraperEl=o,this.size.width=this.viewraperEl.offsetWidth,this.size.height=this.viewraperEl.offsetHeight;const i=new b("/assets/draco/").url;u.dracoLoader.setDecoderPath(i),u.gltfLoader.setDRACOLoader(u.dracoLoader),this.worldController=new J(this),console.log(window),window.testss=this}init(){this.worldController.init(),this.resize()}addGuiController(t){this.guiController=new Y(this,t)}mounted(){window.addEventListener("resize",this.resize),this.emit("mounted")}unmounted(){this.isRender=!1,window.removeEventListener("resize",this.resize),this.emit("unmounted")}};let c=u;e(c,"dracoLoader",new M),e(c,"gltfLoader",new B),e(c,"svgLoader",new A),e(c,"Size",class{constructor(){e(this,"width",1920);e(this,"height",1080)}});class K{constructor(){e(this,"parameter",{depthColor:"#186691",surfaceColor:"#9bd8ff"});e(this,"material");this.material=new I({wireframe:!1,vertexShader:N,fragmentShader:U,uniforms:{uTime:{value:0},uBigWavesElevation:{value:.2},uBigWavesFrequency:{value:new k(4,1.5)},uBigWavesSpeed:{value:.75},uSmallWavesElevation:{value:.15},uSmallWavesFrequency:{value:3},uSmallWavesSpeed:{value:.2},uSmallWavesIterations:{value:4},uDepthColor:{value:new p(this.parameter.depthColor)},uSurfaceColor:{value:new p(this.parameter.surfaceColor)},uColorOffset:{value:.08},uColorMultiplier:{value:5}}})}update(n){this.material.uniforms.uTime.value=n}}const Q=P({name:"index",setup(a){const n=g(),t=g(),o=g();let i;return S(()=>{i==null||i.unmounted()}),W(()=>{const r=n.value,s=o.value;i=new c(r,s),i.init(),i.addGuiController(t.value),i.mounted(),i.render()}),(r,s)=>(E(),_("div",{class:"viewraper",ref_key:"viewraper",ref:o},[f("canvas",{ref_key:"canvas",ref:n},null,512),f("div",{guiwrap:"",ref_key:"guiwrap",ref:t},null,512)],512))}});var se=j(Q,[["__scopeId","data-v-e3ecccb6"],["__file","/Volumes/Work/l00 Studio/l00/source/src/graphics-components/ragingsea/index.vue"]]);export{se as default};
