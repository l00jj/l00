import { EventEmitter } from "@src/utils/EventEmitter"
import { Stats } from '@src/utils/Stats'
import { DatGui } from "@src/utils/DatGui";
import { config } from "process";
import { sortBy } from "lodash";


/**
 * vision 220815.001
 */
class Sizes {
  main: Main
  width = 0;
  height = 0;
  viewWidth = 0;// 外框
  viewHeight = 0;// 外框
  pixelRatio = 1;// 可能有用，直接提高或降低分辨率

  /**
   * fit
   * fit使用是用于既定大小的渲染，既定大小，然后通过变形适配外框
   * :contain 优先内容，画布适应外框，与外框不一致时等比缩小并尽可能把全部内容显示
   * :cover 优先填充，画布适应外框，与外框不一致时等比放大并尽可能把覆盖外框
   * :fill 优先形状，画布适应外框，与外框不一致时变形拉伸贴合外框
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

  constructor(main: Main, params = { fit: Sizes.Fit_Contain }) {
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

  update(update: { viewWidth?: number, viewHeight?: number, pixelRatio?: number, fit?: symbol } = {}) {
    const { viewContainerDom, canvasDom } = this.main
    let { viewWidth, viewHeight, pixelRatio, fit } = update
    // 排错
    if (!viewContainerDom || !canvasDom) return;
    // 设备分辨率比率，最小1，最大2
    this.pixelRatio = pixelRatio ? pixelRatio : Math.min(Math.max(1, window.devicePixelRatio), 2)
    // 更新画布填充模式
    if (fit && fit !== this.fit && Sizes.fitMap.hasOwnProperty(fit)) {
      this.fit = fit
    }
    // 按需更新外框大小
    if (this.fit === Sizes.Fit_None) {
      viewWidth = viewWidth ? viewWidth : this.viewWidth
      viewHeight = viewHeight ? viewHeight : this.viewHeight
    } else {
      viewWidth = viewContainerDom.offsetWidth
      viewHeight = viewContainerDom.offsetHeight
    }
    this.viewWidth = viewWidth
    this.viewHeight = viewHeight
    // 更新视图大小
    const width = viewWidth * this.pixelRatio
    const height = viewHeight * this.pixelRatio
    this.width = width;
    this.height = height;
    canvasDom.width = width
    canvasDom.height = height
    // 更新画布大小
    // Sizes.Fit_None 时无论如何都更新
    // 其他模式下，按需更新
    if (this.fit === Sizes.Fit_None) {
      canvasDom.style.position = 'absolute'
      canvasDom.style.width = this.viewWidth + 'px'
      canvasDom.style.height = this.viewHeight + 'px'
    } else if (width && height) {
      canvasDom.style.position = 'relative'
      canvasDom.style.width = '100%'
      canvasDom.style.height = '100%'
    }
    canvasDom.style.objectFit = Sizes.fitMap[this.fit]
    // 触发更新
    this.main.emit(Main.Event_Resize)
  }

  onResize(fun: Function) {
    return this.main.on(Main.Event_Resize, fun)
  }
}




























/**
 * vision 220810.001
 */
class Time {
  main: Main
  start = Date.now()
  time = 0 // 默认高精度时间ms，网页开始后运行了多久
  elapsed = 0 // 默认高精度时间ms，累计运行了多久，不计算暂停时间
  delta = 16// 默认高精度时间ms，距离上一个时间戳时差
  static Standard_Delta = 1000 / 60

  constructor(main: Main) {
    // Setup
    this.main = main

    Time.testSupportedPerformance()

    // Update
    this.update()
  }

  // 测试支持高精度时间
  static testSupportedPerformance() {
    if (!window.performance || !window.performance.now || typeof window.performance.now() !== 'number') {
      alert('Not Supported Performance Time')
      window.performance = window.Date as unknown as Performance  // 低精度
    }
  }

  // 更新信息
  update() {
    const newTime = performance.now() // 高精度
    this.delta = newTime - this.time
    this.time = newTime
    this.elapsed += this.delta
  }

  // LoopID
  loopID?: symbol

  // RequestAnimationFrameID
  requestAnimationFrameID = 0

  // Tick 
  isTicking = false

  // 开始
  tick() {
    //反锁避免重复启动 
    if (this.isTicking) return;
    // 反锁
    this.isTicking = true
    /**
     * 创建 loop
     * 独立的内包函数避免外部启动
     */
    // 新建并登记当前ID
    const loopID = Symbol()
    this.loopID = loopID
    // 创建 loop 主体
    const loop = this.main.stats?.isShow ? () => {
      // 监测一帧开始
      this.main.stats?.begin()
      // 更新信息
      this.update()
      // 触发广播事件 Event_Tick
      this.main.emit(Main.Event_Tick);
      // 循环
      if (loopID === this.loopID)
        this.requestAnimationFrameID = window.requestAnimationFrame(loop);
      // 监测一帧j结束
      this.main.stats?.end()
    } : () => {
      // 更新信息
      this.update()
      // 触发广播事件 Event_Tick
      this.main.emit(Main.Event_Tick);
      // 循环
      if (loopID === this.loopID)
        this.requestAnimationFrameID = window.requestAnimationFrame(loop);
    }
    // 更新信息
    this.update()
    // 判断是否暂停时间过长，如有暂停，设置最小帧时
    if (this.delta > Time.Standard_Delta) {
      this.time = performance.now() - Time.Standard_Delta;//避免暂停后再开始不至于delta过大造成不连续的跳跃停顿
    }
    // 启动
    loop()
  }

  // 暂停
  paused() {
    if (this.isTicking) {
      window.cancelAnimationFrame(this.requestAnimationFrameID)
      this.loopID = undefined
      this.isTicking = false
    }
  }

  // 主要用于帧数监听器更新
  retick() {
    this.paused()
    this.tick()
  }

  // 对外接口
  onTick(fun: Function) {
    return this.main.on(Main.Event_Tick, fun)
  }
}




























/**
 * vision 220815.001
 */
class Controls {

  static Interact_Start = Symbol()
  static Interact_Move = Symbol()
  static Interact_End = Symbol()
  static Interact_Book = {
    "mousedown": this.Interact_Start,
    "mousemove": this.Interact_Move,
    "mouseup": this.Interact_End,
    "touchstart": this.Interact_Start,
    "touchmove": this.Interact_Move,
    "touchend": this.Interact_End,
  } as { [key: string]: symbol }


  main: Main

  onMouseEvent = (e: MouseEvent) => {
    this.main.emit(Controls.Interact_Book[e.type], e.offsetX, e.offsetY, -1)
  }

  onTouchEvent = (e: TouchEvent) => {
    e.preventDefault(); // 默认取消滑动
    const touches = e.targetTouches;
    const main = this.main
    const canvasDomRect = main.canvasDom.getBoundingClientRect()
    const type = Controls.Interact_Book[e.type]
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i]
      main.emit(type, touch.pageX - canvasDomRect.x, touch.pageY - canvasDomRect.y, touch.identifier)
    }
  }

  constructor(main: Main) {
    this.main = main
    this.deploy()
    main.onDestroyed(() => this.destroyed)
  }

  deploy() {
    const canvasDom = this.main.canvasDom
    canvasDom.addEventListener('mousedown', this.onMouseEvent);
    canvasDom.addEventListener('mousemove', this.onMouseEvent);
    canvasDom.addEventListener('mouseup', this.onMouseEvent);
    canvasDom.addEventListener('touchstart', this.onTouchEvent);
    canvasDom.addEventListener('touchmove', this.onTouchEvent);
    canvasDom.addEventListener('touchend', this.onTouchEvent);
  }

  destroyed() {
    const canvasDom = this.main.canvasDom
    canvasDom.removeEventListener('mousedown', this.onMouseEvent);
    canvasDom.removeEventListener('mousemove', this.onMouseEvent);
    canvasDom.removeEventListener('mouseup', this.onMouseEvent);
    canvasDom.removeEventListener('touchstart', this.onTouchEvent);
    canvasDom.removeEventListener('touchmove', this.onTouchEvent);
    canvasDom.removeEventListener('touchend', this.onTouchEvent);
  }

}




























