import * as THREE from "THREE";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

import { Sizes, Resources, Camera, Renderer, CoreRenderer, Texture } from "./All"

export default class RendererEffect {
    renderer: Renderer
    coreRenderer: CoreRenderer

    sizes: Sizes
    scene: THREE.Scene
    resources: Resources
    camera: Camera

    constructor(renderer: Renderer) {
        this.renderer = renderer
        this.coreRenderer = this.renderer.coreRenderer;

        //
        ({
            sizes: this.sizes,
            scene: this.scene,
            resources: this.resources,
            camera: this.camera,
        } = this.renderer.main);

        // 
        this.setWebGLRenderTarget()
        this.setEffectComposer()

        this.resources.onReady(() => {
            this.setRenderEffectPass()
        })
        // 植入
        this.renderer.onResize(this.resize)
        this.renderer.finalRender = this.render
    }


    /**
     * 使用反锯齿方案
     * * 如果设备是高分辨率的屏幕，实际可以不需要
     * * 如没有后期处理Pass，渲染器默认有反锯齿
     * * 当浏览器条件支持时自动切换
     * * https://threejs.org/docs/index.html?q=WebGLRenderTarget#api/en/renderers/WebGLRenderTarget
     * * THREE.WebGLMultisampleRenderTarget 已弃用，启用 samples 即可
     */
    webGLRenderTargetResize?: Function
    webGLRenderTargetDestroy?: Function
    webGLRenderTarget?: THREE.WebGLRenderTarget
    setWebGLRenderTarget() {
        const options = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            encoding: THREE.sRGBEncoding,
        }
        const coreRenderer = this.coreRenderer.instance
        if (coreRenderer.getPixelRatio() === 1) {
            // Setup
            this.webGLRenderTarget = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height, options)
            // 设置
            if (coreRenderer.getPixelRatio() === 1 && coreRenderer.capabilities.isWebGL2) {
                this.webGLRenderTarget.samples = 4 // 4 可以更高 8
            }
            // Resize - 不需要，EffectComposer 的改变会附带改变这个

            // Destroy
            this.webGLRenderTargetDestroy = () => {
                this.webGLRenderTarget?.dispose();
            }
            this.renderer.onDestroy(this.webGLRenderTargetDestroy)

        }
    }

    effectComposer!: EffectComposer
    setEffectComposer() {
        this.effectComposer = new EffectComposer(this.coreRenderer.instance, this.webGLRenderTarget)
        this.resize()//代码复用
    }

    renderPass!: RenderPass
    setRenderEffectPass() {
        // 放入原画面
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        // 点状滤镜
        // const dotScreenPass = new DotScreenPass()
        // dotScreenPass.enabled = false
        // this.effectComposer.addPass(dotScreenPass)

        // 故障滤镜
        // const glitchPass = new GlitchPass()
        // glitchPass.goWild = false
        // this.effectComposer.addPass(glitchPass)

        // 颜色分离
        // const rgbShiftShader = new ShaderPass(RGBShiftShader)
        // rgbShiftShader.enabled = false
        // rgbShiftShader.enabled = true
        // this.effectComposer.addPass(rgbShiftShader)

        // 大辉光滤镜
         const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(0,0), 0.5, 0, 0)
         //unrealBloomPass.strength = 1
         //unrealBloomPass.radius = 0
         //unrealBloomPass.threshold = 0
         //unrealBloomPass.enabled = true
         this.effectComposer.addPass(unrealBloomPass)
         this.renderer.onDestroy(() => unrealBloomPass.dispose())

        // 1. BloomPass: blurry, glowing effect
        // var bloomPass = new BloomPass(3, 25, 5, 256);
        // this.effectComposer.addPass(bloomPass)

        // 2. DotScreenPass: renders the screen with black dots
        // const dotScreenPass = new DotScreenPass()
        // this.effectComposer.addPass(dotScreenPass);

        // 1. EffectCopy, which output the result as is:
        // var effectCopy = new ShaderPass(CopyShader);
        // effectCopy.renderToScreen = true;
        // this.effectComposer.addPass(effectCopy);

        // 2. EffectFilm, which output the result in an old style TV screen fashion (with thin colourful stripes):
        // var effectFilm = new FilmPass(0.8, 0.325, 256, 1);
        // effectFilm.renderToScreen = true;
        // this.effectComposer.addPass(effectFilm);

        // 自定义滤镜
        //const interfacePass = new InterfacePass(this.resources.items.interfaceNormalMap as Texture)
        //this.effectComposer.addPass(interfacePass);

        // sRGB修正
        const GammaPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(GammaPass);

        // 反锯齿
        this.setSMAAPass()
    }

    /**
     * 反锯齿软解方案 - 确保是最后一个添加入Pass列队
     * *  高像素屏幕和支持硬件反锯齿的浏览器不需要软反锯齿
     */
    setSMAAPass() {
        const renderer = this.renderer.coreRenderer.instance
        // 高像素屏幕和支持硬件反锯齿的浏览器不需要软反锯齿
        if (renderer.getPixelRatio() !== 1 || renderer.capabilities.isWebGL2) return;
        // 反锯齿
        const smaaPass = new SMAAPass(0, 0)
        this.effectComposer.addPass(smaaPass)
    }

    resize = () => {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    render = () => {
        this.effectComposer.render()
    }

}


class InterfacePass extends ShaderPass {
    static _shader_ = {
        uniforms: {
            // 用于简单调色
            tDiffuse: { value: null },

            // 法线贴图
            uNormalMap: { value: null },
        },

        vertexShader: `
varying vec2 vUv;
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    vUv = uv;
}`,

        fragmentShader: `
uniform sampler2D tDiffuse;
uniform sampler2D uNormalMap;

varying vec2 vUv;
    
void main()
{
    vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;

    vec2 newUv = vUv + normalColor.xy * 0.1;
    vec4 color = texture2D(tDiffuse, newUv);

    // 添加光效
    vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
    float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
    color.rgb += lightness * 0.25;
    
    gl_FragColor = color;
}`,

    }

    constructor(normalMap: Texture) {
        super(InterfacePass._shader_)

        this.material.uniforms.uNormalMap.value = normalMap
    }
}