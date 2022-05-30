import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources";

export default class Experience {
    canvas: HTMLElement
    sizes: Sizes
    time: Time
    scence: THREE.Scene
    resources: Resources
    camera: Camera
    renderer: Renderer
    world: World

    constructor(canvas: HTMLElement) {
        // Options
        this.canvas = canvas;

        // Setuo
        this.sizes = new Sizes()
        this.time = new Time()
        this.scence = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)

        // Sizes resize event
        this.sizes.on('resize', () => this.resize())

        // Time tick event
        this.time.on('tick', () => this.update())

    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }

    render() {
        this.time.tick()
    }
}