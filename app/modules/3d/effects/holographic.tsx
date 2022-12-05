import * as THREE from 'three';
import { ShaderMaterial } from '@react-three/fiber';

const vertexShader = `
  uniform float time;
  uniform float speed;

  void main() {
    vec3 pos = position;
    pos.y += sin(pos.x + time * speed) * 0.1;
    pos.x += cos(pos.y + time * speed) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float strength;

  void main() {
    gl_FragColor = vec4(color * strength, 1.0);
  }
`;

export const HolographicMaterial = ({ color, strength, speed, time }) => {
  return (
    <shaderMaterial
      uniforms-color={{ type: 'vec3', value: new THREE.Color(color) }}
      uniforms-strength={{ type: 'f', value: strength }}
      uniforms-speed={{ type: 'f', value: speed }}
      uniforms-time={{ type: 'f', value: time }}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  );
};
