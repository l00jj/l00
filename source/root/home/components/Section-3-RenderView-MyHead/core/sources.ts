import { Source } from "./All"

export default [
    {
        name: 'matcap',
        type: 'texture',
        path: new URL('../assets/textures/matcaps/1B1B1B_999999_575757_747474-PS.png?url', import.meta.url).href, //黑 带灰度
    },
    {
        name: 'model-myhead',
        type: 'gltfDracoModel',
        path: new URL('../assets/models/my head/my head.gltf?url', import.meta.url).href,
    }
] as Source[]