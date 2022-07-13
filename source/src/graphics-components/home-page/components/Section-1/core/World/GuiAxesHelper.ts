import * as THREE from "THREE";

import { Main, AddDebug, GUI } from "../All"

export class GuiAxesHelper {
    main: Main
    scene: THREE.Scene

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene

        //Debug
        this.addDebug = this.main.debug.addFolder('AxesHelper')
        this.setAxesHelper()
    }

    isShowAxesHelper = true
    axesHelper?: THREE.AxesHelper
    setAxesHelper() {
        // Debug
        this.addDebug((folder: GUI) => {
            this.axesHelper = new THREE.AxesHelper(1)
            this.toggleAxesHelper();

            folder.open()
            folder.add(this, "isShowAxesHelper").onChange((value) => {
                this.toggleAxesHelper();
            });
        })
    }

    toggleAxesHelper(handle?: boolean) {
        const change = typeof handle === "boolean" ? handle : this.isShowAxesHelper;
        if (change) this.scene.add(this.axesHelper!);
        else this.scene.remove(this.axesHelper!);
    }

}