class Main extends EventEmitter {
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
  // 互动控制器
  controls: Controls
  // 外框Dom
  viewContainerDom: HTMLElement
  // 渲染器调整环节
  renderer: Renderer
  // 画布Dom
  canvasDom = window.document.createElement('canvas') as HTMLCanvasElement
  // FPS统计器
  stats: Stats
  // Gui控制器
  guiHelper: DatGui
  constructor(viewContainerDom: HTMLElement) {
    super()
    // 缓存 Canvas 的外壳元素
    this.viewContainerDom = viewContainerDom
    // 放入 Canvas
    this.viewContainerDom.appendChild(this.canvasDom)
    // 装载帧数FPS统计器
    this.stats = new Stats(this.viewContainerDom)
    this.stats.show()
    // 装载Gui控制器
    this.guiHelper = new DatGui(this.viewContainerDom)
    this.guiHelper.show()
    // 设置计时器
    this.time = new Time(this)
    // 设置视图大小控制器
    this.sizes = new Sizes(this, { fit: Sizes.Fit_Contain })
    // 设置控制器
    this.controls = new Controls(this)
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
    this.time.paused()
    this.emit(Main.Event_Destroyed); // Emit Destroyed Event
  }
}




class Renderer {
  core: RendererCore
  constructor(main: Main) {
    this.core = new RendererCore(main)
  }
}

export default Main










































type WebGLContext = WebGL2RenderingContext & WebGLRenderingContext

class RendererCore {
  // 用于完成初始化后触发的事件
  static Event_Ready = Symbol()
  static Event_ParticlesNumber_Changed = Symbol()

  main: Main
  gl: WebGLContext
  app: App

  constructor(main: Main) {
    this.main = main
    const gl = RendererCore.getWebGLContext(main.canvasDom)
    this.gl = gl
    this.app = new App(main, gl)// 流体模拟
    this.app.init()
    /////////////////////////
    // this.main.time.onTick(() => this.app.update())
    /////////////////////////
    this.main.render()
  }
  static getWebGLContext(canvasDom: HTMLCanvasElement): WebGLContext {
    /**
     * alpha 透明度
     * depth 深度缓存
     * stencil 模板缓存
     * antialias 抗锯齿
     * preserveDrawingBuffer 前置默认区缓存
     **/
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvasDom.getContext('webgl2', params) as WebGLContext;
    const isWebGL2 = !!gl;
    if (!isWebGL2)// "webkit-3d", "moz-webgl"
      gl = (canvasDom.getContext('webgl', params) || canvasDom.getContext('experimental-webgl', params)) as WebGLContext;
    // 后续可以通过 gl.VERSION === 7938 验证是否是 WebGL2，WebGL1没有这个参数
    return gl!;
  }
}

















/**
 * 着色器
 */
class Shader {
  gl: WebGLContext
  type: number
  source: string
  shader: WebGLShader | null = null
  isNeedUpdate = true

  constructor(gl: WebGLContext, type: number, source: string, keywords?: string[]) {
    this.gl = gl
    this.type = type
    this.source = source
    keywords && Array.isArray(keywords) && keywords.forEach(keyword => this.keywords.add(keyword))
    Shader.prototype.update.apply(this)
  }

  update() {
    const { gl, type } = this
    let source = this.source
    // 加入关键词
    if (this.keywords.size) {
      const keywordsString = [...this.keywords].reduce((a, [key, value]) => a += `#define ${value}\n`, '');
      source = keywordsString + source
    }
    // 创建
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    // 验证是否成功
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return false
    }
    // 保存
    this.shader = shader
    this.isNeedUpdate = false
    //
    return true
  }

  static Keywords = class Keywords extends Map<string, string> {
    shader: Shader
    constructor(shader: Shader) {
      super()
      this.shader = shader
    }

    // 直接覆盖关键词
    set(keywords: string | string[]) {
      if (typeof keywords === 'string') keywords = [keywords]
      if (Array.isArray(keywords) && keywords.length) {
        keywords.forEach(keyword => this.add(keyword))
      }
      this.shader.isNeedUpdate = true
      return this
    }

    // 添加关键词
    add(keyword: string) {
      if (keyword && typeof keyword === 'string' && /\w+/.test(keyword)) {
        const key = keyword.toString().split(' ')[0]
        super.set(key, keyword)
        return this.shader.isNeedUpdate = true
      }
      return false
    }

    // 删除关键词
    delete(keyword: string) {
      if (keyword && typeof keyword === 'string' && /\w+/.test(keyword)) {
        const key = keyword.toString().split(' ')[0]
        if (super.delete(key)) {
          return this.shader.isNeedUpdate = true
        }
      }
      return false
    }

    // 自动切换
    toggle(keyword: string) {
      if (keyword) {
        const key = keyword.toString().split(' ')[0]
        return super.has(key) ? this.delete(key) : this.add(keyword)
      }
      return false
    }

  }

  keywords = new Shader.Keywords(this)
}

/**
 * 顶点着色器
 */
class VertexShader extends Shader {
  constructor(gl: WebGLContext, source: string, keywords?: string[]) {
    super(gl, gl.VERTEX_SHADER, source, keywords)
  }
}

/**
 * 片着色器
 */
class FragmentShader extends Shader {
  constructor(gl: WebGLContext, source: string, keywords?: string[]) {
    super(gl, gl.FRAGMENT_SHADER, source, keywords)
  }
}

/**
 * Program
 */
class Program {
  gl: WebGLContext
  vertexShader: VertexShader
  fragmentShader: FragmentShader
  uniforms: { [key: string]: WebGLUniformLocation } = {}
  program: WebGLProgram = {}
  constructor(gl: WebGLContext, vertexShader: VertexShader, fragmentShader: FragmentShader) {
    this.gl = gl
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    Program.prototype.update.apply(this)
  }

  update() {
    const { gl, vertexShader, fragmentShader } = this
    vertexShader.isNeedUpdate && vertexShader.update()
    fragmentShader.isNeedUpdate && fragmentShader.update()
    this.program = Program.createProgram(gl, vertexShader, fragmentShader);
    this.uniforms = Program.getUniforms(gl, this.program);
  }

  static createProgram(gl: WebGLContext, vertexShader: VertexShader, fragmentShader: FragmentShader): WebGLProgram {
    let program = gl.createProgram() as WebGLProgram;
    vertexShader.shader && gl.attachShader(program, vertexShader.shader);
    fragmentShader.shader && gl.attachShader(program, fragmentShader.shader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      console.error(gl.getProgramInfoLog(program));

    return program;
  }

  static getUniforms(gl: WebGLContext, program: WebGLProgram) {
    const uniforms: { [key: string]: WebGLUniformLocation } = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      let uniformName = (gl.getActiveUniform(program, i) as WebGLActiveInfo).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;
    }
    return uniforms;
  }

  /* static getAttribs() {
    const attributesCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    gl.getActiveAttrib(program, 0)
  } */

  /** 使用这个 Program */
  activate() {
    this.gl.useProgram(this.program)
  }
}

/**
 * 材质
 */
