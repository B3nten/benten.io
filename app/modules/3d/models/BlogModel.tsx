import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function BlogModel() {
	const { nodes, materials } = useGLTF("/models/blog.gltf");
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

useGLTF.preload("/models/blog.gltf");
