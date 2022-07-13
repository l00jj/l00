import { th } from "element-plus/lib/locale";
import * as THREE from "THREE";

import { Main, AddDebug, GUI } from "../All"

export class GuiCameraHelper {
    main: Main
    scene: THREE.Scene

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene

        //Debug
        this.addDebug = this.main.debug.addFolder('CameraHelper')
        this.setHelper()
    }

    isControlCamera = true
    setHelper() {
        this.isControlCamera = this.main.camera.controls.enabled
        
        // Debug
        this.addDebug((folder: GUI) => {
            folder.open()
            folder.add(this, "isControlCamera").onChange((value) => {
                this.toggleHelper(value);
            });
        })

        // Controler
        this.addDebug((folder: GUI) => {
            const camera = this.main.camera
            folder.add(camera.instance.position, 'y').name('positionY')
                .min(-10).max(10).step(0.001)
            folder.add(camera.instance.position, 'z').name('positionZ')
                .min(-10).max(10).step(0.001)

            // 1 - position (0, 1.45, -1.5) lookAt (0, 1.45, 0)
            // 1 - position (0, 0.33, -3.3) lookAt (0, 1.11, 0)

            folder.add(camera.controls.target, 'x').name('lookAtX')
                .min(-5).max(5).step(0.001)
            folder.add(camera.controls.target, 'y').name('lookAtY')
                .min(-5).max(5).step(0.001)
            folder.add(camera.controls.target, 'z').name('lookAtZ')
                .min(-5).max(5).step(0.001)
            //

        })
    }

    toggleHelper(handle: boolean) {
        this.main.canvas.style.pointerEvents = handle ? 'unset' : '';
        this.main.camera.controls.enabled = handle ? true : false
    }

}