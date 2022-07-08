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
        this.setModel()
        this.setPlane()
    }

    resource!: GLTFModel
    model!: THREE.Mesh
    setModel() {
        this.resource = this.main.resources.items['model-me'] as GLTFModel
        this.model = this.resource.scene.children[0] as THREE.Mesh
        //this.model.scale.set(2, 2, 2)
        this.model.rotation.y = Math.PI * 1.0;
        /* this.model.position.z = 6; */
        //this.model.material = this.material;
        //this.model.customDepthMaterial = this.customDepthMaterial
        console.log(this.resource)
        console.log(this.model)
        this.scene.add(this.model)

        this.model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })


        this.addDebug((folder: GUI) => {
            folder.add(this.model.rotation, 'y').name('rotationY')
                .min(-2 * Math.PI).max(2 * Math.PI).step(0.001)
        })

    }

    plane!: THREE.Mesh
    setPlane() {
        const geometry = new THREE.PlaneGeometry(50, 10);
        const material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("rgba(255,255,255,0)"),
            //emissive: 0xFFFFFF, 
            transparent: true, // 设置为true，opacity才会生效
            opacity: 1,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.x = 0;
        mesh.position.z= -4;

        this.plane = mesh
        this.scene.add(this.plane)
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

    update() {
        //this.updateMaterial()
        //this.animation.mixer.update(this.time.delta * 0.001)
    }
}