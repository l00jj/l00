import { Main, World, AddDebug, GUI } from "../All"

export class GuiHelper {
    main: Main

    constructor(main: Main, world: World) {
        this.main = main

        // Setup
        const addDebug = this.main.debug.addFolder('Helper')

        addDebug((folder: GUI) => {
            /*     folder.addColor(palette, "color").name('Scene Color').onChange(() => {
                    (this.scene.background as THREE.Color).setHex(palette.color)
                }) */

            const { parameter } = world
            folder.add(parameter, "quantity").name('Quantity').min(1).max(50).step(1).onChange((val) => { })
            folder.addColor(parameter, "recedingColor").name('RecedingColor').onChange((val) => {})
            folder.add(parameter.recedingColor, "3").name('recedingColorAlpha').min(0).max(1).step(0.01).onChange((val) => {
                parameter.recedingColor[3]=val
            })
            folder.add(parameter, "independentColor").name('independentColor').onChange((val) => { })

            folder.open()
        })
    }
}