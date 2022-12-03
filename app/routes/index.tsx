import { Canvas } from "@react-three/fiber";
import { GithubModel } from "~/modules/3d/models/GithubModel";
import { BlogModel } from "~/modules/3d/models/BlogModel";
import { ArtstationModel } from "~/modules/3d/models/ArtstationModel";
import { AboutModel } from "~/modules/3d/models/AboutModel";

export default function Index() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="relative h-70vh aspect-square rounded-full border border-cyan">
				<a
					href="https://github.com/b3nten"
					className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2"
				>
					<div className="w-64 h-64">
						<Canvas camera={{ position: [5, 0, 0], fov: 30 }}>
							<ambientLight />
							<pointLight position={[0, 10, 0]} />
							<BlogModel />
						</Canvas>
					</div>
					<div className="block text-cyan text-2xl font-mono text-center -translate-y-22">
						blog
					</div>
				</a>
				<a
					href="https://github.com/b3nten"
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
				>
					<div className="w-64 h-64">
						<Canvas camera={{ position: [5, 0, 0], fov: 30 }}>
							<ambientLight />
							<pointLight position={[0, 10, 0]} />
							<GithubModel />
						</Canvas>
					</div>
					<div className="block text-cyan text-2xl font-mono text-center -translate-y-22">
						github
					</div>
				</a>
				<a
					href="https://github.com/b3nten"
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
				>
					<div className="w-64 h-64">
						<Canvas camera={{ position: [5, 0, 0], fov: 30 }}>
							<ambientLight />
							<pointLight position={[0, 10, 0]} />
							<AboutModel />
						</Canvas>
					</div>
					<div className="block text-cyan text-2xl font-mono text-center -translate-y-22">
						about
					</div>
				</a>
				<a
					href="https://github.com/b3nten"
					className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2"
				>
					<div className="w-64 h-64">
						<Canvas camera={{ position: [5, 0, 0], fov: 30 }}>
							<ambientLight />
							<pointLight position={[0, 10, 0]} />
							<ArtstationModel />
						</Canvas>
					</div>
					<div className="block text-cyan text-2xl font-mono text-center -translate-y-22">
						artstation
					</div>
				</a>
			</div>
		</div>
	);
}