class Material extends Program {
  programs: { [key: symbol]: WebGLProgram } = {}

  constructor(gl: WebGLContext, vertexShader: VertexShader, fragmentShader: FragmentShader) {
    super(gl, vertexShader, fragmentShader)
  }
  /* 
    update() {
      const vertexShaderKeywords = [...this.vertexShader.keywords.values()].sort().join(' ')
      const fragmentShaderKeywords = [...this.fragmentShader.keywords.values()].sort().join(' ')
      const keywordsString = vertexShaderKeywords + ' | ' + fragmentShaderKeywords;
      const hash = Symbol.for(keywordsString)
      let program = this.programs[hash];
      // 新增 Program
      if (!program) {
        super.update()
        program = this.program
        this.programs[hash] = program;
      }
      // 选择 Program
      this.program = program
    }
   */
}


/**
 * 帧缓冲
 */
class FBO {
  gl: WebGLContext
  texture: WebGLTexture
  internalFormat: number
  format: number
  type: number
  param: number
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number // 图素 一个像素的宽度比，用于合成视觉矩阵
  texelSizeY: number // 图素 一个像素的宽度比，用于合成视觉矩阵

  constructor(gl: WebGLContext, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
    this.gl = gl

    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture() as WebGLTexture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer() as WebGLFramebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const texelSizeX = 1.0 / w;
    const texelSizeY = 1.0 / h;

    this.texture = texture
    this.internalFormat = internalFormat
    this.format = format
    this.type = type
    this.param = param
    this.fbo = fbo
    this.width = w
    this.height = h
    this.texelSizeX = texelSizeX
    this.texelSizeY = texelSizeY

  }

  attach(id: number) {
    const gl = this.gl
    gl.activeTexture(gl.TEXTURE0 + id);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    return id;
  }

}

/**
 * 双帧缓冲
 */
class DoubleFBO {
  gl: WebGLContext
  fbo1: FBO
  fbo2: FBO
  width: number
  height: number
  texelSizeX: number // 图素 一个像素的宽度比，用于合成视觉矩阵
  texelSizeY: number // 图素 一个像素的宽度比，用于合成视觉矩阵
  constructor(gl: WebGLContext, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
    this.gl = gl

    const fbo1 = new FBO(gl, w, h, internalFormat, format, type, param);
    const fbo2 = new FBO(gl, w, h, internalFormat, format, type, param);

    this.fbo1 = fbo1
    this.fbo2 = fbo2
    this.width = w
    this.height = h
    this.texelSizeX = fbo1.texelSizeX
    this.texelSizeY = fbo1.texelSizeY
  }
  get read() {
    return this.fbo1;
  }
  set read(value: FBO) {
    this.fbo1 = value;
  }
  get write() {
    return this.fbo2;
  }
  set write(value: FBO) {
    this.fbo2 = value;
  }
  swap() {
    let temp = this.fbo1;
    this.fbo1 = this.fbo2;
    this.fbo2 = temp;
  }

}

/**
 * 浮点颜色
 */
class Vec3fColor {
  r: number = 0
  g: number = 0
  b: number = 0
  constructor(input?: any) {
    this.setColor(input)
  }
  setColor(input?: any) {
    if (Array.isArray(input)) {
      this.r = input[0] ? (input[0] / 255) : (0 / 255)
      this.g = input[1] ? (input[1] / 255) : (0 / 255)
      this.b = input[2] ? (input[2] / 255) : (0 / 255)
    }
  }

  /**
   * 生成随机颜色
   */
  random() {
    const c = Utils.HSVtoRGB(Math.random(), 1.0, 1.0);
    this.r = c.r * 0.15;
    this.g = c.g * 0.15;
    this.b = c.b * 0.15;
    return this;
  }
}

/**
 * 工具包
 */
class Utils {
  /**
   * 判断是否为 WebGL 2.0
   */
  static isWebGL2(gl: WebGLContext): boolean {
    return !!gl.VERSION
  }

  /**
   * 量化颜色
   */
  static normalizeColor(input: { r: number, g: number, b: number }) {
    let output = {
      r: input.r / 255,
      g: input.g / 255,
      b: input.b / 255
    };
    return output;
  }

  /**
   * HSV -> RGB
   */
  static HSVtoRGB(h: number, s: number, v: number) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return {
      r: r as number,
      g: g as number,
      b: b as number
    };
  }

  /**
   * 生成hash
   */
  hashCode(s: string) {
    if (s.length == 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


  /**
   * 生成范围内随机数
   * min = [0, min]
   * min, max = [min, max]
   * min, max, step = [min, max]去余数step
   * https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */
  static random(min: number, max?: number, step?: number) {
    // 排错
    if (typeof max !== 'number' || min === max) return 0;
    // 单个输入
    if (typeof max !== 'number') {
      max = min
      min = 0
    }
    // 步数
    if (typeof step !== 'number') {
      step = 1
    }
    // 防止负数
    if (min > max) {
      const temp = min
      min = max
      max = temp
    }
    // 处理小数范围
    let multiple = 1
    while (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(step)) {
      min *= 10
      max *= 10
      step *= 10
      multiple *= 10
    }
    //含最大值，含最小值
    const random = Math.random() * (max - min + 1) + min;
    // 如果step为0，则直出
    return step === 0 ?
      random / multiple :
      Math.floor(random / step) * step / multiple
  }

}



















/**
 * 扩展支持包
 */
class GLExt {

  formatRGBA = {} as { internalFormat: number, format: number }
  formatRG = {} as { internalFormat: number, format: number }
  formatR = {} as { internalFormat: number, format: number }
  halfFloatTexType: number
  supportLinearFiltering: OES_texture_float_linear & OES_texture_half_float_linear

  constructor(gl: WebGLContext) {
    // 验证版本
    const isWebGL2 = Utils.isWebGL2(gl)

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');//用于获取高精度，必须有这步
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    // 不支持自动插值
    if (supportLinearFiltering === null) { }

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat as OES_texture_half_float).HALF_FLOAT_OES;

    // 不支持浮点值格式
    if (halfFloatTexType === null) {
      alert('Not Supported halfFloatTexType')
    }

    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl.R16F, gl.RED, halfFloatTexType);
    }
    else {
      formatRGBA = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    // 不支持浮点值格式
    if (formatRGBA === null || formatRG === null || formatR === null) {
      alert('Not Supported halfFloatTexType')
    }


    // 用于格式获取
    function getSupportedFormat(internalFormat: number, format: number, type: number): { internalFormat: number, format: number } | null {
      if (!supportRenderTextureFormat(internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format }
    }

    // 用于验证获取的格式是否支持
    function supportRenderTextureFormat(internalFormat: number, format: number, type: number) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status == gl.FRAMEBUFFER_COMPLETE;
    }

    this.formatRGBA = formatRGBA!
    this.formatRG = formatRG!
    this.formatR = formatR!
    this.halfFloatTexType = halfFloatTexType!
    this.supportLinearFiltering = supportLinearFiltering!

  }
};

























/**
 * 主体
 */
