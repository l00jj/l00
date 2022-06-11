import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Main, Sizes } from "./All"

export default class Camera {
    main: Main
    sizes: Sizes
    scene: THREE.Scene
    canvas: HTMLElement
    instance!: THREE.PerspectiveCamera
    controls!: OrbitControls

    constructor(main: Main) {
        this.main = main
        this.sizes = this.main.sizes
        this.scene = this.main.scene
        this.canvas = this.main.canvas

        this.setInstance()
        this.setOrbitControls()

    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(8, 2, -4)
        this.instance.lookAt(0, 0, 0);
        this.scene.add(this.instance)
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