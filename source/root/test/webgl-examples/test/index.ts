import * as THREE from "THREE";
import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";
import { Z_UNKNOWN } from "zlib";



/**
 * vision 220726.001
 */
class Sizes {
    main: Main
    width = 0;
    height = 0;
    //pixelRatio = 0;//可能有用，直接提高或降低分辨率

    /**
     * fit
     * fit使用是用于既定大小的渲染，既定大小，然后通过变形适配外框
     * :contain 优先内容，与外框不一致时等比缩小并尽可能把全部内容显示
     * :cover 优先填充，与外框不一致时等比放大并尽可能把覆盖外框
     * :fill 优先形状，与外框不一致时变形拉伸贴合外框
     * :none 动态大小
     */
    static Fit_Contain = Symbol()
    static Fit_Cover = Symbol()
    static Fit_Fill = Symbol()
    static Fit_None = Symbol()
    static fitMap = {
        [Sizes.Fit_Contain]: 'contain',
        [Sizes.Fit_Cover]: 'cover',
        [Sizes.Fit_Fill]: 'fill',
        [Sizes.Fit_None]: 'none',
    }
    fit = Sizes.Fit_None;

    constructor(main: Main, params?: { fit: symbol }) {
        // Setup
        this.main = main
        this.update({ fit: params?.fit ? params.fit : Sizes.Fit_None })

        // Resize event    
        Sizes.resizeObserve(this)
    }


    static resizeObserve(sizes: Sizes) {
        const main = sizes.main
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => sizes.update());
            resizeObserver.observe(main.viewContainerDom)
            main.onDestroyed(() => resizeObserver.disconnect())
        } else {
            const onresize = () => sizes.update()
            window.addEventListener('resize', onresize)
            main.onDestroyed(() => window.removeEventListener('resize', onresize))
        }
    }

    update(update: { width?: number, height?: number, fit?: symbol } = {}) {
        let { width, height, fit } = update
        const { viewContainerDom, canvasDom } = this.main
        if (!viewContainerDom || !canvasDom) return;
        const updateSize = (width: number, height: number) => {
            this.width = width;
            this.height = height;
            canvasDom.width = width
            canvasDom.height = height
        }
        // 更新画布大小
        // Sizes.Fit_None 时无论如何都更新
        // 其他模式下，按需更新
        if (this.fit === Sizes.Fit_None) {
            width = width ? width : this.main.viewContainerDom.offsetWidth
            height = height ? height : this.main.viewContainerDom.offsetHeight
            updateSize(width, height)
            canvasDom.style.width = width + 'px'
            canvasDom.style.height = height + 'px'
        } else if ((this.width !== width || this.height !== height) && width && height) {
            updateSize(width, height)
            canvasDom.style.width = '100%'
            canvasDom.style.height = '100%'
        }
        //this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        // 更新画布填充模式
        if (fit && fit !== this.fit && Sizes.fitMap.hasOwnProperty(fit)) {
            this.fit = fit
            canvasDom.style.objectFit = Sizes.fitMap[this.fit]
        }
        //
        this.main.emit(Main.Event_Resize)
    }

    onResize(fun: Function) {
        return this.main.on(Main.Event_Resize, fun)
    }
}




























/**
 * vision 220724.001
 */
class Time {
    main: Main
    time: number
    start: number
    current: number
    elapsed: number
    delta: number

    constructor(main: Main) {
        // Setup
        this.main = main

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.time = performance.now()
        this.elapsed = 0
        this.delta = 16
    }

    requestAnimationFrameID = 0
    onTickLoopFunction = (highResTimeStamp: DOMHighResTimeStamp) => {
        this.current = Date.now()
        const newTime = performance.now()
        this.delta = newTime - this.time
        this.time = newTime
        this.elapsed += this.delta
        //
        this.main.emit(Main.Event_Tick);
        //
        if (this.currentTickLoopFunction)
            this.requestAnimationFrameID = window.requestAnimationFrame(this.currentTickLoopFunction as () => {})
    }

    // 当清除时，函数为空函数已终结 requestAnimationFrame
    currentTickLoopFunction?: (time: DOMHighResTimeStamp) => void


    // Tick 
    isTicking = false
    tick() {
        //避免重复启动 currentTickLoopFunction
        if (!this.currentTickLoopFunction) {
            this.currentTickLoopFunction = this.main.params.helper.stats.enable ? (time: DOMHighResTimeStamp) => {
                this.main.stats?.begin()
                this.onTickLoopFunction(time)
                this.main.stats?.end()
            } : this.onTickLoopFunction;
            if (!this.isTicking) {
                this.isTicking = true
                this.time = performance.now() - (1000 / 60)//为了在暂停后再开始不至于delta过大造成停顿
                this.currentTickLoopFunction(window.performance.now())
            }
        }
    }

    // 暂停
    paused() {
        if (this.isTicking) {
            window.cancelAnimationFrame(this.requestAnimationFrameID)
            this.currentTickLoopFunction = undefined
            this.isTicking = false
        }
    }

