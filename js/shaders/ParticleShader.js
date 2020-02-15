let ParticleShader = {
    vertex: `


    precision highp float;

    attribute float pindex;
    attribute vec3 position;
    attribute vec3 offset;
    attribute vec2 uv;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    
    uniform float uTime;
    uniform float uSize;

    varying vec2 vUv;
    
    float random(float n) {
        return fract(sin(n) * 43758.5453123);
    }
    
    void main() {
        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4(offset, 1.0);
        mvPosition.xyz += position * uSize;
        vec4 finalPosition = projectionMatrix * mvPosition;
    
        gl_Position = finalPosition;
    }
    

    `,
    fragment: `
    precision highp float;
    
    uniform float uTime;

    varying vec2 vUv;
    
    void main()
    {
        float d = smoothstep(0.0,1.0,1.0-length((vUv-vec2(0.5))*2.0));
        gl_FragColor = vec4(1.0,1.0,1.0,d);
    }
    `
}