var Et=Object.defineProperty;var Mt=(st,a,k)=>a in st?Et(st,a,{enumerable:!0,configurable:!0,writable:!0,value:k}):st[a]=k;var lt=(st,a,k)=>(Mt(st,typeof a!="symbol"?a+"":a,k),k);import{L as kt,F as pt,H as Tt,x as gt,ao as ct,V as z,ad as St,ap as Ct,aq as Nt,ar as Lt,as as ht,at as yt,ak as it}from"./OrbitControls-ce38456d.js";const dt=new WeakMap;class Gt extends kt{constructor(a){super(a),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(a){return this.decoderPath=a,this}setDecoderConfig(a){return this.decoderConfig=a,this}setWorkerLimit(a){return this.workerLimit=a,this}load(a,k,T,y){const h=new pt(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(a,p=>{const R={attributeIDs:this.defaultAttributeIDs,attributeTypes:this.defaultAttributeTypes,useUniqueIDs:!1};this.decodeGeometry(p,R).then(k).catch(y)},T,y)}decodeDracoFile(a,k,T,y){const h={attributeIDs:T||this.defaultAttributeIDs,attributeTypes:y||this.defaultAttributeTypes,useUniqueIDs:!!T};this.decodeGeometry(a,h).then(k)}decodeGeometry(a,k){for(const D in k.attributeTypes){const V=k.attributeTypes[D];V.BYTES_PER_ELEMENT!==void 0&&(k.attributeTypes[D]=V.name)}const T=JSON.stringify(k);if(dt.has(a)){const D=dt.get(a);if(D.key===T)return D.promise;if(a.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let y;const h=this.workerNextTaskID++,p=a.byteLength,R=this._getWorker(h,p).then(D=>(y=D,new Promise((V,_)=>{y._callbacks[h]={resolve:V,reject:_},y.postMessage({type:"decode",id:h,taskConfig:k,buffer:a},[a])}))).then(D=>this._createGeometry(D.geometry));return R.catch(()=>!0).then(()=>{y&&h&&this._releaseTask(y,h)}),dt.set(a,{key:T,promise:R}),R}_createGeometry(a){const k=new Tt;a.index&&k.setIndex(new gt(a.index.array,1));for(let T=0;T<a.attributes.length;T++){const y=a.attributes[T],h=y.name,p=y.array,R=y.itemSize;k.setAttribute(h,new gt(p,R))}return k}_loadLibrary(a,k){const T=new pt(this.manager);return T.setPath(this.decoderPath),T.setResponseType(k),T.setWithCredentials(this.withCredentials),new Promise((y,h)=>{T.load(a,y,void 0,h)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const a=typeof WebAssembly!="object"||this.decoderConfig.type==="js",k=[];return a?k.push(this._loadLibrary("draco_decoder.js","text")):(k.push(this._loadLibrary("draco_wasm_wrapper.js","text")),k.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(k).then(T=>{const y=T[0];a||(this.decoderConfig.wasmBinary=T[1]);const h=Rt.toString(),p=["/* draco decoder */",y,"","/* worker */",h.substring(h.indexOf("{")+1,h.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([p]))}),this.decoderPending}_getWorker(a,k){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const y=new Worker(this.workerSourceURL);y._callbacks={},y._taskCosts={},y._taskLoad=0,y.postMessage({type:"init",decoderConfig:this.decoderConfig}),y.onmessage=function(h){const p=h.data;switch(p.type){case"decode":y._callbacks[p.id].resolve(p);break;case"error":y._callbacks[p.id].reject(p);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+p.type+'"')}},this.workerPool.push(y)}else this.workerPool.sort(function(y,h){return y._taskLoad>h._taskLoad?-1:1});const T=this.workerPool[this.workerPool.length-1];return T._taskCosts[a]=k,T._taskLoad+=k,T})}_releaseTask(a,k){a._taskLoad-=a._taskCosts[k],delete a._callbacks[k],delete a._taskCosts[k]}debug(){console.log("Task load: ",this.workerPool.map(a=>a._taskLoad))}dispose(){for(let a=0;a<this.workerPool.length;++a)this.workerPool[a].terminate();return this.workerPool.length=0,this}}function Rt(){let st,a;onmessage=function(p){const R=p.data;switch(R.type){case"init":st=R.decoderConfig,a=new Promise(function(_){st.onModuleLoaded=function(C){_({draco:C})},DracoDecoderModule(st)});break;case"decode":const D=R.buffer,V=R.taskConfig;a.then(_=>{const C=_.draco,N=new C.Decoder,v=new C.DecoderBuffer;v.Init(new Int8Array(D),D.byteLength);try{const U=k(C,N,v,V),F=U.attributes.map(u=>u.array.buffer);U.index&&F.push(U.index.array.buffer),self.postMessage({type:"decode",id:R.id,geometry:U},F)}catch(U){console.error(U),self.postMessage({type:"error",id:R.id,error:U.message})}finally{C.destroy(v),C.destroy(N)}});break}};function k(p,R,D,V){const _=V.attributeIDs,C=V.attributeTypes;let N,v;const U=R.GetEncodedGeometryType(D);if(U===p.TRIANGULAR_MESH)N=new p.Mesh,v=R.DecodeBufferToMesh(D,N);else if(U===p.POINT_CLOUD)N=new p.PointCloud,v=R.DecodeBufferToPointCloud(D,N);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!v.ok()||N.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+v.error_msg());const F={index:null,attributes:[]};for(const u in _){const I=self[C[u]];let B,b;if(V.useUniqueIDs)b=_[u],B=R.GetAttributeByUniqueId(N,b);else{if(b=R.GetAttributeId(N,p[_[u]]),b===-1)continue;B=R.GetAttribute(N,b)}F.attributes.push(y(p,R,N,u,I,B))}return U===p.TRIANGULAR_MESH&&(F.index=T(p,R,N)),p.destroy(N),F}function T(p,R,D){const _=D.num_faces()*3,C=_*4,N=p._malloc(C);R.GetTrianglesUInt32Array(D,C,N);const v=new Uint32Array(p.HEAPF32.buffer,N,_).slice();return p._free(N),{array:v,itemSize:1}}function y(p,R,D,V,_,C){const N=C.num_components(),U=D.num_points()*N,F=U*_.BYTES_PER_ELEMENT,u=h(p,_),I=p._malloc(F);R.GetAttributeDataArrayForAllPoints(D,C,u,F,I);const B=new _(p.HEAPF32.buffer,I,U).slice();return p._free(I),{name:V,array:B,itemSize:N}}function h(p,R){switch(R){case Float32Array:return p.DT_FLOAT32;case Int8Array:return p.DT_INT8;case Int16Array:return p.DT_INT16;case Int32Array:return p.DT_INT32;case Uint8Array:return p.DT_UINT8;case Uint16Array:return p.DT_UINT16;case Uint32Array:return p.DT_UINT32}}}class wt extends kt{constructor(a){super(a),this.defaultDPI=90,this.defaultUnit="px"}load(a,k,T,y){const h=this,p=new pt(h.manager);p.setPath(h.path),p.setRequestHeader(h.requestHeader),p.setWithCredentials(h.withCredentials),p.load(a,function(R){try{k(h.parse(R))}catch(D){y?y(D):console.error(D),h.manager.itemError(a)}},T,y)}parse(a){const k=this;function T(i,o){if(i.nodeType!==1)return;const t=m(i);let r=!1,c=null;switch(i.nodeName){case"svg":break;case"style":h(i);break;case"g":o=U(i,o);break;case"path":o=U(i,o),i.hasAttribute("d")&&(c=y(i));break;case"rect":o=U(i,o),c=D(i);break;case"polygon":o=U(i,o),c=V(i);break;case"polyline":o=U(i,o),c=_(i);break;case"circle":o=U(i,o),c=C(i);break;case"ellipse":o=U(i,o),c=N(i);break;case"line":o=U(i,o),c=v(i);break;case"defs":r=!0;break;case"use":o=U(i,o);const S=(i.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),w=i.viewportElement.getElementById(S);w?T(w,o):console.warn("SVGLoader: 'use node' references non-existent node id: "+S);break}c&&(o.fill!==void 0&&o.fill!=="none"&&c.color.setStyle(o.fill),G(c,$),J.push(c),c.userData={node:i,style:o});const s=i.childNodes;for(let l=0;l<s.length;l++){const S=s[l];r&&S.nodeName!=="style"&&S.nodeName!=="defs"||T(S,o)}t&&(P.pop(),P.length>0?$.copy(P[P.length-1]):$.identity())}function y(i){const o=new it,t=new z,r=new z,c=new z;let s=!0,l=!1;const w=i.getAttribute("d").match(/[a-df-z][^a-df-z]*/ig);for(let M=0,g=w.length;M<g;M++){const q=w[M],d=q.charAt(0),x=q.slice(1).trim();s===!0&&(l=!0,s=!1);let n;switch(d){case"M":n=u(x);for(let e=0,A=n.length;e<A;e+=2)t.x=n[e+0],t.y=n[e+1],r.x=t.x,r.y=t.y,e===0?o.moveTo(t.x,t.y):o.lineTo(t.x,t.y),e===0&&c.copy(t);break;case"H":n=u(x);for(let e=0,A=n.length;e<A;e++)t.x=n[e],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"V":n=u(x);for(let e=0,A=n.length;e<A;e++)t.y=n[e],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"L":n=u(x);for(let e=0,A=n.length;e<A;e+=2)t.x=n[e+0],t.y=n[e+1],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"C":n=u(x);for(let e=0,A=n.length;e<A;e+=6)o.bezierCurveTo(n[e+0],n[e+1],n[e+2],n[e+3],n[e+4],n[e+5]),r.x=n[e+2],r.y=n[e+3],t.x=n[e+4],t.y=n[e+5],e===0&&l===!0&&c.copy(t);break;case"S":n=u(x);for(let e=0,A=n.length;e<A;e+=4)o.bezierCurveTo(F(t.x,r.x),F(t.y,r.y),n[e+0],n[e+1],n[e+2],n[e+3]),r.x=n[e+0],r.y=n[e+1],t.x=n[e+2],t.y=n[e+3],e===0&&l===!0&&c.copy(t);break;case"Q":n=u(x);for(let e=0,A=n.length;e<A;e+=4)o.quadraticCurveTo(n[e+0],n[e+1],n[e+2],n[e+3]),r.x=n[e+0],r.y=n[e+1],t.x=n[e+2],t.y=n[e+3],e===0&&l===!0&&c.copy(t);break;case"T":n=u(x);for(let e=0,A=n.length;e<A;e+=2){const W=F(t.x,r.x),K=F(t.y,r.y);o.quadraticCurveTo(W,K,n[e+0],n[e+1]),r.x=W,r.y=K,t.x=n[e+0],t.y=n[e+1],e===0&&l===!0&&c.copy(t)}break;case"A":n=u(x,[3,4],7);for(let e=0,A=n.length;e<A;e+=7){if(n[e+5]==t.x&&n[e+6]==t.y)continue;const W=t.clone();t.x=n[e+5],t.y=n[e+6],r.x=t.x,r.y=t.y,p(o,n[e],n[e+1],n[e+2],n[e+3],n[e+4],W,t),e===0&&l===!0&&c.copy(t)}break;case"m":n=u(x);for(let e=0,A=n.length;e<A;e+=2)t.x+=n[e+0],t.y+=n[e+1],r.x=t.x,r.y=t.y,e===0?o.moveTo(t.x,t.y):o.lineTo(t.x,t.y),e===0&&c.copy(t);break;case"h":n=u(x);for(let e=0,A=n.length;e<A;e++)t.x+=n[e],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"v":n=u(x);for(let e=0,A=n.length;e<A;e++)t.y+=n[e],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"l":n=u(x);for(let e=0,A=n.length;e<A;e+=2)t.x+=n[e+0],t.y+=n[e+1],r.x=t.x,r.y=t.y,o.lineTo(t.x,t.y),e===0&&l===!0&&c.copy(t);break;case"c":n=u(x);for(let e=0,A=n.length;e<A;e+=6)o.bezierCurveTo(t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3],t.x+n[e+4],t.y+n[e+5]),r.x=t.x+n[e+2],r.y=t.y+n[e+3],t.x+=n[e+4],t.y+=n[e+5],e===0&&l===!0&&c.copy(t);break;case"s":n=u(x);for(let e=0,A=n.length;e<A;e+=4)o.bezierCurveTo(F(t.x,r.x),F(t.y,r.y),t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3]),r.x=t.x+n[e+0],r.y=t.y+n[e+1],t.x+=n[e+2],t.y+=n[e+3],e===0&&l===!0&&c.copy(t);break;case"q":n=u(x);for(let e=0,A=n.length;e<A;e+=4)o.quadraticCurveTo(t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3]),r.x=t.x+n[e+0],r.y=t.y+n[e+1],t.x+=n[e+2],t.y+=n[e+3],e===0&&l===!0&&c.copy(t);break;case"t":n=u(x);for(let e=0,A=n.length;e<A;e+=2){const W=F(t.x,r.x),K=F(t.y,r.y);o.quadraticCurveTo(W,K,t.x+n[e+0],t.y+n[e+1]),r.x=W,r.y=K,t.x=t.x+n[e+0],t.y=t.y+n[e+1],e===0&&l===!0&&c.copy(t)}break;case"a":n=u(x,[3,4],7);for(let e=0,A=n.length;e<A;e+=7){if(n[e+5]==0&&n[e+6]==0)continue;const W=t.clone();t.x+=n[e+5],t.y+=n[e+6],r.x=t.x,r.y=t.y,p(o,n[e],n[e+1],n[e+2],n[e+3],n[e+4],W,t),e===0&&l===!0&&c.copy(t)}break;case"Z":case"z":o.currentPath.autoClose=!0,o.currentPath.curves.length>0&&(t.copy(c),o.currentPath.currentPoint.copy(t),s=!0);break;default:console.warn(q)}l=!1}return o}function h(i){if(!(!i.sheet||!i.sheet.cssRules||!i.sheet.cssRules.length))for(let o=0;o<i.sheet.cssRules.length;o++){const t=i.sheet.cssRules[o];if(t.type!==1)continue;const r=t.selectorText.split(/,/gm).filter(Boolean).map(c=>c.trim());for(let c=0;c<r.length;c++){const s=Object.fromEntries(Object.entries(t.style).filter(([,l])=>l!==""));X[r[c]]=Object.assign(X[r[c]]||{},s)}}}function p(i,o,t,r,c,s,l,S){if(o==0||t==0){i.lineTo(S.x,S.y);return}r=r*Math.PI/180,o=Math.abs(o),t=Math.abs(t);const w=(l.x-S.x)/2,M=(l.y-S.y)/2,g=Math.cos(r)*w+Math.sin(r)*M,q=-Math.sin(r)*w+Math.cos(r)*M;let d=o*o,x=t*t;const n=g*g,e=q*q,A=n/d+e/x;if(A>1){const bt=Math.sqrt(A);o=bt*o,t=bt*t,d=o*o,x=t*t}const W=d*e+x*n,K=(d*x-W)/W;let et=Math.sqrt(Math.max(0,K));c===s&&(et=-et);const rt=et*o*q/t,at=-et*t*g/o,At=Math.cos(r)*rt-Math.sin(r)*at+(l.x+S.x)/2,It=Math.sin(r)*rt+Math.cos(r)*at+(l.y+S.y)/2,mt=R(1,0,(g-rt)/o,(q-at)/t),Pt=R((g-rt)/o,(q-at)/t,(-g-rt)/o,(-q-at)/t)%(Math.PI*2);i.currentPath.absellipse(At,It,o,t,mt,mt+Pt,s===0,r)}function R(i,o,t,r){const c=i*t+o*r,s=Math.sqrt(i*i+o*o)*Math.sqrt(t*t+r*r);let l=Math.acos(Math.max(-1,Math.min(1,c/s)));return i*r-o*t<0&&(l=-l),l}function D(i){const o=b(i.getAttribute("x")||0),t=b(i.getAttribute("y")||0),r=b(i.getAttribute("rx")||i.getAttribute("ry")||0),c=b(i.getAttribute("ry")||i.getAttribute("rx")||0),s=b(i.getAttribute("width")),l=b(i.getAttribute("height")),S=1-.551915024494,w=new it;return w.moveTo(o+r,t),w.lineTo(o+s-r,t),(r!==0||c!==0)&&w.bezierCurveTo(o+s-r*S,t,o+s,t+c*S,o+s,t+c),w.lineTo(o+s,t+l-c),(r!==0||c!==0)&&w.bezierCurveTo(o+s,t+l-c*S,o+s-r*S,t+l,o+s-r,t+l),w.lineTo(o+r,t+l),(r!==0||c!==0)&&w.bezierCurveTo(o+r*S,t+l,o,t+l-c*S,o,t+l-c),w.lineTo(o,t+c),(r!==0||c!==0)&&w.bezierCurveTo(o,t+c*S,o+r*S,t,o+r,t),w}function V(i){function o(s,l,S){const w=b(l),M=b(S);c===0?r.moveTo(w,M):r.lineTo(w,M),c++}const t=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,r=new it;let c=0;return i.getAttribute("points").replace(t,o),r.currentPath.autoClose=!0,r}function _(i){function o(s,l,S){const w=b(l),M=b(S);c===0?r.moveTo(w,M):r.lineTo(w,M),c++}const t=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,r=new it;let c=0;return i.getAttribute("points").replace(t,o),r.currentPath.autoClose=!1,r}function C(i){const o=b(i.getAttribute("cx")||0),t=b(i.getAttribute("cy")||0),r=b(i.getAttribute("r")||0),c=new ht;c.absarc(o,t,r,0,Math.PI*2);const s=new it;return s.subPaths.push(c),s}function N(i){const o=b(i.getAttribute("cx")||0),t=b(i.getAttribute("cy")||0),r=b(i.getAttribute("rx")||0),c=b(i.getAttribute("ry")||0),s=new ht;s.absellipse(o,t,r,c,0,Math.PI*2);const l=new it;return l.subPaths.push(s),l}function v(i){const o=b(i.getAttribute("x1")||0),t=b(i.getAttribute("y1")||0),r=b(i.getAttribute("x2")||0),c=b(i.getAttribute("y2")||0),s=new it;return s.moveTo(o,t),s.lineTo(r,c),s.currentPath.autoClose=!1,s}function U(i,o){o=Object.assign({},o);let t={};if(i.hasAttribute("class")){const l=i.getAttribute("class").split(/\s/).filter(Boolean).map(S=>S.trim());for(let S=0;S<l.length;S++)t=Object.assign(t,X["."+l[S]])}i.hasAttribute("id")&&(t=Object.assign(t,X["#"+i.getAttribute("id")]));function r(l,S,w){w===void 0&&(w=function(g){return g.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),g}),i.hasAttribute(l)&&(o[S]=w(i.getAttribute(l))),t[l]&&(o[S]=w(t[l])),i.style&&i.style[l]!==""&&(o[S]=w(i.style[l]))}function c(l){return Math.max(0,Math.min(1,b(l)))}function s(l){return Math.max(0,b(l))}return r("fill","fill"),r("fill-opacity","fillOpacity",c),r("fill-rule","fillRule"),r("opacity","opacity",c),r("stroke","stroke"),r("stroke-opacity","strokeOpacity",c),r("stroke-width","strokeWidth",s),r("stroke-linejoin","strokeLineJoin"),r("stroke-linecap","strokeLineCap"),r("stroke-miterlimit","strokeMiterLimit",s),r("visibility","visibility"),o}function F(i,o){return i-(o-i)}function u(i,o,t){if(typeof i!="string")throw new TypeError("Invalid input: "+typeof i);const r={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},c=0,s=1,l=2,S=3;let w=c,M=!0,g="",q="";const d=[];function x(W,K,et){const rt=new SyntaxError('Unexpected character "'+W+'" at index '+K+".");throw rt.partial=et,rt}function n(){g!==""&&(q===""?d.push(Number(g)):d.push(Number(g)*Math.pow(10,Number(q)))),g="",q=""}let e;const A=i.length;for(let W=0;W<A;W++){if(e=i[W],Array.isArray(o)&&o.includes(d.length%t)&&r.FLAGS.test(e)){w=s,g=e,n();continue}if(w===c){if(r.WHITESPACE.test(e))continue;if(r.DIGIT.test(e)||r.SIGN.test(e)){w=s,g=e;continue}if(r.POINT.test(e)){w=l,g=e;continue}r.COMMA.test(e)&&(M&&x(e,W,d),M=!0)}if(w===s){if(r.DIGIT.test(e)){g+=e;continue}if(r.POINT.test(e)){g+=e,w=l;continue}if(r.EXP.test(e)){w=S;continue}r.SIGN.test(e)&&g.length===1&&r.SIGN.test(g[0])&&x(e,W,d)}if(w===l){if(r.DIGIT.test(e)){g+=e;continue}if(r.EXP.test(e)){w=S;continue}r.POINT.test(e)&&g[g.length-1]==="."&&x(e,W,d)}if(w===S){if(r.DIGIT.test(e)){q+=e;continue}if(r.SIGN.test(e)){if(q===""){q+=e;continue}q.length===1&&r.SIGN.test(q)&&x(e,W,d)}}r.WHITESPACE.test(e)?(n(),w=c,M=!1):r.COMMA.test(e)?(n(),w=c,M=!0):r.SIGN.test(e)?(n(),w=s,g=e):r.POINT.test(e)?(n(),w=l,g=e):x(e,W,d)}return n(),d}const I=["mm","cm","in","pt","pc","px"],B={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function b(i){let o="px";if(typeof i=="string"||i instanceof String)for(let r=0,c=I.length;r<c;r++){const s=I[r];if(i.endsWith(s)){o=s,i=i.substring(0,i.length-s.length);break}}let t;return o==="px"&&k.defaultUnit!=="px"?t=B.in[k.defaultUnit]/k.defaultDPI:(t=B[o][k.defaultUnit],t<0&&(t=B[o].in*k.defaultDPI)),t*parseFloat(i)}function m(i){if(!(i.hasAttribute("transform")||i.nodeName==="use"&&(i.hasAttribute("x")||i.hasAttribute("y"))))return null;const o=E(i);return P.length>0&&o.premultiply(P[P.length-1]),$.copy(o),P.push(o),o}function E(i){const o=new ct,t=Z;if(i.nodeName==="use"&&(i.hasAttribute("x")||i.hasAttribute("y"))){const r=b(i.getAttribute("x")),c=b(i.getAttribute("y"));o.translate(r,c)}if(i.hasAttribute("transform")){const r=i.getAttribute("transform").split(")");for(let c=r.length-1;c>=0;c--){const s=r[c].trim();if(s==="")continue;const l=s.indexOf("("),S=s.length;if(l>0&&l<S){const w=s.slice(0,l),M=u(s.slice(l+1));switch(t.identity(),w){case"translate":if(M.length>=1){const g=M[0];let q=g;M.length>=2&&(q=M[1]),t.translate(g,q)}break;case"rotate":if(M.length>=1){let g=0,q=0,d=0;g=-M[0]*Math.PI/180,M.length>=3&&(q=M[1],d=M[2]),Y.identity().translate(-q,-d),tt.identity().rotate(g),nt.multiplyMatrices(tt,Y),Y.identity().translate(q,d),t.multiplyMatrices(Y,nt)}break;case"scale":if(M.length>=1){const g=M[0];let q=g;M.length>=2&&(q=M[1]),t.scale(g,q)}break;case"skewX":M.length===1&&t.set(1,Math.tan(M[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":M.length===1&&t.set(1,0,0,Math.tan(M[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":M.length===6&&t.set(M[0],M[2],M[4],M[1],M[3],M[5],0,0,1);break}}o.premultiply(t)}}return o}function G(i,o){function t(s){f.set(s.x,s.y,1).applyMatrix3(o),s.set(f.x,f.y)}const r=j(o),c=i.subPaths;for(let s=0,l=c.length;s<l;s++){const w=c[s].curves;for(let M=0;M<w.length;M++){const g=w[M];g.isLineCurve?(t(g.v1),t(g.v2)):g.isCubicBezierCurve?(t(g.v0),t(g.v1),t(g.v2),t(g.v3)):g.isQuadraticBezierCurve?(t(g.v0),t(g.v1),t(g.v2)):g.isEllipseCurve&&(r&&console.warn("SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented."),L.set(g.aX,g.aY),t(L),g.aX=L.x,g.aY=L.y,g.xRadius*=O(o),g.yRadius*=H(o))}}}function j(i){return i.elements[1]!==0||i.elements[3]!==0}function O(i){const o=i.elements;return Math.sqrt(o[0]*o[0]+o[1]*o[1])}function H(i){const o=i.elements;return Math.sqrt(o[3]*o[3]+o[4]*o[4])}const J=[],X={},P=[],Z=new ct,Y=new ct,tt=new ct,nt=new ct,L=new z,f=new St,$=new ct,Q=new DOMParser().parseFromString(a,"image/svg+xml");return T(Q.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:J,xml:Q.documentElement}}static createShapes(a){const T={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},y={loc:T.ORIGIN,t:0};function h(u,I,B,b){const m=u.x,E=I.x,G=B.x,j=b.x,O=u.y,H=I.y,J=B.y,X=b.y,P=(j-G)*(O-J)-(X-J)*(m-G),Z=(E-m)*(O-J)-(H-O)*(m-G),Y=(X-J)*(E-m)-(j-G)*(H-O),tt=P/Y,nt=Z/Y;if(Y===0&&P!==0||tt<=0||tt>=1||nt<0||nt>1)return null;if(P===0&&Y===0){for(let L=0;L<2;L++)if(p(L===0?B:b,u,I),y.loc==T.ORIGIN){const f=L===0?B:b;return{x:f.x,y:f.y,t:y.t}}else if(y.loc==T.BETWEEN){const f=+(m+y.t*(E-m)).toPrecision(10),$=+(O+y.t*(H-O)).toPrecision(10);return{x:f,y:$,t:y.t}}return null}else{for(let $=0;$<2;$++)if(p($===0?B:b,u,I),y.loc==T.ORIGIN){const Q=$===0?B:b;return{x:Q.x,y:Q.y,t:y.t}}const L=+(m+tt*(E-m)).toPrecision(10),f=+(O+tt*(H-O)).toPrecision(10);return{x:L,y:f,t:tt}}}function p(u,I,B){const b=B.x-I.x,m=B.y-I.y,E=u.x-I.x,G=u.y-I.y,j=b*G-E*m;if(u.x===I.x&&u.y===I.y){y.loc=T.ORIGIN,y.t=0;return}if(u.x===B.x&&u.y===B.y){y.loc=T.DESTINATION,y.t=1;return}if(j<-Number.EPSILON){y.loc=T.LEFT;return}if(j>Number.EPSILON){y.loc=T.RIGHT;return}if(b*E<0||m*G<0){y.loc=T.BEHIND;return}if(Math.sqrt(b*b+m*m)<Math.sqrt(E*E+G*G)){y.loc=T.BEYOND;return}let O;b!==0?O=E/b:O=G/m,y.loc=T.BETWEEN,y.t=O}function R(u,I){const B=[],b=[];for(let m=1;m<u.length;m++){const E=u[m-1],G=u[m];for(let j=1;j<I.length;j++){const O=I[j-1],H=I[j],J=h(E,G,O,H);J!==null&&B.find(X=>X.t<=J.t+Number.EPSILON&&X.t>=J.t-Number.EPSILON)===void 0&&(B.push(J),b.push(new z(J.x,J.y)))}}return b}function D(u,I,B){const b=new z;I.getCenter(b);const m=[];return B.forEach(E=>{E.boundingBox.containsPoint(b)&&R(u,E.points).forEach(j=>{m.push({identifier:E.identifier,isCW:E.isCW,point:j})})}),m.sort((E,G)=>E.point.x-G.point.x),m}function V(u,I,B,b,m){(m==null||m==="")&&(m="nonzero");const E=new z;u.boundingBox.getCenter(E);const G=[new z(B,E.y),new z(b,E.y)],j=D(G,u.boundingBox,I);j.sort((Z,Y)=>Z.point.x-Y.point.x);const O=[],H=[];j.forEach(Z=>{Z.identifier===u.identifier?O.push(Z):H.push(Z)});const J=O[0].point.x,X=[];let P=0;for(;P<H.length&&H[P].point.x<J;)X.length>0&&X[X.length-1]===H[P].identifier?X.pop():X.push(H[P].identifier),P++;if(X.push(u.identifier),m==="evenodd"){const Z=X.length%2===0,Y=X[X.length-2];return{identifier:u.identifier,isHole:Z,for:Y}}else if(m==="nonzero"){let Z=!0,Y=null,tt=null;for(let nt=0;nt<X.length;nt++){const L=X[nt];Z?(tt=I[L].isCW,Z=!1,Y=L):tt!==I[L].isCW&&(tt=I[L].isCW,Z=!0)}return{identifier:u.identifier,isHole:Z,for:Y}}else console.warn('fill-rule: "'+m+'" is currently not implemented.')}let _=0,C=999999999,N=-999999999,v=a.subPaths.map(u=>{const I=u.getPoints();let B=-999999999,b=999999999,m=-999999999,E=999999999;for(let G=0;G<I.length;G++){const j=I[G];j.y>B&&(B=j.y),j.y<b&&(b=j.y),j.x>m&&(m=j.x),j.x<E&&(E=j.x)}return N<=m&&(N=m+1),C>=E&&(C=E-1),{curves:u.curves,points:I,isCW:Ct.isClockWise(I),identifier:_++,boundingBox:new Nt(new z(E,b),new z(m,B))}});v=v.filter(u=>u.points.length>1);const U=v.map(u=>V(u,v,C,N,a.userData.style.fillRule)),F=[];return v.forEach(u=>{if(!U[u.identifier].isHole){const B=new Lt;B.curves=u.curves,U.filter(m=>m.isHole&&m.for===u.identifier).forEach(m=>{const E=v[m.identifier],G=new ht;G.curves=E.curves,B.holes.push(G)}),F.push(B)}}),F}static getStrokeStyle(a,k,T,y,h){return a=a!==void 0?a:1,k=k!==void 0?k:"#000",T=T!==void 0?T:"miter",y=y!==void 0?y:"butt",h=h!==void 0?h:4,{strokeColor:k,strokeWidth:a,strokeLineJoin:T,strokeLineCap:y,strokeMiterLimit:h}}static pointsToStroke(a,k,T,y){const h=[],p=[],R=[];if(wt.pointsToStrokeWithBuffers(a,k,T,y,h,p,R)===0)return null;const D=new Tt;return D.setAttribute("position",new yt(h,3)),D.setAttribute("normal",new yt(p,3)),D.setAttribute("uv",new yt(R,2)),D}static pointsToStrokeWithBuffers(a,k,T,y,h,p,R,D){const V=new z,_=new z,C=new z,N=new z,v=new z,U=new z,F=new z,u=new z,I=new z,B=new z,b=new z,m=new z,E=new z,G=new z,j=new z,O=new z,H=new z;T=T!==void 0?T:12,y=y!==void 0?y:.001,D=D!==void 0?D:0,a=q(a);const J=a.length;if(J<2)return 0;const X=a[0].equals(a[J-1]);let P,Z=a[0],Y;const tt=k.strokeWidth/2,nt=1/(J-1);let L=0,f,$,Q,ot,i=!1,o=0,t=D*3,r=D*2;c(a[0],a[1],V).multiplyScalar(tt),u.copy(a[0]).sub(V),I.copy(a[0]).add(V),B.copy(u),b.copy(I);for(let d=1;d<J;d++){P=a[d],d===J-1?X?Y=a[1]:Y=void 0:Y=a[d+1];const x=V;if(c(Z,P,x),C.copy(x).multiplyScalar(tt),m.copy(P).sub(C),E.copy(P).add(C),f=L+nt,$=!1,Y!==void 0){c(P,Y,_),C.copy(_).multiplyScalar(tt),G.copy(P).sub(C),j.copy(P).add(C),Q=!0,C.subVectors(Y,Z),x.dot(C)<0&&(Q=!1),d===1&&(i=Q),C.subVectors(Y,P),C.normalize();const n=Math.abs(x.dot(C));if(n!==0){const e=tt/n;C.multiplyScalar(-e),N.subVectors(P,Z),v.copy(N).setLength(e).add(C),O.copy(v).negate();const A=v.length(),W=N.length();N.divideScalar(W),U.subVectors(Y,P);const K=U.length();switch(U.divideScalar(K),N.dot(O)<W&&U.dot(O)<K&&($=!0),H.copy(v).add(P),O.add(P),ot=!1,$?Q?(j.copy(O),E.copy(O)):(G.copy(O),m.copy(O)):S(),k.strokeLineJoin){case"bevel":w(Q,$,f);break;case"round":M(Q,$),Q?l(P,m,G,f,0):l(P,j,E,f,1);break;case"miter":case"miter-clip":default:const et=tt*k.strokeMiterLimit/A;if(et<1)if(k.strokeLineJoin!=="miter-clip"){w(Q,$,f);break}else M(Q,$),Q?(U.subVectors(H,m).multiplyScalar(et).add(m),F.subVectors(H,G).multiplyScalar(et).add(G),s(m,f,0),s(U,f,0),s(P,f,.5),s(P,f,.5),s(U,f,0),s(F,f,0),s(P,f,.5),s(F,f,0),s(G,f,0)):(U.subVectors(H,E).multiplyScalar(et).add(E),F.subVectors(H,j).multiplyScalar(et).add(j),s(E,f,1),s(U,f,1),s(P,f,.5),s(P,f,.5),s(U,f,1),s(F,f,1),s(P,f,.5),s(F,f,1),s(j,f,1));else $?(Q?(s(I,L,1),s(u,L,0),s(H,f,0),s(I,L,1),s(H,f,0),s(O,f,1)):(s(I,L,1),s(u,L,0),s(H,f,1),s(u,L,0),s(O,f,0),s(H,f,1)),Q?G.copy(H):j.copy(H)):Q?(s(m,f,0),s(H,f,0),s(P,f,.5),s(P,f,.5),s(H,f,0),s(G,f,0)):(s(E,f,1),s(H,f,1),s(P,f,.5),s(P,f,.5),s(H,f,1),s(j,f,1)),ot=!0;break}}else S()}else S();!X&&d===J-1&&g(a[0],B,b,Q,!0,L),L=f,Z=P,u.copy(G),I.copy(j)}if(!X)g(P,m,E,Q,!1,f);else if($&&h){let d=H,x=O;i!==Q&&(d=O,x=H),Q?(ot||i)&&(x.toArray(h,0*3),x.toArray(h,3*3),ot&&d.toArray(h,1*3)):(ot||!i)&&(x.toArray(h,1*3),x.toArray(h,3*3),ot&&d.toArray(h,0*3))}return o;function c(d,x,n){return n.subVectors(x,d),n.set(-n.y,n.x).normalize()}function s(d,x,n){h&&(h[t]=d.x,h[t+1]=d.y,h[t+2]=0,p&&(p[t]=0,p[t+1]=0,p[t+2]=1),t+=3,R&&(R[r]=x,R[r+1]=n,r+=2)),o+=3}function l(d,x,n,e,A){V.copy(x).sub(d).normalize(),_.copy(n).sub(d).normalize();let W=Math.PI;const K=V.dot(_);Math.abs(K)<1&&(W=Math.abs(Math.acos(K))),W/=T,C.copy(x);for(let et=0,rt=T-1;et<rt;et++)N.copy(C).rotateAround(d,W),s(C,e,A),s(N,e,A),s(d,e,.5),C.copy(N);s(N,e,A),s(n,e,A),s(d,e,.5)}function S(){s(I,L,1),s(u,L,0),s(m,f,0),s(I,L,1),s(m,f,1),s(E,f,0)}function w(d,x,n){x?d?(s(I,L,1),s(u,L,0),s(m,f,0),s(I,L,1),s(m,f,0),s(O,f,1),s(m,n,0),s(G,n,0),s(O,n,.5)):(s(I,L,1),s(u,L,0),s(E,f,1),s(u,L,0),s(O,f,0),s(E,f,1),s(E,n,1),s(j,n,0),s(O,n,.5)):d?(s(m,n,0),s(G,n,0),s(P,n,.5)):(s(E,n,1),s(j,n,0),s(P,n,.5))}function M(d,x){x&&(d?(s(I,L,1),s(u,L,0),s(m,f,0),s(I,L,1),s(m,f,0),s(O,f,1),s(m,L,0),s(P,f,.5),s(O,f,1),s(P,f,.5),s(G,L,0),s(O,f,1)):(s(I,L,1),s(u,L,0),s(E,f,1),s(u,L,0),s(O,f,0),s(E,f,1),s(E,L,1),s(O,f,0),s(P,f,.5),s(P,f,.5),s(O,f,0),s(j,L,1)))}function g(d,x,n,e,A,W){switch(k.strokeLineCap){case"round":A?l(d,n,x,W,.5):l(d,x,n,W,.5);break;case"square":if(A)V.subVectors(x,d),_.set(V.y,-V.x),C.addVectors(V,_).add(d),N.subVectors(_,V).add(d),e?(C.toArray(h,1*3),N.toArray(h,0*3),N.toArray(h,3*3)):(C.toArray(h,1*3),C.toArray(h,3*3),N.toArray(h,0*3));else{V.subVectors(n,d),_.set(V.y,-V.x),C.addVectors(V,_).add(d),N.subVectors(_,V).add(d);const K=h.length;e?(C.toArray(h,K-1*3),N.toArray(h,K-2*3),N.toArray(h,K-4*3)):(C.toArray(h,K-2*3),N.toArray(h,K-1*3),N.toArray(h,K-4*3))}break}}function q(d){let x=!1;for(let e=1,A=d.length-1;e<A;e++)if(d[e].distanceTo(d[e+1])<y){x=!0;break}if(!x)return d;const n=[];n.push(d[0]);for(let e=1,A=d.length-1;e<A;e++)d[e].distanceTo(d[e+1])>=y&&n.push(d[e]);return n.push(d[d.length-1]),n}}}const xt="/l00/",Ot=window.location.href,ft=class{constructor(a){lt(this,"url");a=a[0]==="/"?"."+a:a,this.url=new URL(a,ft.completebase).href}};let ut=ft;lt(ut,"base",xt),lt(ut,"locationUrl",Ot),lt(ut,"completebase",new URL(xt,ft.locationUrl).href);export{Gt as D,ut as P,wt as S};
