import * as THREE from "THREE";

import { Main, Resources } from "../All"
import Environment from "./Environment";
import {GuiAxesHelper} from "./GuiAxesHelper";
import { GuiCameraHelper } from "./GuiCameraHelper";
import {GuiCssHelper} from "./GuiCssHelper";
import Model from "./Model-Me";
import { Commander } from "./Commander";

export default class World {
    main: Main
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    guiAxesHelper?: GuiAxesHelper
    guiCameraHelper?: GuiCameraHelper
    guiCssHelper?:GuiCssHelper
    model?: Model
    commander?: Commander

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
            this.guiAxesHelper = new GuiAxesHelper(this.main)
            this.guiCameraHelper = new GuiCameraHelper(this.main)
            this.guiCssHelper = new GuiCssHelper(this.main)
            
            // 总指挥
            this.commander = new Commander(this.main)
        })
    }

    resize() {

    }

    update() {
        this.model?.update()
        this.commander?.update()
    }
}