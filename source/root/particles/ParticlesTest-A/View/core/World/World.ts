import { withCtx } from "vue";
import { Main } from "../All"
import { GuiHelper } from "./GuiHelper"

const parameter = {
    quantity: 5,
    recedingColor: [0, 0, 0, 1],
    hue: 0,
    independentColor: true,
    getRecedingColor() {
        return `rgba(${this.recedingColor.join(',')})`
    },
    getColor() {
        return `hsl(${this.hue}, 100%, 50%)`;
    },
}

class Particle {
    onDestroy = () => { }
    x: number
    y: number
    ctx: CanvasRenderingContext2D
    size: number
    speedX: number
    speedY: number
    color: string
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x
        this.y = y
        this.ctx = ctx
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = parameter.getColor()
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
        else this.destroy()
    }
    render() {
        const { ctx } = this
        //const controler = this.controler
        ctx.fillStyle = parameter.independentColor ? this.color : parameter.getColor()
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    destroy() {
        if (typeof this.onDestroy === 'function')
            this.onDestroy()
    }
}

export default class World {
    main: Main
    guiHelper: GuiHelper

    parameter = parameter

    constructor(main: Main) {
        this.main = main

        // Resize
        this.setControls()
        this.animate()

        // Helper
        this.guiHelper = new GuiHelper(this.main, this)
    }

    resize() {

    }

    update() {

    }


    /**
     * 设置控制器
     */
    controler = {
        x: NaN,
        y: NaN,
    }
    setControls() {
        const { canvas } = this.main
        const updateControler = (x: number, y: number) => {
            this.controler.x = x
            this.controler.y = y
            this.createParticles(x, y)
        }
        const onMove = (event: MouseEvent) => {
            updateControler((event as any).layerX as number, (event as any).layerY as number)//稳定版需要通过转换得到数据，layerX,layerY不是标准方案
        }
        canvas.addEventListener('mousemove', onMove)
        this.main.onDestroyed(() => canvas.removeEventListener('mousemove', onMove))
    }


    drawCircle() {
        const { ctx } = this.main
        const controler = this.controler
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(controler.x, controler.y, 50, 0, Math.PI * 2);
        ctx.fill();
    }

    createParticles(x: number, y: number) {
        for (let i = 0; i < parameter.quantity; i++) {
            const particle = new Particle(x, y, this.main.ctx)
            this.particlesList.add(particle)
            particle.onDestroy = () => this.particlesList.delete(particle)
        }
    }

    renderParticle() {
        const { ctx } = this.main
        for (let particle of this.particlesList) {
            particle.update()
            particle.render()
            for (let otherParticle of this.particlesList) {
                if (particle === otherParticle) continue;
                const dx = particle.x - otherParticle.x
                const dy = particle.y - otherParticle.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < 50) {
                    ctx.strokeStyle = particle.color
                    ctx.lineWidth = particle.size / 3
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y)
                    ctx.lineTo(otherParticle.x, otherParticle.y)
                    ctx.stroke()
                }
            }
        }
    }
    particlesList = new Set<Particle>()

    animate() {
        const { ctx } = this.main
        const sizes = this.main.sizes
        //
        parameter.hue += 0.5
        //
        //ctx.clearRect(0, 0, sizes.width, sizes.height)//直接清空内容
        ctx.fillStyle = parameter.getRecedingColor()//'rgba(0,0,0,0.1)'
        ctx.fillRect(0, 0, sizes.width, sizes.height)
        //
        this.renderParticle()
        window.requestAnimationFrame(() => this.animate())
    }

}

