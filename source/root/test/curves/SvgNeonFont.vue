<script setup lang="ts">
import { reactive, ref, computed, watchEffect } from "vue";
import anime from "animejs";
// Dome 发现折角参数调整入口
// https://maker.js.org/playground/?script=makerjs-logo

// Dome 字体转换svg
// https://maker.js.org/playground/?script=Text#params=[%22stardosstencil-bold%22,%22Hello%22,72,false,false]

// 库的应用具体参考
// https://github.com/davestewart/outliner/blob/main/src/tasks/outline.js

// 目标
// 采用woker解码
// 可以使用外来svg
// 可以选择样式

import makerjs from "makerjs";
import opentype from "opentype.js";
import fontArbutusSlabPath from "@src/assets/fonts/Arbutus_Slab/ArbutusSlab-Regular.ttf";

type TextInputParams = {
  text?: string;
  size?: number;
  spacingOffset?: number;
};

type PathInfo = {
  leftBottom: number[];
  rightTop: number[];
  value: string;
  model: makerjs.IModel;
};

type outlineParams = {
  distance: number;
  joints?: number;
  inside?: boolean;
};

class Text {
  fontUrl?: string;
  font?: opentype.Font;
  constructor() {}

  // 根据路径加载字体
  loadFont(fontUrl: string) {
    if (fontUrl === this.fontUrl) return;
    // 缓存字体链接，重复不再加载
    this.fontUrl = fontUrl;
    // 加载字体
    return new Promise((resolve, reject) => {
      if (!this.fontUrl) return reject(new Error('[fontUrl] can not be undefined | null | ""'));
      // 官方加载操作
      opentype.load(this.fontUrl, (err, font) => {
        if (err || !font) return reject(new Error(err));
        else resolve(font);
      });
    }).then((font) => {
      if (!font) throw new Error("opentype.load fail");
      // 缓存字体
      this.font = font as opentype.Font;
      // 更新内容
      this.update();
    });
  }

  params = {
    // 基本参数
    text: "NEON",
    size: 10, // 大小，太大容易出现计算出错，建议 10的整数倍
    spacingOffset: 0.5, // 字符间隔偏移，以 size 为 1，进行比例等放
    margin: [0.2, 0.2], // 外框扩大偏移，以 size 为 1，进行比例等放，[高度, 宽度]
    // 样式参数
    outlines: [{ distance: 0 }, { distance: 3 }, { distance: 5.5 }, { distance: 9 }, { distance: 9 }] as outlineParams[], // 已size为100em比例
  };
  // 输入信息
  input(input: TextInputParams) {
    Object.entries(input).forEach(([key, value]) => {
      if (this.params.hasOwnProperty(key)) Reflect.set(this.params, key, value, this.params);
    });
    this.update();
  }

  result = {
    width: 0,
    heght: 0,
    paths: [] as string[][],
  };

