import { Rembg } from "rembg-node";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// Directorios de entrada y salida
const inputDirectory = "./input";
const outputDirectory = "./output";

// Función para procesar una imagen
async function processImage(inputFilePath, outputFilePath) {
  const input = sharp(inputFilePath);

  // Opciones de Rembg (puedes personalizar según tus necesidades)
  const rembg = new Rembg({
    logging: true,
  });

  const output = await rembg.remove(input);

  await output.webp().toFile(outputFilePath);

  // Opcionalmente, puedes utilizar .trim() también
  // await output.trim().webp().toFile(outputFilePath);
}

// Leer archivos en el directorio de entrada
fs.readdir(inputDirectory, async (err, files) => {
  if (err) {
    console.error("Error al leer el directorio de entrada:", err);
    return;
  }

  // Iterar a través de los archivos en la carpeta de entrada
  for (const file of files) {
    const inputFilePath = path.join(inputDirectory, file);
    const outputFilePath = path.join(outputDirectory, file.replace(/\.[^/.]+$/, ".webp"));

    // Procesar la imagen
    try {
      await processImage(inputFilePath, outputFilePath);
      console.log(`Imagen procesada: ${file}`);
    } catch (error) {
      console.error(`Error al procesar la imagen ${file}:`, error);
    }
  }
});
