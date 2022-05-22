import esbuild from "esbuild";

esbuild
	.build({
		bundle: true,
		entryPoints: ["dist/server/src/index.js"],
		outfile: "dist/tracker.js",
		platform: "browser",
		target: "esnext",
		minify: true,
	})
	.catch(() => process.exit(1));