  // 更新内容
  update() {
    //
    const svgDom = svg.value as SVGElement;
    let dom;
    //

    const { font } = this;
    if (!font) return;
    const newPathInfos: PathInfo[][] = [];
    const { size, spacingOffset, margin, outlines } = this.params;
    // 生成字体对象
    const texts = new makerjs.models.Text(font, "NEON", size);
    // 零点对齐，基线为0，左为0
    makerjs.model.zero(texts);
    // 用于存放总体外框的信息
    const textsLeftBottom = [Infinity, -Infinity];
    const textsRightTop = [-Infinity, Infinity];
    // 对比记录值，找到外框边缘点
    const contrastMaxMinInfos = (pathInfo: PathInfo) => {
      textsLeftBottom[0] = Math.min(textsLeftBottom[0], pathInfo.leftBottom[0]);
      textsLeftBottom[1] = Math.max(textsLeftBottom[1], pathInfo.leftBottom[1]);
      textsRightTop[0] = Math.max(textsRightTop[0], pathInfo.rightTop[0]);
      textsRightTop[1] = Math.min(textsRightTop[1], pathInfo.rightTop[1]);
    };

    const createPathInfo = (model: makerjs.IModel) => {
      // 测量模型外框
      // https://github.com/microsoft/maker.js/blob/master/packages/maker.js/src/core/measure.ts#L494
      const measure = makerjs.measure.modelExtents(model);
      //console.log(model, measure);
      // 生成记录
      const pathInfo: PathInfo = {
        leftBottom: [measure.low[0] - 0, 0 - measure.low[1]],
        rightTop: [measure.high[0] - 0, 0 - measure.high[1]],
        value: "",
        model,
      };
      // 对比记录最大值
      contrastMaxMinInfos(pathInfo);
      return pathInfo;
    };
    // 用于存放单个字体信息
    const textPathInfos: PathInfo[] = [];
    // 用于存放单个字体的外轮廓信息
    const textOutlinePathInfos: PathInfo[][] = [];
    // 相对偏移值
    const relativeSpacingOffset = size * spacingOffset;
    // 逐个字处理
    Object.values(texts.models).forEach((model, index) => {
      // 逐个字添加相对位移
      makerjs.model.moveRelative(model, [index * relativeSpacingOffset, 0]);
      // 逐个字添记录字体曲线外框和位置
      const pathInfo = createPathInfo(model);
      // 缓存字体信息
      textPathInfos.push(pathInfo);
      // 生成外框信息列表
      const outlinePathInfoList = outlines.map((item) => {
        // 计算最终外扩距离
        const distance = (item.distance * size) / 100;
        const joints = Number.isInteger(item.joints) ? item.joints : 1;
        // 很大坑，很容易计算出错
        const outlineModel =
          item.distance === 0 ? makerjs.model.clone(model) : makerjs.model.outline(model, distance, joints, false);
        const outlinePathInfo = createPathInfo(outlineModel);
        return outlinePathInfo;
      });
      // 缓存字体外描边信息
      textOutlinePathInfos.push(outlinePathInfoList);
    });
    // 放入总列表
    newPathInfos.push(textPathInfos);
    newPathInfos.push(...textOutlinePathInfos);
    // 计算文字的外框
    const textsWidth = textsRightTop[0] - textsLeftBottom[0];
    const textsHeight = textsLeftBottom[1] - textsRightTop[1];
    const totalHeight = Math.round(textsHeight + margin[0] * size * 2); // 采用取取整，误差填充由margin填补
    const totalWidth = Math.round(textsWidth + margin[1] * size * 2); // 采用取取整，误差填充由margin填补
    const marginTop = (totalHeight - textsHeight) / 2;
    const marginLeft = (totalWidth - textsWidth) / 2;
    // 保存最终显示区域结果
    this.result.width = totalWidth;
    this.result.heght = totalHeight;
    // 计算需要偏移值
    // makerjs 的坐标是笛卡尔第一象限作为主坐标，Svg是做笛卡尔第四象限作为主坐标，Y轴相反
    const translateMatrix = [-textsLeftBottom[0] + marginLeft, (-textsLeftBottom[1] + textsHeight + marginTop) * -1];
    const translate = (target: number[], translateMatrix: number[]) => {
      target[0] += translateMatrix[0];
      target[1] -= translateMatrix[1];
    };
    for (let list of newPathInfos) {
      for (let pathInfos of list) {
        // 逐个字生偏移
        makerjs.model.moveRelative(pathInfos.model, translateMatrix);
        // 逐个字生成路径
        const pathD = makerjs.exporter.toSVGPathData(pathInfos.model, false, [0, 0]);
        // 保存路径
        pathInfos.value = pathD.toString();
        // 更新坐标偏移
        translate(pathInfos.leftBottom, translateMatrix);
        translate(pathInfos.rightTop, translateMatrix);
      }
    }
    // 更新坐标偏移
    translate(textsLeftBottom, translateMatrix);
    translate(textsRightTop, translateMatrix);

    // 更新结果
    this.result.paths = newPathInfos.map((list) => list.map((item) => item.value));

    console.log(this.result);
    //
    //const result = texts;
    //const result = makerjs.model.outline(texts, 8, 1, false);

    //makerjs.model.simplify(result);
    //console.log(result)

    // 用于测试检查
    for (let indexX = 0; indexX < newPathInfos.length; indexX++) {
      const list = newPathInfos[indexX];
      for (let indexY = 0; indexY < list.length; indexY++) {
        const pathInfos = list[indexY];
        let className;
        if (indexX === 0) className = "st0";
        else className = `st${indexY + 1}`;
        dom = document.createElementNS("http://www.w3.org/2000/svg", "path");
        dom.classList.add(className);
        dom.setAttribute("d", pathInfos.value);
        svgDom.appendChild(dom);
        /* dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dom.setAttribute("r", "0.3");
        dom.setAttribute("cx", pathInfos.leftBottom[0].toString());
        dom.setAttribute("cy", pathInfos.leftBottom[1].toString());
        svgDom.appendChild(dom);
        dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dom.setAttribute("r", "0.3");
        dom.setAttribute("cx", pathInfos.rightTop[0].toString());
        dom.setAttribute("cy", pathInfos.rightTop[1].toString());
        svgDom.appendChild(dom); */
      }
    }

    svgDom.setAttribute("viewBox", [0, 0, this.result.width, this.result.heght].join(" "));

    return;

    for (let index = 0; index < textOutlinePathInfos.length; index++) {
      const list = textOutlinePathInfos[index];
      for (let pathInfos of list) {
        dom = document.createElementNS("http://www.w3.org/2000/svg", "path");
        dom.classList.add("outline");
        dom.setAttribute("d", pathInfos.value);
        svgDom.appendChild(dom);
      }
    }

    dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dom.classList.add("textsBox");
    dom.setAttribute("r", "0.3");
    dom.setAttribute("cx", textsLeftBottom[0].toString());
    dom.setAttribute("cy", textsLeftBottom[1].toString());
    svgDom.appendChild(dom);
    dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dom.classList.add("textsBox");
    dom.setAttribute("r", "0.3");
    dom.setAttribute("cx", textsRightTop[0].toString());
    dom.setAttribute("cy", textsRightTop[1].toString());
    svgDom.appendChild(dom);

    /* const outline = makerjs.model.outline(texts.models[2], 10, 1, false);
    dom = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dom.classList.add("outline");
    dom.setAttribute("d", makerjs.exporter.toSVGPathData(outline, false, [0, 0]).toString());
    svgDom.appendChild(dom); */

    /*
    for (let pathInfo of textPathInfos) {
      dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dom.setAttribute("r", "3");
      dom.setAttribute("cx", pathInfo.rightTop[0].toString());
      dom.setAttribute("cy", pathInfo.rightTop[1].toString());
      svgDom.appendChild(dom);
      dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dom.setAttribute("r", "3");
      dom.setAttribute("cx", pathInfo.leftBottom[0].toString());
      dom.setAttribute("cy", pathInfo.leftBottom[1].toString());
      svgDom.appendChild(dom);

    } */

    /* var m = makerjs.measure.modelExtents(texts);
    console.log("m", m);
    dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dom.setAttribute("r", 3);
    dom.setAttribute("cx", m.center[0]);
    dom.setAttribute("cy", m.center[1]);
    list.push(dom);
    dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dom.setAttribute("r", 3);
    dom.setAttribute("cx", m.high[0]);
    dom.setAttribute("cy", m.low[1] - m.high[1]);
    list.push(dom);
    dom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dom.setAttribute("r", 3);
    dom.setAttribute("cx", m.low[0]);
    dom.setAttribute("cy", m.low[1]);
    list.push(dom);
     */
  }
  static toSVGPathData() {}
}

