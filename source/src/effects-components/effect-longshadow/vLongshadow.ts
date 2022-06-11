import { ref, isRef, reactive, isReactive, computed, Directive, DirectiveBinding, watchEffect, WatchStopHandle } from "vue";
import { EventEmitter } from "@src/utils/EventEmitter";

const map = new WeakMap()

export default class DirectiveLongshadow {
  el: HTMLElement
  binding: DirectiveBinding
  constructor(el: HTMLElement, binding: DirectiveBinding) {
    this.el = el
    this.binding = binding
    this.setEffect();
  }
  //parameter

  stopEffect!: WatchStopHandle
  setEffect() {
    const el = this.el
    const parameter = this.binding.value
    const flag = this.binding.arg
    //
    const froundFix = (input: number, n: number) => ((n = 10 ** n), Math.round(input * n) / n); //保留小数
    const shadowText = (cosX: number, sinY: number, length: number, color: string) =>
      `${froundFix(cosX * length, 2)}px ${froundFix(sinY * length, 2)}px 0.25px ${color}`
    //
    this.stopEffect = watchEffect(() => {
      //
      const color = isRef(parameter.color) ? parameter.color.value : parameter.color ? parameter.color : `rgba(0,0,0,0.5)`
      const angle = isRef(parameter.angle) ? parameter.angle.value : parameter.angle ? parameter.angle : 45
      const length = isRef(parameter.length) ? parameter.length.value : parameter.length ? parameter.length : 1000
      const step = isRef(parameter.step) ? parameter.step.value : parameter.step ? parameter.step : 1 //步进，0.5更细腻

      //
      const radian = angle * Math.PI / 180
      const cosX = Math.cos(radian)
      const sinY = Math.sin(radian)

      //
      let shadow = shadowText(cosX, sinY, step, color)
      for (let i = step; i < length; i += step)
        shadow += ',' + shadowText(cosX, sinY, i, color)

      //
      if (flag === 'text') {
        el.style.textShadow = shadow;
      } else {
        el.style.boxShadow = shadow;
      }
    })
  }

  unmount() {
    this.stopEffect()
  }
}


export const vLongshadow = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const directive = new DirectiveLongshadow(el, binding)
    map.set(el, directive)
  },
  unmounted(el: HTMLElement) {
    const directive = map.get(el)
    if (directive) directive.unmount()
  }
}