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

        // Debug
        //  this.addDebug = this.main.debug.addFolder('Model')

        // Setup
        this.setCameraControl()

    }

    originalCameraPosition?: THREE.Vector3
    setCameraControl() {
        // 保留原始方位
        this.originalCameraPosition = this.main.camera.instance.position.clone()

        // 设定可视角度
        const orbitControl = this.main.camera.controls;
        orbitControl.enableDamping = true; //开启阻尼滑动
        // orbitControl.minPolarAngle = Math.PI * 0.3; //限定上视觉
        orbitControl.maxPolarAngle = Math.PI * 0.7; //限定下视觉
        // orbitControl.minAzimuthAngle = -Math.PI * 0.3; //限定左视觉
        // orbitControl.maxAzimuthAngle = Math.PI * 0.3; //限定右视觉
        orbitControl.enablePan = false; //禁止拖动物体
        orbitControl.enableZoom = false; //禁止缩放
        // 监听摄像头
        orbitControl.addEventListener('start', () => this.onCameraControl(1));
        orbitControl.addEventListener('end', () => this.onCameraControl(-1));
        orbitControl.addEventListener('change', () => this.onCameraControl(0));
    }


    resetCameraControlTimeoutID = NaN
    isCameraControling = false
    // 监听镜头滑动，归位
    onCameraControl(tpye: number) {
        if (tpye === 0) {
            this.clearResetCameraControlTimeout()
            this.setResetCameraControlTimeout()
        } else if (tpye === 1) {
            this.isCameraControling = true
            this.clearResetCameraControlTimeout()
        } else {
            this.isCameraControling = false
            this.setResetCameraControlTimeout()
        }
    }
    clearResetCameraControlTimeout() {
        if (Number.isNaN(this.resetCameraControlTimeoutID)) return;
        window.clearTimeout(this.resetCameraControlTimeoutID)
        this.resetCameraControlTimeoutID = NaN
    }
    setResetCameraControlTimeout() {
        if (this.main.camera.isNeedUpdate || this.isCameraControling) return;
        this.resetCameraControlTimeoutID = window.setTimeout(() => this.resetCameraControl())
    }
    resetCameraControl() {
        if (!this.originalCameraPosition) return;
        const instance = this.main.camera.instance
        const duration = 1
        const { x, y, z } = this.originalCameraPosition
        gsap.to(instance.position, { duration, x, y, z });
    }

    update() { }
}