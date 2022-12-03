import { Link } from "@remix-run/react";

export function OuterHUD() {
	return (
		<>
			<Link to="/" className="fixed top-4 left-4 text-cyan text-3xl font-bold font-mono z-999">
				benten
			</Link>
			<div className="fixed bottom-4 right-4 z-999">
				<div className="flex flex-row space-x-2">
					<a href='https://github.com/b3nten' className="text-pink text-lg font-mono">GH</a>
					<a className="text-pink text-lg font-mono">TW</a>
					<a className="text-pink text-lg font-mono">IG</a>
					<a className="text-pink text-lg font-mono">AS</a>
				</div>
			</div>
		</>
	);
}
