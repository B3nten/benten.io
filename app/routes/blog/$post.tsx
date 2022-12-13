import { PortableText } from "@portabletext/react";
import { DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Code from "~/common/components/Code";

export async function loader({ params }) {
	const res = await fetch(
		`https://hjptyzcn.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%20%26%26%20slug.current%3D%3D%22${params.post}%22%5D`
	);

	const data = await res.json();
	return data.result[0];
}

const myPortableTextComponents = {
	types: {
		code: ({ value }: any) => <Code content={value} />,
	},
};

export default function Post() {
	const dataRef = useRef({})
	const data = useLoaderData() || dataRef.current;
	useEffect(() => {
		dataRef.current = data
	}, [data])

	return (
		<div className="overflow-x-auto">
			<div className="max-w-3xl mx-auto space-y-10 p-4 mb-24 mt-32">
				<h1 className="text-white text-5xl">{data.title}</h1>
				<div
					className="prose prose-white max-w-none"
				>
					<PortableText
						value={data.body}
						components={myPortableTextComponents}
					/>
				</div>
			</div>
		</div>
	);
}
