# 参考
https://github.com/pschroen/alien.js


# 01_Introduction [18:33]

# 02_What_is_WebGL_and_why_using_Three_js 
P3
# 03_Basic_scene [36:40]

# 04_Webpack [35:52]

# 05_Transforms_objects [46:13]

# 06_Animations [30:27]
[21:20] 摄像机对准物体
[25:45] 安装gsap
[28:50] 使用gsap进行动画

# 07_Cameras [57:55]

# 08_Fullscreen_and_resizing [30:34]
[04:37] 设置如果不能框选，outline: none;
[13:35] 如何更新窗口变化后的视图
[21:00] 设置分辨率显示比例提高，优化高ipx设备显示体验

# 09_Geometries [48:27]

# 10_Debug_UI [38:21]
gui如何触发自定义事件
[35:00] gui如何隐藏

# 11_Textures [1:14:49]

# 12_Materials [1:21:59]
[28:40] 法线材质介绍`THREE.MeshNormalMaterial`
[28:46] 取消表面平滑
[40:00] 大量形状建立优化生成过程
[1:17:34] HDR网站推荐
[matcaps](https://github.com/nidorx/matcaps) matcaps烘焙贴图
[hdrihaven.com](https://polyhaven.com/) 免费HDR
[matheowis.github.io/HRDI-to-CubeMap](https://matheowis.github.io/HDRI-to-CubeMap/) HDR图切割正方体视图

# 13_3D_Text [44:00]
[12:00] 如何加载字体
[12:30] 如何挤出字体
[13:13] 如何显示线稿
[21:46] 获取形状的各个极点，用于计算大小和中心点，`textGeometry.boundingBox`
[27:30] 通过各个极点和挤出厚度与边缘，计算中心点并偏移

# 14_Go_live [24:23]

# 15_Lights [46:12]

# 16_Shadows [1:00:45]

# 17_Haunted_House [1:15:49]

# 18_Particles [49:52]
[19:05] 粒子图形推荐 https://twitter.com/KenneyNL
[30:21] 粒子前后深度设置，depthTest 
[31:55] 粒子效果叠化效果选择 blending = THREE.AdditiveBlending

# 19_Galaxy_Generator [1:08:47]

# 20_Raycaster [45:11]

# 21_Scroll_based_animation [1:23:02]
[10:00] 3D网页通常建议动作尽可能慢
[20:10] 摄像机视觉度数是指垂直跨度视域，不是横向的，是竖向的。由于视域是固定的，所以窗口高度的变化不会影响摄像机垂直方向的显示区域。
[59:00] 通过固定时间间隔，计算摄像机缓动效果，原理是每次移动都是距离终点距离固定比例的移动，不是固定距离，是固定比例。
[1:20:40] 通过采用时间间隔进行“累加”，然后动画变动也是“累加”的方式重叠效果。

# 22_Physics [1:57:23]
[8:40] 常用3D库，Ammo.js，Cannon.js，Oimo.js
[9:24] 常用2D库，Matter.js，P2.js，Planck.js，Box2D.js
[10:54] npm install --save cannon
[44:10] 简化物理世界内的材质，CANNON.ContactMaterial，是一个设置两种材质互相接触时的物理量，这个“两种材质”是两个参数，正常情况下同种材质间也需要设置，如果同种材质不会互相作用可以不用，只要有互相作用的材质，都应该设置，不然没有物理计算。
[45:20] 可以设置默认材质，默认提供的材质，这样可以不用每个物体都添加材质。
[53:00] 持续施加一个力，并且作用在物体的坐标上。
[1:00:00] 合并THREE和CANNON的创建过程在一个函数内。方便管理和生成。
[1:04:51] 把列队中的物理物体和视图物体位置逐个合并。
[1:11:10] 优化-把材质生成器提出出来，不需要每个对象都生成一次。
[1:13:04] 技巧-形状生成器的结果虽然不能修改大小，但可以通过缩放后面改到需要的尺寸，对于标准形状，这个方法很有用。
[1:22:35] 因为THREE和CANNON的API一直性较好，所以角度旋转属性也可以直接有对应的copy接口。可以直接转移。
[1:24:59] 碰撞接触的范围类型讲解。
[1:28:08] 默认是全局全物体互相碰撞检测，但建议换成 new CANNON.SAPBroadphase(world)。
[1:30:16] 碰撞检测睡眠讲解与设置，world.allowSlepp=true，原理是根据物体速度为0就停止检测直到有外力参与。
[1:34:12] 加载声音。
[1:35:11] 监听物体碰撞，播放声音。
[1:37:00] 多重播放时重置声音时间。（应该有其他方案重叠声频）
[1:40:00] 根据碰撞强度选择播放声音和随机声音强度。
[1:46:00] 如何删除物体，需要删除THREE中物体，CANNON中的也需要删除，并且需要移除绑定的事件。
[1:49:48] CANNON的文档有时候并不完整说明API如何工作，可以直接看某些Demo事例。schteppe.github.io/cannon.js
[1:51:47] 建议将物理计算放入worker中计算。
[1:53:00] 卸载cannon，安装社区维护版本cannon-es。
[--] 讲解几个主流3D物理引擎的区别与建议。

# 23_Imported_models [1:07:38]
[8:13] 测试模型网站 https://github.com/KhronosGroup/glTF-Sample-Models
[28:00] 通过 gltfLoader.load() 去加载gltf，实际是一个声明文件，加载后需要按需要导入场景。
[44:00] three的场景加载方式似乎是直接移动对象，加载gltf对象内的子对象 gltf.scene.children 时会删减加载的对象，也可能是是一个特殊结构的Array，当加入场景后，内部子项会转移，并不是复制。所以可以通过while去不停移动对象，也可以直接[...childen]去复制一个数列 scene.add(...[...gltf.scene.children])
[43:22] 如果你清楚文件中场景的细节，可以直接加载整个场景，不需要单个对象导入。
[46:25] 讲解 Google-Draco 格式如何使用
[52:35] three 内置了 Draco 解码的 wasm版本，解码器需要添加入gltf加载器中。
[57:30] 加载模型如果太大如何缩放。
[58:27] 如何加载动画。
[1:01:03] 动画载入后需要每帧进行更新播放。
[1:01:30] 动画播放可以加入标准时差进行播放速度控制。
[1:05:31] 在线3D模型测试，可以把模型直接放入进行检测和初步测试。 threejs.org/editor/

# 24_Custom_model_with_Blender [1:59:49]
[10:28] 如何分隔视图。
[11:34] 如何合并视图。
[18:00] 设置入口。
[23:00] 如何解除极限视觉被卡住问题。ctil+shit+滑动
[25:59] 如何设置镜头移动方式。
[27:00] 如何设置等效视距或者真实视距。
[27:49] 上左下视图切换。
[29:59] 按Z切换到摄像机视图。
[30:45] 复位视图 shift+c
[32:30] 如何把视图聚焦对象
[33:24] 如何把聚焦对象外的对象视图内屏蔽
[36:47] 撤销返回可以是选择，选择在blender中也是一种行为，类似execl中能返回选中
[40:09] shift+a 创建物体的快捷键
[47:26] g键用于撤销一次物体的变动，类似移动或旋转
[48:13] 如何旋转对象
[40:21] shift+tab 视图模式切换
[52:32] 修改边线或角，切换在左上角
[53:35] 按tab退出编辑模式
[55:09] z 渲染器设置
[59:50] 点击对象后，右侧下方纵栏是属性修改区
[1:04:19] 可以在材质修改器中选择 BSDF去适应THREE中PBR材质
[1:07:20] 各个渲染器介绍
[1:09:01] f12 渲染
[1:19:19] 设置单位同步与three，侧栏 scene propreties -> Units -> Unit System [None]
[1:54:41] 导出细节

https://www.youtube.com/c/BlenderFoundation/videos
https://www.youtube.com/c/BlenderGuruOfficial/videos
https://www.youtube.com/c/GrantAbbitt/videos
https://www.youtube.com/c/CGFastTrack/videos
https://cgcookie.com/


# 25_Realistic_render [1:19:46]
[24:01] 使用 scene.traverse 枚举更新场景内的对象
[27:09] 筛选场景中可以使用标准材质的对象
[27:35] 通过场景照亮对象
[34:14] 更换图像解码器，renderer.outputEncoding= THREE.sRGBEncoding
[42:05] 环境贴图也采用sRBG标准，enviromentMap.encoding=THREE.sRGBEncoding
[49:35] 色彩空间变换，renderer.toneMapping= THREE.ACESFilmicToneMapping
[51:12] 多个调色变换进行测试，NTone，Linear，Reinhard，Cineon，ACESFilmic。
[52:51] gui在修改参数时使用string，很多参数常数是number，所以需要手动配备
[54:00] 需要更新材质时，需要needUpdate=true
[1:03:05] 如需要加入多重采样优化边缘，需要在一开始渲染器生成时，添加antialias:true
[1:05:20] 开启阴影
[1:13:19] 汉堡包阴影调参，阴影检测调整，shadow.normalBias

# 26_Code_structuring_for_bigger_projects 
[59:58] 选用事件发生器 [gist.github.com](https://gist.github.com/brunosimon/120acda915e6629e3a4d497935b16bdf)
[2:55:25] 模型动画如何切换
[3:08:40] destroy 过程


# 27_Shaders [2:16:44]
[23:15] THREE.ShaderMaterial 有一定的预设接口，THREE.RawShaderMaterial 所有着色器都需要自己写
[52:14] 介绍glsl基础C语法
[1:00:26] vec4 是一个4维的类，并且可以和低维的类合并
[1:04:02] 参考API资料 
https://shaderific.com/glsl.html

https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/indexflat.php

https://thebookofshaders.com/

[shadertoy.com](https://www.shadertoy.com/)
[TheArtofCodeIsCool](https://www.youtube.com/c/TheArtofCodeIsCool/videos)
[Lewis Lepton](https://www.youtube.com/c/lewislepton/videos)


[1:07:21] gl_Position具有xyz几个变量甚至可以xy这样用
[1:13:49] 讲解 projectionMatrix viewMatrix modelMatrix
[1:15:56] 参考资料 https://learnopengl.com/Getting-started/Coordinate-Systems
[1:20:35] 通过向量控制器变形图形 sin 函数
[1:22:27] 贴图器精度讲解 highp mediump lowp，一般直接用mediump,高精度在某些设备或手机上不通用
[1:24:25] 修改透明度
[1:26:16] 如何传递数据，
[1:26:20] 方案一：在形状上创建一个属性，传递到vertexShader，再由vertexShader传递到fragmentShader
[1:32:00] 传递fragmentShader
[1:38:23] 方案二：通过材质的uniforms从js传入gpu
[1:38:35] 新版本不需要写入type
[1:52:30] 如何解析纹理
[1:55:30] 图片的类是sample2D
[1:59:20] 建议变量顺序 position uniform varying
[2:07:10] 同一份代码如果匹配ShaderMaterial，需要删除预设处理器，projectionMatrix viewMatrix modelMatrix position uv mediump
[2:09:40] 如何Debug

# 28_Shader_patterns [1:49:26]
[25:51] 余数函数mod，step函数类似Math.frond
[35:27] 十字纹理
[45:05] round 四舍五入，floor 去掉小数点 
[57:03] length 直接计算出向量长度
[58:58] distance(vUV, vec2(0.2, 0.8))中心直接偏移
[1:20:01] sin和cos直接写
[1:24:17] 角度函数atan  
[1:35:52] 雾化模糊 https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
[1:37:19] 使用其中一个函数
[1:45:50] mix函数，混合颜色，也是黑白填色的一种方法
[1:47:52] clamp函数，范围限制函数

# 29_Raging_sea [1:15:43]
[58:12] 使用雾化模糊进行波浪模拟

# 30_Animated_galaxy [1:14:08]
[07:21] 设定size大小，并且修正屏幕最高分辨率
[14:02] 调整形态，开始修改形状生成器
[22:00] 通过形状的 attribute 逐个粒子传参
[23:09] 通过 renderer.getPixelRatio 动态的获取当前设备最小显示单位的正确比例值
[26:27] 通过查看 THREE 的默认材质，学习如果找到需要的默认代码
[35:00] 着色器 gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0); 显示类似色板的着色
[51:56] 如果 new THREE.ShaderMaterial({vertexColors: true}) 则不需要再在glsl里面 attribute float color;
[54:42] 动画环节开始
[1:00:19] atan(x,z)可以得到角度，就是斜率倒数，也就是角度值
[1:02:22] length(object.xz)计算某个点距离中心的距离，distance(uv,0.5,0.5)是距离0.5,0.5的距离
[1:12:00] 在js中的随机参数带入到glsl中
[1:13:40] 本次的着色器使用一个很大的面积，但只看中心的光点是一种性能浪费，可以改良

# 31_Modified_materials [51:43]
[03:22] 开始hook并展示前段代码
[06:23] source/node_modules/three/src/renderers/shaders 包含全部的着色器源码
[07:07] 如何查找源码片段
[19:22] 矩阵计算参考 https://thebookofshaers.com/08/
[27:59] 设置时间变量并向下代码回顾
[28:43] renderer
[28:44] light
[37:20] 测试深度材质
[38:18] 设置深度材质
[44:29] 查找法线材质代码

# 32_Post_processing [1:26:35]
[] 各种内置的滤镜 https://threejs.org/docs/index.html?q=Eff#examples/en/postprocessing/EffectComposer
[23:40] 滤镜 enabled 为 false 可以不使用滤镜，没有性能问题
[34:02] 修正颜色，需要增加 RenderTarget 
！！！ 暂未解决
[39:30] 使用滤镜后如何放锯齿
[41:46] WebGLMultipleRenderTargets 可以直接解决问题，但有一定浏览器限制，而且使用并不方便，
[44:52] 各种js软解折中方案
[47:38] 如何选择反锯齿方案
[49:57] 编写自适应方案
[57:30] 编辑自定义的Pass滤镜
[1:00:00] 简单的RBG调色
[1:05:00] 画面随时间变动扭曲
[1:09:00] 使用法线图改画面
[1:22:30] normalize函数解析，用于常量初始化
[1:23:48] dot函数解析，用于两个向量的计算，计算出是否反光，可以理解为法线与输入向量的折射夹角

# 33_Performance_tips [1:12:25]
[03:02] 使用监控js，https://github.com/mrdoob/stats.js
[03:27] npm install --save stats.js
[08:00] 介绍解锁chrome速率限制，https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d
[13:04] chrome 插件Spector.js用于开发监控每帧的读写情况
[23:11] 不是所有物体都需要获取阴影，需要分析具体场景，阴影对象性能影响较大
[25:10] 必要时甚至可以2帧更新一次阴影
[29:03] 适当使用TinyPng去压缩图片，是否使用取决于具体使用情况
[34:16] 创建多个基础图形的节省方案，BufferGeometryUtils
[1:12:15] 总结: https://discoverthreejs.com/tips-and-tricks/

# 34_Intro_and_loading_progress [49:55]
[14:21] 使用loadingManager
[45:00] css中使用 will-change可以让GPU缓存动画，更流畅一些

# 35_Mixing_HTML_and_WebGL [58:08]
[44:06] 使用 Raycaster 去确定点击物
[] 使用混合HTML元素始终是不利于性能

# 36_Creating_a_scene_in_Blender [2:05:04]

# 37_Baking_and_exporting_the_scene [2:12:08]

# 38_Importing_and_optimizing_the_scene [48:18]

# 39_Adding_details_to_the_scene [1:34:52]
[47:07] THREE.AdditiveBlending 会对亮点大小有变化影响，很适合镜头移动的动态效果

# 40_The_end [03:50