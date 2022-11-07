import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Outline,
	Scanline,
} from "@react-three/postprocessing";

export function Background() {
	return (
		<div className="fixed top-0 bottom-0 right-0 left-0">
			<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 20] }}>
				<fog attach="fog" color="#090a12" near={1} far={150} />
				<color attach="background" args={["#090a12"]} />
				<ambientLight intensity={1} />
				<OrbitControls rotation={[0, Math.PI / 2, 0]} />
				<Curves />
				<EffectComposer>
					<Scanline opacity={.05} />
					<Bloom
						intensity={0.7}
						luminanceThreshold={0}
						luminanceSmoothing={0.9}
					/>
					<ChromaticAberration />
				</EffectComposer>
			</Canvas>
		</div>
	);
}

function createCurve() {
	function randomClamp(floor: number, ceiling: number) {
		return Math.random() * (ceiling - floor) + floor;
	}
	return new THREE.CatmullRomCurve3([
		new THREE.Vector3(randomClamp(5, 30), randomClamp(10, -30), -25),
		new THREE.Vector3(
			randomClamp(0, 20),
			randomClamp(0, 20),
			randomClamp(10, 30)
		),
		new THREE.Vector3(
			randomClamp(-10, 20),
			randomClamp(0, 20),
			randomClamp(50, 80)
		),
		new THREE.Vector3(
			randomClamp(-40, 30),
			randomClamp(-20, -40),
			randomClamp(210, 230)
		),
		new THREE.Vector3(
			randomClamp(-100, 100),
			randomClamp(50, 100),
			randomClamp(-200, 220)
		),
	]);
}

const curveArray = Array.from(Array(10)).map(() => createCurve());

function Curves() {
	return (
		<>
			{curveArray.map((curve, i) => (
				<Curve key={JSON.stringify(curve)} curve={curve} />
			))}
		</>
	);
}

function Curve({ curve }: { curve: THREE.CatmullRomCurve3 }) {
	return (
		<>
			<Line points={curve.getPoints(100)} color="#fff" lineWidth={1} />
			{Array.from(Array(60)).map((_, i) => (
				<CubeObj curve={curve} />
			))}
		</>
	);
}

const base = new THREE.BoxGeometry(1, 1, 1);

function CubeObj({ curve }: { curve: THREE.CatmullRomCurve3 }) {

	const cube = useMemo(()=>{
		// const mesh = new THREE.Mesh(
		// 	new THREE.BoxGeometry(1, 1, 1),
		// 	new THREE.MeshBasicMaterial({ color: "cyan", opacity: 1 })
		// )
		const mesh = new THREE.Mesh()
		const wireframeGeo = new THREE.EdgesGeometry(base);
		const wireframeMat = new THREE.LineBasicMaterial({ color: 'cyan'});
		const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
		mesh.add( wireframe );
		return mesh
	}, [])


	// On mount, set the position of the cube to a random spot on the curve
	const t = useRef(Math.random());

	useFrame((state, delta) => {
		t.current += delta * 0.025;
		if (t.current > 1) {
			t.current = 0;
		}
		cube.position.set(
			curve.getPointAt(t.current).x,
			curve.getPointAt(t.current).y,
			curve.getPointAt(t.current).z
		);
		cube.lookAt(curve.getPoint(Math.floor(t.current + 0.01)));
	});

	return <primitive object={cube} />;
}
