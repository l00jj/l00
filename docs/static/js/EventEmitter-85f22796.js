var _=Object.defineProperty;var o=(r,e,t)=>e in r?_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var n=(r,e,t)=>(o(r,typeof e!="symbol"?e+"":e,t),t);class m{constructor(e,t){n(this,"function");n(this,"isOnce");this.function=e,this.isOnce=t.isOnce?t.isOnce:!1}}class a{constructor(){n(this,"__emittersMap__",new WeakMap);n(this,"__emitters__",new Map)}on(e,t){if((typeof e=="symbol"||typeof e=="string"&&e!=="")&&typeof t=="function"){let s=this.__emitters__.get(e);if(s||(s=new Set,this.__emitters__.set(e,s)),this.__emittersMap__.has(t))return!1;{const i=new m(t,{isOnce:!1});this.__emittersMap__.set(t,i),s.add(i)}return!0}else return!1}once(e,t){if(this.on(e,t)){const s=this.__emittersMap__.get(t);if(!s)return!1;s.isOnce=!0}else return!1;return!0}off(e,t){const s=this.__emitters__.get(e);if(!s)return!1;const i=this.__emittersMap__.get(t);return i?(this.__emittersMap__.delete(t),s.delete(i),s.size===0&&this.__emitters__.delete(e),!0):!1}offAll(e){const t=this.__emitters__.get(e);return t?(t.clear(),this.__emitters__.delete(e),!0):!1}clearEvents(){return this.__emitters__.clear(),!0}async emit(e,...t){const s=this.__emitters__.get(e);if(!!s)for(let i of s){try{await i.function.apply(void 0,t)}catch(f){console.error(f)}i.isOnce&&this.off(e,i.function)}}}export{a as E};