const text = new Text();
text.loadFont(fontArbutusSlabPath);

const setAnimation = (paths: SVGPathElement[]) => {
  for (let pathDom of paths) {
    var offset = anime.setDashoffset(pathDom);
    pathDom.setAttribute("stroke-dashoffset", offset.toString());
    if (pathDom.classList.contains("letter")) {
      anime({
        targets: pathDom,
        duration: anime.random(0, 1000),
        delay: anime.random(0, 300),
        opacity: [{ value: 0, duration: anime.random(0, 300) }],
        loop: true,
      });
    } else {
      anime({
        targets: pathDom,
        strokeDashoffset: [offset, 0],
        duration: anime.random(1000, 3000),
        delay: anime.random(0, 0),
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine",
        autoplay: true,
      });
    }
  }
};

const createSvgFromFont = (font: opentype.Font) => {
  //
  /*     const path = font.getPath('NEON', 0, 0, 100)
        console.log('path.getBoundingBox', path.getBoundingBox())
        console.log('path', path) */
  //const boundingHexagon= makerjs.measure.boundingHexagon(texts)
  //console.log('boundingHexagon',boundingHexagon)
  //makerjs.model.move(texts,[0,-100]);
  /*    Object.values(texts.models).forEach(model=>{
           var m = makerjs.measure.pathExtents(texts);
       })

   */
  /*

 */
  /* const boundingHexagon= makerjs.measure.boundingHexagon(texts)
    console.log('boundingHexagon',boundingHexagon)
    const list = []
    Object.values(boundingHexagon.paths).forEach(path=>{
        let dom ;
        dom= document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dom.setAttribute("r",3)
        dom.setAttribute("cx",path.end[0])
        dom.setAttribute("cy",path.end[1])
        list.push(dom)
        dom= document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dom.setAttribute("r",3)
        dom.setAttribute("cx",path.origin[0])
        dom.setAttribute("cy",path.origin[1])
        list.push(dom)
    }) */
  /*
    const result = makerjs.model.outline(texts, 8, 1, false);
    //makerjs.model.simplify(result);
    console.log('result', result)
    const pathD = makerjs.exporter.toSVGPathData(result, false, [0, 0])
    console.log(pathD);
    [...(document.querySelectorAll('#resultfont') as any)].forEach(dom => {
        dom.setAttribute("d", pathD)
        for (let item of list) dom.appendChild(item)
    });



 */
  /*



    console.log('path',path.toPathData()) */
  /*
        const texts = new makerjs.models.Text(font, 'NEON', 160,false,true)
        const text=texts.models[1]
        console.log('texts', texts)
    console.log('text',text)

        const result = makerjs.model.outline(text, 8, 1, false);
        console.log('result', result)
        makerjs.model.simplify(result);

        const pathD=makerjs.exporter.toSVGPathData(result, false, [0, 0])
        console.log(pathD);
        [...(document.querySelectorAll('#resultfont') as any)].forEach(dom => dom.setAttribute("d", pathD)); */
};

