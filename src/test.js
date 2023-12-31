import { Rembg } from "rembg-node";
import sharp from "sharp";

// const { Rembg } = require("rembg-node");
// const sharp = require("sharp");

(async () => {
	const input = sharp("test-input.jpeg");

	// optional arguments
	const rembg = new Rembg({
		logging: true,
	});

	const output = await rembg.remove(input);

	await output.webp().toFile("test-output.webp");

	// optionally you can use .trim() too!
	await output.trim().webp().toFile("test-output-trimmed.webp");
})();