import {defineConfig} from 'vite';
export default defineConfig({build:{outDir:'sculpture',emptyOutDir:true,lib:{entry:'src/sculpture/main.mjs',formats:['es'],fileName:'scene'},rollupOptions:{output:{assetFileNames:'[name][extname]'}}}});
