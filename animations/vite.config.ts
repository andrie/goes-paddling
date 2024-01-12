import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import copy from "rollup-plugin-copy";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/project.ts", 
        "./src/project2.ts"
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        dir: "../public/animations",
        // dir: "../dist",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        // assetFileNames: "[name].[ext]"
      },  
      plugins: [
        copy({
          targets: [
            { src: '../public/animations/*', dest: '../dist/animations/' }
          ],
          hook: 'writeBundle' // run the plugin after the bundle is written
        })
      ],
    },
  },
});
