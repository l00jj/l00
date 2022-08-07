import * as THREE from "THREE";
import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";



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
     * :none 动态大小，外框适用画布
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
            width = width ? width : viewContainerDom.offsetWidth
            height = height ? height : viewContainerDom.offsetHeight
            updateSize(width, height)
            canvasDom.style.width = width + 'px'
            canvasDom.style.height = height + 'px'
            viewContainerDom.style.width = width + 'px'
            viewContainerDom.style.height = height + 'px'
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
























declare function getWebGLContext(canvasDom: HTMLCanvasElement): WebGLRenderingContext

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



























































































class ShaderProgramVariable {
    qualifier: string
    type: string
    name: string
    location: number | WebGLUniformLocation
    constructor(qualifier: string, type: string, name: string, location: number | WebGLUniformLocation) {
        this.qualifier = qualifier
        this.type = type
        this.name = name
        this.location = location
    }
}


class ShaderProgram {
    variables: { [key: string]: ShaderProgramVariable } = {}
    vertexShaderSource: string
    fragmentShaderSource: string
    program?: WebGLProgram
    init?: (gl: WebGLRenderingContext) => boolean
    constructor(variables: string[], vertexShaderSource: string, fragmentShaderSource: string) {
        this.vertexShaderSource = vertexShaderSource
        this.fragmentShaderSource = fragmentShaderSource
        // 生成 Program 暂不考虑更新 init单次使用
        this.init = (gl: WebGLRenderingContext) => {
            Reflect.deleteProperty(this, 'init');
            return !!ShaderProgram.createShader(gl, this, variables)
        }
    }

    // 生成 Program 和 变量接口 ，暂不考虑更新 init单次使用
    static createShader(gl: WebGLRenderingContext, shaderProgram: ShaderProgram, variables: string[]): undefined | WebGLProgram {
        // 生成 Program
        const program = ShaderProgram.createProgram(gl, shaderProgram.vertexShaderSource, shaderProgram.fragmentShaderSource);
        if (!program) throw new Error('Failed to create program')
        shaderProgram.program = program;
        // 生成接口
        for (let variableString of variables) {
            const variableDescribe = variableString.toString().split(' ')
            if (variableDescribe.length !== 3) continue;
            // 必须有变量名
            const name = /\w/.test(variableDescribe[2]) ? variableDescribe[2] : null
            if (!name) continue;
            // 必须有类型
            const type = /\w/.test(variableDescribe[1]) ? variableDescribe[1] : null
            if (!type) continue;
            // 必须有存储限定符 Storage Qualifier
            const qualifier = /\w/.test(variableDescribe[0]) ? variableDescribe[0] : null
            if (!qualifier) continue;
            // 必须有地址
            const location =
                qualifier === "attribute" ? gl.getAttribLocation(program, name) :
                    qualifier === "uniform" ? gl.getUniformLocation(program, name) :
                        null
            if (location === null) continue;
            // 存储
            shaderProgram.variables[name] = new ShaderProgramVariable(qualifier, type, name, location)
        }
        //
        return program
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
        // 如已经存在纹理，则删除缓存
        if (textureSource.texture) gl.deleteTexture(textureSource.texture)
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
        // 配置纹理图像
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

    isViewMatrixChanged = true
    viewMatrix = new THREE.Matrix4(); // 参考源码中属性 quaternion 推测用于视距矩阵

    position = new THREE.Vector3(0, 0, 0);
    up = Object3D.DefaultUp.clone();

    constructor() { }
    lookAt(x: number, y: number, z: number) {
        // 源码中重置草稿 并 设置视距方向，此处简化
        this.viewMatrix.identity()
        this.viewMatrix.lookAt(this.position, new THREE.Vector3(x, y, z), this.up)
        this.isViewMatrixChanged = true
    }
}

// 参考图示：https://www.likecs.com/show-203963589.html
// API： https://threejs.org/docs/index.html#api/en/math/Matrix4.lookAt
// 参考 Camera 源码：https://github.com/mrdoob/three.js/blob/dev/src/cameras/Camera.js
// 参考 OrthographicCamera 源码：https://github.com/mrdoob/three.js/blob/dev/src/cameras/OrthographicCamera.js
class OrthographicCamera extends Object3D {
    left = -1
    right = 1
    top = 1
    bottom = -1
    near = 0.1
    far = 2000
    projectionMatrix = new THREE.Matrix4();
    pvMatrix = new THREE.Matrix4();
    constructor() {
        super()
        this.update()
    }