    onTick(fun: Function) {
        return this.main.on(Main.Event_Tick, fun)
    }
}






















class GuiHelper {
    main: Main
    datGui: DatGui
    constructor(main: Main) {
        this.main = main
        this.datGui = new DatGui()
        this.datGui.appendGuiTo(this.main.viewContainerDom)
        this.main.onDestroyed(() => this.datGui.destroy())
        Promise.resolve().then(() => this.init())
    }

    init() {
        const main = this.main
        const datGui = this.datGui
        //const { particles, renderer } = this.main.params

    }
}






























type Point = {
    brightness: number
    ratio: number
    color: string
    //brightnessColor: string
}

class Background {
    image?: HTMLImageElement
    main: Main

    constructor(main: Main) {
        this.main = main
    }

    use(image: HTMLImageElement) {
        this.image = image
        this.main.sizes.update({ width: this.image.naturalWidth, height: this.image.naturalHeight })
        //this.updatePoints()
    }

}


class World {
    main: Main

    background: Background
    constructor(main: Main) {
        this.main = main

        this.background = new Background(this.main)

        //this.createBaseParticles()
    }
}



























class Renderer {
    core: RendererCore
    constructor(main: Main) {
        this.core = new RendererCore(main)
    }
}

















class Main extends EventEmitter {
    params = {
        "helper": {
            "stats": {
                "enable": true
            },
            "gui": {
                "enable": true
            }
        },
        "particles": {}
    }
    // 刷新事件ID
    static Event_Tick = Symbol()
    // 视图大小变动事件ID
    static Event_Resize = Symbol()
    // 销毁事件ID
    static Event_Destroyed = Symbol()
    // 计时器
    time: Time
    // 大小监听器
    sizes: Sizes
    // 外框Dom
    viewContainerDom: HTMLElement
    // 渲染器调整环节
    renderer: Renderer
    // 纹理资源
    textures: Map<string | symbol, TextureSource> = new Map()
    // 渲染空间流程
    world: World
    // 画布Dom
    canvasDom = window.document.createElement('canvas') as HTMLCanvasElement
    // webgl
    gl: WebGLRenderingContext
    // FPS统计器
    stats?: Stats
    // Gui控制器
    guiHelper?: GuiHelper
    constructor(viewContainerDom: HTMLElement) {
        super()
        // 缓存 Canvas 的外壳元素
        this.viewContainerDom = viewContainerDom
        // 放入 Canvas
        this.viewContainerDom.appendChild(this.canvasDom)
        // 获取webgl
        this.gl = getWebGLContext(this.canvasDom);
        if (!this.gl) console.error('Failed to get the rendering context for WebGL'); //报错
        // 装载帧数FPS统计器
        if (this.params.helper.stats.enable)
            this.stats = new Stats(this.viewContainerDom)
        // 装载Gui控制器
        if (this.params.helper.gui.enable)
            this.guiHelper = new GuiHelper(this)
        // 设置计时器
        this.time = new Time(this)
        // 设置视图大小控制器
        this.sizes = new Sizes(this, { fit: Sizes.Fit_None })
        // 生成渲染空间
        this.world = new World(this)
        // 设置渲染器
        this.renderer = new Renderer(this)
    }
    // 渲染
    render() {
        this.time.tick()
    }
    // 暂停渲染
    paused() {
        this.time.paused()
    }

    onDestroyed(fun: Function) {
        return this.once(Main.Event_Destroyed, fun)
    }

    destroy() {
        this.emit(Main.Event_Destroyed); // Emit Destroyed Event
    }
}















































































declare function getWebGLContext(canvasDom: HTMLCanvasElement): WebGLRenderingContext
declare function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string): boolean


// Vertex shader program
var VSHADER_SOURCE = `attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_ProjectMatrix;
varying vec2 v_TexCoord;
void main() {
  gl_Position = u_ProjectMatrix * a_Position;
  v_TexCoord = a_TexCoord;
}`;

/* var FSHADER_SOURCE = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`; */

