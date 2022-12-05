import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

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
export function Curves() {
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
	curve, range,
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
function CubeInstance({
	curve, index,
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
		t.current += delta * 0.05;
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
