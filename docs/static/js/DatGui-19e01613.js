var f=Object.defineProperty;var p=(i,o,t)=>o in i?f(i,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[o]=t;var c=(i,o,t)=>(p(i,typeof o!="symbol"?o+"":o,t),t);import{N as l,O as _}from"./vendor-f8719ffa.js";import{E as g}from"./EventEmitter-80978bd8.js";const v="dg",n=_.dom;(()=>{let i;for(let o=0;o<document.styleSheets.length;o++){const t=document.styleSheets[o];for(let e=0;o<t.cssRules.length;o++)t.cssRules[e].cssText.startsWith(".dg ul")&&(i=t)}i&&(i.insertRule(".dg ul li.title { position: sticky; top: 0; }"),i.insertRule(".dg.main > ul { overflow: hidden scroll; }"))})();class u extends g{constructor(t={}){super();c(this,"ui");c(this,"viewDom");c(this,"__resize_handle");const e=Object.getPrototypeOf(t).constructor;if(e===window.HTMLElement||e===window.HTMLDivElement)this.ui=new l({autoPlace:!1}),this.appendGuiTo(t);else{const s=Object.assign({autoPlace:!1},t);this.ui=new l(s)}}appendGuiTo(t){this.viewDom=t;const e=window.document.createElement("div");n.addClass(e,v),n.addClass(e,l.CLASS_AUTO_PLACE_CONTAINER),e.style.position="absolute";const s=this.ui.domElement;n.addClass(s,l.CLASS_AUTO_PLACE),n.addClass(s,"taller-than-window"),e.appendChild(s),t.appendChild(e),this.atViewAreaResize(),u.onResizeObserve(t,this),u.addResizeHandle(this)}atViewAreaResize(){const t=this.viewDom,e=this.ui.domElement,s=e.querySelector("ul"),r=e.querySelector(".close-button");if(t&&s&&r){const a=t.offsetHeight-r.offsetHeight*2;s.style.maxHeight=`${a}px`}}static onResizeObserve(t,e){if(window.ResizeObserver){const s=new ResizeObserver(r=>e.atViewAreaResize());s.observe(t),e.onDestroyed(()=>s.disconnect())}else{const s=()=>e.atViewAreaResize();window.addEventListener("resize",s),e.onDestroyed(()=>window.removeEventListener("resize",s))}}static addResizeHandle(t){const e=t.ui,s={extend(d,w){Object.assign(d,w)}};var r=0;e.__resize_handle=document.createElement("div"),s.extend(e.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function a(d){return d.preventDefault(),e.width+=r-d.clientX,e.onResize(),r=d.clientX,!1}function m(){n.removeClass(e.__closeButton,l.CLASS_DRAG),n.unbind(window,"mousemove",a),n.unbind(window,"mouseup",m)}function h(d){return d.preventDefault(),r=d.clientX,n.addClass(e.__closeButton,l.CLASS_DRAG),n.bind(window,"mousemove",a),n.bind(window,"mouseup",m),!1}n.bind(e.__resize_handle,"mousedown",h),n.bind(e.__closeButton,"mousedown",h),e.domElement.insertBefore(e.__resize_handle,e.domElement.firstElementChild)}onDestroyed(t){return this.once("destroyed",t)}destroy(){var t;(t=this.ui)==null||t.destroy(),this.emit("destroyed")}}export{u as D};
