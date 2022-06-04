import * as THREE from "THREE";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import { EventEmitter } from "../All";

import PublicPath from "@src/utils/PublicPath";

export interface Source {
    name: string,
    type: string,
    path: string | string[]
}

export type GLTFModel = GLTF;
export type Texture = THREE.Texture;
export type CubeTexture = THREE.CubeTexture;

export default class Resources extends EventEmitter {
    sources: Source[]

    items: { [propName: string]: GLTF | Texture | CubeTexture | Font }
    toLoad: number
    loaded: number

    loaders = {
        gltfLoader: new GLTFLoader(),
        gltfDracoLoader: (new GLTFLoader()).setDRACOLoader(new DRACOLoader().setDecoderPath(new PublicPath('/assets/draco/').url)),
        textureLoader: new THREE.TextureLoader(),
        cubeTextureLoader: new THREE.CubeTextureLoader(),
        fontLoader: new FontLoader(),
    }

    constructor(sources: Source[]) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        // Start loading
        this.startLoading()
    }

    startLoading() {
        if (this.sources.length === 0) return this.ready();
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path as string, (file: GLTF) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'gltfDracoModel') {
                this.loaders.gltfDracoLoader.load(source.path as string, (file: GLTF) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path as string, (file: Texture) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path as string[], (file: CubeTexture) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'fontJSON') {
                this.loaders.fontLoader.load(source.path as string, (file: Font) => {
                    this.sourceLoaded(source, file)
                })
            }
        }
    }

    sourceLoaded(source: Source, file: GLTF | Texture | CubeTexture | Font) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.ready()
        }
    }

    ready() {
        this.isReady = true
        this.emit('ready')
    }

    isReady = false
    onReady(onReadyFunction: Function) {
        return this.isReady ? onReadyFunction() : this.once('ready', onReadyFunction)
    }

}