import * as THREE from "THREE";
import { Main, AddDebug, GUI, Sizes, Time, Resources, GLTFModel, Texture, Renderer, World, sources } from "../All"
import gsap from "gsap";

export class Commander {
    main: Main
    time: Time

    // Debug
    addDebug: AddDebug

    constructor(main: Main) {
        this.main = main
        this.time = this.main.time

        // Debug
        this.addDebug = this.main.debug.addFolder('Commander')
        const debugPalette = { isCommanderControl: true }
        this.addDebug((folder: GUI) => {
            folder.open()
            folder.add(debugPalette, "isCommanderControl").onChange((value) => {
                if (value) this.setCameraControl()
                else this.removeCameraControl()
            });
        })

        // Setup
        this.saveOriginalCameraPosition()
        this.setCameraControl()
    }

    // 保留原始方位
    originalCameraPosition?: THREE.Vector3
    saveOriginalCameraPosition() {
        this.originalCameraPosition = this.main.camera.instance.position.clone()
    }

    onOrbitControlStartEvent = () => this.onCameraControl(1)
    onOrbitControlEndEvent = () => this.onCameraControl(-1)
    onOrbitControlChangeEvent = () => this.onCameraControl(0)
    setCameraControl() {
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
        orbitControl.addEventListener('start', this.onOrbitControlStartEvent);
        orbitControl.addEventListener('end', this.onOrbitControlEndEvent);
        orbitControl.addEventListener('change', this.onOrbitControlChangeEvent);
    }

    removeCameraControl() {
        const orbitControl = this.main.camera.controls;
        orbitControl.enablePan = true; //禁止拖动物体
        orbitControl.enableZoom = true; //禁止缩放
        orbitControl.removeEventListener('start', this.onOrbitControlStartEvent);
        orbitControl.removeEventListener('end', this.onOrbitControlEndEvent);
        orbitControl.removeEventListener('change', this.onOrbitControlChangeEvent);
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