/*
//var makerjs = require("makerjs");
function outline(svgData: any, distance: any, opts?: any) {
    var defaultOptions = {
        bezierAccuracy: 0.25,
        joints: 1,
        outside: true,
        tagName: 'path'
    };
    var o = makerjs.extendObject(defaultOptions, opts);
    var closed = true;
    var input;
    switch (o.tagName) {
        case 'polyline':
            closed = false;
        //fall through
        case 'polygon':
            //use points.
            //Need to mirror them on y axis because they are expected to be in MakerJs coordinate space
            input = makerjs.model.mirror(new makerjs.models.ConnectTheDots(closed, svgData), false, true);
            break;
        default:
            input = makerjs.importer.fromSVGPathData(svgData, { bezierAccuracy: o.bezierAccuracy });
            break;
    }
    console.log('input', input)
    var result;
    if (o.inside && o.outside) {
        result = makerjs.model.expandPaths(input, distance, o.joints);
    }
    else {
        result = makerjs.model.outline(input, distance, o.joints, o.inside);
    }
    console.log('inputresult', result)
    makerjs.model.simplify(result);
    return makerjs.exporter.toSVGPathData(result, false, [0, 0]);
}
 */

/*
//var d1 = "M50,50h100v100h-100v-100z";
//var d1 = "M156.3,35.8h59.3v13.5h-21.9v158.1H178L79.9,75L69.3,56.5h-1l2.4,18.8V191h21.9v13.5H33.4V191h21.9V49.3H33.4 V35.8h48.2l84.3,113.5l12.5,20.7h1.2l-1.4-20.7v-100h-21.9V35.8z";
var d1 = "M488.9,120.1c0-12.5,1.9-24.1,5.8-34.8c3.9-10.7,9.4-19.9,16.7-27.7c7.3-7.8,16.3-13.9,27-18.2c10.7-4.3,22.9-6.5,36.5-6.5c13.7,0,25.9,2.2,36.6,6.5c10.8,4.3,19.8,10.4,27.2,18.2c7.4,7.8,13,17,16.9,27.7c3.9,10.7,5.8,22.3,5.8,34.8c0,12.5-1.9,24.1-5.8,34.8c-3.9,10.7-9.5,19.9-16.9,27.7c-7.4,7.8-16.5,13.9-27.2,18.2c-10.8,4.3-23,6.5-36.6,6.5c-13.7,0-25.8-2.2-36.5-6.5c-10.7-4.3-19.7-10.4-27-18.2c-7.3-7.8-12.9-17-16.7-27.7C490.8,144.3,488.9,132.6,488.9,120.1z M519,120.1c0,10.3,1.2,19.9,3.5,28.9c2.3,9,5.9,16.8,10.7,23.4c4.8,6.6,10.9,11.8,18.2,15.7c7.3,3.9,15.9,5.8,25.9,5.8c9.2,0,17.1-1.9,23.9-5.8c6.7-3.9,12.3-9.1,16.8-15.7c4.4-6.6,7.7-14.4,10-23.4c2.2-9,3.4-18.6,3.4-28.9c0-10.3-1.2-19.9-3.5-28.9c-2.3-9-5.9-16.8-10.7-23.4c-4.8-6.6-10.9-11.8-18.2-15.7c-7.3-3.9-16-5.8-26.1-5.8c-9.6,0-17.9,1.9-24.7,5.8c-6.8,3.9-12.4,9.1-16.7,15.7c-4.3,6.6-7.5,14.4-9.4,23.4C520,100.2,519,109.8,519,120.1z";

var d2 = outline(d1, 8);

[...(document.querySelectorAll('#input') as any)].forEach(dom => dom.setAttribute("d", d1));
[...(document.querySelectorAll('#result') as any)].forEach(dom => dom.setAttribute("d", d2));
//console.log(d2);

 */
