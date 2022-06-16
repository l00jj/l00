import * as THREE from "THREE";

import { Main, GUI, Sizes, Time, Resources, GLTFModel, Texture, Renderer, World, sources } from "../All"

export default class PatternPlane {
    main: Main
    scene: THREE.Scene
    resources: Resources
    time: Time

    // Debug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time

        //Debug
        //this.addDebug = this.main.debug.addFolder('Model')

        // Setup
        this.setPatternPlane()
    }

    patternPlane!: THREE.Mesh
    setPatternPlane() {
        // Geometry
        const geometry = new THREE.PlaneBufferGeometry(2, 2, 32, 32)

        // Material
        const material = new THREE.ShaderMaterial({
            vertexShader: `
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
            fragmentShader: `
void main()
{
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}`,
            side: THREE.DoubleSide
        })

        // Mesh
        this.patternPlane = new THREE.Mesh(geometry, material)

        //this.model.scale.set(2, 2, 2)
        //this.model.rotation.z = - Math.PI * 0.5;
        this.scene.add(this.patternPlane)
    }

    animation: any
    setAnimation() {

    }

    update() {
        //this.updateMaterial()
        //this.animation.mixer.update(this.time.delta * 0.001)
    }
}