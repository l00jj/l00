import * as dat from "dat.gui";

import { Main } from "../All"

export * from "dat.gui";

export type debugFunction = (debugFolder: dat.GUI) => void
export type AddDebug = (debugFunction: debugFunction) => void

export default class Debug {
    main: Main

    constructor(main: Main) {
        // Setup
        this.main = main

        // Is need debug?
        if (window.location.hash.includes('debug'))
            this.active()
    }

    isActive = false
    ui?: dat.GUI
    active() { // 以后有需要可以改装为动态插入 Debug
        this.isActive = true
        this.ui = new dat.GUI()
        this.fixGui()
        this.toWindowTest()
    }

    fixGui() {
        const viewArea: HTMLElement = this.main.viewArea;
        const guiParentEl: HTMLElement = this.ui?.domElement.parentElement!;
        viewArea.appendChild(guiParentEl);
        guiParentEl.style.position = "absolute";// 如长页面，可以不需要这个
    }


    toWindowTest() {
        ; (window as any).debugView = this.main;
    }


    addFolder(name: string): AddDebug { // 以后有需要可以改装为动态插入 Debug，当前为一次性检测与插入
        if (!this.ui || !(this.ui instanceof dat.GUI)) return (debugFunction: debugFunction) => { };
        const folder = this.ui!.addFolder(name);
        return (debugFunction: debugFunction) => {
            debugFunction(folder)
        }
    }

    destroy() {
        this.ui?.destroy()
        delete (window as any).debugView;
    }

}

