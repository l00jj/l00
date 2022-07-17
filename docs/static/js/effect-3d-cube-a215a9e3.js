var B=Object.defineProperty;var E=(n,s,e)=>s in n?B(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var h=(n,s,e)=>(E(n,typeof s!="symbol"?s+"":s,e),e);import{M as u,U as I,d as A,r as g,c as L,D as R,h as H,i as $,l as v,o as m,b as C,e as p,n as y,F as T,x as W,u as O,p as k,g as N,a as P,w as x,s as D,f as U}from"./vendor-612724a7.js";import{V as M,a as Q}from"./EffectsProjectView_Item-106fc335.js";import{E as X}from"./EventEmitter-05980808.js";import{_ as S}from"./plugin-vue_export-helper-4223c0cf.js";const j="dg",r=I.dom;(()=>{let n;for(let s=0;s<document.styleSheets.length;s++){const e=document.styleSheets[s];for(let t=0;s<e.cssRules.length;s++)e.cssRules[t].cssText.startsWith(".dg ul")&&(n=e)}n&&(n.insertRule(".dg ul li.title { position: sticky; top: 0; }"),n.insertRule(".dg.main > ul { overflow: hidden scroll; }"))})();class f extends X{constructor(e={}){super();h(this,"ui");h(this,"viewDom");h(this,"__resize_handle");const t=Object.assign({autoPlace:!1},e);this.ui=new u(t)}appendGuiTo(e){this.viewDom=e;const t=window.document.createElement("div");r.addClass(t,j),r.addClass(t,u.CLASS_AUTO_PLACE_CONTAINER),t.style.position="absolute";const o=this.ui.domElement;r.addClass(o,u.CLASS_AUTO_PLACE),r.addClass(o,"taller-than-window"),t.appendChild(o),e.appendChild(t),this.atViewAreaResize(),f.onResizeObserve(e,this),f.addResizeHandle(this)}atViewAreaResize(){const e=this.viewDom,t=this.ui.domElement,o=t.querySelector("ul"),l=t.querySelector(".close-button");if(e&&o&&l){const c=e.offsetHeight-l.offsetHeight*2;o.style.maxHeight=`${c}px`}}static onResizeObserve(e,t){if(window.ResizeObserver){const o=new ResizeObserver(l=>t.atViewAreaResize());o.observe(e),t.onDestroyed(()=>o.disconnect())}else{const o=()=>t.atViewAreaResize();window.addEventListener("resize",o),t.onDestroyed(()=>window.removeEventListener("resize",o))}}static addResizeHandle(e){const t=e.ui,o={extend(d,_){Object.assign(d,_)}};var l=0;t.__resize_handle=document.createElement("div"),o.extend(t.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function c(d){return d.preventDefault(),t.width+=l-d.clientX,t.onResize(),l=d.clientX,!1}function a(){r.removeClass(t.__closeButton,u.CLASS_DRAG),r.unbind(window,"mousemove",c),r.unbind(window,"mouseup",a)}function i(d){return d.preventDefault(),l=d.clientX,r.addClass(t.__closeButton,u.CLASS_DRAG),r.bind(window,"mousemove",c),r.bind(window,"mouseup",a),!1}r.bind(t.__resize_handle,"mousedown",i),r.bind(t.__closeButton,"mousedown",i),t.domElement.insertBefore(t.__resize_handle,t.domElement.firstElementChild)}onDestroyed(e){return this.once("destroyed",e)}destroy(){var e;(e=this.ui)==null||e.destroy(),this.emit("destroyed")}}const b=n=>(k("data-v-06bbb1b4"),n=n(),N(),n),G={class:"container"},q=b(()=>p("div",{class:"base"},null,-1)),J=b(()=>p("i",null,null,-1)),K=b(()=>p("i",null,null,-1)),Y=[J,K],Z=A({name:"l00-3DCube-D",setup(n){const s=g({stepQuantity:6,stepWidth:300,stepHeight:60,stepLength:60,stepTopFaceColor:"#cf8df1",stepFrontFaceColor:"#ae52dd",stairsBothFaceColor:"#a54bcf"}),e=g({"--stepWidth":"0px","--stepWidthHalf":"0px","--stepHeight":"0px","--stepLength":"0px","--stairsHeight":"0px","--stairsLength":"0px","--stairsLengthHalf":"0px","--stepTopFaceColor":"#f00","--stepFrontFaceColor":"#f00","--stairsBothFaceColor":"#f00"}),t=L(()=>Array(s.stepQuantity).fill(0).map((c,a)=>({style:`--index:${a};`}))),o=R(()=>{const{stepQuantity:c,stepWidth:a,stepHeight:i,stepLength:d,stepTopFaceColor:_,stepFrontFaceColor:V,stairsBothFaceColor:F}=s,w=d*c,z=i*c;e["--stepWidth"]=`${a}px`,e["--stepWidthHalf"]=`${a/2}px`,e["--stepHeight"]=`${i}px`,e["--stepLength"]=`${d}px`,e["--stairsHeight"]=`${z}px`,e["--stairsLength"]=`${w}px`,e["--stairsLengthHalf"]=`${w/2}px`,e["--stepTopFaceColor"]=`${_}`,e["--stepFrontFaceColor"]=`${V}`,e["--stairsBothFaceColor"]=`${F}`}),l=H();return $(()=>{const c=l.value,a=new f;a.appendGuiTo(c),console.log(a),v(()=>a.destroy());const i=a.ui.addFolder("stairs");i.addColor(s,"stepFrontFaceColor"),i.addColor(s,"stairsBothFaceColor"),i.addColor(s,"stepTopFaceColor"),i.add(s,"stepQuantity").min(3).max(30).step(1),i.add(s,"stepWidth").min(50).max(500).step(1),i.add(s,"stepHeight").min(10).max(100).step(1),i.add(s,"stepLength").min(10).max(100).step(1),i.open()}),v(()=>o()),(c,a)=>(m(),C("section",{class:"background",ref_key:"viewArea",ref:l},[p("div",G,[p("div",{class:"stairs",style:y(e)},[q,(m(!0),C(T,null,W(O(t),i=>(m(),C("div",{class:"step",style:y(i.style)},Y,4))),256))],4)])],512))}});var ee=S(Z,[["__scopeId","data-v-06bbb1b4"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/l00-3DCube-D.vue"]]);const te=A({name:"effect-3d-cube",setup(n){return(s,e)=>(m(),P(Q,null,{default:x(()=>[D(M,{style:{height:"80vh"},name:"effect-3d-cube-d"},{default:x(()=>[D(ee)]),_:1}),U(` 
    <ViewItem style="height: 80vh" name="effect-3d-cube-b">
      <Cube3DB></Cube3DB>
    </ViewItem>

  

    <ViewItem style="height: 80vh" name="effect-3d-cube-a">
      <Cube3DA></Cube3DA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-c">
      <Cube3DCardC></Cube3DCardC>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-button-b">
      <Cube3DButtonB></Cube3DButtonB>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-card-a">
      <Cube3DCardA></Cube3DCardA>
    </ViewItem>

    <ViewItem style="height: 80vh" name="effect-3d-cube-button-a">
      <Cube3DButtonA text="welcome"></Cube3DButtonA>
    </ViewItem>

    <ViewItem style="height: 95vh" name="effect-3d-cube-cage-a">
      <Cube3DCageA></Cube3DCageA>
    </ViewItem> `)]),_:1}))}});var re=S(te,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/effect-3d-cube/effect-3d-cube.vue"]]);export{re as default};
