let LogoParticleShader = {
    vertex: `
attribute vec3 offset;
attribute float index;
varying vec3 vViewPosition;
uniform float time;
uniform vec2 size;

float PI = 3.141592653589793;

highp mat2 rotate(float rad){
    return mat2(cos(rad),sin(rad),-sin(rad),cos(rad));
}

float random(float n) {
    return fract(sin(n) * 43758.5453123);
}

void main() {
    vec3 pos = position;
    float s = smoothstep(0.0, 1.0,sin(-time*0.3)*1.3);
    pos.xz *= rotate(s * 4.0 * random(index));
    pos.xy *= rotate(s * 4.0 * random(index+1.0));

    vec2 logoPos = vec2(mod(index,size.x), size.y - floor(index/size.x))*2.0 - size;
    logoPos *= 0.6;

    vec3 offsetPos = mix(vec3(logoPos,0.0),offset,s);

    vec4 mvPosition = modelViewMatrix * vec4(pos + offsetPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = -mvPosition.xyz;
}
    `
}