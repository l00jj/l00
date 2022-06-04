import * as THREE from "THREE";

import Experience from "../Experience";
import { Debug, GUI } from "../Utils/Debug";

export default class AxesHelper {
    experience: Experience
    scene: THREE.Scene

    // Debug
    debug: Debug
    debugFolder?: GUI

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene

        //Debug
        this.debug = this.experience.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('AxesHelper')
            this.debugFolder?.open()
            this.setAxesHelper()
        }
    }

    isShowAxesHelper = true
    axesHelper?: THREE.AxesHelper
    setAxesHelper() {
        this.axesHelper = new THREE.AxesHelper(1)
        this.toggleAxesHelper();
        this.debugFolder?.add(this, "isShowAxesHelper").onChange((value) => {
            this.toggleAxesHelper();
        });
    }

    toggleAxesHelper(handle?: boolean) {
        const change = typeof handle === "boolean" ? handle : this.isShowAxesHelper;
        if (change) this.scene.add(this.axesHelper!);
        else this.scene.remove(this.axesHelper!);
    }

}