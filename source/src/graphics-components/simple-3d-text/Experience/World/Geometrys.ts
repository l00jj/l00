import * as THREE from "THREE";
import gsap from "gsap";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";


export default class Geometrys {
    experience: Experience
    scene: THREE.Scene
    environment!: Environment
    resources: Resources

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    geometryRatio = 27;
    toruGeometry!: THREE.TorusBufferGeometry
    coneGeometry!: THREE.ConeGeometry
    setGeometry() {
        this.toruGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
        this.coneGeometry = new THREE.ConeGeometry(0.4, 0.6, 3);
    }

    material!: THREE.MeshNormalMaterial
    setMaterial() {
        this.material = new THREE.MeshNormalMaterial()
    }


    mesh!: THREE.Mesh
    meshsGroup!: THREE.Group
    setMesh() {
        this.meshsGroup = new THREE.Group()
        this.scene.add(this.meshsGroup)
        Array(300).fill(0).map((v, i) => {
            const toru = new THREE.Mesh(this.toruGeometry, this.material);
            const { position, rotation, scale } = this.random()
            toru.position.set(position.x, position.y, position.z)
            toru.rotation.set(rotation.x, rotation.y, rotation.z)
            toru.scale.set(scale, scale, scale);
            this.meshsGroup.add(toru);
        });
        Array(300).fill(0).map((v, i) => {
            const cone = new THREE.Mesh(this.coneGeometry, this.material);
            const { position, rotation, scale } = this.random()
            cone.position.set(position.x, position.y, position.z)
            cone.rotation.set(rotation.x, rotation.y, rotation.z)
            cone.scale.set(scale, scale, scale);
            this.meshsGroup.add(cone);
        });
    }

    /**
     * 随机化装饰
     */
    random() {
        const ratio = this.geometryRatio
        return {
            position: {
                x: (Math.random() - 0.5) * ratio,
                y: (Math.random() - 0.3) * ratio,
                z: (Math.random() - 0.8) * ratio,
            },
            rotation: {
                x: Math.random() * Math.PI,
                y: Math.random() * Math.PI,
                z: Math.random() * Math.PI,
            },
            scale: Math.random()
        }
    }

    playAnimationTime = -1
    playAnimation() {
        if (this.experience.isPlayAnimation) {
            const currentPlayAnimationTime = Math.floor(this.experience.time.elapsed / 1000 / this.animationDelay)
            if (currentPlayAnimationTime > this.playAnimationTime) {
                this.playAnimationTime = currentPlayAnimationTime
                this.animation()
            }
        }
    }

    animationDuration = 2.5
    animationDelay = 4
    animation() {
        const duration = this.animationDuration;
        this.meshsGroup.traverseVisible((child) => {
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
        });
    }

    update() {
        if (this.experience.isPlayAnimation) this.playAnimation()
    }
}