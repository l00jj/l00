var Z=Object.defineProperty;var ee=(y,e,t)=>e in y?Z(y,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):y[e]=t;var r=(y,e,t)=>(ee(y,typeof e!="symbol"?e+"":e,t),t);import{d as W,h as te,i as ie,l as re,o as q,b as K,s as H,w as oe}from"./vendor-cabe9347.js";import{P as ae}from"./Preview-fffd81b3.js";import{E as se}from"./EventEmitter-80978bd8.js";import{S as ne}from"./Stats-c12fee77.js";import{D as ue}from"./DatGui-ba968fee.js";import{_ as $}from"./plugin-vue_export-helper-4223c0cf.js";const D=class{constructor(e,t={fit:D.Fit_Contain}){r(this,"main");r(this,"width",0);r(this,"height",0);r(this,"viewWidth",0);r(this,"viewHeight",0);r(this,"pixelRatio",1);r(this,"fit",D.Fit_None);this.main=e,this.update({fit:t!=null&&t.fit?t.fit:D.Fit_None}),D.resizeObserve(this)}static resizeObserve(e){const t=e.main;if(window.ResizeObserver){const i=new ResizeObserver(a=>e.update());i.observe(t.viewContainerDom),t.onDestroyed(()=>i.disconnect())}else{const i=()=>e.update();window.addEventListener("resize",i),t.onDestroyed(()=>window.removeEventListener("resize",i))}}update(e={}){const{viewContainerDom:t,canvasDom:i}=this.main;let{viewWidth:a,viewHeight:o,pixelRatio:s,fit:n}=e;if(!t||!i)return;this.pixelRatio=s||Math.min(Math.max(1,window.devicePixelRatio),2),n&&n!==this.fit&&D.fitMap.hasOwnProperty(n)&&(this.fit=n),this.fit===D.Fit_None?(a=a||this.viewWidth,o=o||this.viewHeight):(a=t.offsetWidth,o=t.offsetHeight),this.viewWidth=a,this.viewHeight=o;const u=a*this.pixelRatio,c=o*this.pixelRatio;this.width=u,this.height=c,i.width=u,i.height=c,this.fit===D.Fit_None?(i.style.position="absolute",i.style.width=this.viewWidth+"px",i.style.height=this.viewHeight+"px"):u&&c&&(i.style.position="relative",i.style.width="100%",i.style.height="100%"),i.style.objectFit=D.fitMap[this.fit],this.main.emit(F.Event_Resize)}onResize(e){return this.main.on(F.Event_Resize,e)}};let A=D;r(A,"Fit_Contain",Symbol()),r(A,"Fit_Cover",Symbol()),r(A,"Fit_Fill",Symbol()),r(A,"Fit_None",Symbol()),r(A,"fitMap",{[D.Fit_Contain]:"contain",[D.Fit_Cover]:"cover",[D.Fit_Fill]:"fill",[D.Fit_None]:"none"});const C=class{constructor(e){r(this,"main");r(this,"start",Date.now());r(this,"time",0);r(this,"elapsed",0);r(this,"delta",16);r(this,"loopID");r(this,"requestAnimationFrameID",0);r(this,"isTicking",!1);this.main=e,C.testSupportedPerformance(),this.update()}static testSupportedPerformance(){(!window.performance||!window.performance.now||typeof window.performance.now()!="number")&&(alert("Not Supported Performance Time"),window.performance=window.Date)}update(){const e=performance.now();this.delta=e-this.time,this.time=e,this.elapsed+=this.delta}tick(){var i;if(this.isTicking)return;this.isTicking=!0;const e=Symbol();this.loopID=e;const t=(i=this.main.stats)!=null&&i.isShow?()=>{var a,o;(a=this.main.stats)==null||a.begin(),this.update(),this.main.emit(F.Event_Tick),e===this.loopID&&(this.requestAnimationFrameID=window.requestAnimationFrame(t)),(o=this.main.stats)==null||o.end()}:()=>{this.update(),this.main.emit(F.Event_Tick),e===this.loopID&&(this.requestAnimationFrameID=window.requestAnimationFrame(t))};this.update(),this.delta>C.Standard_Delta&&(this.time=performance.now()-C.Standard_Delta),t()}paused(){this.isTicking&&(window.cancelAnimationFrame(this.requestAnimationFrameID),this.loopID=void 0,this.isTicking=!1)}retick(){this.paused(),this.tick()}onTick(e){return this.main.on(F.Event_Tick,e)}};let N=C;r(N,"Standard_Delta",1e3/60);const _=class{constructor(e){r(this,"main");r(this,"onMouseEvent",e=>{this.main.emit(_.Interact_Book[e.type],e.offsetX,e.offsetY,-1)});r(this,"onTouchEvent",e=>{e.preventDefault();const t=e.targetTouches,i=this.main,a=i.canvasDom.getBoundingClientRect(),o=_.Interact_Book[e.type];for(let s=0;s<t.length;s++){const n=t[s];i.emit(o,n.pageX-a.x,n.pageY-a.y,n.identifier)}});this.main=e,this.deploy(),e.onDestroyed(()=>this.destroyed)}deploy(){const e=this.main.canvasDom;e.addEventListener("mousedown",this.onMouseEvent),e.addEventListener("mousemove",this.onMouseEvent),e.addEventListener("mouseup",this.onMouseEvent),e.addEventListener("touchstart",this.onTouchEvent),e.addEventListener("touchmove",this.onTouchEvent),e.addEventListener("touchend",this.onTouchEvent)}destroyed(){const e=this.main.canvasDom;e.removeEventListener("mousedown",this.onMouseEvent),e.removeEventListener("mousemove",this.onMouseEvent),e.removeEventListener("mouseup",this.onMouseEvent),e.removeEventListener("touchstart",this.onTouchEvent),e.removeEventListener("touchmove",this.onTouchEvent),e.removeEventListener("touchend",this.onTouchEvent)}};let L=_;r(L,"Interact_Start",Symbol()),r(L,"Interact_Move",Symbol()),r(L,"Interact_End",Symbol()),r(L,"Interact_Book",{mousedown:_.Interact_Start,mousemove:_.Interact_Move,mouseup:_.Interact_End,touchstart:_.Interact_Start,touchmove:_.Interact_Move,touchend:_.Interact_End});const M=class extends se{constructor(t){super();r(this,"time");r(this,"sizes");r(this,"controls");r(this,"viewContainerDom");r(this,"renderer");r(this,"canvasDom",window.document.createElement("canvas"));r(this,"stats");r(this,"guiHelper");this.viewContainerDom=t,this.viewContainerDom.appendChild(this.canvasDom),this.stats=new ne(this.viewContainerDom),this.stats.show(),this.guiHelper=new ue(this.viewContainerDom),this.guiHelper.show(),this.time=new N(this),this.sizes=new A(this,{fit:A.Fit_Contain}),this.controls=new L(this),this.renderer=new ce(this)}render(){this.time.tick()}paused(){this.time.paused()}onDestroyed(t){return this.once(M.Event_Destroyed,t)}destroy(){this.time.paused(),this.emit(M.Event_Destroyed)}};let F=M;r(F,"Event_Tick",Symbol()),r(F,"Event_Resize",Symbol()),r(F,"Event_Destroyed",Symbol());class ce{constructor(e){r(this,"core");this.core=new U(e)}}const V=class{constructor(e){r(this,"main");r(this,"gl");r(this,"app");this.main=e;const t=V.getWebGLContext(e.canvasDom);this.gl=t,this.app=new fe(e,t),this.app.init(),this.main.time.onTick(()=>this.app.update()),this.main.render()}static getWebGLContext(e){const t={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",t);return!!i||(i=e.getContext("webgl",t)||e.getContext("experimental-webgl",t)),i}};let U=V;r(U,"Event_Ready",Symbol()),r(U,"Event_ParticlesNumber_Changed",Symbol());const z=class{constructor(e,t,i,a){r(this,"gl");r(this,"type");r(this,"source");r(this,"shader",null);r(this,"isNeedUpdate",!0);r(this,"keywords",new z.Keywords(this));this.gl=e,this.type=t,this.source=i,a&&Array.isArray(a)&&a.forEach(o=>this.keywords.add(o)),z.prototype.update.apply(this)}update(){const{gl:e,type:t}=this;let i=this.source;this.keywords.size&&(i=[...this.keywords].reduce((s,[n,u])=>s+=`#define ${u}
`,"")+i);const a=e.createShader(t);return e.shaderSource(a,i),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?(this.shader=a,this.isNeedUpdate=!1,!0):(console.error(e.getShaderInfoLog(a)),!1)}};let O=z;r(O,"Keywords",class extends Map{constructor(i){super();r(this,"shader");this.shader=i}set(i){return typeof i=="string"&&(i=[i]),Array.isArray(i)&&i.length&&i.forEach(a=>this.add(a)),this.shader.isNeedUpdate=!0,this}add(i){if(i&&typeof i=="string"&&/\w+/.test(i)){const a=i.toString().split(" ")[0];return super.set(a,i),this.shader.isNeedUpdate=!0}return!1}delete(i){if(i&&typeof i=="string"&&/\w+/.test(i)){const a=i.toString().split(" ")[0];if(super.delete(a))return this.shader.isNeedUpdate=!0}return!1}toggle(i){if(i){const a=i.toString().split(" ")[0];return super.has(a)?this.delete(a):this.add(i)}return!1}});class k extends O{constructor(e,t,i){super(e,e.VERTEX_SHADER,t,i)}}class E extends O{constructor(e,t,i){super(e,e.FRAGMENT_SHADER,t,i)}}class g{constructor(e,t,i){r(this,"gl");r(this,"vertexShader");r(this,"fragmentShader");r(this,"uniforms",{});r(this,"program",{});this.gl=e,this.vertexShader=t,this.fragmentShader=i,g.prototype.update.apply(this)}update(){const{gl:e,vertexShader:t,fragmentShader:i}=this;t.isNeedUpdate&&t.update(),i.isNeedUpdate&&i.update(),this.program=g.createProgram(e,t,i),this.uniforms=g.getUniforms(e,this.program)}static createProgram(e,t,i){let a=e.createProgram();return t.shader&&e.attachShader(a,t.shader),i.shader&&e.attachShader(a,i.shader),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)||console.error(e.getProgramInfoLog(a)),a}static getUniforms(e,t){const i={},a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<a;o++){let s=e.getActiveUniform(t,o).name;i[s]=e.getUniformLocation(t,s)}return i}activate(){this.gl.useProgram(this.program)}}class le extends g{constructor(t,i,a){super(t,i,a);r(this,"programs",{})}}class b{constructor(e,t,i,a,o,s,n){r(this,"gl");r(this,"texture");r(this,"internalFormat");r(this,"format");r(this,"type");r(this,"param");r(this,"fbo");r(this,"width");r(this,"height");r(this,"texelSizeX");r(this,"texelSizeY");this.gl=e,e.activeTexture(e.TEXTURE0);const u=e.createTexture();e.bindTexture(e.TEXTURE_2D,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,a,t,i,0,o,s,null);const c=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0),e.viewport(0,0,t,i),e.clear(e.COLOR_BUFFER_BIT);const m=1/t,l=1/i;this.texture=u,this.internalFormat=a,this.format=o,this.type=s,this.param=n,this.fbo=c,this.width=t,this.height=i,this.texelSizeX=m,this.texelSizeY=l}attach(e){const t=this.gl;return t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,this.texture),e}}class Y{constructor(e,t,i,a,o,s,n){r(this,"gl");r(this,"fbo1");r(this,"fbo2");r(this,"width");r(this,"height");r(this,"texelSizeX");r(this,"texelSizeY");this.gl=e;const u=new b(e,t,i,a,o,s,n),c=new b(e,t,i,a,o,s,n);this.fbo1=u,this.fbo2=c,this.width=t,this.height=i,this.texelSizeX=u.texelSizeX,this.texelSizeY=u.texelSizeY}get read(){return this.fbo1}set read(e){this.fbo1=e}get write(){return this.fbo2}set write(e){this.fbo2=e}swap(){let e=this.fbo1;this.fbo1=this.fbo2,this.fbo2=e}}class X{constructor(e){r(this,"r",0);r(this,"g",0);r(this,"b",0);this.setColor(e)}setColor(e){Array.isArray(e)&&(this.r=e[0]?e[0]/255:0/255,this.g=e[1]?e[1]/255:0/255,this.b=e[2]?e[2]/255:0/255)}random(){const e=G.HSVtoRGB(Math.random(),1,1);return this.r=e.r*.15,this.g=e.g*.15,this.b=e.b*.15,this}}class G{static isWebGL2(e){return!!e.VERSION}static normalizeColor(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}static HSVtoRGB(e,t,i){let a,o,s,n,u,c,m,l;switch(n=Math.floor(e*6),u=e*6-n,c=i*(1-t),m=i*(1-u*t),l=i*(1-(1-u)*t),n%6){case 0:a=i,o=l,s=c;break;case 1:a=m,o=i,s=c;break;case 2:a=c,o=i,s=l;break;case 3:a=c,o=m,s=i;break;case 4:a=l,o=c,s=i;break;case 5:a=i,o=c,s=m;break}return{r:a,g:o,b:s}}hashCode(e){if(e.length==0)return 0;let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return t}static random(e,t,i){if(typeof t!="number"||e===t)return 0;if(typeof t!="number"&&(t=e,e=0),typeof i!="number"&&(i=1),e>t){const s=e;e=t,t=s}let a=1;for(;!Number.isInteger(e)||!Number.isInteger(t)||!Number.isInteger(i);)e*=10,t*=10,i*=10,a*=10;const o=Math.random()*(t-e+1)+e;return i===0?o/a:Math.floor(o/i)*i/a}}class me{constructor(e){r(this,"formatRGBA",{});r(this,"formatRG",{});r(this,"formatR",{});r(this,"halfFloatTexType");r(this,"supportLinearFiltering");const t=G.isWebGL2(e);let i,a;t?(e.getExtension("EXT_color_buffer_float"),a=e.getExtension("OES_texture_float_linear")):(i=e.getExtension("OES_texture_half_float"),a=e.getExtension("OES_texture_half_float_linear"));const o=t?e.HALF_FLOAT:i.HALF_FLOAT_OES;o===null&&alert("Not Supported halfFloatTexType");let s,n,u;t?(s=c(e.RGBA16F,e.RGBA,o),n=c(e.RG16F,e.RG,o),u=c(e.R16F,e.RED,o)):(s=c(e.RGBA,e.RGBA,o),n=c(e.RGBA,e.RGBA,o),u=c(e.RGBA,e.RGBA,o)),(s===null||n===null||u===null)&&alert("Not Supported halfFloatTexType");function c(l,x,T){if(!m(l,x,T))switch(l){case e.R16F:return c(e.RG16F,e.RG,T);case e.RG16F:return c(e.RGBA16F,e.RGBA,T);default:return null}return{internalFormat:l,format:x}}function m(l,x,T){let h=e.createTexture();e.bindTexture(e.TEXTURE_2D,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,l,4,4,0,x,T,null);let p=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,p),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,h,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}this.formatRGBA=s,this.formatRG=n,this.formatR=u,this.halfFloatTexType=o,this.supportLinearFiltering=a}}class fe{constructor(e,t){r(this,"main");r(this,"time");r(this,"sizes");r(this,"gl");r(this,"glExt");r(this,"config",{SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,STEP_SPEED:1,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.2,PRESSURE:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.25,SPLAT_FORCE:6e3,SMOKE:!1,COLORFUL:!0,COLOR_UPDATE_TIME:.3,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!1,DRAW_CHECKERBOARD:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1,SHADING:!0,SHADING_WIDTH:1});r(this,"isNeedInit",!0);r(this,"backColor",new X(this.config.BACK_COLOR));r(this,"dye");r(this,"velocity");r(this,"curl");r(this,"divergence");r(this,"pressure");r(this,"bloom");r(this,"bloomFramebuffers",[]);r(this,"sunrays");r(this,"sunraysTemp");r(this,"testProgram");r(this,"copyProgram");r(this,"overProgram");r(this,"colorProgram");r(this,"splatProgram");r(this,"advectionProgram");r(this,"advectionDyeProgram");r(this,"curlProgram");r(this,"vorticityProgram");r(this,"divergenceProgram");r(this,"pressureProgram");r(this,"gradienSubtractProgram");r(this,"checkerboardProgram");r(this,"bloomPrefilterProgram");r(this,"bloomBlurProgram");r(this,"bloomFinalProgram");r(this,"blurProgram");r(this,"sunraysMaskProgram");r(this,"sunraysProgram");r(this,"displayMaterial");r(this,"init",()=>{this.gl.clearColor(0,0,0,1),this.initFramebuffers(),this.initDisplayElements(),this.interacts.init(),this.helper.init(),this.interacts.multipleSplats(1)});r(this,"initFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this,o=a(i.SIM_RESOLUTION),s=a(i.DYE_RESOLUTION),n=t.halfFloatTexType,u=t.formatRGBA,c=t.formatRG,m=t.formatR,l=t.supportLinearFiltering?e.LINEAR:e.NEAREST;e.disable(e.BLEND),this.dye=this.dye?this.resizeDoubleFBO(this.dye,s.width,s.height,u.internalFormat,u.format,n,l):new Y(e,s.width,s.height,u.internalFormat,u.format,n,l),this.velocity=this.velocity?this.resizeDoubleFBO(this.velocity,o.width,o.height,c.internalFormat,c.format,n,l):new Y(e,o.width,o.height,c.internalFormat,c.format,n,l),this.divergence=new b(e,o.width,o.height,m.internalFormat,m.format,n,e.NEAREST),this.curl=new b(e,o.width,o.height,m.internalFormat,m.format,n,e.NEAREST),this.pressure=new Y(e,o.width,o.height,m.internalFormat,m.format,n,e.NEAREST),this.initBloomFramebuffers(),this.initSunraysFramebuffers(),this.isNeedInit=!1});r(this,"initBloomFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this,o=i.BLOOM_ITERATIONS,s=2**o,n=a(s),u=t.halfFloatTexType,c=t.formatRGBA,m=t.supportLinearFiltering?e.LINEAR:e.NEAREST;this.bloom=new b(e,n.width,n.height,c.internalFormat,c.format,u,m),this.bloomFramebuffers.length=0;for(let l=1;l<=o;l++){const x=n.width>>l,T=n.height>>l;if(x<2||T<2)break;const h=new b(e,x,T,c.internalFormat,c.format,u,m);this.bloomFramebuffers.push(h)}});r(this,"initSunraysFramebuffers",()=>{const{gl:e,glExt:t,config:i,createResolution:a}=this;let o=a(i.SUNRAYS_RESOLUTION);const s=t.halfFloatTexType,n=t.formatR,u=t.supportLinearFiltering?e.LINEAR:e.NEAREST;this.sunrays=new b(e,o.width,o.height,n.internalFormat,n.format,s,u),this.sunraysTemp=new b(e,o.width,o.height,n.internalFormat,n.format,s,u)});r(this,"resizeFBO",(e,t,i,a,o,s,n)=>{const{gl:u,copyProgram:c,calcTo:m}=this;let l=new b(u,t,i,a,o,s,n);return u.useProgram(c.program),u.uniform1i(c.uniforms.uTexture,e.attach(0)),m(l),l});r(this,"resizeDoubleFBO",(e,t,i,a,o,s,n)=>{if(e.width==t&&e.height==i)return e;const{gl:u,resizeFBO:c}=this;return e.read=c(e.read,t,i,a,o,s,n),e.write=new b(u,t,i,a,o,s,n),e.width=t,e.height=i,e.texelSizeX=1/t,e.texelSizeY=1/i,e});r(this,"initDisplayElements",()=>{const e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0)});r(this,"calcTo",(e,t=!1)=>{const i=this.gl;e==null?(i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindFramebuffer(i.FRAMEBUFFER,null)):(i.viewport(0,0,e.width,e.height),i.bindFramebuffer(i.FRAMEBUFFER,e.fbo)),t&&(i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT)),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0)});r(this,"update",()=>{const{time:e,config:t,isNeedInit:i,initFramebuffers:a,step:o,interacts:s,render:n}=this;i&&a(),s.update(),t.PAUSED||o(e.delta),n(null)});r(this,"step",e=>{const{gl:t,glExt:i,config:a,dye:o,velocity:s,curl:n,divergence:u,pressure:c,curlProgram:m,vorticityProgram:l,divergenceProgram:x,overProgram:T,pressureProgram:h,gradienSubtractProgram:p,advectionProgram:f,advectionDyeProgram:d,calcTo:S}=this;e*=.001*a.STEP_SPEED,t.disable(t.BLEND),m.activate(),t.uniform2f(m.uniforms.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(m.uniforms.uVelocity,s.read.attach(0)),S(n),l.activate(),t.uniform2f(l.uniforms.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(l.uniforms.uVelocity,s.read.attach(0)),t.uniform1i(l.uniforms.uCurl,n.attach(1)),t.uniform1f(l.uniforms.curl,a.CURL),t.uniform1f(l.uniforms.delta,e),S(s.write),s.swap(),x.activate(),t.uniform2f(x.uniforms.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(x.uniforms.uVelocity,s.read.attach(0)),S(u),T.activate(),t.uniform1i(T.uniforms.uTexture,c.read.attach(0)),t.uniform1f(T.uniforms.value,a.PRESSURE),S(c.write),c.swap(),h.activate(),t.uniform2f(h.uniforms.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(h.uniforms.uDivergence,u.attach(0));for(let w=0;w<a.PRESSURE_ITERATIONS;w++)t.uniform1i(h.uniforms.uPressure,c.read.attach(1)),S(c.write),c.swap();p.activate(),t.uniform2f(p.uniforms.texelSize,s.texelSizeX,s.texelSizeY),t.uniform1i(p.uniforms.uPressure,c.read.attach(0)),t.uniform1i(p.uniforms.uVelocity,s.read.attach(1)),S(s.write),s.swap(),f.activate(),t.uniform2f(f.uniforms.texelSize,s.texelSizeX,s.texelSizeY),i.supportLinearFiltering||t.uniform2f(f.uniforms.dyeTexelSize,s.texelSizeX,s.texelSizeY);const R=s.read.attach(0);t.uniform1i(f.uniforms.uVelocity,R),t.uniform1i(f.uniforms.uSource,R),t.uniform1f(f.uniforms.delta,e),t.uniform1f(f.uniforms.dissipation,a.VELOCITY_DISSIPATION),S(s.write),s.swap(),d.activate(),t.uniform2f(d.uniforms.texelSize,s.texelSizeX,s.texelSizeY),i.supportLinearFiltering||t.uniform2f(d.uniforms.dyeTexelSize,o.texelSizeX,o.texelSizeY),t.uniform1i(d.uniforms.uVelocity,s.read.attach(0)),t.uniform1i(d.uniforms.uSource,o.read.attach(1)),t.uniform1f(d.uniforms.delta,e),t.uniform1f(d.uniforms.dissipation,a.DENSITY_DISSIPATION),S(o.write),o.swap()});r(this,"render",e=>{const{gl:t,config:i,dye:a,backColor:o,drawColor:s,drawCheckerboard:n,drawDisplay:u}=this;i.BLOOM&&this.applyBloom(a.read,this.bloom),i.SUNRAYS&&(this.applySunrays(a.read,a.write,this.sunrays),this.blur(this.sunrays,this.sunraysTemp,1)),e==null||!i.TRANSPARENT?(t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND)):t.disable(t.BLEND),i.TRANSPARENT||s(e,o),e==null&&i.DRAW_CHECKERBOARD&&i.TRANSPARENT&&n(e),u(e)});r(this,"drawColor",(e,t)=>{const{gl:i,colorProgram:a,calcTo:o}=this;a.activate(),i.uniform4f(a.uniforms.color,t.r,t.g,t.b,1),o(e)});r(this,"drawCheckerboard",e=>{const{sizes:t,gl:i,checkerboardProgram:a,calcTo:o}=this;a.activate(),i.uniform1f(a.uniforms.aspectRatio,t.width/t.height),o(e)});r(this,"drawDisplay",e=>{const{gl:t,config:i,dye:a,bloom:o,sunrays:s,displayMaterial:n,calcTo:u}=this;let c=e==null?t.drawingBufferWidth:e.width,m=e==null?t.drawingBufferHeight:e.height;n.activate(),i.SHADING&&t.uniform2f(n.uniforms.texelSize,i.SHADING_WIDTH/c,i.SHADING_WIDTH/m),t.uniform1i(n.uniforms.uTexture,a.read.attach(0)),i.BLOOM&&t.uniform1i(n.uniforms.uBloom,o.attach(1)),i.SUNRAYS&&t.uniform1i(n.uniforms.uSunrays,s.attach(3)),u(e)});r(this,"applyBloom",(e,t)=>{if(this.bloomFramebuffers.length<2)return;const{gl:i,config:a,bloomFramebuffers:o,calcTo:s,bloomPrefilterProgram:n,bloomBlurProgram:u,bloomFinalProgram:c}=this;let m=t;i.disable(i.BLEND),n.activate();const l=a.BLOOM_THRESHOLD*a.BLOOM_SOFT_KNEE+1e-4,x=a.BLOOM_THRESHOLD-l,T=l*2,h=.25/l;i.uniform3f(n.uniforms.curve,x,T,h),i.uniform1f(n.uniforms.threshold,a.BLOOM_THRESHOLD),i.uniform1i(n.uniforms.uTexture,e.attach(0)),s(m),u.activate();for(let p=0;p<o.length;p++){let f=o[p];i.uniform2f(u.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(u.uniforms.uTexture,m.attach(0)),s(f),m=f}i.blendFunc(i.ONE,i.ONE),i.enable(i.BLEND);for(let p=o.length-2;p>=0;p--){let f=o[p];i.uniform2f(u.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(u.uniforms.uTexture,m.attach(0)),i.viewport(0,0,f.width,f.height),s(f),m=f}i.disable(i.BLEND),c.activate(),i.uniform2f(c.uniforms.texelSize,m.texelSizeX,m.texelSizeY),i.uniform1i(c.uniforms.uTexture,m.attach(0)),i.uniform1f(c.uniforms.intensity,a.BLOOM_INTENSITY),s(t)});r(this,"applySunrays",(e,t,i)=>{const{gl:a,config:o,calcTo:s,sunraysMaskProgram:n,sunraysProgram:u}=this;a.disable(a.BLEND),n.activate(),a.uniform1i(n.uniforms.uTexture,e.attach(0)),s(t),u.activate(),a.uniform1f(u.uniforms.weight,o.SUNRAYS_WEIGHT),a.uniform1i(u.uniforms.uMaskTexture,t.attach(0)),s(i)});r(this,"blur",(e,t,i)=>{const{gl:a,config:o,calcTo:s,blurProgram:n}=this;n.activate();for(let u=0;u<i;u++)a.uniform2f(n.uniforms.texelSize,e.texelSizeX,0),a.uniform1i(n.uniforms.uTexture,e.attach(0)),s(t),a.uniform2f(n.uniforms.texelSize,0,e.texelSizeY),a.uniform1i(n.uniforms.uTexture,t.attach(0)),s(e)});r(this,"drawFBO",e=>{const{gl:t,dye:i,testProgram:a,displayMaterial:o,calcTo:s}=this,n=t.drawingBufferWidth,u=t.drawingBufferHeight;this.createResolution(Math.min(n,u)),a.activate(),t.uniform1i(a.uniforms.uTexture,e.attach(0)),s(null)});r(this,"splat",(e,t,i,a,o)=>{const{sizes:s,gl:n,config:u,dye:c,velocity:m,splatProgram:l,calcTo:x,correctRadius:T}=this;l.activate(),n.uniform1i(l.uniforms.uTarget,m.read.attach(0)),n.uniform1f(l.uniforms.aspectRatio,s.width/s.height),n.uniform2f(l.uniforms.point,e,t),n.uniform3f(l.uniforms.color,i,a,0),n.uniform1f(l.uniforms.radius,T(u.SPLAT_RADIUS/100)),x(m.write),m.swap(),n.uniform1i(l.uniforms.uTarget,c.read.attach(0)),n.uniform3f(l.uniforms.color,o.r,o.g,o.b),x(c.write),c.swap()});r(this,"correctRadius",e=>{const{sizes:t}=this;let i=t.width/t.height;return i>1&&(e*=i),e});r(this,"createResolution",e=>{const{gl:t}=this;let i=t.drawingBufferWidth/t.drawingBufferHeight;i<1&&(i=1/i);let a=Math.round(e),o=Math.round(e*i);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:a}:{width:a,height:o}});r(this,"interacts",(()=>{class e{constructor(){r(this,"id",-1);r(this,"texcoordX",0);r(this,"texcoordY",0);r(this,"prevTexcoordX",0);r(this,"prevTexcoordY",0);r(this,"deltaX",0);r(this,"deltaY",0);r(this,"down",!1);r(this,"moved",!1);r(this,"color",new X)}}const t=new Map,i=[],a=()=>{const{main:h}=this;h.on(L.Interact_Start,m),h.on(L.Interact_Move,l),h.on(L.Interact_End,x)},o=()=>{u(this.time.delta);const{splatStack:h,multipleSplats:p}=this.interacts;h.length>0&&p(h.pop()),t.forEach(f=>{f.moved&&(f.moved=!1,s(f))})},s=h=>{const{config:p,splat:f}=this,d=h.deltaX*p.SPLAT_FORCE,S=h.deltaY*p.SPLAT_FORCE;f(h.texcoordX,h.texcoordY,d,S,h.color)};let n=0;const u=h=>{if(!this.config.COLORFUL)return;const p=this.config.COLOR_UPDATE_TIME;n+=h/1e3,n>=p&&(n=n%p,t.forEach(f=>{f.color.random()}))},c=h=>{for(let p=0;p<h;p++){const f=new X;f.random(),f.r*=10,f.g*=10,f.b*=10;const d=Math.random(),S=Math.random(),R=1e3*(Math.random()-.5),w=1e3*(Math.random()-.5);this.splat(d,S,R,w,f)}},m=(h,p,f)=>{const{width:d,height:S,pixelRatio:R}=this.main.sizes,w=R*h,P=R*p;let v=t.get(f);v||(v=new e,t.set(f,v)),v.id=f,v.down=!0,v.moved=!1,v.texcoordX=w/d,v.texcoordY=1-P/S,v.prevTexcoordX=v.texcoordX,v.prevTexcoordY=v.texcoordY,v.deltaX=0,v.deltaY=0,v.color.random()},l=(h,p,f)=>{const{width:d,height:S,pixelRatio:R}=this.main.sizes,w=R*h,P=R*p;let v=t.get(f);if(!v||!v.down)return;const B=d/S;v.prevTexcoordX=v.texcoordX,v.prevTexcoordY=v.texcoordY,v.texcoordX=w/d,v.texcoordY=1-P/S,v.deltaX=v.texcoordX-v.prevTexcoordX,B<1&&(v.deltaX*=B),v.deltaY=v.texcoordY-v.prevTexcoordY,B<1&&(v.deltaY*=B),v.moved=Math.abs(v.deltaX)>0||Math.abs(v.deltaY)>0},x=(h,p,f)=>{let d=t.get(f);!d||(d.down=!1,d.moved=!1,t.delete(d.id))};return{pointers:t,splatStack:i,init:a,update:o,multipleSplats:c,randomSplats:()=>{i.push(G.random(5,25,1))}}})());r(this,"helper",(()=>({init:()=>{const t=this.main,i=this.main.guiHelper.ui,a=this,{config:o}=this;i.width=300;const s=i.addFolder("App"),n=s.add({is:!1},"is").name("On/Off Render").onFinishChange(d=>d?t.render():t.paused());s.add(o,"PAUSED").name("Paused ");const u=i.addFolder("Config");u.add({val:o.SIM_RESOLUTION},"val",[16,32,64,128,256,512,1024]).name("Simulation Map VMin").onFinishChange(d=>{o.SIM_RESOLUTION=parseInt(d),a.isNeedInit=!0}),u.add({val:o.DYE_RESOLUTION},"val",[16,32,64,128,256,512,1024,2048]).name("Color Map VMin").onFinishChange(d=>{o.DYE_RESOLUTION=parseInt(d),a.isNeedInit=!0}),u.add({val:!1},"val").name("Color Ration Dissipation").onFinishChange(d=>{d?(c.min(.001),c.max(2),c.setValue(.01),a.advectionDyeProgram.fragmentShader.keywords.add("ADVECTION_DYE")):(c.min(0),c.max(4),c.setValue(1),a.advectionDyeProgram.fragmentShader.keywords.delete("ADVECTION_DYE")),a.advectionDyeProgram.update()});const c=u.add(o,"DENSITY_DISSIPATION",0,4,.001).name("Color Dissipation"),m=u.add(o,"VELOCITY_DISSIPATION",0,100).name("Velocity Dissipation"),l=u.add(o,"PRESSURE",0,1).name("Pressure");u.add(o,"CURL",0,50).name("Vorticity").step(1);const x=u.add({val:o.STEP_SPEED},"val",.001,5,.001).name("Time Speed").onFinishChange(d=>o.STEP_SPEED=parseFloat(d));u.add(o,"SPLAT_RADIUS",.01,1).name("splat radius"),u.add(o,"TRANSPARENT").name("Bg Transparent"),u.add(o,"DRAW_CHECKERBOARD").name("Checkerboard"),u.add(a.interacts,"randomSplats").name("Random Splats");const T=i.addFolder("Shading");T.add(o,"SHADING").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("SHADING"),a.displayMaterial.update()}),T.add(o,"SHADING_WIDTH",0,100,1).name("Shading Width"),i.addFolder("Bloom").add(o,"BLOOM").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("BLOOM"),a.displayMaterial.update()});const p=i.addFolder("Sunrays");p.add(o,"SUNRAYS").name("enabled").onFinishChange(d=>{a.displayMaterial.fragmentShader.keywords.toggle("SUNRAYS"),a.displayMaterial.update()}),p.add(o,"SUNRAYS_WEIGHT",.3,1).name("weight"),s.open(),n.setValue(!0),u.open(),i.addFolder("Preset").add({fun:()=>{c.setValue(.1),m.setValue(12),l.setValue(.15),x.setValue(4.5)}},"fun").name("\u8367\u5149\u679C\u51BB")}}))());r(this,"test",()=>{this.sizes.update({viewWidth:128,viewHeight:128,fit:A.Fit_None})});r(this,"untest",()=>{});this.main=e,this.time=e.time,this.sizes=e.sizes,this.gl=t;const i=this.config,a=this.glExt=new me(t),o=new k(t,`
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
    }`),s=new E(t,`
    precision mediump float;

    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }
`),n=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }`),u=new E(t,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }`),c=new E(t,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }`),m=new E(t,`
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
    }`),l=new E(t,`
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
    
    }`,a.supportLinearFiltering?void 0:["MANUAL_FILTERING"]),x=new E(t,l.source,[]),T=new E(t,`
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
    }`,(()=>{const I=[];return i.BLOOM&&I.push("BLOOM"),i.SHADING&&I.push("SHADING"),i.SUNRAYS&&I.push("SUNRAYS"),I})()),h=new E(t,`
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
    }`),p=new E(t,`
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
    }`),f=new E(t,`
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
  }`),d=new E(t,`
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
    }`),S=new E(t,`
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
    }`),R=new E(t,`
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
    }`),w=new E(t,`
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
    }`),v=new E(t,`
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
    }`),B=new E(t,`
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D uTexture;
  
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }`),j=new E(t,`
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
    }`),J=new k(t,`
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
    }`),Q=new E(t,`
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
    `);this.testProgram=new g(t,o,s),this.copyProgram=new g(t,o,n),this.overProgram=new g(t,o,u),this.colorProgram=new g(t,o,c),this.checkerboardProgram=new g(t,o,R),this.bloomPrefilterProgram=new g(t,o,w),this.bloomBlurProgram=new g(t,o,P),this.bloomFinalProgram=new g(t,o,v),this.blurProgram=new g(t,J,Q),this.sunraysMaskProgram=new g(t,o,B),this.sunraysProgram=new g(t,o,j),this.splatProgram=new g(t,o,m),this.advectionProgram=new g(t,o,l),this.advectionDyeProgram=new g(t,o,x),this.curlProgram=new g(t,o,h),this.vorticityProgram=new g(t,o,p),this.divergenceProgram=new g(t,o,f),this.pressureProgram=new g(t,o,d),this.gradienSubtractProgram=new g(t,o,S),this.displayMaterial=new le(t,o,T)}}const he=W({name:"index",setup(y){const e=te();return ie(()=>{const t=e.value,i=new F(t);re(()=>i.destroy())}),(t,i)=>(q(),K("div",{class:"viewContainer",ref_key:"viewContainer",ref:e},null,512))}});var ve=$(he,[["__scopeId","data-v-51726860"],["__file","/Volumes/Work/l00 Studio/l00/source/src/magics-components/simulation-fluid/fluid/index.vue"]]);const de={class:"main"},pe=W({name:"index",setup(y){return(e,t)=>(q(),K("div",de,[H(ae,null,{default:oe(()=>[H(ve)]),_:1})]))}});var Fe=$(pe,[["__file","/Volumes/Work/l00 Studio/l00/source/src/magics-components/simulation-fluid/index.vue"]]);export{Fe as default};