    // 设置视觉矩阵换算
    update(left = - 1, right = 1, top = 1, bottom = - 1, near = 0.1, far = 2000) {
        this.left = left
        this.right = right
        this.top = top
        this.bottom = bottom
        this.near = near
        this.far = far
        this.projectionMatrix.identity().makeOrthographic(left, right, top, bottom, near, far)
    }

    // 获取合成视觉矩阵
    getPVMatrix() {
        if (this.isViewMatrixChanged) {
            //const lookAt = Object3D.DraftMatrix.identity()
            //.lookAt(this.position, new THREE.Vector3(x, y, z), this.up)
            //this.projectionMatrix.premultiply(lookAt)
            this.pvMatrix.identity().multiply(this.viewMatrix).multiply(this.projectionMatrix)
            this.isViewMatrixChanged = false
        }
        return this.pvMatrix.elements
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








class Particle {
    position = [0, 0]
    angle = 0// 向量角度 deg
    speed = 0
    constructor() {
        //super()
    }
}


class Particles {
    particleSize = 2

    vertexs = {
        buffer: {} as WebGLBuffer
    }

    opacitys = {
        buffer: {} as WebGLBuffer
    }

    texCoordMatrix = new THREE.Matrix3();

    constructor() { }

    list: Particle[] = []

    // 创建粒子
    create(number: number) {
        // 清空
        this.list.length = 0
        // 新建
        for (let i = 0; i < number; i++) {
            this.list.push(new Particle())
        }
    }

    isNeedUpdata = true
    update(gl: WebGLRenderingContext) {
        if (!this.isNeedUpdata) return;

        // Create a buffer object
        const vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
        // 缓存
        this.vertexs.buffer = vertexBuffer

        const opacitysBuffer = gl.createBuffer();
        if (!opacitysBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
        // 缓存
        this.opacitys.buffer = opacitysBuffer

        // 锁上
        this.isNeedUpdata = false
    }

}




































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
        // 配置纹理图像
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

































class DynamicsMapPoint {
    brightness: number = 0; // 具体值
    ratio: number = 0;// 比值，0~1
    averageRatio: number = 0;// 平均比值，0~1
    [key: string]: any
}
class DynamicsMap {
    map: DynamicsMapPoint[][] = []
    width = 0
    height = 0

    constructor() { }

    update(pixels: Uint8Array, width: number, height: number) {
        // 清空
        this.map = Array(height).fill(0).map(() => Array(width))
        // 更新
        this.width = width
        this.height = height
        // 用于生成亮度
        const calculateBrightness = (red: number, green: number, blue: number) => {
            return Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114)
        }
        // 计算亮度
        let min = Infinity, max = -Infinity
        for (let y = 0, pixelsData = pixels, map = this.map; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                const red = pixelsData[index + 0]
                const green = pixelsData[index + 1]
                const blue = pixelsData[index + 2]
                //const alpha = pixelsData[index+3]
                const brightness = calculateBrightness(red, green, blue)
                const point = new DynamicsMapPoint()
                point.brightness = brightness
                point.ratio = brightness / 255
                map[y][x] = point
                // 计算大小
                min = Math.min(brightness, min)
                max = Math.max(brightness, max)
            }
        }
        // 计算平均亮度比
        for (let y = 0, map = this.map, sum = max - min; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const point = map[y][x]
                const averageRatio = (point.brightness - min) / sum
                point.averageRatio = averageRatio
            }
        }
        // console.log(this.map)
    }

    // 导出顺序列
    getPixels(key: string = 'ratio') {
        const width = this.width
        const height = this.height
        const length = width * height * 4
        const result = new Uint8Array(length)
        for (let y = 0, map = this.map; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (y * width + x);
                const point = map[y][x];
                index *= 4
                const color = Math.round(point[key] * 255)
                result[index + 0] = color
                result[index + 1] = color
                result[index + 2] = color
                result[index + 3] = 255
            }
        }
        return result
    }
}






























class RendererCore {
    // 用于完成初始化后触发的事件
    static Event_Ready = Symbol()
    static Event_ParticlesNumber_Changed = Symbol()

    main: Main
    constructor(main: Main) {
        this.main = main
        // 初始化
        this.init()
        // 在完成初始化后开始渲染
        this.main.once(RendererCore.Event_Ready, () => this.main.time.onTick(() => this.render()))
    }