var FSHADER_SOURCE = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}`;





























type ShaderProgramVariablesInputTypes = { attributes?: string[], uniforms?: string[], varyings?: string[] }

class ShaderProgram {
    variables: { 'attributes'?: any, 'uniforms'?: any, 'varyings'?: any } = {}
    vertexShaderSource: string
    fragmentShaderSource: string
    program?: WebGLProgram
    init?: (gl: WebGLRenderingContext) => void
    constructor(variables: ShaderProgramVariablesInputTypes, vertexShaderSource: string, fragmentShaderSource: string) {
        this.vertexShaderSource = vertexShaderSource
        this.fragmentShaderSource = fragmentShaderSource
        // 生成 Program 暂不考虑更新 init单次使用
        this.init = (gl: WebGLRenderingContext) => {
            ShaderProgram.createShader(gl, this, variables)
            Reflect.deleteProperty(this, 'init');
        }
    }

    setTexture() {

    }

    static getVariableLocation = {
        "attributes": (gl: WebGLRenderingContext, program: WebGLProgram, name: string) => gl.getAttribLocation(program, name),
        "uniforms": (gl: WebGLRenderingContext, program: WebGLProgram, name: string) => gl.getUniformLocation(program, name),
    }
    // 生成 Program 和 变量接口 ，暂不考虑更新 init单次使用
    static createShader(gl: WebGLRenderingContext, shaderProgram: ShaderProgram, variables: ShaderProgramVariablesInputTypes) {
        // 生成 Program
        const program = ShaderProgram.createProgram(gl, shaderProgram.vertexShaderSource, shaderProgram.fragmentShaderSource);
        if (!program) throw new Error('Failed to create program')
        shaderProgram.program = program;
        // 生成接口

        Object.entries(variables).forEach(([variableName, variable]) => {
            const getVariableLocation =
                variableName === 'attributes' ? ShaderProgram.getVariableLocation.attributes :
                    variableName === 'uniforms' ? ShaderProgram.getVariableLocation.uniforms :
                        null
            const variableItem =
                variableName === 'attributes' ? shaderProgram.variables.attributes ? shaderProgram.variables.attributes : (shaderProgram.variables.attributes = {}) :
                    variableName === 'uniforms' ? shaderProgram.variables.uniforms ? shaderProgram.variables.uniforms : (shaderProgram.variables.uniforms = {}) :
                        {}
            getVariableLocation && variable.forEach(name => {
                variableItem[name] = getVariableLocation(gl, program, name);
            })
        })
    }

    // 生成 Program
    static createProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
        // Create shader object
        const vertexShader = ShaderProgram.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = ShaderProgram.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return null;
        // Create a program object
        const program = gl.createProgram();
        if (!program) return null;
        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        // Link the program object
        gl.linkProgram(program);
        // Check the result of linking
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

    // 解析着色器
    static loadShader(gl: WebGLRenderingContext, type: number, source: string) {
        // Create shader object
        const shader = gl.createShader(type);
        if (shader === null) {
            console.log('unable to create shader')
            return null
        }
        // Set the shader program
        gl.shaderSource(shader, source);
        // Compile the shader
        gl.compileShader(shader);
        // Check the result of compilation
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            throw new Error(error?.toString())
        }
        return shader;
    }
}
































class TextureSource {
    static types = {
        image: Symbol()
    }
    type?: symbol
    texture?: WebGLTexture

    constructor() { }

    image?: HTMLImageElement
    setImage(image: HTMLImageElement) {
        this.type = TextureSource.types.image
        this.image = image
    }

    static setImageTexture(gl: WebGLRenderingContext, textureSource: TextureSource, image: HTMLImageElement) {
        const texture = gl.createTexture();
        if (!texture) throw new Error('can not WebGLRenderingContextBase.createTexture()')
        // 图像的第一个像素是左上方开始读取，而WEBGL中纹理用迪尔卡坐标的第一象限，是左下方第一个开个写入，所以需要翻转Y轴
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        // 绑定纹理到 TEXTURE_2D
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置图片缩放时的处理情况
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // 零号纹理
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // Unbind the texture object
        gl.bindTexture(gl.TEXTURE_2D, null);
        // 缓存
        textureSource.texture = texture
        return true
    }

    update(gl: WebGLRenderingContext) {
        if (this.type === TextureSource.types.image && this.image) {
            return TextureSource.setImageTexture(gl, this, this.image)
        }
        return false
    }
}






























// 参考源码: https://github.com/mrdoob/three.js/blob/dev/src/core/Object3D.js
class Object3D {
    static DefaultUp = new THREE.Vector3(0, 1, 0);
    static DraftMatrix = new THREE.Matrix4();
    quaternion = new THREE.Matrix4(); // 参考源码推测用于视距矩阵
    position = new THREE.Vector3(0, 0, 0);
    up = Object3D.DefaultUp.clone();
    constructor() { }

}

// 参考 Camera 源码：https://github.com/mrdoob/three.js/blob/dev/src/cameras/Camera.js
class Camera extends Object3D {
    projectionMatrix = new THREE.Matrix4();
    constructor() {
        super()
    }
}

// 参考图示：https://www.likecs.com/show-203963589.html
// API： https://threejs.org/docs/index.html#api/en/math/Matrix4.lookAt
// 参考 OrthographicCamera 源码：https://github.com/mrdoob/three.js/blob/dev/src/cameras/OrthographicCamera.js
class OrthographicCamera extends Camera {
    left = -1
    right = 1
    top = 1
    bottom = -1
    near = 0.1
    far = 2000
    constructor(left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000) {
        super()
        this.left = left
        this.right = right
        this.top = top
        this.bottom = bottom
        this.near = near
        this.far = far
        // 设置视觉矩阵换算
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, near, far)
    }

    // 暂时为了方便，直接整合视距矩阵
    lookAt(x: number, y: number, z: number) {
        // 重置草稿 并 设置视距方向
        const lookAt = Object3D.DraftMatrix.identity()
            .lookAt(this.position, new THREE.Vector3(x, y, z), this.up)
        this.projectionMatrix.premultiply(lookAt)
    }
}


































class AttributeBuffer {
    static ARRAY_BUFFER = Symbol()
    static ELEMENT_ARRAY_BUFFER = Symbol()
    static FLOAT = Symbol()
    static UNSIGNED_BYTE = Symbol()

    buffer?: WebGLBuffer
    bufferTypeID: Symbol//内部核对
    bufferType!: number//对应gl的内容

    data!: Float32Array | Uint8Array
    dataNumber!: number
    dataTypeID!: Symbol  //内部核对
    dataType!: number //对应gl的内容

    constructor(bufferTypeID: Symbol) {
        this.bufferTypeID = bufferTypeID
    }

    setData(data: Float32Array | Uint8Array, dataNumber: number, dataTypeID: Symbol) {
        this.data = data
        this.dataNumber = dataNumber
        this.dataTypeID = dataTypeID
    }

    update(gl: WebGLRenderingContext) {
        this.bufferType = this.bufferTypeID === AttributeBuffer.ARRAY_BUFFER ? gl.ARRAY_BUFFER :
            this.bufferTypeID === AttributeBuffer.ELEMENT_ARRAY_BUFFER ? gl.ELEMENT_ARRAY_BUFFER :
                NaN;
        this.dataType = this.dataTypeID === AttributeBuffer.FLOAT ? gl.FLOAT :
            this.dataTypeID === AttributeBuffer.UNSIGNED_BYTE ? gl.UNSIGNED_BYTE :
                NaN;
        if (Number.isNaN(this.bufferTypeID)) throw new Error('Unknown Buffer type');
        if (Number.isNaN(this.dataTypeID)) throw new Error('Unknown Data type');

        // Write vertex information to buffer object
        AttributeBuffer.createBuffer(this, gl, this.bufferType, this.data)
    }

    // 创建值的缓存
    static createBuffer(attributeBuffer: AttributeBuffer, gl: WebGLRenderingContext, bufferType: number, data: Float32Array | Uint8Array) {
        // Create a buffer object
        const buffer = gl.createBuffer();
        if (!buffer) throw new Error('Failed to create the buffer object');

        // Write date into the buffer object
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, data, gl.STATIC_DRAW);

        // Store the necessary information to assign the object to the attribute variable later
        attributeBuffer.buffer = buffer
    }

}

class Mesh {
    constructor() {

    }
}

class PlaneMesh extends Mesh {
    vertexsBuffer: AttributeBuffer
    texCoordsBuffer: AttributeBuffer
    indicesBuffer: AttributeBuffer
    constructor(width: number, height: number, length: number) {
        super()
        // Vertex coordinates
        //  v1-------v0
        //  |    ^    | 
        //  |    *  > |
        //  |         |
        //  v2-------v3
        const vertices = new Float32Array([
            width / 2, height / 2, length, width / -2, height / 2, length, width / -2, height / -2, length, width / 2, height / -2, length   // v0-v1-v2-v3
        ]);
        this.vertexsBuffer = new AttributeBuffer(AttributeBuffer.ARRAY_BUFFER)
        this.vertexsBuffer.setData(vertices, 3, AttributeBuffer.FLOAT)

        // Texture coordinates
        //   v1-------v0
        //   |         | 
        //   |         |
        //   |         |
        // ^ v2-------v3
        // * > 
        const texCoords = new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);
        this.texCoordsBuffer = new AttributeBuffer(AttributeBuffer.ARRAY_BUFFER)
        this.texCoordsBuffer.setData(texCoords, 2, AttributeBuffer.FLOAT)

        // Indices of the vertices
        const indices = new Uint8Array([0, 1, 2, 0, 2, 3]);
        this.indicesBuffer = new AttributeBuffer(AttributeBuffer.ELEMENT_ARRAY_BUFFER)
        this.indicesBuffer.setData(indices, 0, AttributeBuffer.UNSIGNED_BYTE)

        // 等待更新
        this.isNeedUpdata = true
    }

    isNeedUpdata = false
    update(gl: WebGLRenderingContext) {
        if (!this.isNeedUpdata) return;

        this.vertexsBuffer.update(gl)
        this.texCoordsBuffer.update(gl)
        this.indicesBuffer.update(gl)

        // Unbind the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // 锁上
        this.isNeedUpdata = false
    }

}






























const planeShader_Vertex_Source = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_ProjectMatrix;
varying vec2 v_TexCoord;
void main() {
  gl_Position = u_ProjectMatrix * a_Position;
  // gl_Position = vec4(1.0, 1.0, 1.0, 1.0) * a_Position;
  //gl_Position = a_Position;
  //gl_Position = a_Position;
  v_TexCoord = a_TexCoord;
}`;

