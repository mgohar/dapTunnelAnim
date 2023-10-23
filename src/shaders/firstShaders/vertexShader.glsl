uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float u_amplitude;
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;
attribute float a_modulus;

varying float v_a_modulus;
varying vec2 v_uv; 

void main() {
    vec3 vertexPosition = position;
    vec4 modelPosition = modelMatrix * vec4(vertexPosition, 1.0);
    // modelPosition.z+=sin(a_modulus*u_time)*u_amplitude;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    

    v_a_modulus=a_modulus;
    v_uv= uv;

}