import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	ChromaticAberration,
	EffectComposer,
	Scanline,
} from "@react-three/postprocessing";
import { Curves } from "./Curves";
import { CameraControls } from "./CameraControls";
import { Gradient } from "./Gradient";
import { Dust } from "./Dust";
import { UI } from "./UI";


export function Scene() {
	return (
		<div className="fixed top-0 bottom-0 right-0 left-0 -z-10 bg-#090a12">
			<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 2] }}>
				{/* <Stats /> */}
				<fog attach="fog" color="#090a12" near={1} far={200} />
				<ambientLight intensity={1} />
				<Gradient />
				<Dust count={300} />
				<CameraControls />
				<Curves />
				<UI />
				<EffectComposer>
					<Scanline opacity={0.5} />
					<Bloom intensity={0.1} luminanceThreshold={1} />
					<ChromaticAberration />
				</EffectComposer>
			</Canvas>
		</div>
	);
}