    camera = new OrthographicCamera()

    programs = {} as { [key: string]: ShaderProgram }
    layers = [] as any[]

    particles = new Particles()
    backgroundPlane!: PlaneMesh


    // 创建离屏渲染帧，采用两帧互相作为下一帧周转
    currentIndepFrame = new IndepFrame()
    lastIndepFrame = new IndepFrame()
    particlesIndepFrame = new IndepFrame()


    init() {
        const { gl, sizes } = this.main

        // Enable alpha blending
        gl.enable(gl.BLEND);//gl.disable (gl.BLEND);

        // Set blending function
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Set clear color (the color is slightly changed)
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        // 背景力学图着色器
        const imageProgram = new ShaderProgram(
            [
                "attribute vec4 a_Position",
                "attribute vec2 a_TexCoord",
                "uniform sampler2D u_Sampler",
            ],
            // 顶点着色器
            `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;

void main() {
  gl_Position = a_Position;
  v_TexCoord = a_TexCoord;
}`,
            // 片着色器
            `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;

varying vec2 v_TexCoord;

void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}`
        )
        // 保存着色器
        if (!imageProgram.init || !imageProgram.init(gl)) throw new Error('Shader Program Create Fail')
        else this.programs.imageProgram = imageProgram

        // 生成背景着色器
        const backgroundProgram = new ShaderProgram(
            [
                "attribute vec4 a_Position",
                "attribute vec2 a_TexCoord",
                "uniform mat4 u_ProjectMatrix",
                "uniform sampler2D u_Sampler",
                "uniform sampler2D u_Particles",
                "uniform vec4 u_AddColor",
            ],
            // 顶点着色器
            `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;

uniform mat4 u_ProjectMatrix;

varying vec2 v_TexCoord;
void main() {
  gl_Position = a_Position;
  v_TexCoord = a_TexCoord;
}`,
            // 片着色器
            `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
uniform sampler2D u_Particles;
uniform vec4 u_AddColor;

varying vec2 v_TexCoord;

vec4 normalMix(vec4 aColor, vec4 bColor) {
  vec4 result = (1.0 - bColor.a) * aColor + bColor.a * bColor;
  result.a = 1.0;
  return result;
}

vec4 addParticles(vec4 aColor, vec4 bColor) {
    vec4 result = (1.0 - bColor.a) * aColor + bColor.a * bColor;
    result.a=1.0;
    return result;
}

void main() {
  //gl_FragColor = normalMix(texture2D(u_Sampler, v_TexCoord), u_AddColor);
  vec4 bg = normalMix(texture2D(u_Sampler, v_TexCoord), u_AddColor);
  //gl_FragColor = normalMix(bg, texture2D(u_Particles, v_TexCoord));
  gl_FragColor = addParticles(bg, texture2D(u_Particles, v_TexCoord));
  //gl_FragColor = texture2D(u_Particles, v_TexCoord);
  //gl_FragColor.a=1.0;
  //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  //gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  //gl_FragColor = bg;
}`
        )
        // 保存着色器
        if (!backgroundProgram.init || !backgroundProgram.init(gl)) throw new Error('Shader Program Create Fail')
        else this.programs.backgroundProgram = backgroundProgram


        // 生成粒子着色器
        const particlesProgram = new ShaderProgram(
            [
                "attribute vec4 a_Position",
                "attribute float a_Opacity",
                "uniform mat4 u_ProjectMatrix",
                "uniform float u_ParticleSize",
                "uniform vec4 u_InputColor",
                "uniform mat3 u_TexCoordMatrix",
                "uniform sampler2D u_Sampler",
            ],
            // 顶点着色器
            `
attribute vec4 a_Position;
attribute float a_Opacity;

uniform mat4 u_ProjectMatrix;
uniform float u_ParticleSize;
uniform mat3 u_TexCoordMatrix;

varying vec2 v_TexCoord;
varying float v_Opacity;

void main() {
  gl_Position = u_ProjectMatrix * a_Position;
  gl_PointSize = u_ParticleSize;
  v_TexCoord = vec2(u_TexCoordMatrix * vec3(a_Position.xy, 1.0));
  v_Opacity = a_Opacity;
}`,
            // 片着色器
            `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
uniform vec4 u_InputColor;

varying vec2 v_TexCoord;
varying float v_Opacity;


void main() {
  // 点的样式
  float strength = step(0.5, 1.0 - distance(gl_PointCoord, vec2(0.5)));
  //float aa = (0.5 + 0.5 * v_Opacity) * strength;
  float aValue = (0.9 + 0.1 * v_Opacity) * strength;
  gl_FragColor = u_InputColor.a == 0.0 ? texture2D(u_Sampler, v_TexCoord) : u_InputColor;
  gl_FragColor.a = aValue;
}`
        )
        // 保存着色器
        if (!particlesProgram.init || !particlesProgram.init(gl)) throw new Error('Shader Program Create Fail')
        else this.programs.particlesProgram = particlesProgram

        // Particles 初始化
        this.particles.update(gl)

        // 底板图形
        const backgroundPlane = new PlaneMesh(2, 2, 0);
        backgroundPlane.update(gl)
        this.backgroundPlane = backgroundPlane

    }

