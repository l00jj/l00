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
    main: Main

    constructor(main: Main) {
        // Setup
        this.main = main
        this.main.time.onTick(this.render)
    }


    render = () => {
        /* const { ctx, sizes, world, params } = this.main
        //this.main.world.forceMapPixels && this.main.ctx.putImageData(this.main.world.forceMapPixels, 0, 0);
        ctx.globalAlpha = 1
        ctx.fillStyle = 'rgba(0,0,0,0.05)'
        ctx.fillRect(0, 0, sizes.width, sizes.height)
        ctx.globalAlpha = 0.2
        world.render() */
        jumpCode(this.main)
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
        // 设置渲染器
        this.renderer = new Renderer(this)
        // 生成渲染空间
        this.world = new World(this)
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













































const viewContainerDom = document.querySelector('.viewContainer') as HTMLElement;
const mainRenderer = new Main(viewContainerDom)
import("./example.png?url").then((module) => {
    const url = module.default
    const image = new Image();
    image.src = url;
    image.onload = () => {
        mainRenderer.world.background.use(image);
        mainRenderer.render();
        mainRenderer.paused();
    };
    //const width = 474.0
    //const height = 720.0

})

















































declare function getWebGLContext(canvasDom: HTMLCanvasElement): WebGLRenderingContext
declare function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string): boolean


// Vertex shader program
var VSHADER_SOURCE = `attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_MvpMatrix;
varying vec2 v_TexCoord;
void main() {
  gl_Position = u_MvpMatrix * a_Position;
  v_TexCoord = a_TexCoord;
}`;

