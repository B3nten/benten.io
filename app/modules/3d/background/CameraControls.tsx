import {
	useFrame,
	useThree
} from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

export function CameraControls() {
	const mouse = useRef([0, 0]);
	const [mousePos, mousePosAPI] = useSpring(() => ({
		x: 0,
		y: 0,
		config: { mass: 1, tension: 100, friction: 100 },
	}));
	useEffect(() => {
		function handleMouseMove(e: MouseEvent) {
			const x = (e.clientX - 0.5 * window.innerWidth) / (0.5 * window.innerWidth);
			const y = ((e.clientY - 0.5 * window.innerHeight) / (0.5 * window.innerHeight)) *
				-1;
			mouse.current = [x, y];
			mousePosAPI.start({ x, y });
		}
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});
	const { camera } = useThree();
	useFrame((_, t) => {
		// rotate camera with max bounds
		camera.rotation.x = Math.max(
			Math.min(mousePos.y.get() * 0.3, Math.PI / 2),
			-Math.PI / 2
		);
		camera.rotation.y = Math.max(
			Math.min(-mousePos.x.get() * 0.4, Math.PI / 2),
			-Math.PI / 2
		);
	});
	return <></>;
}
