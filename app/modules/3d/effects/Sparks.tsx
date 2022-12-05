import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";

import { MeshLine, MeshLineMaterial } from "../../meshline";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
} from "@react-three/postprocessing";
extend({ MeshLine, MeshLineMaterial });

function SparkLine({ curve, width, speed, length }: { curve: any; width: number; speed: number; length: number }) {
	const material = useRef();

	useFrame(() => {
    //@ts-ignore
		material.current.uniforms.dashOffset.value -= speed;
	});

	return (
		<mesh>
      {/* @ts-ignore */}
			<meshLine attach="geometry" points={curve} />
      {/* @ts-ignore */}
			<meshLineMaterial
				ref={material}
				transparent
				depthTest={false}
				lineWidth={width}
				color={new THREE.Color(0.5, 4, 4)}
				dashArray={0.1}
				dashRatio={length}
			/>
		</mesh>
	);
}

export function Sparks({ count = 10, radius = 5, width = .03, length = .98, variance = [.5, 1], speed = [.002, .004] }) {
  const radiusVariance = () => Random.range(...variance);
	const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(
          Math.sin(0) * radius * radiusVariance(),
          Math.cos(0) * radius * radiusVariance(),
          Math.sin(0) * Math.cos(0) * radius * radiusVariance()
        );
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;

          return pos
            .add(
              new THREE.Vector3(
                Math.sin(angle) * radius * radiusVariance(),
                Math.cos(angle) * radius * radiusVariance(),
                Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
              )
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          width: width,
          speed: Math.max(speed[0], speed[1] * Math.random()),
          curve,
          length
        };
      }),
    [count, radius, length, width]
  );


	return (
		<>
			<EffectComposer>
				<Bloom intensity={0.3} luminanceThreshold={0} />
				<ChromaticAberration offset={new THREE.Vector2(0.005, 0)} />
			</EffectComposer>
			<group scale={[1.2, 1, 1]}>
				{lines.map((props, index) => (
					<SparkLine key={index} {...props} />
				))}
			</group>
		</>
	);
}
