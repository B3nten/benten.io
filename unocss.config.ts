import { defineConfig, presetWind, presetWebFonts, presetAttributify, presetTypography } from "unocss";

export default defineConfig({
	presets: [
		presetWind(),
		presetWebFonts({
			provider: "google",
			fonts: {
				sans: "Space Mono",
				mono: "VT323",
			},
		}),
		presetAttributify(),
		presetTypography(),
	],
});
