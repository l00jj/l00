import { collapseItemProps } from "element-plus";

class CustomShader {
    number: number
    fragment: string | null = null
    vertex: string | null = null
    constructor(number: number) {
        this.number = number
    }
}
export { CustomShader };
//
const paths = import.meta.glob('./View/core/Shaders/*/*.glsl', { as: 'raw' });
//const previews = import.meta.glob('./View/core/Shaders/*/preview.png');
//console.log(previews)
 
const list: CustomShader[] = []
Object.entries(paths).forEach(([key, item]) => {
    const path = key.toString() as string
    const nodes = path.split('/')
    const name = nodes.pop()?.split('.')[0]
    const numberStr: any = nodes.pop()?.match(/\d+/)
    const number = numberStr ? parseInt(numberStr[0]) : 0
    const index = number - 1
    const hasCustomShader = !!list[index]
    const customShader = hasCustomShader ? list[index] : new CustomShader(number)
    const code = item.toString()
    if (!hasCustomShader) list[index] = customShader
    if (name === 'fragment') customShader.fragment = code
    else if (name === 'vertex') customShader.vertex = code
})
list.sort((a, b) => b.number - a.number);
export default list;
