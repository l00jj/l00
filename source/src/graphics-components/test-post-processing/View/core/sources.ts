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
        type: 'gltfDracoModel',
        path: new URL('../../assets/models/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf?url', import.meta.url).href,
    },
    {
        name: 'interfaceNormalMap',
        type: 'texture',
        path: new URL('../../assets/textures/interfaceNormalMap.png?url', import.meta.url).href,
    }
]