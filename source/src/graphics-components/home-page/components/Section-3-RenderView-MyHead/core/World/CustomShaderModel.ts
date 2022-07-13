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
        this.setPlane()
        //this.setAnimation()
    }

    // 自定义材质参数
    customUniforms = {
        uTime: { value: 0 }
    }
    // 材质
    material!: THREE.MeshStandardMaterial
    customDepthMaterial!: THREE.MeshDepthMaterial
    setMaterial() {
        const modelMapTexture = this.main.resources.items.modelMapTexture as Texture
        modelMapTexture.encoding = THREE.sRGBEncoding
        const modelNormalTexture = this.main.resources.items.modelNormalTexture as Texture


        const codeAngle = `float angle = sin(position.y + uTime) * 0.5;`

        // Material
        this.material = new THREE.MeshStandardMaterial({
            map: modelMapTexture,
            normalMap: modelNormalTexture
        })

        // 
        this.material.onBeforeCompile = (shader) => {

            shader.uniforms.uTime = this.customUniforms.uTime

            shader.vertexShader = shader.vertexShader.replace('#include <common>',
                `
            #include <common>
            
            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle){
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }

            `)

            shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>',
                `
            #include <beginnormal_vertex>

            ${codeAngle}
            mat2 rotateMatrix = get2dRotateMatrix(angle);


            objectNormal.xz = rotateMatrix * objectNormal.xz;

            `)

            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
                `
            #include <begin_vertex>
            
            transformed.xz = rotateMatrix * transformed.xz;
            `)
        }

        // customDepthMaterial
        this.customDepthMaterial = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking
        })

        this.customDepthMaterial.onBeforeCompile = (shader) => {

            shader.uniforms.uTime = this.customUniforms.uTime

            shader.vertexShader = shader.vertexShader.replace('#include <common>',
                `
            #include <common>
            
            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle){
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
            `)

            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
                `
            #include <begin_vertex>
            
            ${codeAngle}
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            transformed.xz = rotateMatrix * transformed.xz;
            `)
        }
    }

    updateMaterial() {
        const elapsedTime = this.time.elapsed / 1000
        this.customUniforms.uTime.value = elapsedTime
    }

    resource!: GLTFModel
    model!: THREE.Mesh
    setModel() {
        this.resource = this.main.resources.items.model as GLTFModel
        this.model = this.resource.scene.children[0] as THREE.Mesh
        //this.model.scale.set(0.02, 0.02, 0.02)
        this.model.rotation.y = Math.PI * 0.5;
        this.model.material = this.material;
        this.model.customDepthMaterial = this.customDepthMaterial
        this.scene.add(this.model)

        this.model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }


    testPlane?: THREE.Mesh
    setPlane() {
        this.testPlane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(15, 15, 15),
            new THREE.MeshStandardMaterial()
        )
        this.testPlane.rotation.y = Math.PI
        this.testPlane.position.y = -5
        this.testPlane.position.z = 5
        this.scene.add(this.testPlane)
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