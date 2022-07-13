import * as THREE from "THREE";

import { Main, Resources } from "../All"
import Environment from "./Environment";
import { GuiAxesHelper } from "./GuiAxesHelper";
import { GuiCameraHelper } from "./GuiCameraHelper";
import Text from "./Text";
import Geometrys from "./Geometrys";
import { Commander } from "./Commander";

export default class World {
    main: Main
    scene: THREE.Scene
    environment!: Environment
    resources: Resources
    guiAxesHelper?: GuiAxesHelper
    guiCameraHelper?: GuiCameraHelper
    text?: Text
    geometrys?: Geometrys
    commander?: Commander

    constructor(main: Main) {
        this.main = main
        this.scene = this.main.scene
        this.resources = this.main.resources

        // Wait for resources
        this.resources.onReady(() => {
            // Setup
            this.text = new Text(this.main)
            this.geometrys = new Geometrys(this.main)
            this.environment = new Environment(this.main)

            // Add Helper
            this.guiAxesHelper = new GuiAxesHelper(this.main)
            this.guiCameraHelper = new GuiCameraHelper(this.main)

            // 总指挥
            this.commander = new Commander(this.main)
        })
    }

    resize() {
        if (this.text) {
            this.text?.resize()
        }
    }

    update() {
        this.geometrys?.update()
        this.commander?.update()
    }
}