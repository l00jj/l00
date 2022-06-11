/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
/* import * as vue from 'vue';

// https://stackoverflow.com/questions/66461748/vue-3-typescript-jsx-and-img-loading-lazy-give-error-property-loading
// Fix: Property 'loading' does not exist on type 'ElementAttrs<ImgHTMLAttributes>'
declare module "@vue/runtime-dom" {

  interface HTMLAttributes {
    dataName?: string;
    //[propName:string]:string
  }

  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: "lazy" | "eager" | "auto";
  }

} */