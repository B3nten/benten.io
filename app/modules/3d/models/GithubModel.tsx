import { useRef } from "react";
import { useCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function GithubModel() {
	const { nodes } = useGLTF("/models/github.gltf");
	const meshRef = useRef();
	useFrame(() => {
		meshRef.current.rotation.y -= 0.004;
	});
	return (
		<group ref={meshRef} dispose={null}>
			<mesh castShadow receiveShadow geometry={nodes.Mesh.geometry}>
				<meshStandardMaterial color="cyan" />
			</mesh>
		</group>
	);
}

useGLTF.preload("/models/github.gltf");