const svg = ref<SVGElement>();
</script>

<template>
  <section >
    <svg version="1.1" x="0px" y="0px" class="neon" viewBox="0 0 954 242" ref="svg">
      <!-- <defs>
    
      <style>
 circle {
    fill: red;
    }

   circle.textsBox {
  fill: green;
    }

    svg path {
      fill: rgba(0, 0, 0, 0.2);
      stroke-width: 2;
      stroke: #ff00db;
    }
  </style>
  </defs> -->
    </svg>
    <!--    <svg version="1.1" x="0px" y="0px" viewBox="0 0 52 15"> 
<circle r="0.3" cx="16.700683584318757" cy="11.162098315619392"></circle>
    </svg> -->
  </section>
</template>

<!-- <style scoped> -->
<style>
/* svg :deep(circle) {
  fill: red;
}
svg :deep(circle.textsBox) {
  fill: green;
}
svg :deep(.outline) {
  fill: none;
  stroke: red;
  stroke-width: 0.2;
}


 */
.background {
  background-color: #1a1a1a;
}
.neon {
    --index:0.04;
  /* width: 60%; */
   background-color: #1a1a1a;
}
.st0 {
  fill: #29abe2;
}
.st1 {
  fill: none;
  stroke: #ff00db;
  stroke-width: calc(3px * var(--index));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 0, calc(25 * var(--index)), calc(175 *var(--index));
}
.st2 {
  fill: none;
  stroke: #2e00ed;
  stroke-width: calc(4px * var(--index));
  stroke-miterlimit: 100;
  stroke-dasharray: 0, calc(54 * var(--index)), calc(101 *var(--index));
}

.st3 {
  fill: none;
  stroke: #f70285;
  stroke-width: calc(3px * var(--index));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 100;
  stroke-dasharray: 0, calc(37 * var(--index)), calc(129 *var(--index));
}
.st4 {
  fill: none;
  stroke: #ff0400;
  stroke-width: calc(8px * var(--index));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 0, calc(36 * var(--index)), calc(136 *var(--index));
}
.st5 {
  fill: none;
  stroke: #ffffff;
  stroke-width: calc(2px * var(--index));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 0, calc(36 * var(--index)), calc(136 *var(--index));
}
</style>
