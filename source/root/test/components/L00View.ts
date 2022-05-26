import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, Font as FontLoaderFont } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";
import * as dat from "dat.gui";
import { fromPairs } from "lodash";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import decoderPath from "@src/assets/draco/?url";


import logoModelUrl from './assets/models/one.glb?url';
import pbrMaterialUrl from '@src/assets/materials/freepbr-pitted-pbr-1/polished_concrete_basecolor.jpg?url';

import { Reflector, ReflectorMaterial, floorPowerOfTwo } from "@src/modules/alien/alien.js";




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
  worldController: WorldController
  gui = new dat.GUI({ closed: true });
  constructor(worldController: WorldController) {
    this.worldController = worldController
    //this.gui.hide();
  }
  init() {
    const { testLight, cameraController, animationController } = this.worldController


    /* 
        .onChange((value) => {
          //this.toggleAxesHelper(value);
        }); */
    //控制灯光
    this.gui.add(testLight!.position, "y").setValue(20).min(-100).max(100).step(0.1)
    this.gui.add(testLight!.position, "z").setValue(100).min(-100).max(100).step(0.1)

    //控制摄像头
    this.gui.add(animationController, "isScroll").setValue(true)
    this.gui.add(cameraController.camera.position, "z").setValue(37).min(-200).max(37).step(0.1)
    //this.gui.add(testLight!.position, "z").setValue(100).min(-100).max(100).step(0.1)

    //三角形材质控制器
    const triangleMaterialColor = { color: '#ffffff' }
    this.gui.addColor(triangleMaterialColor, 'color').onChange(color => {
      Triangle.material.emissive.setHex(parseInt(color.slice(1), 16))
      Triangle.material.color.setHex(parseInt(color.slice(1), 16))
    })

    const triangleMaterial = { metalness: 0 }

    this.gui.add(triangleMaterial, "metalness").min(0).max(1).step(0.01).onChange(value => {
      Triangle.material.metalness = value
    })


  }
}


class AnimationController {
  clock: THREE.Clock
  worldController: WorldController
  isStop = false
  privateTime = 0

  constructor(worldController: WorldController) {
    this.worldController = worldController
    this.clock = worldController.clock
  }
  update() {
    if (this.isStop) return;
    const elapsedTime = this.clock.getElapsedTime()
    const deltaTime = elapsedTime - this.privateTime
    this.privateTime = elapsedTime

    /**
     * 灯光动画 
     */
    //位置变化
    const logoLightMoveRange = [-100, 75]
    const logoLightIntensityRange = [0, 80]
    const light = this.worldController.testLight!
    const zNow = light.position.z
    let zNew = zNow + deltaTime * 30
    zNew = zNew + (zNew > logoLightMoveRange[1] ? logoLightMoveRange[0] - logoLightMoveRange[1] : 0)
    light.position.z = zNew
    //强调变化
    const logoLightMoveProgress = (zNew - logoLightMoveRange[0]) / (logoLightMoveRange[1] - logoLightMoveRange[0])
    //console.log(logoLightMoveProgress)
    const downSpot = 0.7, upSpot = 0.58
    if (logoLightMoveProgress > downSpot) {
      const intensity = logoLightIntensityRange[0] + (logoLightIntensityRange[1] - logoLightIntensityRange[0]) * (1 - (logoLightMoveProgress - downSpot) / (1 - downSpot))
      light.intensity = intensity
    } else if (logoLightMoveProgress < upSpot) {
      const intensity = logoLightIntensityRange[0] + (logoLightIntensityRange[1] - logoLightIntensityRange[0]) * (logoLightMoveProgress / (1 - upSpot))
      light.intensity = intensity
    } else if (logoLightMoveProgress < 0.7) light.intensity = logoLightIntensityRange[0]


    /**
     * 三角形颜色变化
     */
    const triangleChengeRange = [5, 20]
    const camera = this.worldController.cameraController.camera
    const cameraZNow = camera.position.z
    let metalness = 0, rgb = 0
    if (cameraZNow < triangleChengeRange[0]) {
      rgb = 255
      metalness = 0
    } else if (cameraZNow < triangleChengeRange[1]) {

    } else {
      rgb = 0
      metalness = 1
    }
    Triangle.material.emissive.setRGB(rgb, rgb, rgb)
    Triangle.material.color.setRGB(rgb, rgb, rgb)
    Triangle.material.metalness = metalness

    /**
     * 镜头滚动
     */
    if (this.isScroll) {
      const cameraPositionZRange = [-192, 37]
      const positionZ = cameraPositionZRange[0] + (cameraPositionZRange[1] - cameraPositionZRange[0]) * this.scrollProgress
      this.worldController.cameraController.camera.position.z = positionZ
    }
  }

