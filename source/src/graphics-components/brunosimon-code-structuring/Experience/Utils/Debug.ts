import * as dat from "dat.gui";

export class Debug {
    active: boolean
    ui?: dat.GUI

    constructor() {
        this.active = window.location.hash.includes('debug')

        if (this.active) {
            this.ui = new dat.GUI()
        }
    }
}

export * from "dat.gui";