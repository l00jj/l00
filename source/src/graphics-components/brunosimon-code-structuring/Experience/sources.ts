export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
            new URL('../static/textures/environmentMap/px.jpg?url', import.meta.url).href,
            new URL('../static/textures/environmentMap/nx.jpg?url', import.meta.url).href,
            new URL('../static/textures/environmentMap/py.jpg?url', import.meta.url).href,
            new URL('../static/textures/environmentMap/ny.jpg?url', import.meta.url).href,
            new URL('../static/textures/environmentMap/pz.jpg?url', import.meta.url).href,
            new URL('../static/textures/environmentMap/nz.jpg?url', import.meta.url).href,
        ]
    }, {
        name: 'grassColorTexture',
        type: 'texture',
        path: new URL('../static/textures/dirt/color.jpg?url', import.meta.url).href,
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: new URL('../static/textures/dirt/normal.jpg?url', import.meta.url).href,
    }/* ,
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: new URL('../static/models/Fox/glTF/Fox.gltf?url', import.meta.url).href,
    } */,
    {
        name: 'foxModel',
        type: 'gltfDracoModel',
        path: new URL('../static/models/Fox/glTF-Embedded/Fox.gltf?url', import.meta.url).href,
    }
]