  isScroll = true
  scrollProgress = 0
  /**
   * 滚动事件控制 
   */
  onScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight
    const offsetHeight = document.documentElement.offsetHeight
    const progress = scrollTop / (offsetHeight - clientHeight)
    //console.log(progress)
    this.scrollProgress = progress
  }
}


class WorldController {
  view: View

  clock = new THREE.Clock();
  cameraController = new PerspectiveCameraController()
  sceneController = new SceneController()
  guiController = new GuiController(this)
  animationController = new AnimationController(this)
  renderManager: RenderManager

  testLight?: THREE.Light

  constructor(view: View) {
    this.view = view
    this.renderManager = new RenderManager(this.view.canvasEl)
  }
  async init() {

    /**
     * 场景中加入坐标提示器
     */
    this.sceneController.setAxesHelper()

    /**
     * 摄像机初始化并加入场景
     */
    this.cameraController.init()
    //this.cameraController.setOrbitControl(this.view.canvasEl)
    this.sceneController.scene.add(this.cameraController.camera);
    //
    this.cameraController.camera.position.x = 0;
    this.cameraController.camera.position.y = 1.7;
    this.cameraController.camera.position.z = 20;
    this.cameraController.camera.lookAt(0, 1.7, -200);

    /**
     * 设置渲染器
     */
    this.renderManager.init()

    /**
     * 灯光
     */
    this.testLight = new THREE.PointLight(0xffffff, 50, 1000);
    this.sceneController.scene.add(this.testLight);
    this.testLight.position.set(0, 20, 100);




    /*
       const greenLight = new THREE.PointLight(0x00ff00, 0.25, 1000);
       greenLight.position.set(550, 50, 0);
       this.mainScene.add(greenLight);
   
       const redLight = new THREE.PointLight(0xff0000, 0.25, 1000);
       redLight.position.set(-550, 50, 0);
       this.mainScene.add(redLight);
   
       const blueLight = new THREE.PointLight(0x7f7fff, 0.25, 1000);
       blueLight.position.set(0, 50, 550);
       this.mainScene.add(blueLight); */





    /* 
        const geometry = new THREE.IcosahedronGeometry(5, 0);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x333333, flatShading: true });
        const smallSphere = new THREE.Mesh(geometry, material);
        smallSphere.position.set(0, 5, -20);
        this.sceneController.scene.add(smallSphere);
     */

    /**
     * 加载模型
     */
    /* const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff
    }); */
    //0x40ADFF

    const logoMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, emissive: 0x111111, flatShading: true });
    const logoModel = await View.gltfLoader.loadAsync(logoModelUrl);
    this.sceneController.scene.add(logoModel.scene);
    logoModel.scene.traverse(item => {
      const mesh = item as THREE.Mesh
      if (mesh.isMesh) {
        mesh.material = logoMaterial
      }
    })



    /**
     * 三角形隧道
     */
    let triangle: Triangle;
    Array(10).fill([-200, 20]).map((v, i) => {
      const positionZ = v[0] + v[1] * i
      triangle = new Triangle();
      triangle.initMesh();
      triangle.position.z = positionZ
      this.sceneController.scene.add(triangle);
    })




    const scene = this.sceneController.scene

    class Floor extends THREE.Group {
      reflector = new Reflector()

      constructor() {
        super();

        this.initReflector();
      }

      initReflector() {
        this.reflector = new Reflector();
      }

      async initMesh() {
        const geometry = new THREE.PlaneGeometry(100, 500);
        const textureLoader = new THREE.TextureLoader();

        const map = await textureLoader.loadAsync(pbrMaterialUrl);
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.repeat.set(16, 16);

        const { fog } = scene;

        const material = new ReflectorMaterial({
          map,
          fog,
          dithering: true,
        });
        material.uniforms.tReflect = this.reflector.renderTargetUniform;
        material.uniforms.uMatrix = this.reflector.textureMatrixUniform;

        const mesh = new THREE.Mesh(geometry, material);
        //mesh.position.y = -1.6;
        mesh.position.z = -200;
        mesh.rotation.x = -Math.PI / 2;
        mesh.add(this.reflector);

        mesh.onBeforeRender = (renderer, scene, camera) => {
          this.visible = false;
          this.reflector.update(renderer, scene, camera);
          this.visible = true;
        };

        this.add(mesh);
      }

      /**
       * Public methods
       */

      resize = (width: number, height: number) => {
        width = floorPowerOfTwo(width) / 2;
        height = 1024;

        this.reflector.setSize(width, height);
      };
    }



    const floor = new Floor();
    this.sceneController.scene.add(floor);
    floor.initMesh();



    /**
     * 控制台初始化
     */
    this.guiController.init()

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
    //更新世界
    this.cameraController.orbitControl?.update();
    //更新动画
    this.animationController.update();
    //渲染
    this.renderManager.renderer.render(this.sceneController.scene, this.cameraController.camera);
  }
}


