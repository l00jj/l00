var te=Object.defineProperty;var ie=(D,e,t)=>e in D?te(D,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):D[e]=t;var r=(D,e,t)=>(ie(D,typeof e!="symbol"?e+"":e,t),t);import{d as W,h as re,i as oe,l as ae,o as q,b as K,s as H,w as ne}from"./vendor-cabe9347.js";import{P as se}from"./Preview-fffd81b3.js";import{_ as ue}from"./preload-helper-33ac5944.js";import{E as ce}from"./EventEmitter-80978bd8.js";import{S as le}from"./Stats-c12fee77.js";import{D as me}from"./DatGui-ba968fee.js";import{_ as $}from"./plugin-vue_export-helper-4223c0cf.js";const y=class{constructor(e,t={fit:y.Fit_Contain}){r(this,"main");r(this,"width",0);r(this,"height",0);r(this,"viewWidth",0);r(this,"viewHeight",0);r(this,"pixelRatio",1);r(this,"fit",y.Fit_None);this.main=e,this.update({fit:t!=null&&t.fit?t.fit:y.Fit_None}),y.resizeObserve(this)}static resizeObserve(e){const t=e.main;if(window.ResizeObserver){const i=new ResizeObserver(a=>e.update());i.observe(t.viewContainerDom),t.onDestroyed(()=>i.disconnect())}else{const i=()=>e.update();window.addEventListener("resize",i),t.onDestroyed(()=>window.removeEventListener("resize",i))}}update(e={}){const{viewContainerDom:t,canvasDom:i}=this.main;let{viewWidth:a,viewHeight:o,pixelRatio:n,fit:s}=e;if(!t||!i)return;this.pixelRatio=n||Math.min(Math.max(1,window.devicePixelRatio),2),s&&s!==this.fit&&y.fitMap.hasOwnProperty(s)&&(this.fit=s),this.fit===y.Fit_None?(a=a||this.viewWidth,o=o||this.viewHeight):(a=t.offsetWidth,o=t.offsetHeight),this.viewWidth=a,this.viewHeight=o;const u=a*this.pixelRatio,c=o*this.pixelRatio;this.width=u,this.height=c,i.width=u,i.height=c,this.fit===y.Fit_None?(i.style.position="absolute",i.style.width=this.viewWidth+"px",i.style.height=this.viewHeight+"px"):u&&c&&(i.style.position="relative",i.style.width="100%",i.style.height="100%"),i.style.objectFit=y.fitMap[this.fit],this.main.emit(F.Event_Resize)}onResize(e){return this.main.on(F.Event_Resize,e)}};let A=y;r(A,"Fit_Contain",Symbol()),r(A,"Fit_Cover",Symbol()),r(A,"Fit_Fill",Symbol()),r(A,"Fit_None",Symbol()),r(A,"fitMap",{[y.Fit_Contain]:"contain",[y.Fit_Cover]:"cover",[y.Fit_Fill]:"fill",[y.Fit_None]:"none"});const O=class{constructor(e){r(this,"main");r(this,"start",Date.now());r(this,"time",0);r(this,"elapsed",0);r(this,"delta",16);r(this,"loopID");r(this,"requestAnimationFrameID",0);r(this,"isTicking",!1);this.main=e,O.testSupportedPerformance(),this.update()}static testSupportedPerformance(){(!window.performance||!window.performance.now||typeof window.performance.now()!="number")&&(alert("Not Supported Performance Time"),window.performance=window.Date)}update(){const e=performance.now();this.delta=e-this.time,this.time=e,this.elapsed+=this.delta}tick(){var i;if(this.isTicking)return;this.isTicking=!0;const e=Symbol();this.loopID=e;const t=(i=this.main.stats)!=null&&i.isShow?()=>{var a,o;(a=this.main.stats)==null||a.begin(),this.update(),this.main.emit(F.Event_Tick),e===this.loopID&&(this.requestAnimationFrameID=window.requestAnimationFrame(t)),(o=this.main.stats)==null||o.end()}:()=>{this.update(),this.main.emit(F.Event_Tick),e===this.loopID&&(this.requestAnimationFrameID=window.requestAnimationFrame(t))};this.update(),this.delta>O.Standard_Delta&&(this.time=performance.now()-O.Standard_Delta),t()}paused(){this.isTicking&&(window.cancelAnimationFrame(this.requestAnimationFrameID),this.loopID=void 0,this.isTicking=!1)}retick(){this.paused(),this.tick()}onTick(e){return this.main.on(F.Event_Tick,e)}};let N=O;r(N,"Standard_Delta",1e3/60);const b=class{constructor(e){r(this,"main");r(this,"onMouseEvent",e=>{this.main.emit(b.Interact_Book[e.type],e.offsetX,e.offsetY,-1)});r(this,"onTouchEvent",e=>{e.preventDefault();const t=e.targetTouches,i=this.main,a=i.canvasDom.getBoundingClientRect(),o=b.Interact_Book[e.type];for(let n=0;n<t.length;n++){const s=t[n];i.emit(o,s.pageX-a.x,s.pageY-a.y,s.identifier)}});this.main=e,this.deploy(),e.onDestroyed(()=>this.destroyed)}deploy(){const e=this.main.canvasDom;e.addEventListener("mousedown",this.onMouseEvent),e.addEventListener("mousemove",this.onMouseEvent),e.addEventListener("mouseup",this.onMouseEvent),e.addEventListener("touchstart",this.onTouchEvent),e.addEventListener("touchmove",this.onTouchEvent),e.addEventListener("touchend",this.onTouchEvent)}destroyed(){const e=this.main.canvasDom;e.removeEventListener("mousedown",this.onMouseEvent),e.removeEventListener("mousemove",this.onMouseEvent),e.removeEventListener("mouseup",this.onMouseEvent),e.removeEventListener("touchstart",this.onTouchEvent),e.removeEventListener("touchmove",this.onTouchEvent),e.removeEventListener("touchend",this.onTouchEvent)}};let U=b;r(U,"Interact_Start",Symbol()),r(U,"Interact_Move",Symbol()),r(U,"Interact_End",Symbol()),r(U,"Interact_Book",{mousedown:b.Interact_Start,mousemove:b.Interact_Move,mouseup:b.Interact_End,touchstart:b.Interact_Start,touchmove:b.Interact_Move,touchend:b.Interact_End});const M=class extends ce{constructor(t){super();r(this,"time");r(this,"sizes");r(this,"controls");r(this,"viewContainerDom");r(this,"renderer");r(this,"canvasDom",window.document.createElement("canvas"));r(this,"stats");r(this,"guiHelper");this.viewContainerDom=t,this.viewContainerDom.appendChild(this.canvasDom),this.stats=new le(this.viewContainerDom),this.stats.show(),this.guiHelper=new me(this.viewContainerDom),this.guiHelper.show(),this.time=new N(this),this.sizes=new A(this,{fit:A.Fit_Contain}),this.controls=new U(this),this.renderer=new fe(this)}render(){this.time.tick()}paused(){this.time.paused()}onDestroyed(t){return this.once(M.Event_Destroyed,t)}destroy(){this.time.paused(),this.emit(M.Event_Destroyed)}};let F=M;r(F,"Event_Tick",Symbol()),r(F,"Event_Resize",Symbol()),r(F,"Event_Destroyed",Symbol());class fe{constructor(e){r(this,"core");this.core=new L(e)}}const V=class{constructor(e){r(this,"main");r(this,"gl");r(this,"app");this.main=e;const t=V.getWebGLContext(e.canvasDom);this.gl=t,this.app=new de(e,t),this.app.init(),this.main.render()}static getWebGLContext(e){const t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",t);return!!i||(i=e.getContext("webgl",t)||e.getContext("experimental-webgl",t)),i}};let L=V;r(L,"Event_Ready",Symbol()),r(L,"Event_ParticlesNumber_Changed",Symbol());const z=class{constructor(e,t,i,a){r(this,"gl");r(this,"type");r(this,"source");r(this,"shader",null);r(this,"isNeedUpdate",!0);r(this,"keywords",new z.Keywords(this));this.gl=e,this.type=t,this.source=i,a&&Array.isArray(a)&&a.forEach(o=>this.keywords.add(o)),z.prototype.update.apply(this)}update(){const{gl:e,type:t}=this;let i=this.source;this.keywords.size&&(i=[...this.keywords].reduce((n,[s,u])=>n+=`#define ${u}
`,"")+i);const a=e.createShader(t);return e.shaderSource(a,i),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?(this.shader=a,this.isNeedUpdate=!1,!0):(console.error(e.getShaderInfoLog(a)),!1)}};let C=z;r(C,"Keywords",class extends Map{constructor(i){super();r(this,"shader");this.shader=i}set(i){return typeof i=="string"&&(i=[i]),Array.isArray(i)&&i.length&&i.forEach(a=>this.add(a)),this.shader.isNeedUpdate=!0,this}add(i){if(i&&typeof i=="string"&&/\w+/.test(i)){const a=i.toString().split(" ")[0];return super.set(a,i),this.shader.isNeedUpdate=!0}return!1}delete(i){if(i&&typeof i=="string"&&/\w+/.test(i)){const a=i.toString().split(" ")[0];if(super.delete(a))return this.shader.isNeedUpdate=!0}return!1}toggle(i){if(i){const a=i.toString().split(" ")[0];return super.has(a)?this.delete(a):this.add(i)}return!1}});class k extends C{constructor(e,t,i){super(e,e.VERTEX_SHADER,t,i)}}class E extends C{constructor(e,t,i){super(e,e.FRAGMENT_SHADER,t,i)}}class g{constructor(e,t,i){r(this,"gl");r(this,"vertexShader");r(this,"fragmentShader");r(this,"uniforms",{});r(this,"program",{});this.gl=e,this.vertexShader=t,this.fragmentShader=i,g.prototype.update.apply(this)}update(){const{gl:e,vertexShader:t,fragmentShader:i}=this;t.isNeedUpdate&&t.update(),i.isNeedUpdate&&i.update(),this.program=g.createProgram(e,t,i),this.uniforms=g.getUniforms(e,this.program)}static createProgram(e,t,i){let a=e.createProgram();return t.shader&&e.attachShader(a,t.shader),i.shader&&e.attachShader(a,i.shader),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)||console.error(e.getProgramInfoLog(a)),a}static getUniforms(e,t){const i={},a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<a;o++){let n=e.getActiveUniform(t,o).name;i[n]=e.getUniformLocation(t,n)}return i}activate(){this.gl.useProgram(this.program)}}class ve extends g{constructor(t,i,a){super(t,i,a);r(this,"programs",{})}}class _{constructor(e,t,i,a,o,n,s){r(this,"gl");r(this,"texture");r(this,"internalFormat");r(this,"format");r(this,"type");r(this,"param");r(this,"fbo");r(this,"width");r(this,"height");r(this,"texelSizeX");r(this,"texelSizeY");this.gl=e,e.activeTexture(e.TEXTURE0);const u=e.createTexture();e.bindTexture(e.TEXTURE_2D,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,a,t,i,0,o,n,null);const c=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0),e.viewport(0,0,t,i),e.clear(e.COLOR_BUFFER_BIT);const m=1/t,l=1/i;this.texture=u,this.internalFormat=a,this.format=o,this.type=n,this.param=s,this.fbo=c,this.width=t,this.height=i,this.texelSizeX=m,this.texelSizeY=l}attach(e){const t=this.gl;return t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,this.texture),e}}class G{constructor(e,t,i,a,o,n,s){r(this,"gl");r(this,"fbo1");r(this,"fbo2");r(this,"width");r(this,"height");r(this,"texelSizeX");r(this,"texelSizeY");this.gl=e;const u=new _(e,t,i,a,o,n,s),c=new _(e,t,i,a,o,n,s);this.fbo1=u,this.fbo2=c,this.width=t,this.height=i,this.texelSizeX=u.texelSizeX,this.texelSizeY=u.texelSizeY}get read(){return this.fbo1}set read(e){this.fbo1=e}get write(){return this.fbo2}set write(e){this.fbo2=e}swap(){let e=this.fbo1;this.fbo1=this.fbo2,this.fbo2=e}}class X{constructor(e){r(this,"r",0);r(this,"g",0);r(this,"b",0);this.setColor(e)}setColor(e){Array.isArray(e)&&(this.r=e[0]?e[0]/255:0/255,this.g=e[1]?e[1]/255:0/255,this.b=e[2]?e[2]/255:0/255)}random(){const e=Y.HSVtoRGB(Math.random(),1,1);return this.r=e.r*.15,this.g=e.g*.15,this.b=e.b*.15,this}}class Y{static isWebGL2(e){return!!e.VERSION}static normalizeColor(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}static HSVtoRGB(e,t,i){let a,o,n,s,u,c,m,l;switch(s=Math.floor(e*6),u=e*6-s,c=i*(1-t),m=i*(1-u*t),l=i*(1-(1-u)*t),s%6){case 0:a=i,o=l,n=c;break;case 1:a=m,o=i,n=c;break;case 2:a=c,o=i,n=l;break;case 3:a=c,o=m,n=i;break;case 4:a=l,o=c,n=i;break;case 5:a=i,o=c,n=m;break}return{r:a,g:o,b:n}}hashCode(e){if(e.length==0)return 0;let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return t}static random(e,t,i){if(typeof t!="number"||e===t)return 0;if(typeof t!="number"&&(t=e,e=0),typeof i!="number"&&(i=1),e>t){const n=e;e=t,t=n}let a=1;for(;!Number.isInteger(e)||!Number.isInteger(t)||!Number.isInteger(i);)e*=10,t*=10,i*=10,a*=10;const o=Math.random()*(t-e+1)+e;return i===0?o/a:Math.floor(o/i)*i/a}}class he{constructor(e){r(this,"formatRGBA",{});r(this,"formatRG",{});r(this,"formatR",{});r(this,"halfFloatTexType");r(this,"supportLinearFiltering");const t=Y.isWebGL2(e);let i,a;t?(e.getExtension("EXT_color_buffer_float"),a=e.getExtension("OES_texture_float_linear")):(i=e.getExtension("OES_texture_half_float"),a=e.getExtension("OES_texture_half_float_linear"));const o=t?e.HALF_FLOAT:i.HALF_FLOAT_OES;o===null&&alert("Not Supported halfFloatTexType");let n,s,u;t?(n=c(e.RGBA16F,e.RGBA,o),s=c(e.RG16F,e.RG,o),u=c(e.R16F,e.RED,o)):(n=c(e.RGBA,e.RGBA,o),s=c(e.RGBA,e.RGBA,o),u=c(e.RGBA,e.RGBA,o)),(n===null||s===null||u===null)&&alert("Not Supported halfFloatTexType");function c(l,x,T){if(!m(l,x,T))switch(l){case e.R16F:return c(e.RG16F,e.RG,T);case e.RG16F:return c(e.RGBA16F,e.RGBA,T);default:return null}return{internalFormat:l,format:x}}function m(l,x,T){let v=e.createTexture();e.bindTexture(e.TEXTURE_2D,v),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,l,4,4,0,x,T,null);let p=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,p),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}this.formatRGBA=n,this.formatRG=s,this.formatR=u,this.halfFloatTexType=o,this.supportLinearFiltering=a}}class de{constructor(e,t){r(this,"main");r(this,"time");r(this,"sizes");r(this,"gl");r(this,"glExt");r(this,"config",{SIM_RESOLUTION:128,DYE_RESOLUTION:1024,NORMAL_RESOLUTION:512,CAPTURE_RESOLUTION:512,STEP_SPEED:1,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SMOKE:!1,COLORFUL:!0,COLOR_UPDATE_TIME:.3,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,DRAW_CHECKERBOARD:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1,SHADING:!0,SHADING_WIDTH:1});r(this,"isNeedInit",!0);r(this,"backColor",new X(this.config.BACK_COLOR));r(this,"dye");r(this,"velocity");r(this,"curl");r(this,"divergence");r(this,"pressure");r(this,"bloom");r(this,"bloomFramebuffers",[]);r(this,"sunrays");r(this,"sunraysTemp");r(this,"normalMapProgram");r(this,"refractionProgram");r(this,"testProgram");r(this,"copyProgram");r(this,"overProgram");r(this,"colorProgram");r(this,"splatProgram");r(this,"advectionProgram");r(this,"advectionDyeProgram");r(this,"curlProgram");r(this,"vorticityProgram");r(this,"divergenceProgram");r(this,"pressureProgram");r(this,"gradienSubtractProgram");r(this,"checkerboardProgram");r(this,"bloomPrefilterProgram");r(this,"bloomBlurProgram");r(this,"bloomFinalProgram");r(this,"blurProgram");r(this,"sunraysMaskProgram");r(this,"sunraysProgram");r(this,"displayMaterial");r(this,"init",()=>{this.gl.clearColor(0,0,0,1),this.initFramebuffers(),this.initDisplayElements(),this.interacts.init(),this.helper.init(),this.interacts.multipleSplats(1),setTimeout(()=>{ue(()=>import("./test2-002c6ac9.js"),[]).then(e=>{const t=e.default,{gl:i,glExt:a,config:o,createResolution:n}=this,s=n(o.NORMAL_RESOLUTION),u=a.halfFloatTexType,c=a.formatRGBA,m=a.supportLinearFiltering?i.LINEAR:i.NEAREST;this.normalMap=new _(i,s.width,s.height,c.internalFormat,c.format,u,m);const l=new Image;l.src=t,l.onload=()=>{console.log(l);const x=i.createTexture();i.bindTexture(i.TEXTURE_2D,x),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,m),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,m),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,l.naturalWidth,l.naturalHeight,0,i.RGBA,i.UNSIGNED_BYTE,l),this.copyProgram.activate(),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,x),this.calcTo(this.dye.write),this.createNormalMap(this.dye.write,this.normalMap),this.checkerboardProgram.activate(),i.uniform1f(this.checkerboardProgram.uniforms.aspectRatio,this.sizes.width/this.sizes.height),this.calcTo(this.dye.write),this.refractionProgram.activate(),i.uniform1i(this.refractionProgram.uniforms.uNormalMap,this.normalMap.attach(0)),i.uniform1i(this.refractionProgram.uniforms.tDiffuse,this.dye.write.attach(1)),this.calcTo(null)}})},1e3)});r(this,"normalMap");r(this,"createNormalMap",(e,t)=>{const{gl:i,glExt:a,config:o,calcTo:n,normalMapProgram:s}=this;s.activate(),i.uniform1i(s.uniforms.uTexture,e.attach(0)),i.uniform2f(s.uniforms.texelSize,1/e.width,1/e.height),n(t)});r(this,"initFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this,o=a(i.SIM_RESOLUTION),n=a(i.DYE_RESOLUTION),s=t.halfFloatTexType,u=t.formatRGBA,c=t.formatRG,m=t.formatR,l=t.supportLinearFiltering?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDoubleFBO(this.dye,n.width,n.height,u.internalFormat,u.format,s,l):new G(e,n.width,n.height,u.internalFormat,u.format,s,l),this.velocity=this.velocity?this.resizeDoubleFBO(this.velocity,o.width,o.height,c.internalFormat,c.format,s,l):new G(e,o.width,o.height,c.internalFormat,c.format,s,l),this.divergence=new _(e,o.width,o.height,m.internalFormat,m.format,s,e.NEAREST),this.curl=new _(e,o.width,o.height,m.internalFormat,m.format,s,e.NEAREST),this.pressure=new G(e,o.width,o.height,m.internalFormat,m.format,s,e.NEAREST),this.initBloomFramebuffers(),this.initSunraysFramebuffers(),this.isNeedInit=!1});r(this,"initBloomFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this,o=i.BLOOM_ITERATIONS,n=2**o,s=a(n),u=t.halfFloatTexType,c=t.formatRGBA,m=t.supportLinearFiltering?e.LINEAR:e.NEAREST;this.bloom=new _(e,s.width,s.height,c.internalFormat,c.format,u,m),this.bloomFramebuffers.length=0;for(let l=1;l<=o;l++){const x=s.width>>l,T=s.height>>l;if(x<2||T<2)break;const v=new _(e,x,T,c.internalFormat,c.format,u,m);this.bloomFramebuffers.push(v)}});r(this,"initSunraysFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this;let o=a(i.SUNRAYS_RESOLUTION);const n=t.halfFloatTexType,s=t.formatR,u=t.supportLinearFiltering?e.LINEAR:e.NEAREST;this.sunrays=new _(e,o.width,o.height,s.internalFormat,s.format,n,u),this.sunraysTemp=new _(e,o.width,o.height,s.internalFormat,s.format,n,u)});r(this,"resizeFBO",(e,t,i,a,o,n,s)=>{const{gl:u,copyProgram:c,calcTo:m}=this;let l=new _(u,t,i,a,o,n,s);return u.useProgram(c.program),u.uniform1i(c.uniforms.uTexture,e.attach(0)),m(l),l});r(this,"resizeDoubleFBO",(e,t,i,a,o,n,s)=>{if(e.width==t&&e.height==i)return e;const{gl:u,resizeFBO:c}=this;return e.read=c(e.read,t,i,a,o,n,s),e.write=new _(u,t,i,a,o,n,s),e.width=t,e.height=i,e.texelSizeX=1/t,e.texelSizeY=1/i,e});r(this,"initDisplayElements",()=>{const e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0)});r(this,"calcTo",(e,t=!1)=>{const i=this.gl;e==null?(i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindFramebuffer(i.FRAMEBUFFER,null)):(i.viewport(0,0,e.width,e.height),i.bindFramebuffer(i.FRAMEBUFFER,e.fbo)),t&&(i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT)),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0)});r(this,"update",()=>{const{time:e,config:t,isNeedInit:i,initFramebuffers:a,step:o,interacts:n,render:s}=this;i&&a(),n.update(),t.PAUSED||o(e.delta),s(null)});r(this,"step",e=>{const{gl:t,glExt:i,config:a,dye:o,velocity:n,curl:s,divergence:u,pressure:c,curlProgram:m,vorticityProgram:l,divergenceProgram:x,overProgram:T,pressureProgram:v,gradienSubtractProgram:p,advectionProgram:f,advectionDyeProgram:d,calcTo:S}=this;e*=.001*a.STEP_SPEED,t.disable(t.BLEND),m.activate(),t.uniform2f(m.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(m.uniforms.uVelocity,n.read.attach(0)),S(s),l.activate(),t.uniform2f(l.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(l.uniforms.uVelocity,n.read.attach(0)),t.uniform1i(l.uniforms.uCurl,s.attach(1)),t.uniform1f(l.uniforms.curl,a.CURL),t.uniform1f(l.uniforms.delta,e),S(n.write),n.swap(),x.activate(),t.uniform2f(x.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(x.uniforms.uVelocity,n.read.attach(0)),S(u),T.activate(),t.uniform1i(T.uniforms.uTexture,c.read.attach(0)),t.uniform1f(T.uniforms.value,a.PRESSURE),S(c.write),c.swap(),v.activate(),t.uniform2f(v.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(v.uniforms.uDivergence,u.attach(0));for(let w=0;w<a.PRESSURE_ITERATIONS;w++)t.uniform1i(v.uniforms.uPressure,c.read.attach(1)),S(c.write),c.swap();p.activate(),t.uniform2f(p.uniforms.texelSize,n.texelSizeX,n.texelSizeY),t.uniform1i(p.uniforms.uPressure,c.read.attach(0)),t.uniform1i(p.uniforms.uVelocity,n.read.attach(1)),S(n.write),n.swap(),f.activate(),t.uniform2f(f.uniforms.texelSize,n.texelSizeX,n.texelSizeY),i.supportLinearFiltering||t.uniform2f(f.uniforms.dyeTexelSize,n.texelSizeX,n.texelSizeY);const R=n.read.attach(0);t.uniform1i(f.uniforms.uVelocity,R),t.uniform1i(f.uniforms.uSource,R),t.uniform1f(f.uniforms.delta,e),t.uniform1f(f.uniforms.dissipation,a.VELOCITY_DISSIPATION),S(n.write),n.swap(),d.activate(),t.uniform2f(d.uniforms.texelSize,n.texelSizeX,n.texelSizeY),i.supportLinearFiltering||t.uniform2f(d.uniforms.dyeTexelSize,o.texelSizeX,o.texelSizeY),t.uniform1i(d.uniforms.uVelocity,n.read.attach(0)),t.uniform1i(d.uniforms.uSource,o.read.attach(1)),t.uniform1f(d.uniforms.delta,e),t.uniform1f(d.uniforms.dissipation,a.DENSITY_DISSIPATION),S(o.write),o.swap()});r(this,"render",e=>{const{gl:t,config:i,dye:a,backColor:o,drawColor:n,drawCheckerboard:s,drawDisplay:u}=this;i.BLOOM&&this.applyBloom(a.read,this.bloom),i.SUNRAYS&&(this.applySunrays(a.read,a.write,this.sunrays),this.blur(this.sunrays,this.sunraysTemp,1)),e==null||!i.TRANSPARENT?(t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND)):t.disable(t.BLEND),i.TRANSPARENT||n(e,o),e==null&&i.DRAW_CHECKERBOARD&&i.TRANSPARENT&&s(e),u(e)});r(this,"drawColor",(e,t)=>{const{gl:i,colorProgram:a,calcTo:o}=this;a.activate(),i.uniform4f(a.uniforms.color,t.r,t.g,t.b,1),o(e)});r(this,"drawCheckerboard",e=>{const{sizes:t,gl:i,checkerboardProgram:a,calcTo:o}=this;a.activate(),i.uniform1f(a.uniforms.aspectRatio,t.width/t.height),o(e)});r(this,"drawDisplay",e=>{const{gl:t,config:i,dye:a,bloom:o,sunrays:n,displayMaterial:s,calcTo:u}=this;let c=e==null?t.drawingBufferWidth:e.width,m=e==null?t.drawingBufferHeight:e.height;s.activate(),i.SHADING&&t.uniform2f(s.uniforms.texelSize,i.SHADING_WIDTH/c,i.SHADING_WIDTH/m),t.uniform1i(s.uniforms.uTexture,a.read.attach(0)),i.BLOOM&&t.uniform1i(s.uniforms.uBloom,o.attach(1)),i.SUNRAYS&&t.uniform1i(s.uniforms.uSunrays,n.attach(3)),u(e)});r(this,"applyBloom",(e,t)=>{if(this.bloomFramebuffers.length<2)return;const{gl:i,config:a,bloomFramebuffers:o,calcTo:n,bloomPrefilterProgram:s,bloomBlurProgram:u,bloomFinalProgram:c}=this;let m=t;i.disable(i.BLEND),s.activate();const l=a.BLOOM_THRESHOLD*a.BLOOM_SOFT_KNEE+1e-4,x=a.BLOOM_THRESHOLD-l,T=l*2,v=.25/l;i.uniform3f(s.uniforms.curve,x,T,v),i.uniform1f(s.uniforms.threshold,a.BLOOM_THRESHOLD),i.uniform1i(s.uniforms.uTexture,e.attach(0)),n(m),u.activate();for(let p=0;p<o.length;p++){let f=o[p];i.uniform2f(u.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(u.uniforms.uTexture,m.attach(0)),n(f),m=f}i.blendFunc(i.ONE,i.ONE),i.enable(i.BLEND);for(let p=o.length-2;p>=0;p--){let f=o[p];i.uniform2f(u.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(u.uniforms.uTexture,m.attach(0)),i.viewport(0,0,f.width,f.height),n(f),m=f}i.disable(i.BLEND),c.activate(),i.uniform2f(c.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(c.uniforms.uTexture,m.attach(0)),i.uniform1f(c.uniforms.intensity,a.BLOOM_INTENSITY),n(t)});r(this,"applySunrays",(e,t,i)=>{const{gl:a,config:o,calcTo:n,sunraysMaskProgram:s,sunraysProgram:u}=this;a.disable(a.BLEND),s.activate(),a.uniform1i(s.uniforms.uTexture,e.attach(0)),n(t),u.activate(),a.uniform1f(u.uniforms.weight,o.SUNRAYS_WEIGHT),a.uniform1i(u.uniforms.uMaskTexture,t.attach(0)),n(i)});r(this,"blur",(e,t,i)=>{const{gl:a,config:o,calcTo:n,blurProgram:s}=this;s.activate();for(let u=0;u<i;u++)a.uniform2f(s.uniforms.texelSize,e.texelSizeX,0),a.uniform1i(s.uniforms.uTexture,e.attach(0)),n(t),a.uniform2f(s.uniforms.texelSize,0,e.texelSizeY),a.uniform1i(s.uniforms.uTexture,t.attach(0)),n(e)});r(this,"drawFBO",e=>{const{gl:t,dye:i,testProgram:a,displayMaterial:o,calcTo:n}=this,s=t.drawingBufferWidth,u=t.drawingBufferHeight;this.createResolution(Math.min(s,u)),a.activate(),t.uniform1i(a.uniforms.uTexture,e.attach(0)),n(null)});r(this,"splat",(e,t,i,a,o)=>{const{sizes:n,gl:s,config:u,dye:c,velocity:m,splatProgram:l,calcTo:x,correctRadius:T}=this;l.activate(),s.uniform1i(l.uniforms.uTarget,m.read.attach(0)),s.uniform1f(l.uniforms.aspectRatio,n.width/n.height),s.uniform2f(l.uniforms.point,e,t),s.uniform3f(l.uniforms.color,i,a,0),s.uniform1f(l.uniforms.radius,T(u.SPLAT_RADIUS/100)),x(m.write),m.swap(),s.uniform1i(l.uniforms.uTarget,c.read.attach(0)),s.uniform3f(l.uniforms.color,o.r,o.g,o.b),x(c.write),c.swap()});r(this,"correctRadius",e=>{const{sizes:t}=this;let i=t.width/t.height;return i>1&&(e*=i),e});r(this,"createResolution",e=>{const{gl:t}=this;let i=t.drawingBufferWidth/t.drawingBufferHeight;i<1&&(i=1/i);let a=Math.round(e),o=Math.round(e*i);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:a}:{width:a,height:o}});r(this,"interacts",(()=>{class e{constructor(){r(this,"id",-1);r(this,"texcoordX",0);r(this,"texcoordY",0);r(this,"prevTexcoordX",0);r(this,"prevTexcoordY",0);r(this,"deltaX",0);r(this,"deltaY",0);r(this,"down",!1);r(this,"moved",!1);r(this,"color",new X)}}const t=new Map,i=[],a=()=>{const{main:v}=this;v.on(U.Interact_Start,m),v.on(U.Interact_Move,l),v.on(U.Interact_End,x)},o=()=>{u(this.time.delta);const{splatStack:v,multipleSplats:p}=this.interacts;v.length>0&&p(v.pop()),t.forEach(f=>{f.moved&&(f.moved=!1,n(f))})},n=v=>{const{config:p,splat:f}=this,d=v.deltaX*p.SPLAT_FORCE,S=v.deltaY*p.SPLAT_FORCE;f(v.texcoordX,v.texcoordY,d,S,v.color)};let s=0;const u=v=>{if(!this.config.COLORFUL)return;const p=this.config.COLOR_UPDATE_TIME;s+=v/1e3,s>=p&&(s=s%p,t.forEach(f=>{f.color.random()}))},c=v=>{for(let p=0;p<v;p++){const f=new X;f.random(),f.r*=10,f.g*=10,f.b*=10;const d=Math.random(),S=Math.random(),R=1e3*(Math.random()-.5),w=1e3*(Math.random()-.5);this.splat(d,S,R,w,f)}},m=(v,p,f)=>{const{width:d,height:S,pixelRatio:R}=this.main.sizes,w=R*v,B=R*p;let h=t.get(f);h||(h=new e,t.set(f,h)),h.id=f,h.down=!0,h.moved=!1,h.texcoordX=w/d,h.texcoordY=1-B/S,h.prevTexcoordX=h.texcoordX,h.prevTexcoordY=h.texcoordY,h.deltaX=0,h.deltaY=0,h.color.random()},l=(v,p,f)=>{const{width:d,height:S,pixelRatio:R}=this.main.sizes,w=R*v,B=R*p;let h=t.get(f);if(!h||!h.down)return;const P=d/S;h.prevTexcoordX=h.texcoordX,h.prevTexcoordY=h.texcoordY,h.texcoordX=w/d,h.texcoordY=1-B/S,h.deltaX=h.texcoordX-h.prevTexcoordX,P<1&&(h.deltaX*=P),h.deltaY=h.texcoordY-h.prevTexcoordY,P<1&&(h.deltaY*=P),h.moved=Math.abs(h.deltaX)>0||Math.abs(h.deltaY)>0},x=(v,p,f)=>{let d=t.get(f);!d||(d.down=!1,d.moved=!1,t.delete(d.id))};return{pointers:t,splatStack:i,init:a,update:o,multipleSplats:c,randomSplats:()=>{i.push(Y.random(5,25,1))}}})());r(this,"helper",(()=>({init:()=>{const t=this.main,i=this.main.guiHelper.ui,a=this,{config:o}=this;i.width=300;const n=i.addFolder("App"),s=n.add({is:!1},"is").name("On/Off Render").onFinishChange(d=>d?t.render():t.paused());n.add(o,"PAUSED").name("Paused ");const u=i.addFolder("Config");u.add({val:o.SIM_RESOLUTION},"val",[16,32,64,128,256,512,1024]).name("Simulation Map VMin").onFinishChange(d=>{o.SIM_RESOLUTION=parseInt(d),a.isNeedInit=!0}),u.add({val:o.DYE_RESOLUTION},"val",[16,32,64,128,256,512,1024,2048]).name("Color Map VMin").onFinishChange(d=>{o.DYE_RESOLUTION=parseInt(d),a.isNeedInit=!0}),u.add({val:!1},"val").name("Color Ration Dissipation").onFinishChange(d=>{d?(c.min(.001),c.max(2),c.setValue(.01),a.advectionDyeProgram.fragmentShader.keywords.add("ADVECTION_DYE")):(c.min(0),c.max(4),c.setValue(1),a.advectionDyeProgram.fragmentShader.keywords.delete("ADVECTION_DYE")),a.advectionDyeProgram.update()});const c=u.add(o,"DENSITY_DISSIPATION",0,4,.001).name("Color Dissipation"),m=u.add(o,"VELOCITY_DISSIPATION",0,100).name("Velocity Dissipation"),l=u.add(o,"PRESSURE",0,1).name("Pressure");u.add(o,"CURL",0,50).name("Vorticity").step(1);const x=u.add({val:o.STEP_SPEED},"val",.001,5,.001).name("Time Speed").onFinishChange(d=>o.STEP_SPEED=parseFloat(d));u.add(o,"SPLAT_RADIUS",.01,1).name("splat radius"),u.add(o,"TRANSPARENT").name("Bg Transparent"),u.add(o,"DRAW_CHECKERBOARD").name("Checkerboard"),u.add(a.interacts,"randomSplats").name("Random Splats");const T=i.addFolder("Shading");T.add(o,"SHADING").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("SHADING"),a.displayMaterial.update()}),T.add(o,"SHADING_WIDTH",0,100,1).name("Shading Width"),i.addFolder("Bloom").add(o,"BLOOM").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("BLOOM"),a.displayMaterial.update()});const p=i.addFolder("Sunrays");p.add(o,"SUNRAYS").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("SUNRAYS"),a.displayMaterial.update()}),p.add(o,"SUNRAYS_WEIGHT",.3,1).name("weight"),n.open(),s.setValue(!0),u.open(),i.addFolder("Preset").add({fun:()=>{c.setValue(.1),m.setValue(12),l.setValue(.15),x.setValue(4.5)}},"fun").name("\u8367\u5149\u679C\u51BB")}}))());r(this,"test",()=>{this.sizes.update({viewWidth:128,viewHeight:128,fit:A.Fit_None})});r(this,"untest",()=>{});this.main=e,this.time=e.time,this.sizes=e.sizes,this.gl=t;const i=this.config,a=this.glExt=new he(t),o=new k(t,`
    precision highp float;
  
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
  
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`),n=new E(t,`
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec2 texelSize;
    varying vec2 vUv;

    // \u8BA1\u7B97\u7070\u5EA6
    float GetGrayColor(vec4 color) {
        return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
    }
    
    // \u7136\u540E\u53EF\u6839\u636E\u9AD8\u5EA6\u56FE\u7684\u503C\u6765\u8BA1\u7B97 uv \u4E24\u4E2A\u65B9\u5411\u7684\u9AD8\u5EA6\u51FD\u6570\u5207\u7EBF\u3002
    vec3 GetNormalByGray(vec2 uv) {
        float _DeltaScale = 1.0;
        float _HeightScale = 0.01;
        
        vec2 deltaU = vec2(texelSize.x * _DeltaScale, 0);
        float h1_u = GetGrayColor(texture2D(uTexture, uv - deltaU));
        float h2_u = GetGrayColor(texture2D(uTexture, uv + deltaU));
        // vec3 tangent_u = vec3(1, 0, (h2_u - h1_u) / deltaU.x);
        vec3 tangent_u = vec3(deltaU.x, 0, _HeightScale * (h2_u - h1_u));
        // vec3 tangent_u = vec3(deltaU.x, 0, (h2_u - h1_u));

        vec2 deltaV = vec2(0, texelSize.y * _DeltaScale);
        float h1_v = GetGrayColor(texture2D(uTexture, uv - deltaV));
        float h2_v = GetGrayColor(texture2D(uTexture, uv + deltaV));
        // vec3 tangent_v = vec3(0, 1, (h2_v - h1_v) / deltaV.y);
        vec3 tangent_v = vec3(0, deltaV.y, _HeightScale * (h2_v - h1_v));
        // vec3 tangent_v = vec3(0, deltaV.y, (h2_v - h1_v));
        
        vec3 normal = normalize(cross(tangent_v, tangent_u));
        return normal;
    }
    
    void main () {

        vec3 normal = GetNormalByGray(vUv);
        normal.z *= -1.0;
        vec3 color = normal * 0.5 + 0.5;

        gl_FragColor = vec4(color, 1.0);

        // gl_FragColor = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`),s=new E(t,`
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform sampler2D uNormalMap;
    
    varying vec2 vUv;
        
    vec4 getColor(vec2 uv){
        return texture2D(tDiffuse, uv);
    }

    void main()
    {
        vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
    
        vec2 newUv = vUv + normalColor.xy * normalColor.z * 0.025;
        vec4 color = texture2D(tDiffuse, newUv);
    
        // \u6DFB\u52A0\u5149\u6548
        // vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
        // float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
        // color.rgb += lightness * 0.25;
        
        gl_FragColor = color;
         newUv = vUv + normalColor.xy  * 0.025;
         color = texture2D(tDiffuse, newUv);
         gl_FragColor.g = color.g;

        //  newUv = vUv + normalColor.xy  * 0.025;
        //  color = texture2D(tDiffuse, newUv);
         gl_FragColor.b = color.b;
        
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`),u=new E(t,`
    precision mediump float;

    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`),c=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }`),m=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }`),l=new E(t,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }`),x=new E(t,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        // vec3 splat = exp(-dot(p, p) / radius) * color;// \u539F\u7248
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }`),T=new E(t,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float delta;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - delta * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - delta * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif

    #ifdef ADVECTION_DYE
    // \u5B9A\u91CF\u6D88\u6563
        float decay = 0.1 * dissipation * delta;
        // gl_FragColor = vec4(max(vec3(0.0, 0.0, 0.0), vec3(result) - 0.001), result.a);
        gl_FragColor = vec4(max(vec3(0.0), vec3(result) - decay), result.a);
    #else
    // \u6B63\u5E38\u6D88\u6563 - \u6BD4\u4F8B\u6D88\u6563
        float decay = 1.0 + dissipation * delta;
        gl_FragColor = result / decay;
    #endif
    
    }`,a.supportLinearFiltering?void 0:["MANUAL_FILTERING"]),v=new E(t,T.source,[]),p=new E(t,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        // \u539F\u7248
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.85, 1.0);
        c *= diffuse;

        // \u6839\u636E\u4EAE\u5EA6\u63A7\u5236\u5927\u5C0F
        /* vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        //float diffuse = clamp(dot(n, l) / (min(c.r, min(c.g, c.b)))+0.8, 0.8, 1.0);
        c *= diffuse; */

    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        // float noise = texture2D(uDithering, vUv * ditherScale).r;
        // noise = noise * 2.0 - 1.0;
        // bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }`,(()=>{const I=[];return i.BLOOM&&I.push("BLOOM"),i.SHADING&&I.push("SHADING"),i.SUNRAYS&&I.push("SUNRAYS"),I})()),f=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B; // \u539F\u7248
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }`),d=new E(t,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float delta;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
      
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        // force /= length(force) + 0.0001;
        force = normalize(force);
        // \u79BB\u5B50\u6001\u5173\u952E\uFF0C\u6E4D\u6D41\u6548\u679C\uFF0C\u5982\u679C\u4E3A0\uFF0C\u6548\u679C\u7C7B\u4F3C\u70DF\u96FE\uFF0C\u66F4\u4E3A\u5706\u6ED1\uFF0C\u8D8A\u5927\u8D8A\u7C7B\u4F3C\u65E0\u89C4\u5219\u7684\u79BB\u5B50\u6001\u6E4D\u6D41
        force *= curl * C; 
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * delta;
        //velocity += force;
        velocity = min(max(velocity, -1000.0), 1000.0);
        
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }`),S=new E(t,`
  precision mediump float;
  precision mediump sampler2D;
 
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
 
  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
 
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }
 
      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }`),R=new E(t,`
    precision mediump float;
    precision mediump sampler2D;
 
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
 
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25; // +-\u4E00\u81F4\uFF0C\u4F46\u8BBA\u6587\u4F7F\u7528-\u8868\u793A\u538B\u529B\u4E0E\u5438\u5F15\u529B\u7684\u5DEE\u5F02
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }`),w=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B); // \u539F\u7248\uFF0C\u8BBA\u6587\u4F7F\u7528\u7CFB\u6570\u63A7\u5236\u5927\u5C0F\uFF0C\u8FD9\u91CC\u7CFB\u6570\u4E3A1
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }`),B=new E(t,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    // \u68CB\u76D8\u683C\u5728vmin\u4E0A\u7684\u6570\u91CF
    #define SCALE 17.0

    void main () {
        vec2 scaleUV = vUv * SCALE * vec2(aspectRatio, 1.0);
        scaleUV.x -= SCALE * aspectRatio * 0.5; // \u6A2A\u5411\u5C45\u4E2D\u504F\u79FB
        vec2 uv = floor(scaleUV);
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.15 + 0.85; //\u6700\u4EAE\uFF0C\u6700\u6697
        gl_FragColor = vec4(vec3(v), 1.0);
    }`),h=new E(t,`
    precision mediump float;
    precision mediump sampler2D;
    
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        // c *= rq;
        gl_FragColor = vec4(c, 0.0);
    }`),P=new E(t,`
    precision mediump float;
    precision mediump sampler2D;
    
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }`),j=new E(t,`
    precision mediump float;
    precision mediump sampler2D;
   
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
   
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }`),J=new E(t,`
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D uTexture;
  
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }`),Q=new E(t,`
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D uMaskTexture;
    uniform float weight;
  
    #define ITERATIONS 16
  
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
  
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
  
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
  
        float color = texture2D(uMaskTexture, vUv).a;
  
        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uMaskTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
  
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);// \u539F\u7248
        //gl_FragColor = vec4(color * Exposure * 0.1, 0.0, 0.0, 1.0);
    }`),Z=new k(t,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`),ee=new E(t,`
      precision mediump float;
      precision mediump sampler2D;
     
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;
     
      void main () {
          vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
          sum += texture2D(uTexture, vL) * 0.35294117;
          sum += texture2D(uTexture, vR) * 0.35294117;
          gl_FragColor = sum;
      }
    `);this.normalMapProgram=new g(t,o,n),this.refractionProgram=new g(t,o,s),this.testProgram=new g(t,o,u),this.copyProgram=new g(t,o,c),this.overProgram=new g(t,o,m),this.colorProgram=new g(t,o,l),this.checkerboardProgram=new g(t,o,B),this.bloomPrefilterProgram=new g(t,o,h),this.bloomBlurProgram=new g(t,o,P),this.bloomFinalProgram=new g(t,o,j),this.blurProgram=new g(t,Z,ee),this.sunraysMaskProgram=new g(t,o,J),this.sunraysProgram=new g(t,o,Q),this.splatProgram=new g(t,o,x),this.advectionProgram=new g(t,o,T),this.advectionDyeProgram=new g(t,o,v),this.curlProgram=new g(t,o,f),this.vorticityProgram=new g(t,o,d),this.divergenceProgram=new g(t,o,S),this.pressureProgram=new g(t,o,R),this.gradienSubtractProgram=new g(t,o,w),this.displayMaterial=new ve(t,o,p)}}const pe=W({name:"SimulationRefraction-A",setup(D){const e=re();return oe(()=>{const t=e.value,i=new F(t);ae(()=>i.destroy())}),(t,i)=>(q(),K("div",{class:"viewContainer",ref_key:"viewContainer",ref:e},null,512))}});var ge=$(pe,[["__scopeId","data-v-95559a5c"],["__file","/Volumes/Work/l00 Studio/l00/source/src/magics-components/simulation-refraction/SimulationRefraction-A.vue"]]);const xe={class:"main"},Te=W({name:"index",setup(D){return(e,t)=>(q(),K("div",xe,[H(se,null,{default:ne(()=>[H(ge)]),_:1})]))}});var Ae=$(Te,[["__file","/Volumes/Work/l00 Studio/l00/source/src/magics-components/simulation-refraction/index.vue"]]);export{Ae as default};
