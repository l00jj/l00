import * as THREE from "THREE";

import { Main, AddDebug, GUI, Resources, CubeTexture } from "../All"

export default class Environment {
    main: Main
    scene: THREE.Scene
    sunLight!: THREE.DirectionalLight
    resources: Resources

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        //Debug
        this.addDebug = this.main.debug.addFolder('environment')

        //this.setSunLight()
        //this.setEnvironmentMap()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, -1.25)
        this.scene.add(this.sunLight)

        // Debug
        this.addDebug((folder: GUI) => {
            folder.add(this.sunLight, 'intensity').name('sunLightIntensity')
                .min(0).max(10).step(0.001)

            folder.add(this.sunLight.position, 'x').name('sunLightX')
                .min(-5).max(5).step(0.001)

            folder.add(this.sunLight.position, 'y').name('sunLightY')
                .min(-5).max(5).step(0.001)

            folder.add(this.sunLight.position, 'z').name('sunLightZ')
                .min(-5).max(5).step(0.001)
        })
    }

    environmentMap!: {
        intensity: number
        texture: CubeTexture
        updateMaterials: Function
    }
    setEnvironmentMap() {
        (this.environmentMap as any) = {}

        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture as CubeTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        this.addDebug((folder: GUI) => {
            folder.add(this.environmentMap, 'intensity').name('envMapIntensity')
                .min(0).max(4).step(0.001).onChange(() => { this.environmentMap.updateMaterials() })
        })
    }
}