import * as THREE from "THREE";

import { Main, AddDebug, GUI, Sizes, Time, Resources, GLTFModel, Texture, Renderer, World, sources } from "../All"
//import Environment from "./Environment";
//import Time from "../Utils/Time";

export default class Model {
    main: Main
    scene: THREE.Scene
    //environment!: Environment
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
        //this.setAnimation()
    }

    material!: THREE.MeshStandardMaterial
    setMaterial() {
        const modelMapTexture = this.main.resources.items.modelMapTexture as Texture
        modelMapTexture.encoding = THREE.sRGBEncoding
        const modelNormalTexture = this.main.resources.items.modelNormalTexture as Texture

        // Material
        this.material = new THREE.MeshStandardMaterial({
            map: modelMapTexture,
            normalMap: modelNormalTexture
        })
    }

    resource!: GLTFModel
    model!: THREE.Mesh
    setModel() {
        this.resource = this.main.resources.items.model as GLTFModel
        this.model = this.resource.scene.children[0] as THREE.Mesh
        //this.model.scale.set(0.02, 0.02, 0.02)
        this.model.rotation.y = Math.PI * 0.5;
        this.model.material = this.material;
        this.scene.add(this.model)

        this.model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }


    animation: any
    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name: string) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        //Debug
        /* if (this.debug.active) {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') },
            }
            this.debugFolder?.add(debugObject, 'playIdle')
            this.debugFolder?.add(debugObject, 'playWalking')
            this.debugFolder?.add(debugObject, 'playRunning')
        } */
        //[3:01:16]
    }

    /* update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    } */
}