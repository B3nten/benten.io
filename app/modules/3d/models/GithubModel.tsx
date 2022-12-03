import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
} from "@react-three/postprocessing";

export function GithubModel() {
	const { nodes } = useGLTF("/models/github.gltf");
	const meshRef = useRef();
	useFrame(() => {
		meshRef.current.rotation.y -= 0.004;
	});
	return (
		<>
			<EffectComposer>
				<Bloom intensity={.3} luminanceThreshold={0} />
				<ChromaticAberration offset={new THREE.Vector2(.005,0)} />
			</EffectComposer>
			<group ref={meshRef} dispose={null}>
				<mesh castShadow receiveShadow geometry={nodes.Mesh.geometry}>
					<meshPhongMaterial color="cyan" />
				</mesh>
			</group>
		</>
	);
}

useGLTF.preload("/models/github.gltf");