    // 纹理集合
    textures = {
        original: new TextureSource()
    }

    // 使用外部图片链接生成图片纹理
    use(url: string) {
        // 暂停渲染
        this.main.paused()
        // 新建图片
        const image = new Image();
        // 加装完成后回调
        const onImageLoaded = () => {
            const { gl, sizes } = this.main
            // 更新原图
            this.textures.original.setImage(image);
            this.textures.original.update(gl);
            // 更新全部尺寸
            const width = image.naturalWidth
            const height = image.naturalHeight
            // 更新大小
            sizes.update({ width, height })
            // 更新摄像机
            this.camera.update(-sizes.width / 2, sizes.width / 2, sizes.height / 2, -sizes.height / 2, -100.0, 100.0)
            // 设置视觉范围
            // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/viewport
            gl.viewport(0, 0, sizes.width, sizes.height);
            // 生成力学图
            this.createMaps()
            // 更新粒子离屏渲染帧
            this.particlesIndepFrame.width = sizes.width
            this.particlesIndepFrame.height = sizes.height
            this.particlesIndepFrame.update(gl)
            // 创建离屏渲染帧，采用两帧互相作为下一帧周转
            this.currentIndepFrame.width = sizes.width
            this.currentIndepFrame.height = sizes.height
            this.currentIndepFrame.update(gl)
            // 创建离屏渲染帧，采用两帧互相作为下一帧周转
            this.lastIndepFrame.width = sizes.width
            this.lastIndepFrame.height = sizes.height
            this.lastIndepFrame.update(gl)
            // 生成粒子
            this.createParticles()
            // 粒子位置转换图片对应坐标
            const particlesTexCoordMatrix = this.particles.texCoordMatrix;
            particlesTexCoordMatrix.identity()
            particlesTexCoordMatrix.scale(1 / sizes.width, 1 / sizes.height)
            particlesTexCoordMatrix.translate(0.5, 0.5)

            ///////////测试
            // window.particlesTexCoordMatrix = particlesTexCoordMatrix
            // this.particles.particleSize=100
            // this.particles.create(2)
            // this.particles.list[0].position = [0, 0]
            // this.particles.list[0].speed = 0
            // this.particles.list[1].position = [50, 50]
            // this.particles.list[1].speed = 0
            ///////////测试

            // 尝试触发 Event_Ready
            this.main.emit(RendererCore.Event_Ready)

            // 开始渲染
            this.main.render()
        }
        // 载入
        image.src = url;
        image.onload = onImageLoaded
    }

