import * as THREE from "three";
import {
	Canvas,
	useFrame,
	useThree,
	extend,
	useLoader,
} from "@react-three/fiber";
import {
	FirstPersonControls,
	Line,
	OrbitControls,
	Stats,
	Effects,
	GradientTexture,
} from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Outline,
	Scanline,
} from "@react-three/postprocessing";

import { UnrealBloomPass } from "three-stdlib";
import { GithubModel } from "../../models/GithubModel";
import { TextureLoader } from "three";
import { useSpring, animated } from 'react-spring'

extend({ UnrealBloomPass });

function Gradient(){
	const { scene } = useThree();
	const texture = useLoader(TextureLoader, "images/gradient.jpg");
	texture.encoding = THREE.sRGBEncoding;
	scene.background = texture;
	return <></>
}

function CameraControls(){
	const mouse = useRef([0,0])
	const [mousePos, mousePosAPI] = useSpring(() => ({ x: 0, y: 0, config: { mass: 1, tension: 100, friction: 100 } }))
	useEffect(() => {
		function handleMouseMove(e: MouseEvent){
			const x = (e.clientX - (.5*window.innerWidth)) / (.5*window.innerWidth);
			const y = (e.clientY - (.5*window.innerHeight)) / (.5*window.innerHeight) * -1
			mouse.current = [x, y]
			mousePosAPI.start({ x, y })
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => {window.removeEventListener("mousemove", handleMouseMove)}
	})
	const { camera } = useThree();
	useFrame((_, t) => {
		// rotate camera with max bounds
		camera.rotation.x = Math.max(Math.min(mousePos.y.get() * .3, Math.PI/2), -Math.PI/2)
		camera.rotation.y = Math.max(Math.min(-mousePos.x.get() * .4, Math.PI/2), -Math.PI/2)
	})
	return <></>
}

export function Background() {
	return (
		<div className="fixed top-0 bottom-0 right-0 left-0 -z-10 bg-#090a12">
			<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2] }}>
				{/* <Stats /> */}
				<fog attach="fog" color="#090a12" near={1} far={200} />
				<ambientLight intensity={1} />
				<Gradient />
				{/* <FirstPersonControls lookSpeed={0.04} /> */}
				<CameraControls />
				{/* <OrbitControls /> */}
				<Curves />
				<EffectComposer>
					<Scanline opacity={0.5} />
					<Bloom intensity={0.1} luminanceThreshold={1} />
					<ChromaticAberration />
				</EffectComposer>
			</Canvas>
		</div>
	);
}

function createCurve() {
	return new THREE.CatmullRomCurve3([
		new THREE.Vector3(randomClamp(-15, -25), randomClamp(3, -25), 2),
		new THREE.Vector3(randomClamp(0, 100), randomClamp(20, 70), -100),
		new THREE.Vector3(randomClamp(100, 200), randomClamp(-30, 30), -240),
	]);
}
function randomClamp(floor: number, ceiling: number) {
	return Math.random() * (ceiling - floor) + floor;
}

const curveArray = Array.from(Array(20)).map(() => createCurve());

const base = new THREE.SphereGeometry(0.05, 12, 12);
const instancedMesh = new THREE.InstancedMesh(
	base,
	new THREE.MeshBasicMaterial({
		color: new THREE.Color(0.5, 4, 4),
		toneMapped: false,
	}),
	1000
);

instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

function Curves() {
	return (
		<>
			{curveArray.map((curve, i) => {
				const cubeAmount = instancedMesh.count / curveArray.length;
				const range: [number, number] = [
					(cubeAmount - 1) * i,
					cubeAmount * (i + 1),
				];
				return (
					<Curve key={JSON.stringify(curve)} curve={curve} range={range} />
				);
			})}
			<primitive object={instancedMesh} />
		</>
	);
}

function Curve({
	curve,
	range,
}: {
	curve: THREE.CatmullRomCurve3;
	range: [number, number];
}) {
	return (
		<>
			{Array.from(Array(range[1] - range[0])).map((_, i) => (
				<CubeInstance curve={curve} index={range[0] + i} />
			))}
		</>
	);
}

// Each curve gets it's own range from the indexed mesh
// Each cubeinstance get's its own value from the indexed mesh

function CubeInstance({
	curve,
	index,
}: {
	curve: THREE.CatmullRomCurve3;
	index: number;
}) {
	const t = useRef(Math.random());
	const dummy = useMemo(() => {
		const d = new THREE.Object3D();
		return d;
	}, []);

	useFrame((state, delta) => {
		t.current += delta * 0.025;
		if (t.current > 1) {
			t.current = 0;
		}
		dummy.position.set(
			curve.getPointAt(t.current).x,
			curve.getPointAt(t.current).y,
			curve.getPointAt(t.current).z
		);
		dummy.updateMatrix();
		instancedMesh.setMatrixAt(index, dummy.matrix);
		instancedMesh.instanceMatrix.needsUpdate = true;
	});
	return <primitive object={dummy} />;
}
