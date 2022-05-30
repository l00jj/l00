import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Experience from "./Experience";
import Sizes from "./Utils/Sizes";

export default class Camera {
    experience: Experience
    sizes: Sizes
    scence: THREE.Scene
    canvas: HTMLElement
    instance!: THREE.PerspectiveCamera
    controls!: OrbitControls

    constructor(experience: Experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scence = this.experience.scence
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scence.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}