import * as THREE from "THREE";

import { Main, AddDebug, GUI, Resources, CubeTexture } from "../All"

export default class Environment {
    main: Main
    scene: THREE.Scene
    resources: Resources

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        //Debug
        this.addDebug = this.main.debug.addFolder('environment')

        this.setSunLight()
        //this.setDirectionalLight()
        this.setEnvironmentMap()
    }

    /*    directionalLight!: THREE.DirectionalLight
       setDirectionalLight() {
           this.directionalLight = new THREE.DirectionalLight('#ffffff', 3)
           this.directionalLight.castShadow = true
           this.directionalLight.shadow.mapSize.set(1024, 1024)
           this.directionalLight.shadow.camera.far = 15
           this.directionalLight.shadow.normalBias = 0.05
           this.directionalLight.position.set(0.25, 2, -2.25)
           this.scene.add(this.directionalLight)
   
           // Debug
           this.addDebug((folder: GUI) => {
               folder.add(this.directionalLight, 'intensity').name('directionalLightIntensity')
                   .min(0).max(10).step(0.001)
   
               folder.add(this.directionalLight.position, 'x').name('directionalLightX')
                   .min(-50).max(50).step(0.001)
   
               folder.add(this.directionalLight.position, 'y').name('directionalLightY')
                   .min(-50).max(50).step(0.001)
   
               folder.add(this.directionalLight.position, 'z').name('directionalLightZ')
                   .min(-50).max(50).step(0.001)
           })
       } */


    sunLight!: THREE.DirectionalLight
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 5)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        //this.sunLight.position.set(13.157, 8.901, 6.695)
        this.sunLight.position.set(5, 2, 2)
        this.scene.add(this.sunLight)

        // Debug
        this.addDebug((folder: GUI) => {
            folder.add(this.sunLight, 'intensity').name('sunLightIntensity')
                .min(0).max(10).step(0.001)

            folder.add(this.sunLight.position, 'x').name('sunLightX')
                .min(-50).max(50).step(0.001)

            folder.add(this.sunLight.position, 'y').name('sunLightY')
                .min(-50).max(50).step(0.001)

            folder.add(this.sunLight.position, 'z').name('sunLightZ')
                .min(-50).max(50).step(0.001)
        })


        //const directionalLightCameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        //this.scene.add(directionalLightCameraHelper)
    }

    environmentMap!: {
        intensity: number
        texture: CubeTexture
        updateMaterials: Function
    }
    setEnvironmentMap() {
        (this.environmentMap as any) = {}

        this.environmentMap.intensity = 1.5
        this.environmentMap.texture = this.resources.items.environmentMapTexture as CubeTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        //this.scene.background = this.environmentMap.texture;
        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && (child.material instanceof THREE.MeshStandardMaterial /* || child.material instanceof THREE.MeshPhysicalMaterial */)) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                    child.castShadow = true
                    child.receiveShadow = true
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