let CubeParticleShader = {
    vertex: `
attribute vec3 offset;
varying vec3 vViewPosition;
uniform float time;

float PI = 3.141592653589793;

highp mat2 rotate(float rad){
    return mat2(cos(rad),sin(rad),-sin(rad),cos(rad));
}

void main() {
    vec3 pos = position;
    float s = max(0.0,sin(-time * 4.0 + length(offset)));
    pos *= s;
    pos.xz *= rotate(s * 4.0);
    pos.xy *= rotate(s * 4.0);
    vec4 mvPosition = modelViewMatrix * vec4(pos + offset, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = -mvPosition.xyz;
}
    `
}