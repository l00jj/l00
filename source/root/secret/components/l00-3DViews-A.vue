<script setup lang="ts">
import { reactive, ref, computed, watchEffect, onMounted } from "vue";
import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, Font as FontLoaderFont } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const props = defineProps<{
  width: number;
  height: number;
}>();

/**
 * 视图元素
 */
const canvas = ref();
const guiWrap = ref();

/**
 * 入口
 * */
interface SceneObjects {
  mainMaterial?: THREE.MeshNormalMaterial;
  orbitControl?: OrbitControls;
  axesHelper: THREE.AxesHelper;
  fontGroup: THREE.Group;
  decorationArray: Array<THREE.Mesh>;
}
interface GuiHandle {
  isShowAxesHelper: boolean;
}

class View {
  canvasEl: HTMLElement;
  size = {
    width: 800,
    height: 600,
  };

  gui = new dat.GUI({ closed: true });
  guiHandle: GuiHandle = {
    isShowAxesHelper: false,
  };

  clock = new THREE.Clock();
  mainScene: THREE.Scene;
  mainCamera: THREE.PerspectiveCamera;
  mainRenderer: THREE.WebGLRenderer;

  //特定
  mainFont?: FontLoaderFont;

  sceneObjects: SceneObjects = {
    mainMaterial: new THREE.MeshNormalMaterial(),
    axesHelper: new THREE.AxesHelper(1),
    fontGroup: new THREE.Group(),
    decorationArray: [],
  };
  constructor(canvasEl: HTMLElement, width: number, height: number) {
    this.canvasEl = canvasEl;
    this.size.width = width;
    this.size.height = height;
    this.mainScene = new THREE.Scene();
    this.mainCamera = new THREE.PerspectiveCamera(75);
    this.mainRenderer = new THREE.WebGLRenderer({ canvas: this.canvasEl, alpha: true });
  }
  start() {
    /**
     * 修改debug位置
     */
    this.fixGui();
    /**
     * 正常环境中隐藏控制台
     */
    this.gui.hide();

    /**
     * 刷新视觉大小
     */
    this.resize(this.size.width, this.size.height);

    /**
     * 材质
     */
    const normalMaterial = this.sceneObjects.mainMaterial;
    //const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

    const ratio = 27;

    /**
     * 生成甜甜圈
     */
    const toruGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
    Array(300)
      .fill(0)
      .map((v, i) => {
        const toru = new THREE.Mesh(toruGeometry, normalMaterial);

        toru.position.x = (Math.random() - 0.5) * ratio;
        toru.position.y = (Math.random() - 0.3) * ratio;
        toru.position.z = (Math.random() - 0.8) * ratio;

        toru.rotation.x = Math.random() * Math.PI;
        toru.rotation.y = Math.random() * Math.PI;

        const scale = Math.random();
        toru.scale.set(scale, scale, scale);

        this.sceneObjects.decorationArray.push(toru);
        this.mainScene.add(toru);
      });

    /**
     * 生成三角锥
     */
    const coneGeometry = new THREE.ConeGeometry(0.4, 0.6, 3);
    Array(300)
      .fill(0)
      .map((v, i) => {
        const cone = new THREE.Mesh(coneGeometry, normalMaterial);

        cone.position.x = (Math.random() - 0.5) * ratio;
        cone.position.y = (Math.random() - 0.3) * ratio;
        cone.position.z = (Math.random() - 0.8) * ratio;

        cone.rotation.x = Math.random() * Math.PI;
        cone.rotation.y = Math.random() * Math.PI;

        const scale = Math.random();
        cone.scale.set(scale, scale, scale);

        this.sceneObjects.decorationArray.push(cone);
        this.mainScene.add(cone);
      });

    setTimeout(() => this.confusion(ratio), 37);

    /**
     * 加入字体
     */
    const fontLoader = new FontLoader();
    const imgUrl = new URL("../assets/fonts/helvetiker_regular.typeface.json", import.meta.url).href;
    fontLoader.load(imgUrl, (font) => {
      this.mainFont = font;
      this.addTextToScene();
    });
    this.mainScene.add(this.sceneObjects.fontGroup);

    /**
     * 加入摄影机
     */
    this.mainCamera.position.z = 4;
    this.mainCamera.position.x = 0;
    this.mainCamera.position.y = -1.5;
    this.mainCamera.lookAt(0, 0, 0);
    this.mainScene.add(this.mainCamera);

    /**
     * 添加坐标轴并加入gui中
     */
    const toggleAxesHelper = (handle?: boolean) => {
      const change = typeof handle === "boolean" ? handle : this.guiHandle.isShowAxesHelper;
      if (change) this.mainScene.add(this.sceneObjects.axesHelper!);
      else this.mainScene.remove(this.sceneObjects.axesHelper!);
    };
    toggleAxesHelper();
    this.gui.add(this.guiHandle, "isShowAxesHelper").onChange((value) => {
      toggleAxesHelper();
    });

    /**
     * 添加可移动镜头
     */
    const orbitControl = new OrbitControls(this.mainCamera, this.canvasEl);
    orbitControl.enableDamping = true;
    this.sceneObjects.orbitControl = orbitControl;

    //
    //this.mainScene.background = new THREE.Color(0xcccccc);
    this.mainRenderer.setClearColor(0xffffff, 0);
  }

