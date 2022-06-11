import * as THREE from "THREE";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
    experience: Experience
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    floor!: Floor
    fox?: Fox

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {

            // Setup
            this.floor = new Floor(this.experience)
            this.fox = new Fox(this.experience)
            this.environment = new Environment(this.experience)
        })
    }

    update() {
        if (this.fox) this.fox.update()
    }
}