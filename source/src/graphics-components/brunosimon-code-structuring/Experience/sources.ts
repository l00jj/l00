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
    }
]