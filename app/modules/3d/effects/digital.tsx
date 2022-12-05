import * as THREE from 'three';
import { ShaderMaterial } from '@react-three/fiber';

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float time;
  uniform float strength;

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 pixel = vec2(1.0 / resolution.x, 1.0 / resolution.y);
    uv += pixel * (sin(time + uv.xyx + vec3(0.0, 2.0, 4.0)) * 0.5);
    gl_FragColor = vec4(color * strength, 1.0);
  }
`;

export const DigitalEffectMaterial = ({ color, strength, time }) => {
  return (
    <shaderMaterial
      uniforms-color={{ type: 'vec3', value: new THREE.Color(color) }}
      uniforms-strength={{ type: 'f', value: strength }}
      uniforms-time={{ type: 'f', value: time }}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  );
};
