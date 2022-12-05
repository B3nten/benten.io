import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";

export function Gradient() {
	const { scene } = useThree();
	const texture = useLoader(THREE.TextureLoader, "images/gradient.jpg");
	texture.encoding = THREE.sRGBEncoding;
	scene.background = texture;
	return <></>;
}
