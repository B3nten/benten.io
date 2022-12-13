import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export async function loader() {
	const res = await fetch(
		"https://hjptyzcn.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%5D%0A%7B%0A%20%20_createdAt%2C%20%0A%20%20blurb%2C%20%0A%20%20%22slug%22%3A%20slug.current%2C%20%0A%20%20title%2C%0A%20%20author-%3E%7Bname%2C%20slug%7D%2C%0A%20%20categories%5B%5D-%3E%7Btitle%7D%0A%7D"
	);
	const posts = await res.json();
	return { posts: posts.result };
}

export default function Blog() {
	// fix for loaderData unmounting before page transitions complete
	const dataRef = useRef({})
	const { posts } = useLoaderData() || dataRef.current;
	useEffect(() => {
		dataRef.current = { posts }
	}, [posts])

	return (
		<div className="text-white w-full flex items-center justify-center p-4">
			<div className="mt-32 w-full max-w-3xl">
				<h1 className="text-7xl font-mono py-12">Blog</h1>
				<div className="" />
				<ul className="space-y-10">
					{posts.map((m) => (
						<li className="group">
							<Link to={`/blog/${m.slug}`} className="space-y-4">
								<h2 className="relative inline-block text-cyan text-4xl font-mono overflow-hidden">
									<span>{m.title}</span>
									<div className="-z-10 -translate-x-100% opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition absolute -inset-2 bg-gradient-to-r bg-gradient-from-yellow bg-gradient-to-fuchsia" />
								</h2>
								<p className="text-white">{m.blurb}</p>
								<div className="font-mono space-x-4">
									<span className="text-cyan">
										{m._createdAt.substring(0, 10)}
									</span>
									<span className="text-fuchsia">
										{m.categories.map((c, i) => (
											<span>
												{c.title}
												{i === m.categories.length - 1 ? "" : ", "}
											</span>
										))}
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
