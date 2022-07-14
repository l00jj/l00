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
    isNeedUpdate = false

    constructor(main: Main) {
        this.main = main
        this.sizes = this.main.sizes
        this.scene = this.main.scene
        this.canvas = this.main.canvas

        this.setInstance()
        this.setOrbitControls()

    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 0, -1.5)
        this.instance.lookAt(0, 0, 0);
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.main.viewControlsArea)
        this.controls.target = new THREE.Vector3(0, 0, 0)
        this.controls.enableDamping = true
        this.controls.enabled = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.isNeedUpdate = this.controls.update()
    }
}