    // 粒子密度，每100平方像素多少个粒子
    particlesDensity = 12
    // 粒子初始运动角度
    particlesInitAngle = -45 as -45 | 0 | -90
    // 粒子偏转，0.0 ~ 5.0
    particlesDeflection = 0.0
    // 粒子初始位置
    particlesInitPosition = 'top' as 'top' | 'left' | 'random'
    // 粒子颜色是否跟随图片
    particlesIsColourful = true
    // 粒子颜色指定颜色，RGB
    particlesInputColor = [1, 1, 1]
    // 用于创建新粒子
    createParticles() {
        const { gl, sizes } = this.main
        // 统计粒子数，每 10*10 个像素，n个粒子
        const particlesNumber = Math.floor(this.particlesDensity * sizes.width * sizes.height / (10 * 10))
        // 生成粒子列表
        this.particles.create(particlesNumber)
        // 初始化粒子
        this.initParticles()
        // 触发事件
        this.main.emit(RendererCore.Event_ParticlesNumber_Changed, particlesNumber)// 提示更新粒子数
    }
    // 用于即时初始化粒子
    initParticles() {
        const { sizes } = this.main
        const particlesList = this.particles.list
        const particlesInitPosition = this.particlesInitPosition
        const particlesInitAngle = this.particlesInitAngle
        // 3种初始位置方程
        const initPosition = particlesInitPosition === "top" ? () => [(Math.random() - 0.5) * sizes.width, 0.5 * sizes.height] :
            particlesInitPosition === "left" ? () => [- 0.5 * sizes.width, (Math.random() - 0.5) * sizes.height] :
                () => [(Math.random() - 0.5) * sizes.width, (Math.random() - 0.5) * sizes.height]
        // 逐个更新
        for (let particle of particlesList) {
            particle.position = initPosition()
            particle.speed = 0.5 + Math.random() * 2.0
            particle.angle = particlesInitAngle
        }
    }



    dynamicsMap = new DynamicsMap()
    createMaps() {
        const { gl, sizes } = this.main

        // 必须有着色器 Program
        const shaderProgram = this.programs.imageProgram
        if (!shaderProgram || !shaderProgram.program) return false;

        // 底图
        const originalImgTexture = this.textures.original
        if (!originalImgTexture || !originalImgTexture.texture) return false;

        // 底板
        const geometries = this.backgroundPlane

        // 大小
        const width = sizes.width
        const height = sizes.height

        // 使用离屏帧
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentIndepFrame.framebuffer);

        // 使用着色器
        gl.useProgram(shaderProgram.program)

