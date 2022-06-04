import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

import PublicPath from "@src/utils/PublicPath"

import { EventEmitter } from "@src/utils/EventEmitter";

import waterVertexShader from './shaders/water/vertexShader.glsl?raw';
import waterFragmentShader from './shaders/water/fragmentShader.glsl?raw';


class PerspectiveCameraController {
  camera = new THREE.PerspectiveCamera()
  orbitControl?: OrbitControls;
  constructor() {
    this.camera.fov = 75//////////////////测试是否可以直接修改，还是只能new 的时候设定
  }
  init() { }

  /**
   * 添加镜头控制器
   */
  setOrbitControl(canvasEl: HTMLElement) {
    const orbitControl = new OrbitControls(this.camera, canvasEl);
    orbitControl.enableDamping = true;
    this.orbitControl = orbitControl
  }
}



class SceneController {
  axesHelper = new THREE.AxesHelper(1);
  scene = new THREE.Scene();
  constructor() {
  }
  /**
   * 添加/删除 坐标轴
   */
  setAxesHelper = (handle: boolean = true) => {
    const change = typeof handle === "boolean" ? handle : false;
    if (change) this.scene.add(this.axesHelper);
    else this.scene.remove(this.axesHelper);
  };
}

class RenderManager {
  renderer: THREE.WebGLRenderer;
  constructor(canvasEl: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: false });
  }
  init() {

  }
}


class GuiController {
  view: View
  guiwraperEl: HTMLElement
  gui = new dat.GUI({ closed: false });
  constructor(view: View, guiwraperEl?: HTMLElement) {
    this.view = view
    this.guiwraperEl = guiwraperEl ? guiwraperEl : this.view.viewraperEl
    this.fixGui()
    //this.gui.hide();
    //监听注销并销毁自己
    const onUnmounted = () => {
      this.gui.destroy()
    }
    this.view.on('unmounted', onUnmounted)

    //安装参数修改
    const onInited = () => {
      this.setParameterController()
    }
    console.warn('做once')
    this.view.worldController.on('inited', onInited)
    this.setParameterController().catch(e => console.error(e))
  }

  /**
   * 修改debug位置
   */
  fixGui() {
    const guiParentEl: HTMLElement = this.gui.domElement.parentElement!;
    this.guiwraperEl.appendChild(guiParentEl);
    //guiParentEl.style.position = "absolute";
  }

  /**
   * 装载各个调节器
   */
  async setParameterController() {
    const { waterMaterialController, testLight, cameraController, animationController } = this.view.worldController
    const { material: waterMaterial, parameter: waterMaterialParameter } = waterMaterialController

    this.gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
    this.gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
    this.gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
    this.gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
    this.gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

    this.gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
    this.gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
    this.gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
    this.gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(8).step(1).name('uSmallWavesIterations')

    this.gui.addColor(waterMaterialParameter, 'depthColor').name('depthColor').onChange(() => {
      waterMaterial.uniforms.uDepthColor.value.set(waterMaterialParameter.depthColor)
    })
    this.gui.addColor(waterMaterialParameter, 'surfaceColor').name('surfaceColor').onChange(() => {
      waterMaterial.uniforms.uSurfaceColor.value.set(waterMaterialParameter.surfaceColor)
    })
    this.gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
    this.gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')

  }
}


class AnimationController {
  worldController: WorldController
  isStop = false
  privateTime = 0

  constructor(worldController: WorldController) {
    this.worldController = worldController
  }
  update(elapsedTime: number) {
    if (this.isStop) return;
    const deltaTime = elapsedTime - this.privateTime
    this.privateTime = elapsedTime
  }

  isScroll = true
  scrollProgress = 0
  /**
   * 滚动事件控制 
   */
  onScroll = () => {

  }
}


class WorldController extends EventEmitter {
  view: View

  clock = new THREE.Clock();
  cameraController = new PerspectiveCameraController()
  sceneController = new SceneController()
  animationController = new AnimationController(this)
  renderManager: RenderManager

  testLight?: THREE.Light


  waterMaterialController = new WaterMaterialController()

