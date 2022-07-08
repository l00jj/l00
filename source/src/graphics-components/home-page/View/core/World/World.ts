import * as THREE from "THREE";

import { Main, Resources } from "../All"
import Environment from "./Environment";
import AxesHelper from "./AxesHelper";
import { GuiCameraHelper } from "./GuiCameraHelper";
import Model from "./Model-Me";
//import Particles from "./Particles";

export default class World {
    main: Main
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    axesHelper?: AxesHelper
    GuiCameraHelper?: GuiCameraHelper
    model?: Model
    //particles?: Particles

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        // Wait for resources
        this.resources.onReady(() => {
            // Setup
            //this.particles = new Particles(this.main)
            this.model = new Model(this.main)

            this.environment = new Environment(this.main)

            // Add Helper
            this.axesHelper = new AxesHelper(this.main)
            this.GuiCameraHelper = new GuiCameraHelper(this.main)
        })
    }

    resize() {

    }

    update() {
        this.model?.update()
        //this.particles?.update()
    }
}