class View {
  canvasEl: HTMLElement
  viewraperEl: HTMLElement

  size = new View.Size()
  worldController: WorldController

  static dracoLoader = new DRACOLoader();
  static gltfLoader = new GLTFLoader();
  static svgLoader = new SVGLoader();

  constructor(canvasEl: HTMLElement, viewraperEl: HTMLElement) {
    //设置对象
    this.canvasEl = canvasEl
    this.viewraperEl = viewraperEl

    //设置模型加载器
    View.dracoLoader.setDecoderPath(decoderPath);
    View.gltfLoader.setDRACOLoader(View.dracoLoader);

    //创建世界
    this.worldController = new WorldController(this)
  }

  init() {
    //设置初始值
    this.size.width = this.viewraperEl.offsetWidth
    this.size.height = this.viewraperEl.offsetHeight
    //初始化世界
    this.worldController.init()
    //初始化大小
    this.resize()
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
    this.worldController.render()
    window.requestAnimationFrame(() => this.render());
  }

  /**
   * 添加监听
   */
  addEventListener() {
    window.addEventListener('resize', this.resize)
    window.addEventListener('scroll', this.worldController.animationController.onScroll)
  }

  /**
   * 移除监听
   */
  removeEventListener() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('scroll', this.worldController.animationController.onScroll)
  }
}

namespace View {
  export class Size {
    width = 1920
    height = 1080
  }
}


export default View;


class Triangle extends THREE.Group {

  static geometrysPromise = View.svgLoader.loadAsync('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><path stroke-width="0.25" d="M 3 0 L 0 5 H 6 Z"/></svg>').then((data) => {
    const geometrys = []
    const paths = data.paths;
    for (let i = 0, l = paths.length; i < l; i++) {
      const path = paths[i];

      for (let j = 0, jl = path.subPaths.length; j < jl; j++) {
        const subPath = path.subPaths[j];
        const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path?.userData?.style);

        if (geometry) {
          geometry.center();
          geometrys.push(geometry)

        }
      }
    }
    return geometrys
  });

  //MeshPhongMaterial
  //MeshPhysicalMaterial
  static material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });

  constructor() {
    super();
  }

  async initMesh() {
    const geometrys = await Triangle.geometrysPromise

    const group = new THREE.Group();
    group.position.set(0, 3, 0);
    group.scale.y *= -1;

    geometrys.forEach(geometry => {
      const mesh = new THREE.Mesh(geometry, Triangle.material);
      group.add(mesh);
    })

    this.add(group);
  }
}
