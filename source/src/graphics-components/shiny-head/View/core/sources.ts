import { at } from "lodash"
import { Source } from "./All"


const paths = Object.values(import.meta.globEager('../assets/textures/matcaps/*.png')).map(item => {
    const path = item.default.toString() as string
    const name = 'matcap.' + path.split('/').at(-1)
    return {
        name, type: 'texture', path
    }
})
export default [
    ...paths,
    /* {
        name: 'matcap.1B1B1B_999999_575757_747474-PS',
        type: 'texture',
        path: new URL('../assets/textures/matcaps/1B1B1B_999999_575757_747474-PS.png?url', import.meta.url).href, //黑 带灰度
    }, */
    //path: new URL('../assets/textures/matcaps/537387_75BBB9_152E5B_0E85E8-PS.png?url', import.meta.url).href,// 白
    //path: new URL('../assets/textures/matcaps/1B1B1B_999999_575757_747474-PS.png?url', import.meta.url).href, //黑 带灰度
    //path: new URL('../../../assets/textures/matcaps/161B1F_C7E0EC_90A5B3_7B8C9B-PS.png?url', import.meta.url).href,// 黑
    //path: new URL('../../../assets/textures/matcaps/660505_F2B090_DD4D37_AA1914.png?url', import.meta.url).href,// 火球
    //path: new URL('../../../assets/textures/matcaps/796D6B_DED3CB_C6BAB1_ADA09B.png?url', import.meta.url).href,//粉陶瓷
    //path: new URL('../../../assets/textures/matcaps/7A7A7A_D0D0D0_BCBCBC_B4B4B4.png?url', import.meta.url).href,//类黑白卡通
    //path: new URL('../../../assets/textures/matcaps/7A7A7A_D9D9D9_BCBCBC_B4B4B4.png?url', import.meta.url).href,//低弧光
    //path: new URL('../../../assets/textures/matcaps/7B5254_E9DCC7_B19986_C8AC91.png?url', import.meta.url).href,//珍珠
    //path: new URL('../../../assets/textures/matcaps/7B6E5B_C5CACC_B1B2AE_322415.png?url', import.meta.url).href,//光滑
    {
        name: 'model-myhead',
        type: 'gltfDracoModel',
        path: new URL('../assets/models/my head/my head.gltf?url', import.meta.url).href,
    }
] as Source[]