  constructor(view: View) {
    super()
    //
    this.view = view
    this.renderManager = new RenderManager(this.view.canvasEl)
  }
  async init() {

    /**
     * 场景中加入坐标提示器
     */
    this.sceneController.setAxesHelper(false)

    /**
     * 摄像机初始化并加入场景
     */
    this.cameraController.init()
    this.cameraController.setOrbitControl(this.view.canvasEl)
    this.sceneController.scene.add(this.cameraController.camera);
    this.cameraController.camera.position.add(new THREE.Vector3(1, 2, 3))
    this.cameraController.camera.lookAt(0, 0, 0)

    /**
     * 设置渲染器
     */
    this.renderManager.init()


    // Geometry
    const geometry = new THREE.PlaneBufferGeometry(5, 5, 512, 512)


    // Mesh
    const mesh = new THREE.Mesh(geometry, this.waterMaterialController.material)
    mesh.rotation.x = -Math.PI * 0.5
    this.sceneController.scene.add(mesh);

    //
    this.emit('inited')
  }

  /**
   * 设置视觉大小
   */
  resize(width: number, height: number) {
    //更新摄像机
    this.cameraController.camera.aspect = width / height;
    this.cameraController.camera.updateProjectionMatrix();

    //更新渲染器、画布
    this.renderManager.renderer.setSize(width, height);
    this.renderManager.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * 渲染入口
   */
  render() {
    const elapsedTime = this.clock.getElapsedTime()

    // 更新材质
    this.waterMaterialController.update(elapsedTime)

    // 更新世界
    this.cameraController.orbitControl?.update();

    //更新动画
    //this.animationController.update();

    //渲染
    this.renderManager.renderer.render(this.sceneController.scene, this.cameraController.camera);
    //.dispose ( )
  }

}


class View extends EventEmitter {
  static dracoLoader = new DRACOLoader();
  static gltfLoader = new GLTFLoader();
  static svgLoader = new SVGLoader();

  static Size = class Size {
    width = 1920
    height = 1080
  }

  canvasEl: HTMLElement
  viewraperEl: HTMLElement

  size = new View.Size()

  worldController: WorldController

  guiController?: GuiController

  constructor(canvasEl: HTMLElement, viewraperEl: HTMLElement) {
    super();
    //设置对象
    this.canvasEl = canvasEl
    this.viewraperEl = viewraperEl

    //设置初始值
    this.size.width = this.viewraperEl.offsetWidth
    this.size.height = this.viewraperEl.offsetHeight

    //设置模型加载器
    const decoderPath = new PublicPath('/assets/draco/').url
    View.dracoLoader.setDecoderPath(decoderPath);
    View.gltfLoader.setDRACOLoader(View.dracoLoader);

    //创建世界
    this.worldController = new WorldController(this);

    console.log(window);
    (window as any).testss = this
  }

  init() {
    //初始化世界
    this.worldController.init()

    //初始化大小
    this.resize()
  }

  /**
   * 装载界面修改器
   */
  addGuiController(guiwraperEl?: HTMLElement) {
    this.guiController = new GuiController(this, guiwraperEl)
  }
  /**
   * 重置大小 
   */
  resize = () => {
    //oldViewAspect newViewAspect 的变化可以视作浏览器横竖屏变化
    const oldViewAspect = this.size.width / this.size.height > 1;
    //
    const width = this.viewraperEl ? this.viewraperEl.offsetWidth : 0
    const height = this.viewraperEl ? this.viewraperEl.offsetHeight : 0
    //更新自身数值
    this.size.width = width;
    this.size.height = height;
    //新的横竖比
    const newViewAspect = width / height > 1;
    //
    this.worldController.resize(width, height)
  }

  /**
   * 反复渲染
   */
  render() {
    // Render
    this.worldController.render()

    // Loop
    window.requestAnimationFrame(() => this.render());
  }

  /**
   * 添加监听
   */
  mounted() {
    //基础 窗口大小调整
    window.addEventListener('resize', this.resize)
    //
    window.addEventListener('scroll', this.worldController.animationController.onScroll)
  }

  /**
   * 移除监听
   */
  unmounted() {
    //基础 窗口大小调整
    window.removeEventListener('resize', this.resize)
    //
    window.removeEventListener('scroll', this.worldController.animationController.onScroll)
    //
    this.emit('unmounted')
  }
}


export default View;




// 水面材质 ShaderMaterial
class WaterMaterialController {
  parameter = {
    depthColor: "#186691",
    surfaceColor: "#9bd8ff",
  }
  material: THREE.ShaderMaterial
  constructor() {
    this.material = new THREE.ShaderMaterial({
      wireframe: false,
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3.0 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 4.0 },

        uDepthColor: { value: new THREE.Color(this.parameter.depthColor) },
        uSurfaceColor: { value: new THREE.Color(this.parameter.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
      }
    })
  }

  update(time: number) {
    this.material.uniforms.uTime.value = time
  }

}