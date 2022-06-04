import * as dat from "dat.gui";

import Experience from "../Experience";

export class Debug {
    experience: Experience
    active = false
    ui?: dat.GUI

    constructor(experience: Experience) {
        // Setup
        this.experience = experience

        // Is need debug?
        if (window.location.hash.includes('debug'))
            this.toActive()
    }

    toActive() {
        this.active = true
        this.ui = new dat.GUI()
        this.fixGui()
    }

    fixGui() {
        const viewArea: HTMLElement = this.experience.viewArea;
        const guiParentEl: HTMLElement = this.ui?.domElement.parentElement!;
        viewArea.appendChild(guiParentEl);
        guiParentEl.style.position = "absolute";// 如长页面，可以不需要这个
    }


    toWindowTest() {
        ; (window as any).testExperience = this.experience;
    }

    destroy() {
        this.ui?.destroy()
        delete (window as any).testExperience;
    }

}

export * from "dat.gui";