import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
	FirstPersonControls,
	Line,
	OrbitControls,
	Stats,
	Effects,
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

extend({ UnrealBloomPass });

export function Background() {
	return (
		<div className="fixed top-0 bottom-0 right-0 left-0 -z-10">
			<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2] }}>
				{/* <Stats /> */}
				<fog attach="fog" color="#090a12" near={1} far={200} />
				<color attach="background" args={["#090a12"]} />
				<ambientLight intensity={1} />
				{/* <FirstPersonControls lookSpeed={0.04} /> */}
				<OrbitControls />
				<Curves />
				<EffectComposer>
					<Scanline opacity={0.06} />
					<Bloom intensity={.1} luminanceThreshold={1}/>
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
		color: new THREE.Color(.5, 4, 4),
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
				const range: [number, number] = [(cubeAmount - 1) * i, cubeAmount * (i + 1)];
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