class App {
  main: Main
  time: Time
  sizes: Sizes
  gl: WebGLContext
  glExt: GLExt
  config = {
    SIM_RESOLUTION: 128, // 模拟分辨率，值记录图的最小值，即vmin，默认为128
    // 染料图 DYE MAP 色度值的记录图
    DYE_RESOLUTION: 1024,// 模拟分辨率，值记录图的最小值，即vmin，默认为1024
    NORMAL_RESOLUTION: 512, // 法线贴图分辨率，即vmin
    // 染料图 DYE MAP 色度值的记录图
    CAPTURE_RESOLUTION: 512,
    STEP_SPEED: 1.0,// 变化速率，直接影响扩散和旋转半径，10 ~ 0.001
    DENSITY_DISSIPATION: 1,// 颜色消散系数
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,// 压力系数，用于速率的扩散
    PRESSURE_ITERATIONS: 20,// 压力计算次数，用于控制扩散范围
    CURL: 30,// 旋卷系数，默认30
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SMOKE: false,
    COLORFUL: true,
    COLOR_UPDATE_TIME: 0.3,// 颜色切换时间，s
    PAUSED: false,// 暂停模拟
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    //BACK_COLOR: [  255,  255,  255 ],
    TRANSPARENT: false,
    DRAW_CHECKERBOARD: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,// Bloom 的模糊次数 >=2 ，直接得出Bloom图的分辨率，2的BLOOM_ITERATIONS次方
    //BLOOM_RESOLUTION:256,// Bloom 特效的分辨率，2的BLOOM_ITERATIONS次方
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
    SHADING: true,
    SHADING_WIDTH: 1.0,// 阴影描边宽度
    //SHADING_WIDTH: 3.0,
  }

  // 状态管理 - 是否需要初始化缓冲区，主要是大小更改后需要更正
  isNeedInit = true

  backColor = new Vec3fColor(this.config.BACK_COLOR)

  dye!: DoubleFBO; // 染料 在 initFramebuffers 中创建
  velocity!: DoubleFBO;// 速度 在 initFramebuffers 中创建
  curl!: FBO;// 卷曲与消散 在 initFramebuffers 中创建
  divergence!: FBO;// 在curl分离消散 在 initFramebuffers 中创建
  pressure!: DoubleFBO;// 压力 在 initFramebuffers 中创建
  bloom!: FBO;
  bloomFramebuffers: FBO[] = [];
  sunrays!: FBO;
  sunraysTemp!: FBO;

  //  ditheringTexture = createTextureAsync('LDR_LLL1_0.png');
  normalMapProgram: Program
  refractionProgram: Program
  testProgram: Program

  copyProgram: Program
  overProgram: Program
  colorProgram: Program
  splatProgram: Program
  advectionProgram: Program// 平流扩散
  advectionDyeProgram: Program// 颜色专用扩散
  curlProgram: Program// 旋转
  vorticityProgram: Program// 整体变化
  divergenceProgram: Program
  pressureProgram: Program
  gradienSubtractProgram: Program
  checkerboardProgram: Program
  bloomPrefilterProgram: Program
  bloomBlurProgram: Program
  bloomFinalProgram: Program
  blurProgram: Program
  sunraysMaskProgram: Program
  sunraysProgram: Program

  displayMaterial: Material