        // Assign the buffer objects and enable the assignment
        const initAttributeVariable = (variable: ShaderProgramVariable, attributeBuffer: AttributeBuffer) => {
            if (!attributeBuffer.buffer) return;
            const location = variable.location as number
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer.buffer);
            gl.vertexAttribPointer(location, attributeBuffer.dataNumber, attributeBuffer.dataType, false, 0, 0);
            gl.enableVertexAttribArray(location);
        }
        initAttributeVariable(shaderProgram.variables.a_Position, geometries.vertexsBuffer);    // Vertex coordinates
        initAttributeVariable(shaderProgram.variables.a_TexCoord, geometries.texCoordsBuffer);  // Texture coordinates

        // Bind the texture object to the target
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, originalImgTexture.texture);
        gl.uniform1i(shaderProgram.variables.u_Sampler.location, 0);

        // Draw
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometries.indicesBuffer.buffer!);
        gl.drawElements(gl.TRIANGLES, geometries.indicesBuffer.data.length, geometries.indicesBuffer.dataType, 0);

        // 读取像素
        const pixelsLength = width * height * 4; // 宽 * 高 * RGBA
        const pixels = new Uint8Array(pixelsLength); // Array for storing the pixel value
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        // 生成力学图
        this.dynamicsMap.update(pixels, width, height)

        // 测试 - 具象化Map
        // this.showMaps()
    }

    // 具象化Map - 用于测试
    showMaps() {
        const { gl, sizes } = this.main

        // 必须有着色器 Program
        const shaderProgram = this.programs.imageProgram
        if (!shaderProgram || !shaderProgram.program) return false;

        // 底图
        const originalImgTexture = this.textures.original
        if (!originalImgTexture || !originalImgTexture.texture) return false;

        // 底板
        const geometries = this.backgroundPlane

        // 大小
        const width = this.dynamicsMap.width
        const height = this.dynamicsMap.height

        // 使用离屏帧
        //gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentIndepFrame.framebuffer);

        // 清空内容
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // 使用着色器
        gl.useProgram(shaderProgram.program)

        // 设置视觉范围
        gl.viewport(0, 0, width, height);

        // Assign the buffer objects and enable the assignment
        const initAttributeVariable = (variable: ShaderProgramVariable, attributeBuffer: AttributeBuffer) => {
            if (!attributeBuffer.buffer) return;
            const location = variable.location as number
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer.buffer);
            gl.vertexAttribPointer(location, attributeBuffer.dataNumber, attributeBuffer.dataType, false, 0, 0);
            gl.enableVertexAttribArray(location);
        }
        initAttributeVariable(shaderProgram.variables.a_Position, geometries.vertexsBuffer);    // Vertex coordinates
        initAttributeVariable(shaderProgram.variables.a_TexCoord, geometries.texCoordsBuffer);  // Texture coordinates

        // 力学图缓存
        const dynamicsMapData = this.dynamicsMap.getPixels('averageRatio')

        const texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        // 绑定纹理到 TEXTURE_2D
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置图片缩放时的处理情况
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // 配置纹理图像
        // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, dynamicsMapData);

        // Bind the texture object to the target
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(shaderProgram.variables.u_Sampler.location, 0);

        // Draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometries.indicesBuffer.buffer!);
        gl.drawElements(gl.TRIANGLES, geometries.indicesBuffer.data.length, geometries.indicesBuffer.dataType, 0);
    }


    render = () => {
        const { gl, sizes } = this.main

        // 必须要有 Program
        const imageProgram = this.programs.imageProgram
        if (!imageProgram || !imageProgram.program) return false;

        // 必须要有 Program
        const backgroundProgram = this.programs.backgroundProgram
        if (!backgroundProgram || !backgroundProgram.program) return false;

        // 必须要有 Program
        const particlesProgram = this.programs.particlesProgram
        if (!particlesProgram || !particlesProgram.program) return false;

        // 必须要有 Camera
        const camera = this.camera

        // 底板
        const backgroundPlane = this.backgroundPlane

        // 底图
        const originalImgTexture = this.textures.original
        if (!originalImgTexture || !originalImgTexture.texture) return false;

        // 最后显示的结果图
        let resultTexture: WebGLTexture | null = null

        /**
         * 
         * 
         * 
         *  ----- 渲染粒子环节 ------
         * 
         * 
         * 
         */

        // 使用离屏帧
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.particlesIndepFrame.framebuffer);

        // 使用粒子着色器
        gl.useProgram(particlesProgram.program)

        // 力学图
        const dynamicsMap = this.dynamicsMap

        // 粒子列表
        const particlesList = this.particles.list

        // 粒子位置列表
        const positionsPositions = new Float32Array(particlesList.length * 2)

        // 粒子强度列表
        const positionsOpacitys = new Float32Array(particlesList.length * 1)

        // 更新粒子位置
        for (let len = particlesList.length,
            width = dynamicsMap.width,
            height = dynamicsMap.height,
            particlesDeflection = this.particlesDeflection,
            pointSize = 2,
            index = 0; index < len; index++) {
            const particle = particlesList[index]
            // 粒子坐标
            const lastPosition = particle.position
            // 计算速度
            let speed = particle.speed, opacity = 0.0
            // 转换坐标
            const indexY = Math.floor(lastPosition[1] + height / 2)
            const indexX = Math.floor(lastPosition[0] + width / 2)
            // 获取力学图对应信息
            if (indexX >= 0 && indexX < width && indexY >= 0 && indexY < height) {
                const dynamics = dynamicsMap.map[indexY][indexX]
                const r = 0.1
                // 计算速度
                speed = speed * r + speed * (1 - r) * (1 - dynamics.averageRatio)
                opacity = dynamics.averageRatio
                // 计算度数
                particle.angle += particlesDeflection * dynamics.averageRatio % 360
            }
            // 计算移动距离
            const distance = speed
            // 移动度数
            const radian = (particle.angle * Math.PI) / 180
            // 计算最后轴移动
            const moveX = Math.cos(radian) * distance
            const moveY = Math.sin(radian) * distance
            // 计算具体坐标
            let x = lastPosition[0] + moveX + width / 2
            let y = lastPosition[1] + moveY + height / 2
            // 处理过界
            if (y > height + pointSize) {
                y = -pointSize
            } else if (y < -pointSize) {
                y = height + pointSize
            }
            if (x > width + pointSize) {
                x = -pointSize
            } else if (x < -pointSize) {
                x = width + pointSize
            }
            // 更新坐标
            lastPosition[0] = x - width / 2
            lastPosition[1] = y - height / 2
            // 排列位置
            const pIndex = index * 2
            positionsPositions[pIndex] = lastPosition[0]
            positionsPositions[pIndex + 1] = lastPosition[1]
            // 透明度
            positionsOpacitys[index] = opacity
        }


        // 绑定数据
        gl.bindBuffer(gl.ARRAY_BUFFER, this.particles.vertexs.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positionsPositions, gl.STATIC_DRAW);
        gl.vertexAttribPointer(particlesProgram.variables.a_Position.location as number, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(particlesProgram.variables.a_Position.location as number);

        // 绑定数据
        gl.bindBuffer(gl.ARRAY_BUFFER, this.particles.opacitys.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positionsOpacitys, gl.STATIC_DRAW);
        gl.vertexAttribPointer(particlesProgram.variables.a_Opacity.location as number, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(particlesProgram.variables.a_Opacity.location as number);

        // 传入视觉参数
        gl.uniformMatrix4fv(particlesProgram.variables.u_ProjectMatrix.location, false, camera.getPVMatrix());

        // 传入粒子对应图片uv矩阵换算
        gl.uniformMatrix3fv(particlesProgram.variables.u_TexCoordMatrix.location, false, this.particles.texCoordMatrix.elements);

        // 传入粒子大小参数
        gl.uniform1f(particlesProgram.variables.u_ParticleSize.location, this.particles.particleSize);

        // 传入粒子颜色参数
        gl.uniform4fv(particlesProgram.variables.u_InputColor.location, [...this.particlesInputColor, this.particlesIsColourful ? 0 : 1]);

        // 放入图片
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, originalImgTexture.texture);
        particlesProgram.variables.u_Sampler &&
            gl.uniform1i(particlesProgram.variables.u_Sampler.location, 0);

        // Clear
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw points
        gl.drawArrays(gl.POINTS, 0, particlesList.length);

        /**
         * 
         * 
         *  
         * ----- 渲染底图环节 ------
         * 
         * 
         * 
         */

        // 使用离屏帧
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentIndepFrame.framebuffer);

        // 使用着色器
        gl.useProgram(backgroundProgram.program)

        // Assign the buffer objects and enable the assignment
        const initAttributeVariable = (variable: ShaderProgramVariable, attributeBuffer: AttributeBuffer) => {
            if (!attributeBuffer.buffer) return;
            const location = variable.location as number
            gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer.buffer);
            gl.vertexAttribPointer(location, attributeBuffer.dataNumber, attributeBuffer.dataType, false, 0, 0);
            gl.enableVertexAttribArray(location);
        }
        initAttributeVariable(backgroundProgram.variables.a_Position, backgroundPlane.vertexsBuffer);    // Vertex coordinates
        initAttributeVariable(backgroundProgram.variables.a_TexCoord, backgroundPlane.texCoordsBuffer);  // Texture coordinates

        // 添加减退颜色
        gl.uniform4fv(backgroundProgram.variables.u_AddColor.location, [0, 0, 0, 0.02]);

        // 设置 1号纹理 背景
        gl.activeTexture(gl.TEXTURE0);
        //////////////////// 测试
        time++
        if (time < 10) {
            //if (time) {
            gl.bindTexture(gl.TEXTURE_2D, originalImgTexture.texture);
            gl.uniform4fv(backgroundProgram.variables.u_AddColor.location, [0, 0, 0, 0])
        } else {
            gl.bindTexture(gl.TEXTURE_2D, this.lastIndepFrame.texture);
        }
        ////////////////////
        gl.uniform1i(backgroundProgram.variables.u_Sampler.location, 0);

        // 设置 2号纹理 粒子图层
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.particlesIndepFrame.texture);
        gl.uniform1i(backgroundProgram.variables.u_Particles.location, 1);

        // Draw
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, backgroundPlane.indicesBuffer.buffer!);
        gl.drawElements(gl.TRIANGLES, backgroundPlane.indicesBuffer.data.length, backgroundPlane.indicesBuffer.dataType, 0);

        // 设置结果
        resultTexture = this.currentIndepFrame.texture

        // 两帧交换
        const temp = this.currentIndepFrame
        this.currentIndepFrame = this.lastIndepFrame
        this.lastIndepFrame = temp

        /**
         * 
         * 
         *  
         * ----- 渲染底图环节 ------
         * 
         * 
         * 
         */

        // 设置显示帧
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // 使用着色器
        gl.useProgram(imageProgram.program)

        // 设置显示的图片
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, resultTexture);
        gl.uniform1i(imageProgram.variables.u_Sampler.location, 0);

        // Clear
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw 
        gl.drawElements(gl.TRIANGLES, backgroundPlane.indicesBuffer.data.length, backgroundPlane.indicesBuffer.dataType, 0);

    }

}