// Fragment shader program
var planeShader_Fragment_Source = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}`;







function jumpCode2(main: Main) {
    const { gl, sizes, world } = main
    // 生成着色器
    const shaderProgram = new ShaderProgram(
        {
            attributes: ["a_Position", "a_TexCoord"],
            uniforms: ["u_ProjectMatrix", "u_Sampler"],
        },
        planeShader_Vertex_Source,
        planeShader_Fragment_Source
    )
    shaderProgram.init && shaderProgram.init(gl);
    if (!shaderProgram.program) throw new Error('Shader Program Create Fail')
    console.log(shaderProgram)



    // 生成图片纹理
    const ImgTexture = new TextureSource()
    if (world.background.image) ImgTexture.setImage(world.background.image);
    ImgTexture.update(gl)


    // 底板图形
    //var planeBG = new PlaneMesh(sizes.width, sizes.height, 0);
    var planeBG = new PlaneMesh(sizes.width, sizes.height, 0);
    planeBG.update(gl)

    // 摄像机
    const mainCamera = new OrthographicCamera(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100.0, 100.0)
    mainCamera.position.set(0, 0, 100)
    mainCamera.position.set(0, 0, 0)


    /**
     *  ----- 渲染环节 ------
     */
    gl.clearColor(1.0, 0.0, 0.0, 1.0); // Set clear color (the color is slightly changed)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO

    // 使用着色器
    gl.useProgram(shaderProgram.program)

    // 设置视觉范围
    // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/viewport
    gl.viewport(0, 0, sizes.width, sizes.height);

    // Enable alpha blending
    // gl.enable(gl.BLEND);//gl.disable (gl.BLEND);
    // Set blending function
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


    // 传入参数
    gl.uniformMatrix4fv(shaderProgram.variables.uniforms.u_ProjectMatrix, false, mainCamera.projectionMatrix.elements);

    // Assign the buffer objects and enable the assignment
    initAttributeVariable(gl, shaderProgram.variables.attributes.a_Position, planeBG.vertexsBuffer);    // Vertex coordinates
    initAttributeVariable(gl, shaderProgram.variables.attributes.a_TexCoord, planeBG.texCoordsBuffer);  // Texture coordinates
    gl.uniform1i(shaderProgram.variables.uniforms.u_Sampler, 0);

    // Bind the texture object to the target
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ImgTexture.texture!);

    // Draw
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeBG.indicesBuffer.buffer!);
    gl.drawElements(gl.TRIANGLES, planeBG.indicesBuffer.data.length, planeBG.indicesBuffer.dataType, 0);

    function initAttributeVariable(gl: WebGLRenderingContext, a_attribute: number, attributeBuffer: AttributeBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer.buffer!);
        gl.vertexAttribPointer(a_attribute, attributeBuffer.dataNumber, attributeBuffer.dataType, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
    }




}























function jumpCode(main: Main) {
    console.log(main)
    const { gl, sizes, world } = main

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    var program = (gl as any).program; // Get program object
    program.a_Position = gl.getAttribLocation(program, 'a_Position');
    program.a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    program.u_ProjectMatrix = gl.getUniformLocation(program, 'u_ProjectMatrix');
    program.u_Black = gl.getUniformLocation(program, 'u_Black');

    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
        console.log('Failed to create the Texture object');
        return null;
    }

    // Get storage location of u_Sampler
    var u_Sampler = gl.getUniformLocation((gl as any).program, 'u_Sampler');
    if (!u_Sampler) {
        console.log('Failed to get the storage location of u_Sampler');
        return null;
    }

    // Register the event handler to be called when image loading is completed

    // Write image data to texture object
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // 零号纹理
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, world.background.image!);
    // Pass the texure unit 0 to u_Sampler
    gl.uniform1i(u_Sampler, 0);

    gl.bindTexture(gl.TEXTURE_2D, null); // Unbind the texture object



    /* function initTextures(gl) {
        var texture = gl.createTexture();   // Create a texture object
        if (!texture) {
          console.log('Failed to create the Texture object');
          return null;
        }
      
        // Get storage location of u_Sampler
        var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        if (!u_Sampler) {
          console.log('Failed to get the storage location of u_Sampler');
          return null;
        }
      
        var image = new Image();  // Create image object
        if (!image) {
          console.log('Failed to create the Image object');
          return null;
        }
        // Register the event handler to be called when image loading is completed
        image.onload = function () {
          // Write image data to texture object
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
          
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          // Pass the texure unit 0 to u_Sampler
          gl.uniform1i(u_Sampler, 0);
      
          gl.bindTexture(gl.TEXTURE_2D, null); // Unbind the texture object
        };
      
        // Tell the browser to load an Image  
        image.src = '../resources/sky_cloud.jpg';
      
        return texture;
      }
 */


    // 生成图形
    //var planeBG = new PlaneMesh(main, 20, 20, 0);




    // Enable length test
    gl.enable(gl.DEPTH_TEST);
    // 开启双面面渲染
    //  gl.enable(gl.CULL_FACE);
    // Enable alpha blending
    gl.enable(gl.BLEND);//gl.disable (gl.BLEND);
    // Set blending function
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // 透明度设置，但似乎无用
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    // gl.blendColor(0.0, 0.0, 0.0, 1.0);

    // 设置视觉矩阵换算
    var viewProjMatrix = new THREE.Matrix4();
    viewProjMatrix.makeOrthographic(-10, 10, -10, 10, -10000.0, 10000.0);

    //console.log(planeBG, viewProjMatrix)
    //_draw_(gl, canvas, fbo, fbo1, fbo2, plane, cube, _planeBG_, _planeBlack_, currentAngle, texture, viewProjMatrix, viewProjMatrixFBO);
    /* 
        
        
    
        // Set the vertex information
            var n = initVertexBuffers(gl);
        if (n < 0) {
            console.log('Failed to set the vertex information');
            return;
        }
    
        // Specify the color for clearing <canvas>
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
        // Set texture
        if (!initTextures(gl, n)) {
            console.log('Failed to intialize the texture.');
            return;
        } */



    //gl.bindFramebuffer(gl.FRAMEBUFFER, curFbo);              // Change the drawing destination to FBO
    gl.viewport(0, 0, sizes.width, sizes.height); // Set a viewport for FBO

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color (the color is slightly changed)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO


    var g_modelMatrix = new THREE.Matrix4();
    var g_mvpMatrix = new THREE.Matrix4();

    //_drawTexturedCube_(gl, gl.program, cube, _planeBG_, _planeBlack_, angle, curTexture, viewProjMatrixFBO);   // Draw the cube
    g_mvpMatrix.copy(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    console.log(g_mvpMatrix)
    var tt =
        [
            10, 0, 0, 0,
            0, 10, 0, 0,
            0, 0, 10, 0,
            0, 0, 0, 10,
        ]
    //console.log(gl.program.u_ProjectMatrix)
    //gl.uniformMatrix4fv(gl.program.u_ProjectMatrix, false, new Float32Array(tt) );

    gl.uniformMatrix4fv((gl as any).program.u_ProjectMatrix, false, new Float32Array(g_mvpMatrix.elements));



    /*   // _drawTexturedObject_(gl, program, cube, _planeBG_, _planeBlack_, texture);
      function _drawTexturedObject_(gl, program, cube, _planeBG_, _planeBlack_, texture) {
          // Assign the buffer objects and enable the assignment
          initAttributeVariable(gl, program.a_Position, _planeBG_.vertexsBuffer);    // Vertex coordinates
          initAttributeVariable(gl, program.a_TexCoord, _planeBG_.texCoordsBuffer);  // Texture coordinates
          gl.uniform1f(gl.program.u_Black, 0.0);
        
          // Bind the texture object to the target
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
        
          // Draw
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _planeBG_.indicesBuffer);
          gl.drawElements(gl.TRIANGLES, _planeBG_.numIndices, _planeBG_.indicesBuffer.type, 0);
        
          if (t > 90) {
        
            // Assign the buffer objects and enable the assignment
            initAttributeVariable(gl, program.a_Position, _planeBlack_.vertexsBuffer);    // Vertex coordinates
            initAttributeVariable(gl, program.a_TexCoord, _planeBlack_.texCoordsBuffer);  // Texture coordinates
            gl.uniform1f(gl.program.u_Black, 1.0);
        
            // Bind the texture object to the target
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
        
            // Draw
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _planeBlack_.indicesBuffer);
            gl.drawElements(gl.TRIANGLES, _planeBlack_.numIndices, _planeBlack_.indicesBuffer.type, 0);
          }
        
*/

    /*   // Assign the buffer objects and enable the assignment
      initAttributeVariable(gl, program.a_Position, planeBG.vertexsBuffer);    // Vertex coordinates
      initAttributeVariable(gl, program.a_TexCoord, planeBG.texCoordsBuffer);  // Texture coordinates
      //gl.uniform1f(gl.program.u_Black, 0.0);
  
      // Bind the texture object to the target
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
  
      // Draw
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeBG.indicesBuffer.buffer);
      gl.drawElements(gl.TRIANGLES, planeBG.indicesLength, planeBG.indicesBuffer.type, 0);
  
  
      function initAttributeVariable(gl: WebGLRenderingContext, a_attribute: number, buffer: Buffer) {
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
          gl.vertexAttribPointer(a_attribute, buffer.number, buffer.type, false, 0, 0);
          gl.enableVertexAttribArray(a_attribute);
      } */
}






/* 
  function drawTexturedPlane(gl, program, o, angle, texture, viewProjMatrix) {
    // Calculate a model matrix
    g_modelMatrix.setTranslate(0, 0, 1);
    //g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
    //g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
  
    // Calculate the model view project matrix and pass it to u_ProjectMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(program.u_ProjectMatrix, false, g_mvpMatrix.elements);
  
    drawTexturedObject(gl, program, o, texture);
  }
 */







class IndepFrame {
    width = 100
    height = 100
    isNeedUpdate = true
    constructor() { }

    framebuffer: WebGLFramebuffer | null = null;
    depthBuffer: WebGLRenderbuffer | null = null
    texture: WebGLTexture | null = null

    update(gl: WebGLRenderingContext) {
        // clear handling function
        const clear = () => {
            if (this.framebuffer) gl.deleteFramebuffer(this.framebuffer);
            if (this.texture) gl.deleteTexture(this.texture);
            if (this.depthBuffer) gl.deleteRenderbuffer(this.depthBuffer);
        }

        // Define the error handling function
        const error = function () {
            clear()
            return false;
        }

        // 初始化
        clear()

        // Create a frame buffer object (FBO)
        this.framebuffer = gl.createFramebuffer();
        if (!this.framebuffer) {
            console.log('Failed to create frame buffer object');
            return error();
        }

        // Create a texture object and set its size and parameters
        this.texture = gl.createTexture(); // Create a texture object
        if (!this.texture) {
            console.log('Failed to create texture object');
            return error();
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture); // Bind the object to target
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


        // Create a renderbuffer object and Set its size and parameters
        this.depthBuffer = gl.createRenderbuffer(); // Create a renderbuffer object
        if (!this.depthBuffer) {
            console.log('Failed to create renderbuffer object');
            return error();
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer); // Bind the object to target
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        // Attach the texture and the renderbuffer object to the FBO
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);

        // Check if FBO is configured correctly
        var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            console.log('Frame buffer object is incomplete: ' + e.toString());
            return error();
        }

        // Unbind the buffer object
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }

}















const backgroundShader_Vertex_Source = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  uniform mat4 u_ProjectMatrix;
  varying vec2 v_TexCoord;
  void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }`;

