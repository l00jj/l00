import * as THREE from "THREE";
import gsap from "gsap";

import { Main, Resources, } from "../All"
import Environment from "./Environment";

import galaxyVertex from "../Shaders/galaxy/vertex.glsl?raw";
import galaxyFragment from "../Shaders/galaxy/fragment.glsl?raw";

export default class Particles {
    main: Main
    scene: THREE.Scene
    environment!: Environment
    resources: Resources

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }


    parameters = {
        count: 500000,
        radius: 5,
        branches: 3,
        randomnessPower: 3,
    }

    geometry = new THREE.BufferGeometry()
    setGeometry() {
        const parameters = this.parameters
        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        const scales = new Float32Array(parameters.count * 1)
        const randomness = new Float32Array(parameters.count * 3)

        const insideColor = new THREE.Color(0xff6030)
        const outsideColor = new THREE.Color(0x1b3984)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3

            // Position
            const radius = Math.random() * parameters.radius
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
            positions[i3 + 0] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0.0
            positions[i3 + 2] = Math.sin(branchAngle) * radius

            // Randomness
            const random = () => Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * radius * 0.6
            randomness[i3 + 0] = random()
            randomness[i3 + 1] = random()
            randomness[i3 + 2] = random()

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / parameters.radius)
            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Scale
            scales[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

    }

    material!: THREE.ShaderMaterial
    //material!: THREE.PointsMaterial
    setMaterial() {
        const parameters = this.parameters
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: galaxyVertex,
            fragmentShader: galaxyFragment,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 30 * this.main.renderer.instance.getPixelRatio() }
            },
        })
    }


    points?: THREE.Points
    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }


    playAnimationTime = -1
    playAnimation() {
        /*     if (this.experience.isPlayAnimation) {
                const currentPlayAnimationTime = Math.floor(this.experience.time.elapsed / 1000 / this.animationDelay)
                if (currentPlayAnimationTime > this.playAnimationTime) {
                    this.playAnimationTime = currentPlayAnimationTime
                    this.animation()
                }
            } */
    }

    animationDuration = 2.5
    animationDelay = 4
    animation() {
        const duration = this.animationDuration;
        /* this.meshsGroup.traverseVisible((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            const { position, rotation, scale } = this.random()
            gsap.to(child.position, { duration, x: position.x });
            gsap.to(child.position, { duration, y: position.y });
            gsap.to(child.position, { duration, z: position.z });

            gsap.to(child.rotation, { duration, x: rotation.x });
            gsap.to(child.rotation, { duration, y: rotation.y });
            gsap.to(child.rotation, { duration, z: rotation.z });

            gsap.to(child.scale, { duration, x: scale });
            gsap.to(child.scale, { duration, y: scale });
            gsap.to(child.scale, { duration, z: scale });
        }); */
    }

    update() {
        // Update material
        this.material.uniforms.uTime.value = this.main.time.elapsed / 1000
    }
}