let time = 0


class Renderer {
    core: RendererCore
    constructor(main: Main) {
        this.core = new RendererCore(main)
        if (main.guiHelper) new RendererCoreHelper(main, this.core)
    }
}

class RendererCoreHelper {
    constructor(main: Main, core: RendererCore) {
        if (!main.guiHelper) return;
        const gui = main.guiHelper.datGui.ui
        const fun = {
            toggle() {
                _rendererRender_.value = !_rendererRender_.value
                if (_rendererRender_.value) {
                    main.render()
                    rendererRender.name(`渲染中-点击暂停`)
                } else {
                    main.paused()
                    rendererRender.name(`暂停渲染-点击开始`)
                }
            },
            getParticlesNumber() {
                const number = core.particles.list.length
                particlesNumber.name(`当前粒子数: ${number}`)
            }
        }
        // 渲染器
        const RendererFolder = gui.addFolder('Renderer')
        RendererFolder.open()
        // 暂停或开始
        const _rendererRender_ = { value: true }
        const rendererRender = RendererFolder.add(fun, 'toggle').name(`渲染中-点击暂停`)
        // 粒子
        const ParticlesFolder = gui.addFolder('Particles')
        ParticlesFolder.open()
        const particlesDensity = ParticlesFolder.add(core, 'particlesDensity', 1, 20, 1).name(`粒子密度`)
            .onFinishChange(() => core.createParticles())
        // 显示当前粒子数量
        const particlesNumber = ParticlesFolder.add(fun, 'getParticlesNumber').name(`当前粒子数:`)
        main.on(RendererCore.Event_ParticlesNumber_Changed, fun.getParticlesNumber)
        // 粒子出现的初始位置
        const particlesInitPosition = ParticlesFolder.add(core, 'particlesInitPosition', ['top', 'left', 'random']).name(`粒子出现位置`)
            .onFinishChange(() => core.initParticles())
        // 粒子出现的初始位置
        const _particlesInitAngle_ = { value: -45 }
        const particlesInitAngle = ParticlesFolder.add(_particlesInitAngle_, 'value', [-45, 0, -90]).name(`粒子运动方向`)
            .onFinishChange((val) => {
                core.particlesInitAngle = parseFloat(val.toString()) as -45 | 0 | -90
                core.initParticles()
            })
        // 粒子偏转
        const particlesDeflection = ParticlesFolder.add(core, 'particlesDeflection', 0.0, 2.0, 0.01).name(`粒子偏转`)
        // 粒子是否跟随图片颜色
        const particlesIsColourful = ParticlesFolder.add(core, 'particlesIsColourful').name(`粒子是否跟随图片颜色`)
        // 粒子颜色
        const _particlesColor_ = { value: [255, 255, 255] }
        const particlesColor = ParticlesFolder.addColor(_particlesColor_, 'value').name(`粒子颜色`)
            .onFinishChange(() => core.particlesInputColor = _particlesColor_.value.map(c => c / 255))
        // 粒子大小
        const particlesSize = ParticlesFolder.add(core.particles, 'particleSize', 1, 10, 1).name(`粒子大小`)
        //
        const demo = {
            vertical() {

            },
            slantwise() {

            }

        }
        const DemoFolder = gui.addFolder('Demo')
        DemoFolder.open()
        DemoFolder.add(demo, 'vertical').name(`粒子垂直往下`)
            .onFinishChange(() => core.particlesInitAngle = -90)

    }
}



const viewContainerDom = document.querySelector('.viewContainer') as HTMLElement;
const view = new Main(viewContainerDom)


/*  if (!window.dynamicsMap) {
        window.dynamicsMap = dynamicsMap
        window.particles = this.particles
        console.log(this.particles)
        console.log(dynamicsMap)
        // 读取像素
        const pixelsLength = sizes.width * sizes.height * 4; // 宽 * 高 * RGBA
        const pixels = new Uint8Array(1 * 1 * 4); // Array for storing the pixel value
        //gl.readPixels(186, 258, 200, 200, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.readPixels(200, 320, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);//128 128 128 64
        //gl.readPixels(250, 370, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);//191 191 191 96
        console.log(pixels)
        // 
        window.pixels = pixels
    } */





view.canvasDom.style.background = 'palevioletred'
view.canvasDom.style.background = 'red'
import("./example1.png?url").then((module) => {
    const url = module.default
    view.renderer.core.use(url)
})