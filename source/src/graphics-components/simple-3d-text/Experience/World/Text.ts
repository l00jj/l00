import * as THREE from "THREE";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import Experience from "../Experience";
import Sizes from "../Utils/Sizes";
import Environment from "./Environment";
import { Debug, GUI } from "../Utils/Debug";

export default class Text {
    textGroup: THREE.Group
    experience: Experience
    sizes: Sizes
    scene: THREE.Scene
    environment!: Environment

    resource: Font

    debug: Debug
    debugFolder?: GUI

    constructor(experience: Experience) {
        this.textGroup = new THREE.Group()
        this.experience = experience
        this.sizes = experience.sizes
        this.scene = this.experience.scene

        //Debug
        this.debug = this.experience.debug
        if (this.debug.active) {
            //this.debugFolder = this.debug.ui?.addFolder('Text')
        }

        // Setup
        this.resource = this.experience.resources.items.font as Font
        this.setMaterial()
        this.setText()
        this.scene.add(this.textGroup)
    }

    material!: THREE.MeshNormalMaterial
    setMaterial() {
        this.material = new THREE.MeshNormalMaterial()
    }


    aspect = NaN
    updateOrientation() {
        const currentAspect = this.sizes.width / this.sizes.height
        const currentOrientation = currentAspect > 1 ? 1 : -1
        const lastOrientation = Number.isNaN(this.aspect) ? NaN : this.aspect > 1 ? 1 : -1
        if (currentOrientation !== lastOrientation) {
            this.aspect = currentAspect
            return true
        } else return false
    }

    /**
     * 设置字体，由于横竖屏一样，所以需要单独设置环节
     */
    setText() {
        if (!this.updateOrientation()) return;

        const normalMaterial = this.material;
        const option = {
            font: this.resource,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,
        };
        this.textGroup.clear();

        if (this.aspect > 1) {
            const textGeometry = new TextGeometry("Welcome to l00 studio", option);
            const text = new THREE.Mesh(textGeometry, normalMaterial);
            textGeometry.center();
            this.textGroup.add(text);
        } else {
            const text1Geometry = new TextGeometry("Welcome To", option);
            const text1 = new THREE.Mesh(text1Geometry, normalMaterial);
            text1Geometry.center();
            text1Geometry.translate(0, 0.4, 0);

            const text2Geometry = new TextGeometry("l00 Studio", option);
            const text2 = new THREE.Mesh(text2Geometry, normalMaterial);
            text2Geometry.center();
            text2Geometry.translate(0, -0.4, 0);

            this.textGroup.add(text1, text2);
        }
    }

    resize() {
        this.setText()
    }

    update() {

    }
}