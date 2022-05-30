import * as THREE from "THREE";

import Experience from "../Experience";

export default class Environment {
    experience: Experience
    scence: THREE.Scene
    sunLight!: THREE.DirectionalLight

    constructor(experience: Experience) {
        this.experience = experience
        this.scence = this.experience.scence

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, -1.25)
        this.scence.add(this.sunLight)
    }

    setEnvironmentMap(){
        //[2:18:31]
    }
}