import{w as F,F as w,x as T}from"./OrbitControls-67945ad9.js";class E extends F{constructor(t){super(t)}load(t,e,o,p){const s=this,a=new w(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(s.withCredentials),a.load(t,function(i){let c;try{c=JSON.parse(i)}catch{console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),c=JSON.parse(i.substring(65,i.length-2))}const h=s.parse(c);e&&e(h)},o,p)}parse(t){return new m(t)}}class m{constructor(t){this.type="Font",this.data=t}generateShapes(t,e=100){const o=[],p=k(t,e,this.data);for(let s=0,a=p.length;s<a;s++)Array.prototype.push.apply(o,p[s].toShapes());return o}}function k(y,t,e){const o=Array.from(y),p=t/e.resolution,s=(e.boundingBox.yMax-e.boundingBox.yMin+e.underlineThickness)*p,a=[];let i=0,c=0;for(let h=0;h<o.length;h++){const u=o[h];if(u===`
`)i=0,c-=s;else{const l=S(u,p,i,c,e);i+=l.offsetX,a.push(l.path)}}return a}function S(y,t,e,o,p){const s=p.glyphs[y]||p.glyphs["?"];if(!s){console.error('THREE.Font: character "'+y+'" does not exists in font family '+p.familyName+".");return}const a=new T;let i,c,h,u,l,d,g,b;if(s.o){const n=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let r=0,x=n.length;r<x;)switch(n[r++]){case"m":i=n[r++]*t+e,c=n[r++]*t+o,a.moveTo(i,c);break;case"l":i=n[r++]*t+e,c=n[r++]*t+o,a.lineTo(i,c);break;case"q":h=n[r++]*t+e,u=n[r++]*t+o,l=n[r++]*t+e,d=n[r++]*t+o,a.quadraticCurveTo(l,d,h,u);break;case"b":h=n[r++]*t+e,u=n[r++]*t+o,l=n[r++]*t+e,d=n[r++]*t+o,g=n[r++]*t+e,b=n[r++]*t+o,a.bezierCurveTo(l,d,g,b,h,u);break}}return{offsetX:s.ha*t,path:a}}m.prototype.isFont=!0;export{E as F};