// Fragment shader program
var backgroundShader_Fragment_Source = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  uniform sampler2D u_Sampler;
  uniform vec4 u_AddColor;
  
  varying vec2 v_TexCoord;
  
  vec4 normalMix(vec4 aColor, vec4 bColor) {
    vec4 result = (1.0 - bColor.a) * aColor + bColor.a * bColor;
    result.a = 1.0;
    return result;
  }
  
  void main() {
    gl_FragColor = normalMix(texture2D(u_Sampler, v_TexCoord), u_AddColor);
  }`;




















const particlesShader_Vertex_Source = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_ProjectMatrix;
varying vec2 v_TexCoord;
void main() {
  gl_Position = u_ProjectMatrix * a_Position;
  v_TexCoord = a_TexCoord;
  gl_PointSize = 10.0;
}`;

// Fragment shader program
var particlesShader_Fragment_Source = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_TexCoord;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;





class RendererCore {
    main: Main
    constructor(main: Main) {
        this.main = main
        // Setup
        this.main = main
        this.main.time.onTick(this.render)
    }



    mainCamera!: OrthographicCamera
    textures = {} as { [key: string]: TextureSource }
    programs = {} as { [key: string]: ShaderProgram }
    layers = [] as any[]
    backgroundPlane!: PlaneMesh


