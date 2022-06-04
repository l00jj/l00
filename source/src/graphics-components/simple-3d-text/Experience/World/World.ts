import * as THREE from "THREE";

import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import AxesHelper from "./AxesHelper";
import Text from "./Text";
import Geometrys from "./Geometrys";

export default class World {
    experience: Experience
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    axesHelper?: AxesHelper
    text?: Text
    geometrys?: Geometrys



    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {

            // Setup
            this.text = new Text(this.experience)
            this.geometrys = new Geometrys(this.experience)
            this.environment = new Environment(this.experience)

            // Add AxesHelper
            this.axesHelper = new AxesHelper(this.experience)
        })
    }

    resize() {
        if (this.text) {
            this.text?.resize()
        }
    }

    update() {
        this.geometrys?.update()
    }
}