import { EventEmitter, Main } from "../All";

export default class Sizes extends EventEmitter {
    main: Main
    width = 0;
    height = 0;
    //pixelRatio = 0;//可能有用，直接提高或降低分辨率

    constructor(main: Main) {
        super()

        // Setup
        this.main = main
        this.updateSize()

        // Resize event    
        Sizes.setWindowResizeEmitter(this)
    }

    onWindowResizeListener = () => {
        this.updateSize()
        this.emit('resize')
    }

    updateSize() {
        const { viewArea, canvas } = this.main
        const { offsetWidth: width, offsetHeight: height } = viewArea
        this.width = width;
        this.height = height;
        //this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // 更新画布
        canvas.width = width
        canvas.height = height
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
    }

    resizeObserver?: ResizeObserver
    static setWindowResizeEmitter(sizes: Sizes) {
        if (window.ResizeObserver) {
            sizes.resizeObserver = new ResizeObserver((entries) => sizes.onWindowResizeListener());
            sizes.resizeObserver.observe(sizes.main.viewArea);
        } else {
            window.addEventListener('resize', sizes.onWindowResizeListener)
        }
    }
    static removeWindowResizeEmitter(sizes: Sizes) {
        if (sizes.resizeObserver) {
            sizes.resizeObserver.disconnect();
        } else {
            window.removeEventListener('resize', sizes.onWindowResizeListener)
        }
    }

    onResize(fun: Function) {
        return this.on('resize', fun)
    }

    destroy() {
        Sizes.removeWindowResizeEmitter(this)
        return this.clearEvents()
    }
}