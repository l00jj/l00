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

    isControlCamera = false
    setHelper() {
        // Debug
        this.addDebug((folder: GUI) => {
            folder.add(this, "isControlCamera").onChange((value) => {
                this.toggleHelper(value);
            });
        })
    }

    toggleHelper(handle: boolean) {
        console.log(handle)
        if(handle){

        }else{
      
        }
    }

}