import * as THREE from "three";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useLocation } from "@remix-run/react";
import { useEffect, useMemo, useRef } from "react";
import { config, useSpring } from "@react-spring/web";
import { ThreeMFLoader } from "three-stdlib";

function createTexture(color: string) {
	console.log(color);
	const size = 2048;

	// create canvas
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;

	// get context
	const context = canvas.getContext("2d");

	// draw gradient
	context!.rect(0, 0, size, size);
	const gradient = context!.createLinearGradient(0, 0, size, size);
	gradient.addColorStop(0, color);
	gradient.addColorStop(1, "#0a0a12");
	context!.fillStyle = gradient;
	context!.fill();
	return canvas;
}

export function Gradient() {
	const location = useLocation();
	const { scene } = useThree();

	const canvas = useMemo(() => {
		const size = 1024;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		return canvas;
	}, []);

	const props = useSpring({
		from: { color: "#212240" },
		to: { color: "#331832" },
		loop: true,
		config: {
			duration: 3000
		},
	});

	const threeCanvasTexture = useRef<THREE.CanvasTexture>(new THREE.CanvasTexture(canvas))

	useFrame(() => {
		const context = canvas.getContext("2d")
		context!.clearRect(0, 0, canvas.width, canvas.height);
		context!.rect(0, 0, canvas.width, canvas.height);
		const gradient = context!.createLinearGradient(0, 0, canvas.width, canvas.height);
		gradient.addColorStop(0, props.color.get());
		gradient.addColorStop(1, "#0a0a12");
		context!.fillStyle = gradient;
		context!.fill();
		threeCanvasTexture.current.needsUpdate = true;
	});
	return (
		<mesh>
			<boxGeometry args={[300, 300, 300]} />
			<meshBasicMaterial map={threeCanvasTexture.current} side={THREE.BackSide} fog={false} />
		</mesh>
	);
}