    // 创建离屏渲染帧，采用两帧互相作为下一帧周转
    currentIndepFrame = new IndepFrame()
    lastIndepFrame = new IndepFrame()


    init() {
        const { gl, sizes, world } = this.main

        // 创建离屏渲染帧，采用两帧互相作为下一帧周转
        this.currentIndepFrame.width = sizes.width
        this.currentIndepFrame.height = sizes.height
        this.currentIndepFrame.update(gl)

        // 创建离屏渲染帧，采用两帧互相作为下一帧周转
        this.lastIndepFrame.width = sizes.width
        this.lastIndepFrame.height = sizes.height
        this.lastIndepFrame.update(gl)

        // 生成背景着色器
        const backgroundProgram = new ShaderProgram(
            {
                attributes: ["a_Position", "a_TexCoord"],
                uniforms: ["u_ProjectMatrix", "u_Sampler", "u_AddColor"],
            },
            backgroundShader_Vertex_Source,
            backgroundShader_Fragment_Source
        )
        backgroundProgram.init && backgroundProgram.init(gl);
        if (!backgroundProgram.program) throw new Error('Shader Program Create Fail')
        // 保存着色器
        this.programs.backgroundProgram = backgroundProgram

        // 生成粒子着色器
        const particlesProgram = new ShaderProgram(
            {
                attributes: ["a_Position", "a_TexCoord"],
                uniforms: ["u_ProjectMatrix"],
            },
            particlesShader_Vertex_Source,
            particlesShader_Fragment_Source
        )
        particlesProgram.init && particlesProgram.init(gl);
        if (!particlesProgram.program) throw new Error('Shader Program Create Fail')
        // 保存着色器
        this.programs.particlesProgram = particlesProgram



        // 生成图片纹理
        const imgTexture = new TextureSource()
        if (world.background.image) imgTexture.setImage(world.background.image);
        imgTexture.update(gl)
        // 保存纹理
        this.textures.img = imgTexture


        // 底板图形
        const backgroundPlane = new PlaneMesh(2, 2, 0);
        backgroundPlane.update(gl)
        this.backgroundPlane = backgroundPlane

        // 摄像机
        const mainCamera = new OrthographicCamera(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100.0, 100.0)
        mainCamera.position.set(0, 0, 100)
        mainCamera.position.set(0, 0, 0)
        this.mainCamera = mainCamera

    }


