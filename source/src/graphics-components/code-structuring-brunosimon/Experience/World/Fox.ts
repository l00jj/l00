import * as THREE from "THREE";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import { GLTFModel } from "../Utils/Resources";
import Time from "../Utils/Time";
import { Debug, GUI } from "../Utils/Debug";

export default class Fox {
    experience: Experience
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    time: Time

    resource: GLTFModel

    debug: Debug
    debugFolder?: GUI

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        //Debug
        this.debug = this.experience.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('fox')
        }

        // Setup
        this.resource = this.experience.resources.items.foxModel as GLTFModel
        this.setModel()
        this.setAnimation()
    }

    model!: any
    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
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
        if (this.debug.active) {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') },
            }
            this.debugFolder?.add(debugObject, 'playIdle')
            this.debugFolder?.add(debugObject, 'playWalking')
            this.debugFolder?.add(debugObject, 'playRunning')
        }
        //[3:01:16]
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}