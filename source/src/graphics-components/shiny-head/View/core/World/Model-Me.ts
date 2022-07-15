import * as THREE from "THREE";

import { Main, AddDebug, GUI, Sizes, Time, Resources, GLTFModel, Texture, Renderer, World, sources } from "../All"

export default class Model {
    main: Main
    scene: THREE.Scene
    resources: Resources
    time: Time

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources
        this.time = this.main.time

        //Debug
        this.addDebug = this.main.debug.addFolder('Model')

        // Setup
        this.setMaterial()
        this.setModel()
        this.setAnimation()
    }

    material?: THREE.MeshMatcapMaterial
    setMaterial() {
        const material = new THREE.MeshMatcapMaterial()
        const matcap = this.resources.items['matcap.1B1B1B_999999_575757_747474-PS.png'] as Texture

        //matcap.encoding =THREE.sRGBEncoding
        //matcap.encoding =THREE.LinearEncoding 

        material.matcap = matcap
        material.needsUpdate = true
        material.side = THREE.DoubleSide
        this.material = material

        // console.log(matcap)
        this.debugMaterial()
    }

    debugMaterial() {
        const matcapList = Object.fromEntries(Object.entries(this.resources.items).filter(item => item[0].includes('matcap.'))) as { [k: string]: Texture }
        const matcap = { matcap: 'matcap.1B1B1B_999999_575757_747474-PS.png' }
        this.addDebug((folder) => {
            folder.add(matcap, 'matcap', Object.keys(matcapList)).onFinishChange((name) => {
                if (matcapList[name] && this.material) {
                    this.material.matcap = matcapList[name]
                    this.material.needsUpdate = true
                }
            })
            folder.open()
        })


    }

    resource!: GLTFModel
    model!: THREE.Mesh
    setModel() {
        this.resource = this.main.resources.items['model-myhead'] as GLTFModel
        this.model = this.resource.scene.children[0] as THREE.Mesh
        //this.model.scale.set(2, 2, 2)
        this.model.rotation.y = Math.PI * 1.0;
        this.model.rotation.x = Math.PI * -0.03;
        this.model.position.y = -0.05;
        // if (this.material)this.model.material = this.material;
        // this.model.customDepthMaterial = this.customDepthMaterial

        this.scene.add(this.model)

        this.model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                if (child.name === "test") {
                    child.visible = false
                }
                child.castShadow = true
                child.material = this.material;
            }
        })


        this.addDebug((folder: GUI) => {
            folder.add(this.model.rotation, 'y').name('rotationY')
                .min(-2 * Math.PI).max(2 * Math.PI).step(0.001)
        })
    }

    animation: any
    setAnimation() {
        this.animation = {}
        this.animation.rotation = {}
        this.animation.rotation.update = () => {
            this.model.rotation.y += this.time.delta * 0.0002;
        }
    }

    update() {
        this.animation.rotation.update()
    }
}