  /**
   * 设置字体，由于横竖屏一样，所以需要单独设置环节
   */
  addTextToScene() {
    const group = this.sceneObjects.fontGroup;
    const normalMaterial = this.sceneObjects.mainMaterial;
    const option = {
      font: this.mainFont!,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    };
    group.clear();
    if (this.size.width / this.size.height > 1) {
      const textGeometry = new TextGeometry("Welcome to l00 studio", option);
      const text = new THREE.Mesh(textGeometry, normalMaterial);
      textGeometry.center();
      group.add(text);
    } else {
      const text1Geometry = new TextGeometry("Welcome To", option);
      const text1 = new THREE.Mesh(text1Geometry, normalMaterial);
      text1Geometry.center();
      text1Geometry.translate(0, 0.4, 0);

      const text2Geometry = new TextGeometry("l00 Studio", option);
      const text2 = new THREE.Mesh(text2Geometry, normalMaterial);
      text2Geometry.center();
      text2Geometry.translate(0, -0.4, 0);

      group.add(text1, text2);
    }
  }

  /**
   * 随机化装饰
   */
  confusion(ratio: number) {
    this.sceneObjects.decorationArray.forEach((mesh) => {
      const duration = 2.5;
      gsap.to(mesh.position, { duration, x: (Math.random() - 0.5) * ratio });
      gsap.to(mesh.position, { duration, y: (Math.random() - 0.3) * ratio });
      gsap.to(mesh.position, { duration, z: (Math.random() - 0.8) * ratio });
      //mesh.position.x = (Math.random() - 0.5) * ratio;
      //mesh.position.y = (Math.random() - 0.3) * ratio;
      //mesh.position.z = (Math.random() - 0.8) * ratio;

      gsap.to(mesh.rotation, { duration, x: Math.random() * Math.PI });
      gsap.to(mesh.rotation, { duration, y: Math.random() * Math.PI });
      //mesh.rotation.x = Math.random() * Math.PI;
      //mesh.rotation.y = Math.random() * Math.PI;

      //const scale = Math.random();
      //gsap.to(mesh.rotation, { duration, x: Math.random() * Math.PI });
      //mesh.scale.set(scale, scale, scale);
    });
    setTimeout(() => this.confusion(ratio), 3700);
  }

  /**
   * 修改debug位置
   */
  fixGui() {
    const guiWrapEl: HTMLElement = guiWrap.value as HTMLElement;
    const guiParentEl: HTMLElement = this.gui.domElement.parentElement!;
    guiWrapEl.appendChild(guiParentEl);
    guiParentEl.style.position = "absolute";
  }

  /**
   * 设置视觉大小
   */
  resize(width: number, height: number) {
    //更新自身数值
    this.size.width = width;
    this.size.height = height;

    //更新摄像机
    this.mainCamera.aspect = width / height;
    this.mainCamera.updateProjectionMatrix();

    //更新渲染器、画布
    this.mainRenderer.setSize(this.size.width, this.size.height);
    this.mainRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * 反复渲染
   */
  render() {
    this.sceneObjects.orbitControl?.update();
    this.mainRenderer.render(this.mainScene, this.mainCamera);
    window.requestAnimationFrame(() => this.render());
  }
}

onMounted(() => {
  const canvasEl: HTMLElement = canvas.value as HTMLElement;
  const view = new View(canvasEl, props.width, props.height);
  view.start();
  view.render();

  /**
   * 监听传入参数变化改动
   */
  watchEffect(() => {
    const oldViewAspect = view.size.width / view.size.height > 1;
    const newViewAspect = props.width / props.height > 1;
    view.resize(props.width, props.height);
    if (oldViewAspect !== newViewAspect) view.addTextToScene();
  });
});
</script>

<template>
  <div class="gui-wrap" ref="guiWrap">
    <canvas class="" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.gui-wrap {
  position: relative;
  width: max-content;
}
</style>