    render = () => {
        time++
        if (time > 900) this.main.paused();
        const { gl, sizes, world } = this.main
        /* const { ctx, sizes, world, params } = this.main
        //this.main.world.forceMapPixels && this.main.ctx.putImageData(this.main.world.forceMapPixels, 0, 0);
        ctx.globalAlpha = 1
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, sizes.width, sizes.height)
        ctx.globalAlpha = 0.2
        world.render() */

        //jumpCode(this.main)
        //jumpCode2(this.main)

        // 必须要有 Program
        const backgroundProgram = this.programs.backgroundProgram
        if (!backgroundProgram || !backgroundProgram.program) return false;

        // 必须要有 Program
        const particlesProgram = this.programs.particlesProgram
        if (!particlesProgram || !particlesProgram.program) return false;

        // 必须要有 Camera
        const mainCamera = this.mainCamera

        // 底板
        const backgroundPlane = this.backgroundPlane

        // 底图
        const imgTexture = this.textures.img
        if (!imgTexture || !imgTexture.texture) return false;





        /**
         *  ----- 渲染环节 ------
         */
        gl.clearColor(1.0, 0.0, 0.0, 1.0); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO

        // 使用离屏帧
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentIndepFrame.framebuffer);

        // 使用着色器
        gl.useProgram(backgroundProgram.program)

