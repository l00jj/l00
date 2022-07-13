import EventEmitter from "./Section-1/core/Utils/EventEmitter"

export class LoadingManager extends EventEmitter {
    viewList = new Set()

    loaded = 0
    loadTotal = 0

    constructor() {
        super()
    }
    add(view: any) {
        if (!this.viewList.has(view)) {
            this.viewList.add(view)
            view.resources.onProgress(() => this.progress())
            view.resources.onReady(() => this.someReady())
            view.onDestroyed(() => this.viewList.delete(view))
        }
    }

    someReady() {
        for (let view of this.viewList) {
            if (!(view as any).resources.isReady) return;
        }
        this.emit('ready')
    }

    onReady(onReadyFunction: Function) {
        return this.once('ready', onReadyFunction)
    }

    progress() {
        // Summary
        let sumLoaded = 0
        let sumLoadTotal = 0
        this.viewList.forEach(view => {
            sumLoaded += (view as any).resources.loaded as number
            sumLoadTotal += (view as any).resources.loadTotal as number
        })
        this.loaded = sumLoaded
        this.loadTotal = sumLoadTotal

        console.log("loaded", this.loaded, "loadTotal", this.loadTotal)
    }

    destroy() {

    }
}