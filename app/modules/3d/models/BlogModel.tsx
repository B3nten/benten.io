import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
} from "@react-three/postprocessing";

export function BlogModel() {
	const { nodes, materials } = useGLTF("/models/blog.gltf");
	const meshRef = useRef();
	useFrame(() => {
		meshRef.current.rotation.y -= 0.004;
	});
	return (
		<>
			<EffectComposer>
				<Bloom intensity={0.3} luminanceThreshold={0} />
				<ChromaticAberration offset={new THREE.Vector2(0.005, 0)} />
			</EffectComposer>
			<group ref={meshRef} dispose={null}>
				<mesh castShadow receiveShadow geometry={nodes.Mesh.geometry}>
					<meshPhongMaterial color="cyan" />
				</mesh>
			</group>
		</>
	);
}

useGLTF.preload("/models/blog.gltf");
