import * as THREE from "THREE";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import { Texture } from "../Utils/Resources";

export default class Floor {
    experience: Experience
    scene: THREE.Scene
    environment!: Environment
    resources: Resources

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()
    }

    geometry!: THREE.CircleGeometry
    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    texture!: {
        color: Texture
        normal: Texture
    }
    setTexture() {
        (this.texture as any) = {}

        this.texture.color = this.resources.items.grassColorTexture as Texture
        this.texture.color.encoding = THREE.sRGBEncoding
        this.texture.color.repeat.set(1.5, 1.5)
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping

        this.texture.normal = this.resources.items.grassNormalTexture as Texture
        this.texture.normal.repeat.set(1.5, 1.5)
        this.texture.normal.wrapS = THREE.RepeatWrapping
        this.texture.normal.wrapT = THREE.RepeatWrapping
    }

    material!: THREE.MeshStandardMaterial
    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.texture.color,
            normalMap: this.texture.normal
        })
    }

    mesh!: THREE.Mesh
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}