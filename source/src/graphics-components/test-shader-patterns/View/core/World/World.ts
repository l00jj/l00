import * as THREE from "THREE";

import { Main, Resources } from "../All"
import Environment from "./Environment";
import AxesHelper from "./AxesHelper";
//import Model from "./Model";
//import Particles from "./Particles";
import PatternPlane from "./PatternPlane";

export default class World {
    main: Main
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    axesHelper?: AxesHelper
    //particles?: Particles
    patternPlane?: PatternPlane

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        // Wait for resources
        this.resources.onReady(() => {
            // Setup
            //this.particles = new Particles(this.main)
            //this.model = new Model(this.main)
            //this.environment = new Environment(this.main)

            // Add AxesHelper
            this.axesHelper = new AxesHelper(this.main)

            // Add Plane
            this.patternPlane = new PatternPlane(this.main)
        })
    }

    resize() {

    }

    update() {
        this.patternPlane?.update()
        //this.particles?.update()
    }
}