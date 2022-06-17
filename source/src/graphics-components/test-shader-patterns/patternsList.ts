import { collapseItemProps } from "element-plus";

class CustomShader {
    number: number = 0
    previewUrl: string | null = null
    fragment: string | null = null
    vertex: string | null = null
    constructor() { }
}
export { CustomShader };
//

const glslList = import.meta.glob('./View/core/Shaders/*/*.glsl', { as: 'raw' });
const previewList = import.meta.globEager('./View/core/Shaders/*/preview.png', { as: 'url' });

const list: CustomShader[] = (() => {
    const map: any = {}

    Object.entries(glslList).forEach(([key, item]) => {
        const path = key.toString() as string
        const nodes = path.split('/')
        const name = nodes.pop()?.split('.')[0]
        const folder = nodes.pop() as string
        const hasCustomShader = folder in map
        const customShader = hasCustomShader ? map[folder] : new CustomShader()
        const code = item.toString()
        if (!hasCustomShader) map[folder] = customShader
        if (name === 'fragment') customShader.fragment = code
        else if (name === 'vertex') customShader.vertex = code
    })

    Object.entries(previewList).forEach(([key, item]) => {
        const path = key.toString() as string
        const nodes = path.split('/')
        const name = nodes.pop()
        const folder = nodes.pop() as string
        const url = item.default.toString()
        if (folder in map) {
            map[folder].previewUrl = url
        }
    })
    
    const list: CustomShader[] = []
    Object.entries(map).forEach(([key, item]) => {
        const customShader = item as CustomShader
        const numberStr: any = key.match(/\d+/)
        const number = numberStr ? parseInt(numberStr[0]) : 0
        const index = number - 1
        customShader.number = number
        list[index] = customShader
    })
    return list
})();

list.sort((a, b) => b.number - a.number);
export default list;