        // 设置视觉范围
        // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/viewport
        gl.viewport(0, 0, sizes.width, sizes.height);

        // Enable alpha blending
        // gl.enable(gl.BLEND);//gl.disable (gl.BLEND);
        // Set blending function
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


        // 传入参数
        gl.uniformMatrix4fv(backgroundProgram.variables.uniforms.u_ProjectMatrix, false, mainCamera.projectionMatrix.elements);

        // Assign the buffer objects and enable the assignment
        initAttributeVariable(gl, backgroundProgram.variables.attributes.a_Position, backgroundPlane.vertexsBuffer);    // Vertex coordinates
        initAttributeVariable(gl, backgroundProgram.variables.attributes.a_TexCoord, backgroundPlane.texCoordsBuffer);  // Texture coordinates
        gl.uniform1i(backgroundProgram.variables.uniforms.u_Sampler, 0);
        gl.uniform4fv(backgroundProgram.variables.uniforms.u_AddColor, [0, 0, 0, 0.05]);

        // Bind the texture object to the target
        gl.activeTexture(gl.TEXTURE0);


        //////////////////// 测试
        if (time < 10) {
            gl.bindTexture(gl.TEXTURE_2D, imgTexture.texture);
            gl.uniform4fv(backgroundProgram.variables.uniforms.u_AddColor, [0, 0, 0, 0])
        } else {
            gl.bindTexture(gl.TEXTURE_2D, this.lastIndepFrame.texture);
        }
        ////////////////////

        // Draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, backgroundPlane.indicesBuffer.buffer!);
        gl.drawElements(gl.TRIANGLES, backgroundPlane.indicesBuffer.data.length, backgroundPlane.indicesBuffer.dataType, 0);

        function initAttributeVariable(gl: WebGLRenderingContext, a_attribute: number, attributeBuffer: AttributeBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer.buffer!);
            gl.vertexAttribPointer(a_attribute, attributeBuffer.dataNumber, attributeBuffer.dataType, false, 0, 0);
            gl.enableVertexAttribArray(a_attribute);
        }

        // 显示渲染结果
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.uniform4fv(backgroundProgram.variables.uniforms.u_AddColor, [0, 0, 0, 0]);
        gl.bindTexture(gl.TEXTURE_2D, this.currentIndepFrame.texture);
        gl.drawElements(gl.TRIANGLES, backgroundPlane.indicesBuffer.data.length, backgroundPlane.indicesBuffer.dataType, 0);

        // 两帧交换
        const temp = this.currentIndepFrame
        this.currentIndepFrame = this.lastIndepFrame
        this.lastIndepFrame = temp



        // 渲染粒子 
        gl.useProgram(particlesProgram.program)

        const vertices = new Float32Array([
            0.0, 0.0, -237.0, -360, 100.0, -100
        ]);

        var n = 3; // The number of vertices

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Write date into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(particlesProgram.variables.attributes.a_Position, 2, gl.FLOAT, false, 0, 0);

        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(particlesProgram.variables.attributes.a_Position);

        // 传入参数
        gl.uniformMatrix4fv(particlesProgram.variables.uniforms.u_ProjectMatrix, false, mainCamera.projectionMatrix.elements);


        // Draw three points
        gl.drawArrays(gl.POINTS, 0, n);

    }


}

let time = 0









const viewContainerDom = document.querySelector('.viewContainer') as HTMLElement;
const mainRenderer = new Main(viewContainerDom)
import("./example.png?url").then((module) => {
    const url = module.default
    const image = new Image();
    image.src = url;
    image.onload = () => {
        mainRenderer.world.background.use(image);
        mainRenderer.renderer.core.init()
        mainRenderer.render();
        // mainRenderer.paused();
    };
    //const width = 474.0
    //const height = 720.0
})











