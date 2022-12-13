import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useOutlet,
} from "@remix-run/react";
import { Scene } from "~/modules/3d/background";
import reset from "@unocss/reset/tailwind.css";
import unocss from "~/styles/uno.css";
import blog from "~/styles/blog.css";
import { Client } from "./common/components/Client";
import { OuterHUD } from "./modules/OuterHUD";
import { useTransition, animated, config } from "@react-spring/web";
import { useMemo } from "react";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
	{ rel: "stylesheet", href: reset },
	{ rel: "stylesheet", href: unocss },
	{ rel: "stylesheet", href: blog },
];

export default function App() {
	const outlet = useOutlet()
	const { pathname } = useLocation()
	const outletMemo = useMemo(() => {
		return outlet
	}, [pathname])
	const transitions = useTransition(outletMemo, {
		from: { opacity: 0, config: { duration: 500 } },
		enter: { opacity: 1, config: { duration: 500 } },
		leave: { opacity: 0, config: { duration: 500 } },
		delay: 0,
		exitBeforeEnter: true,
	});
	return (
		<html lang="en" data-theme="dark">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="relative bg-black">
				<OuterHUD />
				<Client>
					<Scene />
				</Client>
				{/* {transitions((props, Outlet) => 
					<animated.div style={props}>{Outlet}</animated.div>
				)} */}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
