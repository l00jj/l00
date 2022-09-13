import{d as _,h as a,o as h,b as V,e,ad as A,bt as C,j as t,a as g,w as p,s as v}from"./vendor-cabe9347.js";import{V as x,a as y}from"./EffectsProjectView_Item-efb20932.js";import{_ as m}from"./plugin-vue_export-helper-4223c0cf.js";const H={class:"background"},B={class:"container"},I={class:"inputbox"},N=["type"],P={class:"validation"},S=_({name:"l00-ValidationCheck-A",setup(f){const o=a(""),l=a(!0),k=()=>l.value=!l.value,c=a(!1),n=a(!1),i=a(!1),r=a(!1),u=a(!1),b=()=>{const s=o.value;c.value=/(?=.*[a-z])/.test(s),n.value=/(?=.*[A-Z])/.test(s),i.value=/(?=.*[0-9])/.test(s),r.value=/(?=.*[\!\@\#\$\%\^\&\*])/.test(s),u.value=/^.{8,16}$/.test(s)};return(s,d)=>(h(),V("section",H,[e("div",B,[e("div",I,[A(e("input",{type:l.value?"password":"text",autocomplete:"off",placeholder:"Password","onUpdate:modelValue":d[0]||(d[0]=w=>o.value=w),onInput:b},null,40,N),[[C,o.value]]),e("span",{class:t(["togglebtn",{password:l.value}]),onClick:k},null,2)]),e("div",P,[e("ul",null,[e("li",{class:t({valid:c.value})},"At least one lowercase character",2),e("li",{class:t({valid:n.value})},"At least one uppercase character",2),e("li",{class:t({valid:i.value})},"At least one number",2),e("li",{class:t({valid:r.value})},"At least one special character",2),e("li",{class:t({valid:u.value})},"At least 8 and no more than 16 characters",2)])])])]))}});var $=m(S,[["__scopeId","data-v-6cc4db54"],["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/base-input-validation-check/l00-ValidationCheck-A.vue"]]);const z=_({name:"base-input-validation-check",setup(f){return(o,l)=>(h(),g(y,null,{default:p(()=>[v(x,{style:{height:"100vh"},name:"base-input-validation-check-a"},{default:p(()=>[v($)]),_:1})]),_:1}))}});var W=m(z,[["__file","/Volumes/Work/l00 Studio/l00/source/src/effects-components/base-input-validation-check/base-input-validation-check.vue"]]);export{W as default};
