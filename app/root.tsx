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
import { Background } from "~/modules/3d/scenes/background";
import reset from "@unocss/reset/tailwind.css";
import unocss from "~/styles/uno.css";
import { Client } from "./common/components/Client";
import { OuterHUD } from "./modules/OuterHUD";
import { useTransition, animated, config } from "react-spring";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
	{ rel: "stylesheet", href: reset },
	{ rel: "stylesheet", href: unocss },
];

export default function App() {
	const outlet = useOutlet();
	const transitions = useTransition(outlet, {
		from: { opacity: 0, config: { duration: 1000 } },
		enter: { opacity: 1, config: { duration: 1000 } },
		leave: { opacity: 0, config: { duration: 1000 } },
    delay: 0,
		exitBeforeEnter: true,
	})
	return (
		<html lang="en" data-theme="dark">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="relative">
				<OuterHUD />
				<Client>
					<Background />
				</Client>
				{transitions((props, Outlet) => (
					<animated.div style={props}>{Outlet}</animated.div>
				))}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
