import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Background } from "~/modules/3d/scenes/background";
import reset from '@unocss/reset/tailwind.css'
import unocss from '~/styles/uno.css'
import { Client } from "./common/components/Client";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  { rel: 'stylesheet', href: reset },
  { rel: 'stylesheet', href: unocss },
]

export default function App() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <Meta />
        <Links />
      </head>
      <body className='relative'>
        <Outlet />
        <Client>
          <Background />
        </Client>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
