export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
            new URL('../../assets/textures/environmentMaps/0/px.jpg?url', import.meta.url).href,
            new URL('../../assets/textures/environmentMaps/0/nx.jpg?url', import.meta.url).href,
            new URL('../../assets/textures/environmentMaps/0/py.jpg?url', import.meta.url).href,
            new URL('../../assets/textures/environmentMaps/0/ny.jpg?url', import.meta.url).href,
            new URL('../../assets/textures/environmentMaps/0/pz.jpg?url', import.meta.url).href,
            new URL('../../assets/textures/environmentMaps/0/nz.jpg?url', import.meta.url).href,
        ]
    },
    {
        name: 'model',
        type: 'gltfModel',
        path: new URL('../../assets/models/LeePerrySmith/LeePerrySmith.glb?url', import.meta.url).href,
    },
    {
        name: 'modelMapTexture',
        type: 'texture',
        path: new URL('../../assets/models/LeePerrySmith/color.jpg?url', import.meta.url).href,
    },
    {
        name: 'modelNormalTexture',
        type: 'texture',
        path: new URL('../../assets/models/LeePerrySmith/normal.jpg?url', import.meta.url).href,
    }
]