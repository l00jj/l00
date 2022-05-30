import * as THREE from "THREE";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

import { EventEmitter } from '@src/unit/EventEmitter'

export default class Resources extends EventEmitter {
    sources: any[]

    item: any
    toLoad: number
    loaded: number

    loaders = {
        gltfLoader: new GLTFLoader(),
        textureLoader: new THREE.TextureLoader(),
        cubeTextureLoader: new THREE.CubeTextureLoader(),
    }

    constructor(sources: any[]) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.item = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.startLoading()
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'texture') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file)
                })
            }
        }
    }

    sourceLoaded(source: any, file: any) {
        this.item[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.emit('ready')
        }
    }


}