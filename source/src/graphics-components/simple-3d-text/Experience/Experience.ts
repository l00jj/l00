import * as THREE from "THREE";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import { Debug } from "./Utils/Debug";
import sources from "./sources";

export default class Experience {
    canvas: HTMLElement
    viewArea: HTMLElement
    sizes: Sizes
    time: Time
    scene: THREE.Scene
    resources: Resources
    camera: Camera
    renderer: Renderer
    world: World
    //
    isPlayAnimation = true
    //
    debug: Debug

    constructor(canvas: HTMLElement, viewArea: HTMLElement) {
        // Options
        this.canvas = canvas;
        this.viewArea = viewArea;

        // Setuo
        this.sizes = new Sizes(viewArea)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)

        //Debug
        this.debug = new Debug(this)

        // Sizes resize event
        this.sizes.onResize(() => this.resize())

        // Time tick event
        this.time.onTick(() => this.update())

    }

    resize() {
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    render() {
        this.time.tick()
    }

    destroy() {
        this.sizes.destroy()
        this.time.destroy()
        
        // Traverse the whole scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        //
        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        //
        this.debug.destroy()
    }
}