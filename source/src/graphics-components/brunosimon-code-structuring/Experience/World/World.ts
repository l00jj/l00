import * as THREE from "THREE";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";

export default class World {
    experience: Experience
    scence: THREE.Scene
    environment!: Environment
    resources: Resources

    constructor(experience: Experience) {
        this.experience = experience
        this.scence = this.experience.scence
        this.resources = this.experience.resources

        // Test mesh
        const testMech = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial()
        )
        this.scence.add(testMech)

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.environment = new Environment(this.experience)
        })

    }
}