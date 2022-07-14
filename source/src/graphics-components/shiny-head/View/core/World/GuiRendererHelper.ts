import * as THREE from "THREE";

import { Main, AddDebug, GUI } from "../All"

export class GuiRendererHelper {
    main: Main
    scene: THREE.Scene

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene

        //Debug
        this.addDebug = this.main.debug.addFolder('RendererHelper')
        this.setControler()
    }

    setControler() {
        // Debug Scene
        const palette = { color: 0x000000 };
        this.scene.background = new THREE.Color(palette.color)
        this.addDebug((folder: GUI) => {
            folder.addColor(palette, "color").name('Scene Color').onChange(() => {
                (this.scene.background as THREE.Color).setHex(palette.color)
            })
            folder.open()
        })

        // Debug Renderer
        const passesList = this.main.renderer.rendererEffect?.effectComposer.passes
        this.addDebug((folder: GUI) => {
            passesList?.forEach(passes => {
                if (passes && passes.constructor?.name)
                    folder.add(passes, "enabled").name(passes.constructor.name)
            })
            folder.open()
        })

    }
}