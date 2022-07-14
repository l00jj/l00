import * as THREE from "THREE";
import { Main, AddDebug, GUI, Sizes, Time, Resources, GLTFModel, Texture, Renderer, World, sources } from "../All"
import gsap from "gsap";

export class Commander {
    main: Main
    time: Time

    // Debug
    //addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.time = this.main.time

        //Debug
        // this.addDebug = this.main.debug.addFolder('Model')

        // Setup
        this.adjustParameters()
        this.main.sizes.onResize(() => this.adjustParameters())
        this.computeProgress()
    }

    progress = 0
    setProgress(progress: number) {
        this.progress = progress
    }

    // 目标变动参数
    progress1Rotates = [150 * Math.PI / 180, 190 * Math.PI / 180]
    progress1Position = new THREE.Vector3(0, 1.45, -1.5)
    progress1Target = new THREE.Vector3(0, 1.45, 0)
    progress2Rotate = (150 + 360) * Math.PI / 180
    progress2Position = new THREE.Vector3(0, 0.33, -3.3)
    progress2Target = new THREE.Vector3(0, 1.11, 0)
    progress3Rotates = [(150 + 360) * Math.PI / 180, (220 + 360) * Math.PI / 180]


    adjustParameters() {
        const isPortrait = window.innerWidth <= 1024
        const progress1Rotates = [150, 190]
        const progress1Position = isPortrait ? [0, 1.40, -2] : [0, 1.45, -1.5]
        const progress1Target = isPortrait ? [0, 1.40, 0] : [0, 1.45, 0]
        const progress2Rotate = progress1Rotates[0] + 360
        const progress2Position = isPortrait ? [0, 0.5, -4] : [0, 0.33, -3.3]
        const progress2Target = isPortrait ? [0, 0.77, 0] : [0, 1.11, 0]
        const progress3Rotates = [progress1Rotates[0] + 360, 250 + 360]

        this.progress1Rotates = progress1Rotates.map(i => i * Math.PI / 180)
        this.progress1Position = new THREE.Vector3(...progress1Position)
        this.progress1Target = new THREE.Vector3(...progress1Target)
        this.progress2Rotate = progress2Rotate * Math.PI / 180
        this.progress2Position = new THREE.Vector3(...progress2Position)
        this.progress2Target = new THREE.Vector3(...progress2Target)
        this.progress3Rotates = progress3Rotates.map(i => i * Math.PI / 180)
    }



    computeProgress() {
        if (!this.main.world.model) return
        const progress = this.progress
        const camera = this.main.camera
        const model = this.main.world.model
        // [0,1] 是微微旋转模型
        if (progress <= 1) {
            const { progress1Rotates, progress } = this
            const rotateY = progress1Rotates[0] + progress * (progress1Rotates[1] - progress1Rotates[0])
            const rotateChange = { duration: 1, y: rotateY }
            gsap.to(model.model.rotation, rotateChange);
            const positionChange = { duration: 1, x: this.progress1Position.x, y: this.progress1Position.y, z: this.progress1Position.z }
            gsap.to(camera.instance.position, positionChange);
            const targetChange = { duration: 1, x: this.progress1Target.x, y: this.progress1Target.y, z: this.progress1Target.z }
            gsap.to(camera.controls.target, targetChange);
        }
        // (1,2] 是旋转过场
        else if (progress <= 2) {
            const rotateY = this.progress2Rotate
            const rotateChange = { duration: 1, y: rotateY }
            gsap.to(model.model.rotation, rotateChange);
            const positionChange = { duration: 1, x: this.progress2Position.x, y: this.progress2Position.y, z: this.progress2Position.z }
            gsap.to(camera.instance.position, positionChange);
            const targetChange = { duration: 1, x: this.progress2Target.x, y: this.progress2Target.y, z: this.progress2Target.z }
            gsap.to(camera.controls.target, targetChange);
        }
        // (2,3] 是微微旋转模型
        else if (progress <= 3) {
            const { progress3Rotates, progress } = this
            const actProgress = progress % 1
            const rotateY = progress3Rotates[0] + actProgress * (progress3Rotates[1] - progress3Rotates[0])
            const rotateChange = { duration: 1, y: rotateY }
            gsap.to(model.model.rotation, rotateChange);
            const positionChange = { duration: 1, x: this.progress2Position.x, y: this.progress2Position.y, z: this.progress2Position.z }
            gsap.to(camera.instance.position, positionChange);
            const targetChange = { duration: 1, x: this.progress2Target.x, y: this.progress2Target.y, z: this.progress2Target.z }
            gsap.to(camera.controls.target, targetChange);
        }
    }

    update() {
        //this.computeProgress()
    }
}