  constructor(main: Main, gl: WebGLContext) {
    this.main = main
    this.time = main.time
    this.sizes = main.sizes
    this.gl = gl
    const config = this.config
    const glExt = (this.glExt = new GLExt(gl))

    /** 基础定点着色器 */
    const baseVertexShader = new VertexShader(gl, `
    precision highp float;
  
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
  
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`);



    /** 生成法线贴图的着色器 */
    const normalMapShader = new FragmentShader(gl, `
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec2 texelSize;
    varying vec2 vUv;

    // 计算灰度
    float GetGrayColor(vec4 color) {
        return color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
    }
    
    // 然后可根据高度图的值来计算 uv 两个方向的高度函数切线。
    vec3 GetNormalByGray(vec2 uv) {
        float _DeltaScale = 1.0;
        float _HeightScale = 0.01;
        
        vec2 deltaU = vec2(texelSize.x * _DeltaScale, 0);
        float h1_u = GetGrayColor(texture2D(uTexture, uv - deltaU));
        float h2_u = GetGrayColor(texture2D(uTexture, uv + deltaU));
        // vec3 tangent_u = vec3(1, 0, (h2_u - h1_u) / deltaU.x);
        vec3 tangent_u = vec3(deltaU.x, 0, _HeightScale * (h2_u - h1_u));
        // vec3 tangent_u = vec3(deltaU.x, 0, (h2_u - h1_u));

        vec2 deltaV = vec2(0, texelSize.y * _DeltaScale);
        float h1_v = GetGrayColor(texture2D(uTexture, uv - deltaV));
        float h2_v = GetGrayColor(texture2D(uTexture, uv + deltaV));
        // vec3 tangent_v = vec3(0, 1, (h2_v - h1_v) / deltaV.y);
        vec3 tangent_v = vec3(0, deltaV.y, _HeightScale * (h2_v - h1_v));
        // vec3 tangent_v = vec3(0, deltaV.y, (h2_v - h1_v));
        
        vec3 normal = normalize(cross(tangent_v, tangent_u));
        return normal;
    }
    
    void main () {

        vec3 normal = GetNormalByGray(vUv);
        normal.z *= -1.0;
        vec3 color = normal * 0.5 + 0.5;

        gl_FragColor = vec4(color, 1.0);

        // gl_FragColor = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`);



    /** 折射的着色器 */
    const refractionShader = new FragmentShader(gl, `
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform sampler2D uNormalMap;
    
    varying vec2 vUv;
        
    vec4 getColor(vec2 uv){
        return texture2D(tDiffuse, uv);
    }

    void main()
    {
        vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
    
        vec2 newUv = vUv + normalColor.xy * normalColor.z * 0.025;
        vec4 color = texture2D(tDiffuse, newUv);
    
        // 添加光效
        // vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
        // float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
        // color.rgb += lightness * 0.25;
        
        gl_FragColor = color;
         newUv = vUv + normalColor.xy  * 0.025;
         color = texture2D(tDiffuse, newUv);
         gl_FragColor.g = color.g;

        //  newUv = vUv + normalColor.xy  * 0.025;
        //  color = texture2D(tDiffuse, newUv);
         gl_FragColor.b = color.b;
        
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`)
    





    /** 用于测试的着色器 */
    const testShader = new FragmentShader(gl, `
    precision mediump float;

    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
    }`);



    /** 用于复制内容的着色器，主要用于更改尺寸时用于复制内容 */
    const copyShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }`);



    /** 用于更改颜色的着色器，主要用于需要更正背景的内容 */
    const overShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }`);



    /** 用于颜色填充的着色器，主要用于背景颜色叠加 */
    const colorShader = new FragmentShader(gl, `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }`);



    /** 扰动着色器 */
    const splatShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        // vec3 splat = exp(-dot(p, p) / radius) * color;// 原版
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }`);



    /**
     * 根据速度索引图修改目标图的着色器，主要用于移动颜色
     * 内含一个自定义插值运算
     */
    const advectionShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float delta;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - delta * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - delta * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif

    #ifdef ADVECTION_DYE
    // 定量消散
        float decay = 0.1 * dissipation * delta;
        // gl_FragColor = vec4(max(vec3(0.0, 0.0, 0.0), vec3(result) - 0.001), result.a);
        gl_FragColor = vec4(max(vec3(0.0), vec3(result) - decay), result.a);
    #else
    // 正常消散 - 比例消散
        float decay = 1.0 + dissipation * delta;
        gl_FragColor = result / decay;
    #endif
    
    }`, glExt.supportLinearFiltering ? undefined : ['MANUAL_FILTERING']);

    /**
     * 与上面一致，用于扩散内容
     * 这里扩散颜色
     */
    const advectionDyeShader = new FragmentShader(gl, advectionShader.source,
      []//['ADVECTION_DYE', glExt.supportLinearFiltering ? '' : 'MANUAL_FILTERING']
    )

    /** 显示着色器 */
    const displayShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        // 原版
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.85, 1.0);
        c *= diffuse;

        // 根据亮度控制大小
        /* vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        //float diffuse = clamp(dot(n, l) / (min(c.r, min(c.g, c.b)))+0.8, 0.8, 1.0);
        c *= diffuse; */

    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        // float noise = texture2D(uDithering, vUv * ditherScale).r;
        // noise = noise * 2.0 - 1.0;
        // bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }`, (() => {
      const list = []
      config.BLOOM && list.push('BLOOM')
      config.SHADING && list.push('SHADING')
      config.SUNRAYS && list.push('SUNRAYS')
      return list
    })());



    /**
     * 卷边着色器，根据速度计算旋转
     */
    const curlShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B; // 原版
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }`);



    /**
     * 整体变动的着色器，根据速度计算旋转和消散
     */
    const vorticityShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float delta;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
      
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        // force /= length(force) + 0.0001;
        force = normalize(force);
        // 离子态关键，湍流效果，如果为0，效果类似烟雾，更为圆滑，越大越类似无规则的离子态湍流
        force *= curl * C; 
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * delta;
        //velocity += force;
        velocity = min(max(velocity, -1000.0), 1000.0);
        
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }`);


    /**
     * 把整体变化值中的消散系数分离，只保留旋转系数
     */
    const divergenceShader = new FragmentShader(gl, `
  precision mediump float;
  precision mediump sampler2D;
 
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
 
  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
 
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }
 
      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }`);



    /**
     * 压力的着色器，在变化动态中计算压力
     */
    const pressureShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;
 
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
 
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25; // +-一致，但论文使用-表示压力与吸引力的差异
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }`);



    /**
     * 根据压力图，扩散速率和速率间互相作用
     */
    const gradientSubtractShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B); // 原版，论文使用系数控制大小，这里系数为1
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }`);



    /**
     * 棋盘格
     */
    const checkerboardShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    // 棋盘格在vmin上的数量
    #define SCALE 17.0

    void main () {
        vec2 scaleUV = vUv * SCALE * vec2(aspectRatio, 1.0);
        scaleUV.x -= SCALE * aspectRatio * 0.5; // 横向居中偏移
        vec2 uv = floor(scaleUV);
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.15 + 0.85; //最亮，最暗
        gl_FragColor = vec4(vec3(v), 1.0);
    }`);



    // https://www.zhihu.com/search?type=content&q=bloom
    /**
     * 计算并提取较亮像素
     */
    const bloomPrefilterShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;
    
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        // c *= rq;
        gl_FragColor = vec4(c, 0.0);
    }`);



    /**
     * 提亮扩散
     * 这里流程是简单扩散，但采用每次扩散都作用在一个比自己小一半的底图上，再返回来再画一次，增大扩散效果
     */
    const bloomBlurShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;
    
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }`);

    /**
     * 把模糊后的扩散像素贴到最终帧，这里加入系数放大
     */
    const bloomFinalShader = new FragmentShader(gl, `
    precision mediump float;
    precision mediump sampler2D;
   
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
   
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }`);

    /**
     * 生成圣光模版
     * 0.8 / 20 = 0.04 < 的亮度颜色会被凸显, >的颜色会被减淡，包括背景色也是，所以可能包含黑色
     */
    const sunraysMaskShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D uTexture;
  
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }`);



    /**
     * 圣光效果
     * 点往中心靠拢并点积路径像素，因为模板存在亮度透明度差异，亮的地方透明度低，点积路径存在亮区会形成光线路径
     */
    const sunraysShader = new FragmentShader(gl, `
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D uMaskTexture;
    uniform float weight;
  
    #define ITERATIONS 16
  
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
  
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
  
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
  
        float color = texture2D(uMaskTexture, vUv).a;
  
        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uMaskTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
  
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);// 原版
        //gl_FragColor = vec4(color * Exposure * 0.1, 0.0, 0.0, 1.0);
    }`);



    /**
     * 模糊顶点
     */
    const blurVertexShader = new VertexShader(gl, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`);



    /**
     * 简单颜色混合模糊
     */
    const blurShader = new FragmentShader(gl, `
      precision mediump float;
      precision mediump sampler2D;
     
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;
     
      void main () {
          vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
          sum += texture2D(uTexture, vL) * 0.35294117;
          sum += texture2D(uTexture, vR) * 0.35294117;
          gl_FragColor = sum;
      }
    `);


    this.normalMapProgram = new Program(gl, baseVertexShader, normalMapShader);
    this.refractionProgram = new Program(gl, baseVertexShader, refractionShader);
    
    this.testProgram = new Program(gl, baseVertexShader, testShader);


    this.copyProgram = new Program(gl, baseVertexShader, copyShader);
    this.overProgram = new Program(gl, baseVertexShader, overShader);
    this.colorProgram = new Program(gl, baseVertexShader, colorShader);
    this.checkerboardProgram = new Program(gl, baseVertexShader, checkerboardShader);
    this.bloomPrefilterProgram = new Program(gl, baseVertexShader, bloomPrefilterShader);
    this.bloomBlurProgram = new Program(gl, baseVertexShader, bloomBlurShader);
    this.bloomFinalProgram = new Program(gl, baseVertexShader, bloomFinalShader);
    this.blurProgram = new Program(gl, blurVertexShader, blurShader);
    this.sunraysMaskProgram = new Program(gl, baseVertexShader, sunraysMaskShader);
    this.sunraysProgram = new Program(gl, baseVertexShader, sunraysShader);
    this.splatProgram = new Program(gl, baseVertexShader, splatShader);
    this.advectionProgram = new Program(gl, baseVertexShader, advectionShader);// 平流扩散
    this.advectionDyeProgram = new Program(gl, baseVertexShader, advectionDyeShader);// 颜色专用扩散
    this.curlProgram = new Program(gl, baseVertexShader, curlShader);// 旋转
    this.vorticityProgram = new Program(gl, baseVertexShader, vorticityShader);// 整体变化
    this.divergenceProgram = new Program(gl, baseVertexShader, divergenceShader);
    this.pressureProgram = new Program(gl, baseVertexShader, pressureShader);
    this.gradienSubtractProgram = new Program(gl, baseVertexShader, gradientSubtractShader);

    this.displayMaterial = new Material(gl, baseVertexShader, displayShader);


  }

  // 初始化 - 只执行一次
  init = () => {

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 初始化 Framebuffer，等于一开始执行一次resize
    this.initFramebuffers();

    // 初始化底板
    this.initDisplayElements();

    // 初始化互动接口
    this.interacts.init()

    // Gui初始化
    this.helper.init()

    // 放入扰动
    this.interacts.multipleSplats(1)

    //////////////////////临时
    setTimeout(() => {
      import('./test2.jpg?url').then(m => {
        const url = m.default
        //
        const { gl, glExt, config, createResolution } = this
        const res = createResolution(config.NORMAL_RESOLUTION);
        const texType = glExt.halfFloatTexType;
        const rgba = glExt.formatRGBA;
        const filtering = glExt.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        this.normalMap = new FBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);
        //
        const image = new Image()
        image.src = url
        image.onload = () => {
          console.log(image)
          //

          const texture = gl.createTexture() as WebGLTexture;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.naturalWidth, image.naturalHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
          this.copyProgram.activate()
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          this.calcTo(this.dye.write);
          //
          
          this.createNormalMap(this.dye.write, this.normalMap)

          this.checkerboardProgram.activate()
          gl.uniform1f(this.checkerboardProgram.uniforms.aspectRatio, this.sizes.width / this.sizes.height);
          this.calcTo(this.dye.write);
          // this.drawFBO(this.dye.write)
          // this.drawFBO(normalMap)

          this.refractionProgram.activate() 
          gl.uniform1i(this.refractionProgram.uniforms.uNormalMap, this.normalMap.attach(0));
          gl.uniform1i(this.refractionProgram.uniforms.tDiffuse, this.dye.write.attach(1));
          this.calcTo(null);

        }
      })

    }, 1000)
  }

  normalMap!: FBO
  createNormalMap = (source: FBO, normalMap: FBO) => {
    const { gl, glExt, config, calcTo, normalMapProgram } = this
    normalMapProgram.activate()
    gl.uniform1i(normalMapProgram.uniforms.uTexture, source.attach(0));
    gl.uniform2f(normalMapProgram.uniforms.texelSize, 1 / source.width, 1 / source.height);
    calcTo(normalMap);

    
  }




  // 初始化全部 Framebuffer
  initFramebuffers = () => {
    const { gl, glExt, config, createResolution } = this
    const simRes = createResolution(config.SIM_RESOLUTION);
    const dyeRes = createResolution(config.DYE_RESOLUTION);

    const floatType = glExt.halfFloatTexType;
    const rgba = glExt.formatRGBA;
    const rg = glExt.formatRG;
    const r = glExt.formatR;
    const filtering = glExt.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    this.dye = this.dye ?
      this.resizeDoubleFBO(this.dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, floatType, filtering) :
      new DoubleFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, floatType, filtering);


    this.velocity = this.velocity ?
      this.resizeDoubleFBO(this.velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, floatType, filtering) :
      new DoubleFBO(gl, simRes.width, simRes.height, rg.internalFormat, rg.format, floatType, filtering);


    this.divergence = new FBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, floatType, gl.NEAREST);
    this.curl = new FBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, floatType, gl.NEAREST);
    this.pressure = new DoubleFBO(gl, simRes.width, simRes.height, r.internalFormat, r.format, floatType, gl.NEAREST);

    this.initBloomFramebuffers();
    this.initSunraysFramebuffers();

    this.isNeedInit = false
  }



  /**
   * 初始化 Bloom帧
   */
  initBloomFramebuffers = () => {
    const { gl, glExt, config, createResolution } = this
    const BLOOM_ITERATIONS = config.BLOOM_ITERATIONS
    const BLOOM_RESOLUTION = 2 ** BLOOM_ITERATIONS
    const res = createResolution(BLOOM_RESOLUTION);

    const texType = glExt.halfFloatTexType;
    const rgba = glExt.formatRGBA;
    const filtering = glExt.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    this.bloom = new FBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);

    this.bloomFramebuffers.length = 0;
    for (let i = 1; i <= BLOOM_ITERATIONS; i++) {
      const width = res.width >> i;
      const height = res.height >> i;

      if (width < 2 || height < 2) break;

      const fbo = new FBO(gl, width, height, rgba.internalFormat, rgba.format, texType, filtering);
      this.bloomFramebuffers.push(fbo);
    }
  }


  /**
   * 初始化 Sunrays帧
   */
  initSunraysFramebuffers = () => {
    const { gl, glExt, config, createResolution } = this
    let res = createResolution(config.SUNRAYS_RESOLUTION);

    const texType = glExt.halfFloatTexType;
    const r = glExt.formatR;
    const filtering = glExt.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    this.sunrays = new FBO(gl, res.width, res.height, r.internalFormat, r.format, texType, filtering);
    this.sunraysTemp = new FBO(gl, res.width, res.height, r.internalFormat, r.format, texType, filtering);
  }


  resizeFBO = (target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) => {
    const { gl, copyProgram, calcTo } = this
    let newFBO = new FBO(gl, w, h, internalFormat, format, type, param);
    gl.useProgram(copyProgram.program)
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    calcTo(newFBO);
    return newFBO;
  }


  resizeDoubleFBO = (target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) => {
    if (target.width == w && target.height == h) return target;
    const { gl, resizeFBO } = this
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = new FBO(gl, w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
  }


  /**
   * 初始化底板
   */
  initDisplayElements = () => {
    const gl = this.gl
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
  }


  /**
   * 计算内容，如空则计算颜色缓冲器，实际为渲染过程
   */
  calcTo = (target: null | FBO, clear = false) => {
    const gl = this.gl
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    if (clear) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    // CHECK_FRAMEBUFFER_STATUS();
    if (false) {
      let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      if (status != gl.FRAMEBUFFER_COMPLETE)
        console.trace("Framebuffer error: " + status);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }


  /**
   * 更新入口
   */
  update = () => {
    const { time, config, isNeedInit, initFramebuffers, step, interacts, render } = this
    if (isNeedInit)
      initFramebuffers();
    interacts.update();
    if (!config.PAUSED)
      step(time.delta);
    render(null);
  }

  /**
   * 单帧运算
   */
  step = (delta: number) => {
    const { gl, glExt, config, dye, velocity, curl, divergence, pressure, curlProgram, vorticityProgram, divergenceProgram, overProgram, pressureProgram, gradienSubtractProgram, advectionProgram, advectionDyeProgram, calcTo } = this
    delta *= 0.001 * config.STEP_SPEED

    gl.disable(gl.BLEND);

    // 计算翻卷
    curlProgram.activate();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    calcTo(curl);

    // 计算加入旋度，离子态、湍流效果，
    vorticityProgram.activate();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.delta, delta);
    calcTo(velocity.write);
    velocity.swap();

    // 通过速度计算散度
    divergenceProgram.activate();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    calcTo(divergence);

    // 通过散度计算压力
    overProgram.activate();
    gl.uniform1i(overProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(overProgram.uniforms.value, config.PRESSURE);
    calcTo(pressure.write);
    pressure.swap();

    // 扩散压力
    pressureProgram.activate();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      calcTo(pressure.write);
      pressure.swap();
    }

    // 把压力作用于速率形成速率扩散
    gradienSubtractProgram.activate();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    calcTo(velocity.write);
    velocity.swap();


    // 用速度扩散速度迭代自身
    advectionProgram.activate();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!glExt.supportLinearFiltering)
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.delta, delta);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    calcTo(velocity.write);
    velocity.swap();

    // 测试用，延迟效果
    //  if(!window.x)return window.x=1
    // if(window.x<90)return  window.x++

    // 用速度扩散颜色
    advectionDyeProgram.activate();
    gl.uniform2f(advectionDyeProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!glExt.supportLinearFiltering)
      gl.uniform2f(advectionDyeProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionDyeProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionDyeProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionDyeProgram.uniforms.delta, delta);
    gl.uniform1f(advectionDyeProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    calcTo(dye.write);
    dye.swap();
  }

  /**
   * 渲染流程
   */
  render = (target: null | FBO) => {
    const { gl, config, dye, backColor, drawColor, drawCheckerboard, drawDisplay } = this
    if (config.BLOOM)
      this.applyBloom(dye.read, this.bloom);
    if (config.SUNRAYS) {
      this.applySunrays(dye.read, dye.write, this.sunrays);
      this.blur(this.sunrays, this.sunraysTemp, 1);
    }

    // 调整透明度
    if (target == null || !config.TRANSPARENT) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
    }
    else {
      gl.disable(gl.BLEND);
    }

    if (!config.TRANSPARENT)
      drawColor(target, backColor);
    if (target == null && config.DRAW_CHECKERBOARD && config.TRANSPARENT) {
      drawCheckerboard(target);
    }

    // this.drawFBO(this.sunrays)
    // this.drawFBO(dye.write)

    drawDisplay(target);
  }

  // 渲染单色
  drawColor = (target: null | FBO, color: Vec3fColor) => {
    const { gl, colorProgram, calcTo } = this
    colorProgram.activate();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    calcTo(target);
  }

  // 画出棋盘格，主要用于透明检查
  drawCheckerboard = (target: null | FBO) => {
    const { sizes, gl, checkerboardProgram, calcTo } = this
    checkerboardProgram.activate();
    gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, sizes.width / sizes.height);
    calcTo(target);
  }

  /**
   * 渲染
   */
  drawDisplay = (target: FBO | null) => {
    const { gl, config, dye, bloom, sunrays, displayMaterial, calcTo } = this
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;

    displayMaterial.activate();
    if (config.SHADING)
      gl.uniform2f(displayMaterial.uniforms.texelSize, config.SHADING_WIDTH / width, config.SHADING_WIDTH / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    if (config.BLOOM) {
      gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
      // gl.uniform1i(displayMaterial.uniforms.uDithering, ditheringTexture.attach(2));
      // let scale = createResolution(ditheringTexture, width, height);
      // gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS)
      gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
    calcTo(target);
  }



  /**
   * Bloom 特效
   */
  applyBloom = (source: FBO, result: FBO) => {
    if (this.bloomFramebuffers.length < 2) return;

    const { gl, config, bloomFramebuffers, calcTo, bloomPrefilterProgram, bloomBlurProgram, bloomFinalProgram } = this

    let last = result;

    // 提取来源图中超过阈值（较亮）的像素
    gl.disable(gl.BLEND);
    bloomPrefilterProgram.activate();
    const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
    const curve0 = config.BLOOM_THRESHOLD - knee;
    const curve1 = knee * 2;
    const curve2 = 0.25 / knee;
    gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
    gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    calcTo(last);

    // 每次两倍扩散并两倍减弱颜色
    bloomBlurProgram.activate();
    for (let i = 0; i < bloomFramebuffers.length; i++) {
      let dest = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      calcTo(dest);
      last = dest;
    }

    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);

    // 每次两倍扩散并两倍增强颜色
    for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
      let baseTex = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      gl.viewport(0, 0, baseTex.width, baseTex.height);
      calcTo(baseTex);
      last = baseTex;
    }

    // 叠加扩散后的结果
    gl.disable(gl.BLEND);
    bloomFinalProgram.activate();
    gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
    calcTo(result);
  }



  /**
   * Sunrays 特效
   */
  applySunrays = (source: FBO, mask: FBO, destination: FBO) => {
    const { gl, config, calcTo, sunraysMaskProgram, sunraysProgram } = this

    gl.disable(gl.BLEND);
    sunraysMaskProgram.activate();
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    calcTo(mask);

    sunraysProgram.activate();
    gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
    gl.uniform1i(sunraysProgram.uniforms.uMaskTexture, mask.attach(0));
    calcTo(destination);
  }



  /**
   * 简单颜色模糊
   */
  blur = (target: FBO, temp: FBO, iterations: number) => {
    const { gl, config, calcTo, blurProgram } = this
    blurProgram.activate();
    for (let i = 0; i < iterations; i++) {
      gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
      gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
      calcTo(temp);

      gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
      gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
      calcTo(target);
    }
  }


  drawFBO = (target: FBO) => {
    const { gl, dye, testProgram, displayMaterial, calcTo } = this
    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight
    //let res = getResolution(config.CAPTURE_RESOLUTION);
    let res = this.createResolution(Math.min(width, height));

    // console.log(width, height)
    // console.log('渲染帧的Size: ', res)
    // console.log(target)

    //gl.clear(gl.COLOR_BUFFER_BIT);
    //let target = new FBO(res.width, res.height, ext.formatRGBA!.internalFormat, ext.formatRGBA!.format, ext.halfFloatTexType, gl.NEAREST);
    //render(target);
    //window.testProgram = testProgram


    /* 
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        let length = target.width * target.height * 4;
        let pixels = new Float32Array(length);
        gl.readPixels(0, 0, target.width, target.height, gl.RGBA, gl.FLOAT, pixels);
        console.log(pixels)
    
        testProgram.bind()
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
        const uint8Pixels = new Uint8Array(length);
        for (let i = 0; i < uint8Pixels.length; i++)
            uint8Pixels[i] = Math.abs(pixels[i]) * 255;
        //uint8Pixels[i] = 255;
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, target.width, target.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, uint8Pixels);
        gl.uniform1i(testProgram.uniforms.uTexture, 0); */

    testProgram.activate();
    // if (config.SHADING)
    //     gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(testProgram.uniforms.uTexture, target.attach(0));

    calcTo(null);

    /*  const uint8Pixels = new Uint8Array(width * height * 4);
     for (let i = 0; i < uint8Pixels.length; i++)
         uint8Pixels[i] = Math.abs(pixels[i]) * 255;
     //uint8Pixels[i] = 255;
     gl.activeTexture(gl.TEXTURE0);
     const texture = gl.createTexture() as WebGLTexture;
     gl.bindTexture(gl.TEXTURE_2D, texture);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, uint8Pixels);
     gl.uniform1i(testProgram.uniforms.uTexture, 0);
 
 
     blit(null); */


    // let texture = framebufferToTexture(target);
    // texture = normalizeTexture(texture, target.width, target.height);

    // let captureCanvas = textureToCanvas(texture, target.width, target.height);

    // let texture = new Float32Array(width * height * 4);
    // let texture = new Uint8Array(width * height * 4);
    // gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, texture);
    // console.log(width, height, texture)
  }



  /**
   * 扰动，扰动写入向量图中
   * @param x 
   * @param y 
   * @param dx 
   * @param dy 
   * @param color 
   */
  splat = (x: number, y: number, dx: number, dy: number, color: Vec3fColor) => {
    const { sizes, gl, config, dye, velocity, splatProgram, calcTo, correctRadius } = this

    splatProgram.activate()
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, sizes.width / sizes.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    calcTo(velocity.write);
    velocity.swap();

    // 测试用
    // console.log("x", x, "y", y, "dx", dx, "dy", dy)
    // this.drawFBO(velocity.read)
    // splatProgram.activate();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    calcTo(dye.write);
    dye.swap();

    // 测试用
    // this.drawFBO(dye.read)
  }



  /**
   * 给出扰动点范围
   * @param radius number 
   */
  correctRadius = (radius: number) => {
    const { sizes } = this
    let aspectRatio = sizes.width / sizes.height;
    if (aspectRatio > 1)
      radius *= aspectRatio;
    return radius;
  }



  /**
   * 根据当前渲染的尺寸按给定的vmin创建一个分辨率
   * @param resolution vmin
   */
  createResolution = (resolution: number) => {
    const { gl } = this
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
      aspectRatio = 1.0 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight)
      return { width: max, height: min };
    else
      return { width: min, height: max };
  }





































  /**
   * 互动输入接口
   */
  interacts = (() => {
    class Pointer {
      id = -1;
      texcoordX = 0;
      texcoordY = 0;
      prevTexcoordX = 0;
      prevTexcoordY = 0;
      deltaX = 0;
      deltaY = 0;
      down = false;
      moved = false;
      color = new Vec3fColor();
    }

    // 控制点列表
    const pointers: Map<number, Pointer> = new Map()
    // 扰动任务列表
    const splatStack: number[] = []

    // 绑定事件
    const init = () => {
      const { main } = this
      main.on(Controls.Interact_Start, updateInteractStart)
      main.on(Controls.Interact_Move, updateInteractMove)
      main.on(Controls.Interact_End, updateInteractEnd)
    }



    const update = () => {
      updateColors(this.time.delta);
      const { splatStack, multipleSplats } = this.interacts
      // 多点扰动，一般是随机插入
      if (splatStack.length > 0)
        multipleSplats(splatStack.pop()!);
      // 用户输入
      pointers.forEach(p => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }



    /**
     * 放入控值
     */
    const splatPointer = (pointer: Pointer) => {
      const { config, splat } = this
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }



    /**
     * 定时随机颜色
     */
    let colorUpdateTimer = 0
    const updateColors = (dt: number) => {
      if (!this.config.COLORFUL) return;
      const timer = this.config.COLOR_UPDATE_TIME
      colorUpdateTimer += dt / 1000;
      if (colorUpdateTimer >= timer) {
        colorUpdateTimer = colorUpdateTimer % timer;
        pointers.forEach(p => {
          p.color.random();
        });
      }
    }



    /**
     * 放入多个随机方向的扰动
     * @param amount 扰动数量
     */
    const multipleSplats = (amount: number) => {
      for (let i = 0; i < amount; i++) {
        const color = new Vec3fColor()
        color.random();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        this.splat(x, y, dx, dy, color);
      }

    }


    /**
     * 处理交互开始
     */
    const updateInteractStart = (x: number, y: number, id: number) => {
      const { width, height, pixelRatio } = this.main.sizes
      const posX = pixelRatio * x;
      const posY = pixelRatio * y
      // 查找 pointer
      let pointer = pointers.get(id)
      if (!pointer) {
        pointer = new Pointer();
        pointers.set(id, pointer)
      }
      // 更新信息
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / width;
      pointer.texcoordY = 1.0 - posY / height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color.random()
    }



    /**
     * 处理交互移动
     */
    const updateInteractMove = (x: number, y: number, id: number) => {
      const { width, height, pixelRatio } = this.main.sizes
      const posX = pixelRatio * x;
      const posY = pixelRatio * y
      // 查找 pointer，如果断连触点，都是取消
      let pointer = pointers.get(id)
      if (!pointer || !pointer.down) return;
      // 更新
      const aspectRatio = width / height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / width;
      pointer.texcoordY = 1.0 - posY / height;
      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      if (aspectRatio < 1) pointer.deltaX *= aspectRatio;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      if (aspectRatio < 1) pointer.deltaY *= aspectRatio;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    };



    /**
     * 处理交互结束
     */
    const updateInteractEnd = (x: number, y: number, id: number) => {
      // 查找 pointer，如果断连触点，都是取消
      let pointer = pointers.get(id)
      if (!pointer) return;
      // 删除
      pointer.down = false;
      pointer.moved = false;
      pointers.delete(pointer.id)
    }



    /**
     * 随机放入扰动
     */
    const randomSplats = () => {
      splatStack.push(Utils.random(5, 25, 1))
    }



    return { pointers, splatStack, init, update, multipleSplats, randomSplats }
  })();














  /**
   * Gui
   */
  helper = (() => {



    const init = () => {

      const main = this.main
      const gui = this.main.guiHelper.ui
      const app = this
      const { config } = this
      gui.width = 300
      const appFolder = gui.addFolder('App')

      const appRender = appFolder.add({ is: false }, 'is').name('On/Off Render')
        .onFinishChange(val => val ? main.render() : main.paused())

      const simPaused = appFolder.add(config, 'PAUSED').name('Paused ')

      const configFolder = gui.addFolder('Config')

      const simResolution = configFolder.add({ val: config.SIM_RESOLUTION }, 'val', [16, 32, 64, 128, 256, 512, 1024]).name('Simulation Map VMin')
        .onFinishChange(val => {
          config.SIM_RESOLUTION = parseInt(val)
          app.isNeedInit = true
        });

      const colorResolution = configFolder.add({ val: config.DYE_RESOLUTION }, 'val', [16, 32, 64, 128, 256, 512, 1024, 2048]).name('Color Map VMin')
        .onFinishChange(val => {
          config.DYE_RESOLUTION = parseInt(val)
          app.isNeedInit = true
        });
      //colorRationDissipation  
      configFolder.add({ val: false }, 'val').name('Color Ration Dissipation')
        .onFinishChange(val => {
          if (val) {
            colorDissipation.min(0.001)
            colorDissipation.max(2)
            colorDissipation.setValue(0.01)
            app.advectionDyeProgram.fragmentShader.keywords.add('ADVECTION_DYE')
          } else {
            colorDissipation.min(0)
            colorDissipation.max(4)
            colorDissipation.setValue(1)
            app.advectionDyeProgram.fragmentShader.keywords.delete('ADVECTION_DYE')
          }
          app.advectionDyeProgram.update()
        });

      const colorDissipation = configFolder.add(config, 'DENSITY_DISSIPATION', 0, 4.0, 0.001).name('Color Dissipation');
      const velocityDissipation = configFolder.add(config, 'VELOCITY_DISSIPATION', 0, 100.0).name('Velocity Dissipation');
      const pressure = configFolder.add(config, 'PRESSURE', 0.0, 1.0).name('Pressure');
      const vorticity = configFolder.add(config, 'CURL', 0, 50).name('Vorticity').step(1);

      const timeSpeed = configFolder.add({ val: config.STEP_SPEED }, 'val', 0.001, 5, 0.001).name('Time Speed')
        .onFinishChange(val => (config.STEP_SPEED = parseFloat(val)));

      configFolder.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');

      const bgTransparent = configFolder.add(config, 'TRANSPARENT').name('Bg Transparent')
      const drawCheckerboard = configFolder.add(config, 'DRAW_CHECKERBOARD').name('Checkerboard')

      const randomSplats = configFolder.add(app.interacts, 'randomSplats').name('Random Splats');

      const shadingFolder = gui.addFolder('Shading')
      const shading = shadingFolder.add(config, 'SHADING').name('enabled')
        .onFinishChange(val => {
          app.displayMaterial.fragmentShader.keywords.toggle('SHADING')
          app.displayMaterial.update()
        });

      //const shadingWidth = shadingFolder.add(config, 'SHADING_WIDTH',0.1,1.0,0.01).name('Shading Width')
      const shadingWidth = shadingFolder.add(config, 'SHADING_WIDTH', 0, 100.0, 1).name('Shading Width')


      const bloomFolder = gui.addFolder('Bloom')
      const bloom = bloomFolder.add(config, 'BLOOM').name('enabled')
        .onFinishChange(val => {
          app.displayMaterial.fragmentShader.keywords.toggle('BLOOM')
          app.displayMaterial.update()
        });

      const sunraysFolder = gui.addFolder('Sunrays')
      const sunrays = sunraysFolder.add(config, 'SUNRAYS').name('enabled')
        .onFinishChange(val => {
          app.displayMaterial.fragmentShader.keywords.toggle('SUNRAYS')
          app.displayMaterial.update()
        });
      sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

      appFolder.open()
      appRender.setValue(true)
      configFolder.open()
      //simResolution.setValue(512)
      //colorResolution.setValue(2048)
      // bloom.setValue(false)


      // 预设 - 凝胶效果（很大的时间速度，>=5，很高的速度消散，>=4）

      const presetFolder = gui.addFolder('Preset')
      presetFolder.add({
        fun: () => {
          colorDissipation.setValue(0.1)
          velocityDissipation.setValue(12)
          pressure.setValue(0.15)
          timeSpeed.setValue(4.5)
        }
      }, 'fun').name('荧光果冻')

    }


    return { init }
  })();



  test = () => {
    this.sizes.update({ viewWidth: 128, viewHeight: 128, fit: Sizes.Fit_None })
  }
  untest = () => {

  }



}






























