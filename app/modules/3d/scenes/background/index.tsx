import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Stats } from "@react-three/drei";
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
			<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2] }}>
				<Stats />
				<fog attach="fog" color="#090a12" near={1} far={200} />
				<color attach="background" args={["#090a12"]} />
				<ambientLight intensity={1} />
				<OrbitControls />
				<Curves />
				<EffectComposer>
					<Scanline opacity={0.05} />
					<Bloom
						intensity={0.7}
						luminanceThreshold={0}
						luminanceSmoothing={0.9}
					/>
					<ChromaticAberration />
				</EffectComposer>
				<Line
					points={new THREE.CatmullRomCurve3([
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(30, 0, 0),
					]).getPoints(2)}
					color="blue"
				/>
				<Line
					points={new THREE.CatmullRomCurve3([
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(0, 30, 0),
					]).getPoints(2)}
					color="red"
				/>
				<Line
					points={new THREE.CatmullRomCurve3([
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(0, 0, 30),
					]).getPoints(2)}
					color="green"
				/>
			</Canvas>
		</div>
	);
}

function createCurve() {
	return new THREE.CatmullRomCurve3([
		new THREE.Vector3(randomClamp(-15, -25), randomClamp(3, -25), 20),
		new THREE.Vector3(randomClamp(0, 100), randomClamp(20, 70), -100),
		new THREE.Vector3(randomClamp(100,200), randomClamp(-30,30), -240),
	])
}
function randomClamp(floor: number, ceiling: number) {
	return Math.random() * (ceiling - floor) + floor;
}

const curveArray = Array.from(Array(20)).map(() => createCurve());

new THREE.CatmullRomCurve3([
	new THREE.Vector3(-20, -10, 20),
	new THREE.Vector3(75, 50, -100),
	new THREE.Vector3(150, 0, -240),
])

// const curveArray = [
// 	new THREE.CatmullRomCurve3([
// 		new THREE.Vector3(randomClamp(-15, -25), randomClamp(-5, -15), 20),
// 		new THREE.Vector3(75, 50, -100),
// 		new THREE.Vector3(randomClamp(130,170), randomClamp(-20,20), -240),
// 	]),
// ];

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
			{/* <Line points={curve.getPoints(100)} color="#fff" lineWidth={1} /> */}
			{Array.from(Array(60)).map((_, i) => (
				<CubeObj curve={curve} />
			))}
		</>
	);
}

const base = new THREE.BoxGeometry(.5, .5, .5);

function CubeObj({ curve }: { curve: THREE.CatmullRomCurve3 }) {
	const cube = useMemo(() => {
		// const mesh = new THREE.Mesh(
		// 	new THREE.BoxGeometry(1, 1, 1),
		// 	new THREE.MeshBasicMaterial({ color: "cyan", opacity: 1 })
		// )
		const mesh = new THREE.Mesh();
		const wireframeGeo = new THREE.EdgesGeometry(base);
		const wireframeMat = new THREE.LineBasicMaterial({ color: "cyan" });
		const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
		mesh.add(wireframe);
		return mesh;
	}, []);

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
