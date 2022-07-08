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
        name: 'model-me',
        type: 'gltfDracoModel',
        path: new URL('../../assets/models/me/me.gltf?url', import.meta.url).href,
    },
]