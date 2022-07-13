import * as THREE from "THREE";

import { Main, AddDebug, GUI } from "../All"

export class GuiCssHelper {
    main: Main
    scene: THREE.Scene

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene

        //Debug
        this.addDebug = this.main.debug.addFolder('CssHelper')
        this.setControler()
        this.toggleControler()
    }

    isShowBorder = true
    setControler() {
        // Debug
        this.addDebug((folder: GUI) => {
            folder.add(this, "isShowBorder").onChange((value) => {
                this.toggleControler(value);
            });
        })
    }

    toggleControler(handle?: boolean) {
        if (this.isShowBorder) {

        } else {

        }

    }

}