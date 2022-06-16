import View from "./View/index";
import * as THREE from "THREE"


interface Option {
    fragmentShader?: string,
    vertexShader?: string,
}

export default (view: View, option: Option) => {
    if (!view) return;
    const material = view.world.patternPlane?.patternPlane.material as THREE.ShaderMaterial;
    if (option.fragmentShader) material.fragmentShader = option.fragmentShader
    if (option.vertexShader) material.vertexShader = option.vertexShader
    material.needsUpdate = true
};