const planeBGMaterial_Vertex_Source = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
uniform mat4 u_MvpMatrix;
varying vec2 v_TexCoord;
void main() {
    gl_Position = u_MvpMatrix * a_Position;
  v_TexCoord = a_TexCoord;
}`;

// Fragment shader program
var planeBGMaterial_Fragment_Source = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
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


class ProgramModule {
    program?: WebGLProgram
    vertexShaderSource: string
    fragmentShaderSource: string
    constructor(vertexShaderSource: string, fragmentShaderSource: string) {
        this.vertexShaderSource = vertexShaderSource
        this.fragmentShaderSource = fragmentShaderSource
    }
    init(gl: WebGLRenderingContext) {
        const program = ProgramModule.createProgram(gl, this.vertexShaderSource, this.fragmentShaderSource);
        if (!program) throw new Error('Failed to create program')
        this.program = program
    }

    static createProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
        // Create shader object
        const vertexShader = ProgramModule.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = ProgramModule.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
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


class ShaderMaterial {
    variables: { attributes?: any, uniforms?: any, varyings?: any }
    programModule: ProgramModule
    constructor(variables: { attributes?: any, uniforms?: any, varyings?: any }, vertexShaderSource: string, fragmentShaderSource: string) {
        this.variables = variables
        this.programModule = new ProgramModule(vertexShaderSource, fragmentShaderSource)
    }

    init(gl: WebGLRenderingContext) {
        this.programModule.init(gl)
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

    const planeBGMaterial = new ShaderMaterial(
        {
            attributes: {
                "a_Position": { value: new THREE.Vector2(0, 0) },
                "a_TexCoord": { value: [] },
            },
            uniforms: {
                "u_MvpMatrix": { value: new THREE.Matrix4() },
            }
        },
        planeBGMaterial_Vertex_Source,
        planeBGMaterial_Fragment_Source
    )


    planeBGMaterial.init(gl)


    
    console.log(planeBGMaterial)


    var program = (gl as any).program; // Get program object
    program.a_Position = gl.getAttribLocation(program, 'a_Position');
    program.a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    program.u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
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
    var planeBG = new PlaneMesh(main, 20, 20, 0);




    // Enable depth test
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

    console.log(planeBG, viewProjMatrix)
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
    //console.log(gl.program.u_MvpMatrix)
    //gl.uniformMatrix4fv(gl.program.u_MvpMatrix, false, new Float32Array(tt) );
    
    gl.uniformMatrix4fv((gl as any).program .u_MvpMatrix, false, new Float32Array(g_mvpMatrix.elements));



    /*   // _drawTexturedObject_(gl, program, cube, _planeBG_, _planeBlack_, texture);
      function _drawTexturedObject_(gl, program, cube, _planeBG_, _planeBlack_, texture) {
          // Assign the buffer objects and enable the assignment
          initAttributeVariable(gl, program.a_Position, _planeBG_.vertexBuffer);    // Vertex coordinates
          initAttributeVariable(gl, program.a_TexCoord, _planeBG_.texCoordBuffer);  // Texture coordinates
          gl.uniform1f(gl.program.u_Black, 0.0);
        
          // Bind the texture object to the target
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
        
          // Draw
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _planeBG_.indexBuffer);
          gl.drawElements(gl.TRIANGLES, _planeBG_.numIndices, _planeBG_.indexBuffer.type, 0);
        
          if (t > 90) {
        
            // Assign the buffer objects and enable the assignment
            initAttributeVariable(gl, program.a_Position, _planeBlack_.vertexBuffer);    // Vertex coordinates
            initAttributeVariable(gl, program.a_TexCoord, _planeBlack_.texCoordBuffer);  // Texture coordinates
            gl.uniform1f(gl.program.u_Black, 1.0);
        
            // Bind the texture object to the target
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
        
            // Draw
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _planeBlack_.indexBuffer);
            gl.drawElements(gl.TRIANGLES, _planeBlack_.numIndices, _planeBlack_.indexBuffer.type, 0);
          }
        
*/

    // Assign the buffer objects and enable the assignment
    initAttributeVariable(gl, program.a_Position, planeBG.vertexBuffer);    // Vertex coordinates
    initAttributeVariable(gl, program.a_TexCoord, planeBG.texCoordBuffer);  // Texture coordinates
    //gl.uniform1f(gl.program.u_Black, 0.0);

    // Bind the texture object to the target
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Draw
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeBG.indexBuffer.buffer);
    gl.drawElements(gl.TRIANGLES, planeBG.indicesLength, planeBG.indexBuffer.type, 0);


    function initAttributeVariable(gl: WebGLRenderingContext, a_attribute: number, buffer: Buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.vertexAttribPointer(a_attribute, buffer.number, buffer.type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
    }
}








class Buffer {
    buffer: WebGLBuffer
    number: number
    type: number
    constructor(buffer: WebGLBuffer, number: number, type: number) {
        this.buffer = buffer
        this.number = number
        this.type = type
    }
}

class Mesh {
    constructor() {

    }
}

class PlaneMesh extends Mesh {
    vertexBuffer: Buffer
    texCoordBuffer: Buffer
    indexBuffer: Buffer
    indicesLength: number
    constructor(main: Main, width: number, height: number, depth: number) {
        super()
        const { gl } = main

        // Create face
        //  v1------v0
        //  |        | 
        //  |        |
        //  |        |
        //  v2------v3

        // Vertex coordinates
        const vertices = new Float32Array([
            width / 2, height / 2, depth, width / -2, height / 2, depth, width / -2, height / -2, depth, width / 2, height / -2, depth   // v0-v1-v2-v3
        ]);

        // Texture coordinates
        const texCoords = new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

        // Indices of the vertices
        const indices = new Uint8Array([0, 1, 2, 0, 2, 3]);

        // Write vertex information to buffer object
        this.vertexBuffer = PlaneMesh.createArrayBuffer(gl, vertices, 3, gl.FLOAT);
        this.texCoordBuffer = PlaneMesh.createArrayBuffer(gl, texCoords, 2, gl.FLOAT);
        this.indexBuffer = PlaneMesh.createElementArrayBuffer(gl, indices, gl.UNSIGNED_BYTE);

        // 记录索引的长度
        this.indicesLength = indices.length;

        // Unbind the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    // 创建定点浮点值缓存
    static createArrayBuffer(gl: WebGLRenderingContext, data: Float32Array, num: number, type: number) {
        // Create a buffer object
        const buffer = gl.createBuffer();
        if (!buffer) throw new Error('Failed to create the buffer object');

        // Write date into the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        // Store the necessary information to assign the object to the attribute variable later
        return new Buffer(buffer, num, type)
    }

    // 创建元素索引值缓存
    static createElementArrayBuffer(gl: WebGLRenderingContext, data: Uint8Array, type: number) {
        // Create a buffer object
        const buffer = gl.createBuffer();
        if (!buffer) throw new Error('Failed to create the buffer object');

        // Write date into the buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

        // Store the necessary information to assign the object to the attribute variable later
        return new Buffer(buffer, NaN, type)
    }
}


/* 
  function drawTexturedPlane(gl, program, o, angle, texture, viewProjMatrix) {
    // Calculate a model matrix
    g_modelMatrix.setTranslate(0, 0, 1);
    //g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
    //g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
  
    // Calculate the model view project matrix and pass it to u_MvpMatrix
    g_mvpMatrix.set(viewProjMatrix);
    g_mvpMatrix.multiply(g_modelMatrix);
    gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
  
    drawTexturedObject(gl, program, o, texture);
  }
 */



class RendererCore {
    static drawTexturedObject(gl: WebGLRenderingContext, program: WebGLProgram, target: Mesh, texture: WebGLTexture) {
        /* 
             // Assign the buffer objects and enable the assignment
             initAttributeVariable(gl, program.a_Position, o.vertexBuffer);    // Vertex coordinates
             initAttributeVariable(gl, program.a_TexCoord, o.texCoordBuffer);  // Texture coordinates
           
             // Bind the texture object to the target
             gl.activeTexture(gl.TEXTURE0);
             gl.bindTexture(gl.TEXTURE_2D, texture);
           
             // Draw
             gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);
             gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0); */
    }
}


