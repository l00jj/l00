import * as THREE from "THREE";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import { EventEmitter } from "../All";

import PublicPath from "@src/utils/PublicPath";

export interface Source {
    name: string,
    type: 'gltfModel' | 'gltfDracoModel' | 'texture' | 'cubeTexture' | 'fontJSON',
    path: string | string[]
}

export type GLTFModel = GLTF;
export type Texture = THREE.Texture;
export type CubeTexture = THREE.CubeTexture;

export default class Resources extends EventEmitter {
    sources: Source[]

    items: { [propName: string]: GLTF | Texture | CubeTexture | Font }

    loaded = 0// 已成功加载的资源数
    loadTotal = 0// 需要加载的资源总数

    LoadingManager = new THREE.LoadingManager(
        // Loaded        
        () => {
            //console.log('Loaded')
            if (this.loaded === this.loadTotal) {
                this.ready()
            }
        },
        // Progress        
        (itemUrl, itemsLoaded, itemsTotal) => {
            //console.log('Progress', itemUrl, itemsLoaded, itemsTotal)
            this.loadTotal = itemsTotal
            this.loaded = itemsLoaded
            this.emit('progress', this.loaded, this.loadTotal)
        })

    loaders = {
        gltfLoader: new GLTFLoader(this.LoadingManager),
        gltfDracoLoader: (new GLTFLoader(this.LoadingManager)).setDRACOLoader(new DRACOLoader(this.LoadingManager).setDecoderPath(new PublicPath('/assets/draco/').url)),
        textureLoader: new THREE.TextureLoader(this.LoadingManager),
        cubeTextureLoader: new THREE.CubeTextureLoader(this.LoadingManager),
        fontLoader: new FontLoader(this.LoadingManager),
    }

    constructor(sources: Source[]) {
        super()

        // Options
        this.sources = sources
        this.loadTotal = sources.length

        // Setup
        this.items = {}

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
            } else throw `Unknow source.type: ${source.type}`
        }
    }

    sourceLoaded(source: Source, file: GLTF | Texture | CubeTexture | Font) {
        this.items[source.name] = file
    }

    ready() {
        this.isReady = true
        this.emit('ready')
    }

    isReady = false
    onReady(onReadyFunction: Function) {
        return this.isReady ? onReadyFunction() : this.once('ready', onReadyFunction)
    }

    onProgress(onProgressFunction: Function) {
        return this.on('progress', onProgressFunction)
    }

    destroy() {
        return this.clearEvents()
    }
}