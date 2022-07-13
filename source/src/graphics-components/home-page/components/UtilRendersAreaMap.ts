export class RendersAreaMap {
  intersectionObserver?: IntersectionObserver;
  map = new WeakMap();
  renders = new Set()
  constructor() {
    if (window.IntersectionObserver) this.intersectionObserver = new window.IntersectionObserver(this.onIntersecte);
  }

  onIntersecte = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    //console.log(entries);
    for (let entrie of entries) {
      const render = this.map.get(entrie.target);
      if (render) {
        if (entrie.isIntersecting) {
          render.render();
          // console.log('play', render)
        } else {
          render.pausedRender();
          // console.log('paused', render)
        }
      }
    }
  };

  set(element: HTMLElement, render: any) {
    this.renders.add(render)
    this.map.set(element, render);
    this.map.set(render, element);
    this.intersectionObserver?.observe(element);
    //
    render.onDestroyed(() => this.delete(element, render))
  }
  delete(element: HTMLElement, render: any) {
    const targetElement = this.map.get(render);
    targetElement && this.intersectionObserver?.unobserve(targetElement);
    this.map.delete(element);
    this.map.delete(targetElement);
    this.map.delete(render);
    this.renders.delete(render)
  }
  destroy() {
    this.intersectionObserver?.disconnect();
  }
}