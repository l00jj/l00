import { GUI } from "dat.gui";
import * as dat from "dat.gui";
export * from "dat.gui";
import { EventEmitter } from "./EventEmitter";

// https://github.com/dataarts/dat.gui/blob/master/build/dat.gui.js#L1676
const CSS_NAMESPACE = 'dg';
const dom = (dat as any).dom.dom

// 原css中添加样式控制
const sheet = (() => {
    let targetStyleSheet: CSSStyleSheet;
    for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i]
        for (let j = 0; i < styleSheet.cssRules.length; i++) {
            const cssRule = styleSheet.cssRules[j]
            if (cssRule.cssText.startsWith('.dg ul')) targetStyleSheet = styleSheet
        }
    }
    if (targetStyleSheet!) {
        targetStyleSheet.insertRule(`.dg ul li.title { position: sticky; top: 0; }`)
        targetStyleSheet.insertRule(`.dg.main > ul { overflow: hidden scroll; }`)
    }
})();

export class DatGui extends EventEmitter {
    ui: GUI
    viewDom?: HTMLElement
    constructor(inputParams: { [key: string]: any } = {}) {
        super()
        const params = Object.assign({ autoPlace: false }, inputParams)//默认不自动生成，无外壳
        this.ui = new GUI(params)
    }

    appendGuiTo(viewDom: HTMLElement) {
        this.viewDom = viewDom
        // 还原原版结构
        // https://github.com/dataarts/dat.gui/blob/master/build/dat.gui.js#L1873
        const autoPlaceContainer: HTMLElement = window.document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        autoPlaceContainer.style.position = "absolute";
        const guiDom: HTMLElement = this.ui.domElement;
        dom.addClass(guiDom, GUI.CLASS_AUTO_PLACE);
        dom.addClass(guiDom, 'taller-than-window');
        // 装载
        autoPlaceContainer.appendChild(guiDom)
        viewDom.appendChild(autoPlaceContainer)
        // 初始化
        this.atViewAreaResize()
        DatGui.onResizeObserve(viewDom, this)
        DatGui.addResizeHandle(this)
    }

    atViewAreaResize() {
        const viewDom = this.viewDom
        const guiDom: HTMLElement = this.ui.domElement;
        const ulDom = guiDom.querySelector('ul') as HTMLElement
        const closeDom = guiDom.querySelector('.close-button') as HTMLElement
        if (viewDom && ulDom && closeDom) {
            const ulMaxHeight = viewDom.offsetHeight - closeDom.offsetHeight * 2
            ulDom.style.maxHeight = `${ulMaxHeight}px`
        }
    }

    static onResizeObserve(viewDom: HTMLElement, datGui: DatGui) {
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => datGui.atViewAreaResize());
            resizeObserver.observe(viewDom)
            datGui.onDestroyed(() => resizeObserver.disconnect())
        } else {
            const onresize = () => datGui.atViewAreaResize()
            window.addEventListener('resize', onresize)
            datGui.onDestroyed(() => window.removeEventListener('resize', onresize))
        }
    }

    /**
     * 添加横向控制杆
     * 采用源码中的功能
     * 
     * addResizeHandle
     * https://github.com/dataarts/dat.gui/blob/master/build/dat.gui.js#L2428
     * 
     * Common.extend
     * https://github.com/dataarts/dat.gui/blob/master/build/dat.gui.js#L78
     */
    __resize_handle!: HTMLElement
    static addResizeHandle(datGui: DatGui) {
        const gui: any = datGui.ui;
        const Common = {
            extend(target: any, change: any) {
                Object.assign(target, change)
            }
        }
        // 源码
        var pmouseX = 0;//改动
        gui.__resize_handle = document.createElement('div');
        Common.extend(gui.__resize_handle.style, {
            width: '6px',
            marginLeft: '-3px',
            height: '200px',
            cursor: 'ew-resize',
            position: 'absolute'
        });
        function drag(e: DragEvent) {//改动
            e.preventDefault();
            gui.width += pmouseX - e.clientX;
            gui.onResize();
            pmouseX = e.clientX;
            return false;
        }
        function dragStop() {
            dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
            dom.unbind(window, 'mousemove', drag);
            dom.unbind(window, 'mouseup', dragStop);
        }
        function dragStart(e: DragEvent) {//改动
            e.preventDefault();
            pmouseX = e.clientX;
            dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
            dom.bind(window, 'mousemove', drag);
            dom.bind(window, 'mouseup', dragStop);
            return false;
        }
        dom.bind(gui.__resize_handle, 'mousedown', dragStart);
        dom.bind(gui.__closeButton, 'mousedown', dragStart);
        gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
        //
    }

    onDestroyed(fun: Function) {
        return this.once('destroyed', fun)
    }

    destroy() {
        this.ui?.destroy()
        this.emit('destroyed'); // Emit Destroyed Event
    }

}
