import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three"
import { Sparks } from "../../effects/Sparks";


export function UI() {
	const { camera } = useThree()
	const offset = useMemo(() => new THREE.Vector3(-3,-1.9,-10),[])
	return (
		<group position={offset}>
			<Sparks radius={1.5} count={2} />
			<Sparks
				radius={1}
				length={0.4}
				count={2}
				variance={[0.9, 1]}
				width={0.01}
				speed={[0.0003, 0.0008]}
			/>
		</group>
	);
}
