import * as THREE from "THREE";

export class Reflector extends THREE.Group {
    renderTargetUniform: THREE.IUniform<any>
    textureMatrixUniform: THREE.IUniform<any>
    update: (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {}
    setSize: (width: number, height: number) => {}
}

export class ReflectorMaterial extends THREE.RawShaderMaterial {
    map?: THREE.Texture
    constructor(parameter: any)
}

export const floorPowerOfTwo = (value: any): number => { }

export class NumberKeyframeTrack extends THREE.KeyframeTrack { }